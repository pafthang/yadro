package sql

import (
	"database/sql"
	"github.com/siyuan-note/filelock"
	"path/filepath"
	"strings"

	"github.com/88250/lute/ast"
	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

type Asset struct {
	ID      string
	BlockID string
	RootID  string
	Box     string
	DocPath string
	Path    string
	Name    string
	Title   string
	Hash    string
}

func docTagSpans(n *ast.Node) (ret []*Span) {
	if tagsVal := n.IALAttr("tags"); "" != tagsVal {
		tags := strings.Split(tagsVal, ",")
		for _, tag := range tags {
			markdown := "#" + tag + "#"
			span := &Span{
				ID:       ast.NewNodeID(),
				BlockID:  n.ID,
				RootID:   n.ID,
				Box:      n.Box,
				Path:     n.Path,
				Content:  tag,
				Markdown: markdown,
				Type:     "tag",
				IAL:      "",
			}
			ret = append(ret, span)
		}
	}
	return
}

func docTitleImgAsset(root *ast.Node, boxLocalPath, docDirLocalPath string) *Asset {
	if p := treenode.GetDocTitleImgPath(root); "" != p {
		if !util.IsAssetLinkDest([]byte(p)) {
			return nil
		}

		var hash string
		var err error
		if lp := assetLocalPath(p, boxLocalPath, docDirLocalPath); "" != lp {
			hash, err = util.GetEtag(lp)
			if nil != err {
				logging.LogErrorf("calc asset [%s] hash failed: %s", lp, err)
				return nil
			}
		}

		name, _ := util.LastID(p)
		asset := &Asset{
			ID:      ast.NewNodeID(),
			BlockID: root.ID,
			RootID:  root.ID,
			Box:     root.Box,
			DocPath: root.Path,
			Path:    p,
			Name:    name,
			Title:   "title-img",
			Hash:    hash,
		}
		return asset
	}
	return nil
}

func deleteAssetsByHashes(tx *sql.Tx, hashes []string) (err error) {
	sqlStmt := "DELETE FROM assets WHERE hash IN ('" + strings.Join(hashes, "','") + "') OR hash = ''"
	err = execStmtTx(tx, sqlStmt)
	return
}

func QueryAssetByHash(hash string) (ret *Asset) {
	sqlStmt := "SELECT * FROM assets WHERE hash = ?"
	row := queryRow(sqlStmt, hash)
	var asset Asset
	if err := row.Scan(&asset.ID, &asset.BlockID, &asset.RootID, &asset.Box, &asset.DocPath, &asset.Path, &asset.Name, &asset.Title, &asset.Hash); nil != err {
		if sql.ErrNoRows != err {
			logging.LogErrorf("query scan field failed: %s", err)
		}
		return
	}
	ret = &asset
	return
}

func scanAssetRows(rows *sql.Rows) (ret *Asset) {
	var asset Asset
	if err := rows.Scan(&asset.ID, &asset.BlockID, &asset.RootID, &asset.Box, &asset.DocPath, &asset.Path, &asset.Name, &asset.Title, &asset.Hash); nil != err {
		logging.LogErrorf("query scan field failed: %s", err)
		return
	}
	ret = &asset
	return
}

func assetLocalPath(linkDest, boxLocalPath, docDirLocalPath string) (ret string) {
	ret = filepath.Join(docDirLocalPath, linkDest)
	if filelock.IsExist(ret) {
		return
	}

	ret = filepath.Join(boxLocalPath, linkDest)
	if filelock.IsExist(ret) {
		return
	}

	ret = filepath.Join(util.DataDir, linkDest)
	if filelock.IsExist(ret) {
		return
	}
	return ""
}
