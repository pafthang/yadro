package model

import (
	"path"

	"github.com/88250/lute/ast"
	"github.com/88250/lute/parse"
	"github.com/siyuan-note/siyuan/kernel/sql"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func ListItem2Doc(srcListItemID, targetBoxID, targetPath string) (srcRootBlockID, newTargetPath string, err error) {
	srcTree, _ := loadTreeByBlockID(srcListItemID)
	if nil == srcTree {
		err = ErrBlockNotFound
		return
	}
	srcRootBlockID = srcTree.Root.ID

	listItemNode := treenode.GetNodeInTree(srcTree, srcListItemID)
	if nil == listItemNode {
		err = ErrBlockNotFound
		return
	}

	box := Conf.Box(targetBoxID)
	listItemText := sql.GetContainerText(listItemNode)
	listItemText = util.FilterFileName(listItemText)

	moveToRoot := "/" == targetPath
	toHP := path.Join("/", listItemText)
	toFolder := "/"

	if !moveToRoot {
		toBlock := treenode.GetBlockTreeRootByPath(targetBoxID, targetPath)
		if nil == toBlock {
			err = ErrBlockNotFound
			return
		}
		toHP = path.Join(toBlock.HPath, listItemText)
		toFolder = path.Join(path.Dir(targetPath), toBlock.ID)
	}

	newTargetPath = path.Join(toFolder, srcListItemID+".sy")
	if !box.Exist(toFolder) {
		if err = box.MkdirAll(toFolder); nil != err {
			return
		}
	}

	var children []*ast.Node
	for c := listItemNode.FirstChild.Next; nil != c; c = c.Next {
		children = append(children, c)
	}
	if 1 > len(children) {
		newNode := treenode.NewParagraph()
		children = append(children, newNode)
	}

	luteEngine := util.NewLute()
	newTree := &parse.Tree{Root: &ast.Node{Type: ast.NodeDocument, ID: srcListItemID}, Context: &parse.Context{ParseOption: luteEngine.ParseOptions}}
	for _, c := range children {
		newTree.Root.AppendChild(c)
	}
	newTree.ID = srcListItemID
	newTree.Path = newTargetPath
	newTree.HPath = toHP
	listItemNode.SetIALAttr("type", "doc")
	listItemNode.SetIALAttr("id", srcListItemID)
	listItemNode.SetIALAttr("title", listItemText)
	listItemNode.RemoveIALAttr("fold")
	newTree.Root.KramdownIAL = listItemNode.KramdownIAL
	srcLiParent := listItemNode.Parent
	listItemNode.Unlink()
	if nil != srcLiParent && nil == srcLiParent.FirstChild {
		srcLiParent.Unlink()
	}
	srcTree.Root.SetIALAttr("updated", util.CurrentTimeSecondsStr())
	if nil == srcTree.Root.FirstChild {
		srcTree.Root.AppendChild(treenode.NewParagraph())
	}
	treenode.RemoveBlockTreesByRootID(srcTree.ID)
	if err = indexWriteJSONQueue(srcTree); nil != err {
		return "", "", err
	}

	newTree.Box, newTree.Path = targetBoxID, newTargetPath
	newTree.Root.SetIALAttr("updated", util.CurrentTimeSecondsStr())
	newTree.Root.Spec = "1"
	box.addMinSort(path.Dir(newTargetPath), newTree.ID)
	if err = indexWriteJSONQueue(newTree); nil != err {
		return "", "", err
	}
	IncSync()
	RefreshBacklink(srcTree.ID)
	RefreshBacklink(newTree.ID)
	return
}
