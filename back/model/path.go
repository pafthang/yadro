package model

import (
	"bytes"
	"os"
	"path"
	"path/filepath"
	"sort"
	"strings"

	"github.com/88250/lute/ast"
	"github.com/88250/lute/parse"
	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/search"
	"github.com/siyuan-note/siyuan/kernel/sql"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func createDocsByHPath(boxID, hPath, content, parentID, id string /* id 参数仅在 parentID 不为空的情况下使用 */) (retID string, err error) {
	hPath = strings.TrimSuffix(hPath, ".sy")
	if "" != parentID {
		retID = id

		// The save path is incorrect when creating a sub-doc by ref in a doc with the same name https://github.com/siyuan-note/siyuan/issues/8138
		// 在指定父文档 ID 的情况下优先查找父文档
		parentHPath, name := path.Split(hPath)
		parentHPath = strings.TrimSuffix(parentHPath, "/")
		preferredParent := treenode.GetBlockTreeRootByHPathPreferredParentID(boxID, parentHPath, parentID)
		if nil != preferredParent && preferredParent.ID == parentID {
			// 如果父文档存在且 ID 一致，则直接在父文档下创建
			p := strings.TrimSuffix(preferredParent.Path, ".sy") + "/" + id + ".sy"
			if _, err = createDoc(boxID, p, name, content); nil != err {
				logging.LogErrorf("create doc [%s] failed: %s", p, err)
			}
			return
		}
	} else {
		retID = ast.NewNodeID()
		if "" == id {
			id = retID
		}
	}

	root := treenode.GetBlockTreeRootByPath(boxID, hPath)
	if nil != root {
		retID = root.ID
		return
	}

	hPathBuilder := bytes.Buffer{}
	hpathBtMap := map[string]*treenode.BlockTree{}
	parts := strings.Split(hPath, "/")[1:]
	// The subdoc creation path is unstable when a parent doc with the same name exists https://github.com/siyuan-note/siyuan/issues/9322
	// 存在同名父文档时子文档创建路径不稳定，这里需要按照完整的 hpath 映射，不能在下面的循环中边构建 hpath 边构建 path，否则虽然 hpath 相同，但是会导致 path 组装错位
	for i, part := range parts {
		if i == len(parts)-1 {
			break
		}

		hPathBuilder.WriteString("/")
		hPathBuilder.WriteString(part)
		hp := hPathBuilder.String()
		root = treenode.GetBlockTreeRootByHPath(boxID, hp)
		if nil == root {
			break
		}

		hpathBtMap[hp] = root
	}

	pathBuilder := bytes.Buffer{}
	pathBuilder.WriteString("/")
	hPathBuilder = bytes.Buffer{}
	hPathBuilder.WriteString("/")
	for i, part := range parts {
		hPathBuilder.WriteString(part)
		hp := hPathBuilder.String()
		root = hpathBtMap[hp]
		isNotLast := i < len(parts)-1
		if nil == root {
			rootID := ast.NewNodeID()
			if i == len(parts)-1 {
				rootID = retID
			}

			pathBuilder.WriteString(rootID)
			docP := pathBuilder.String() + ".sy"
			if isNotLast {
				if _, err = createDoc(boxID, docP, part, ""); nil != err {
					return
				}
			} else {
				if _, err = createDoc(boxID, docP, part, content); nil != err {
					return
				}
			}

			if isNotLast {
				dirPath := filepath.Join(util.DataDir, boxID, pathBuilder.String())
				if err = os.MkdirAll(dirPath, 0755); nil != err {
					logging.LogErrorf("mkdir [%s] failed: %s", dirPath, err)
					return
				}
			}
		} else {
			pathBuilder.WriteString(root.ID)
			if !isNotLast {
				pathBuilder.WriteString(".sy")
			}
		}

		if isNotLast {
			pathBuilder.WriteString("/")
			hPathBuilder.WriteString("/")
		}
	}
	return
}

func toFlatTree(blocks []*Block, baseDepth int, typ string, tree *parse.Tree) (ret []*Path) {
	var blockRoots []*Block
	for _, block := range blocks {
		root := getBlockIn(blockRoots, block.RootID)
		if nil == root {
			root, _ = getBlock(block.RootID, tree)
			blockRoots = append(blockRoots, root)
		}
		if nil == root {
			return
		}
		block.Depth = baseDepth + 1
		block.Count = len(block.Children)
		root.Children = append(root.Children, block)
	}

	for _, root := range blockRoots {
		treeNode := &Path{
			ID:       root.ID,
			Box:      root.Box,
			Name:     path.Base(root.HPath),
			NodeType: root.Type,
			Type:     typ,
			SubType:  root.SubType,
			Depth:    baseDepth,
			Count:    len(root.Children),

			Updated: root.IAL["updated"],
			Created: root.ID[:14],
		}
		for _, c := range root.Children {
			treeNode.Blocks = append(treeNode.Blocks, c)
		}
		ret = append(ret, treeNode)

		if "backlink" == typ {
			treeNode.HPath = root.HPath
		}
	}

	sort.Slice(ret, func(i, j int) bool {
		return ret[i].ID > ret[j].ID
	})
	return
}

func toSubTree(blocks []*Block, keyword string) (ret []*Path) {
	keyword = strings.TrimSpace(keyword)
	var blockRoots []*Block
	for _, block := range blocks {
		root := getBlockIn(blockRoots, block.RootID)
		if nil == root {
			root, _ = getBlock(block.RootID, nil)
			blockRoots = append(blockRoots, root)
		}
		block.Depth = 1
		block.Count = len(block.Children)
		root.Children = append(root.Children, block)
	}

	for _, root := range blockRoots {
		treeNode := &Path{
			ID:       root.ID,
			Box:      root.Box,
			Name:     path.Base(root.HPath),
			Type:     "backlink",
			NodeType: "NodeDocument",
			SubType:  root.SubType,
			Depth:    0,
			Count:    len(root.Children),
		}
		for _, c := range root.Children {
			if "NodeListItem" == c.Type {
				tree, _ := loadTreeByBlockID(c.RootID)
				li := treenode.GetNodeInTree(tree, c.ID)
				if nil == li || nil == li.FirstChild {
					// 反链面板拖拽到文档以后可能会出现这种情况 https://github.com/siyuan-note/siyuan/issues/5363
					continue
				}

				var first *sql.Block
				if 3 != li.ListData.Typ {
					first = sql.GetBlock(li.FirstChild.ID)
				} else {
					first = sql.GetBlock(li.FirstChild.Next.ID)
				}
				name := first.Content
				parentPos := 0
				if "" != keyword {
					parentPos, name = search.MarkText(name, keyword, 12, Conf.Search.CaseSensitive)
				}
				subRoot := &Path{
					ID:       li.ID,
					Box:      li.Box,
					Name:     name,
					Type:     "backlink",
					NodeType: li.Type.String(),
					SubType:  c.SubType,
					Depth:    1,
					Count:    1,
				}

				unfold := true
				for liFirstBlockSpan := li.FirstChild.FirstChild; nil != liFirstBlockSpan; liFirstBlockSpan = liFirstBlockSpan.Next {
					if treenode.IsBlockRef(liFirstBlockSpan) {
						continue
					}
					if "" != strings.TrimSpace(liFirstBlockSpan.Text()) {
						unfold = false
						break
					}
				}
				for next := li.FirstChild.Next; nil != next; next = next.Next {
					subBlock, _ := getBlock(next.ID, tree)
					if unfold {
						if ast.NodeList == next.Type {
							for subLi := next.FirstChild; nil != subLi; subLi = subLi.Next {
								subLiBlock, _ := getBlock(subLi.ID, tree)
								var subFirst *sql.Block
								if 3 != subLi.ListData.Typ {
									subFirst = sql.GetBlock(subLi.FirstChild.ID)
								} else {
									subFirst = sql.GetBlock(subLi.FirstChild.Next.ID)
								}
								subPos := 0
								content := subFirst.Content
								if "" != keyword {
									subPos, content = search.MarkText(subFirst.Content, keyword, 12, Conf.Search.CaseSensitive)
								}
								if -1 < subPos {
									parentPos = 0 // 需要显示父级
								}
								subLiBlock.Content = content
								subLiBlock.Depth = 2
								subRoot.Blocks = append(subRoot.Blocks, subLiBlock)
							}
						} else if ast.NodeHeading == next.Type {
							subBlock.Depth = 2
							subRoot.Blocks = append(subRoot.Blocks, subBlock)
							headingChildren := treenode.HeadingChildren(next)
							var breakSub bool
							for _, n := range headingChildren {
								block, _ := getBlock(n.ID, tree)
								subPos := 0
								content := block.Content
								if "" != keyword {
									subPos, content = search.MarkText(block.Content, keyword, 12, Conf.Search.CaseSensitive)
								}
								if -1 < subPos {
									parentPos = 0
								}
								block.Content = content
								block.Depth = 3
								subRoot.Blocks = append(subRoot.Blocks, block)
								if ast.NodeHeading == n.Type {
									// 跳过子标题下面的块
									breakSub = true
									break
								}
							}
							if breakSub {
								break
							}
						} else {
							if nil == treenode.HeadingParent(next) {
								subBlock.Depth = 2
								subRoot.Blocks = append(subRoot.Blocks, subBlock)
							}
						}
					}
				}
				if -1 < parentPos {
					treeNode.Children = append(treeNode.Children, subRoot)
				}
			} else if "NodeHeading" == c.Type {
				tree, _ := loadTreeByBlockID(c.RootID)
				h := treenode.GetNodeInTree(tree, c.ID)
				if nil == h {
					continue
				}

				name := sql.GetBlock(h.ID).Content
				parentPos := 0
				if "" != keyword {
					parentPos, name = search.MarkText(name, keyword, 12, Conf.Search.CaseSensitive)
				}
				subRoot := &Path{
					ID:       h.ID,
					Box:      h.Box,
					Name:     name,
					Type:     "backlink",
					NodeType: h.Type.String(),
					SubType:  c.SubType,
					Depth:    1,
					Count:    1,
				}

				unfold := true
				for headingFirstSpan := h.FirstChild; nil != headingFirstSpan; headingFirstSpan = headingFirstSpan.Next {
					if treenode.IsBlockRef(headingFirstSpan) {
						continue
					}
					if "" != strings.TrimSpace(headingFirstSpan.Text()) {
						unfold = false
						break
					}
				}

				if unfold {
					headingChildren := treenode.HeadingChildren(h)
					for _, headingChild := range headingChildren {
						if ast.NodeList == headingChild.Type {
							for subLi := headingChild.FirstChild; nil != subLi; subLi = subLi.Next {
								subLiBlock, _ := getBlock(subLi.ID, tree)
								var subFirst *sql.Block
								if 3 != subLi.ListData.Typ {
									subFirst = sql.GetBlock(subLi.FirstChild.ID)
								} else {
									subFirst = sql.GetBlock(subLi.FirstChild.Next.ID)
								}
								subPos := 0
								content := subFirst.Content
								if "" != keyword {
									subPos, content = search.MarkText(content, keyword, 12, Conf.Search.CaseSensitive)
								}
								if -1 < subPos {
									parentPos = 0
								}
								subLiBlock.Content = subFirst.Content
								subLiBlock.Depth = 2
								subRoot.Blocks = append(subRoot.Blocks, subLiBlock)
							}
						} else {
							subBlock, _ := getBlock(headingChild.ID, tree)
							subBlock.Depth = 2
							subRoot.Blocks = append(subRoot.Blocks, subBlock)
						}
					}
				}

				if -1 < parentPos {
					treeNode.Children = append(treeNode.Children, subRoot)
				}
			} else {
				pos := 0
				content := c.Content
				if "" != keyword {
					pos, content = search.MarkText(content, keyword, 12, Conf.Search.CaseSensitive)
				}
				if -1 < pos {
					treeNode.Blocks = append(treeNode.Blocks, c)
				}
			}
		}

		rootPos := -1
		var rootContent string
		if "" != keyword {
			rootPos, rootContent = search.MarkText(treeNode.Name, keyword, 12, Conf.Search.CaseSensitive)
			treeNode.Name = rootContent
		}
		if 0 < len(treeNode.Children) || 0 < len(treeNode.Blocks) || (-1 < rootPos && "" != keyword) {
			ret = append(ret, treeNode)
		}
	}

	sort.Slice(ret, func(i, j int) bool {
		return ret[i].ID > ret[j].ID
	})
	return
}

func getBlockIn(blocks []*Block, id string) *Block {
	if "" == id {
		return nil
	}
	for _, block := range blocks {
		if block.ID == id {
			return block
		}
	}
	return nil
}
