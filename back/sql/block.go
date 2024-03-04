package sql

import (
	"database/sql"

	"github.com/siyuan-note/siyuan/kernel/cache"
	"github.com/siyuan-note/siyuan/kernel/filesys"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

type Block struct {
	ID       string
	ParentID string
	RootID   string
	Hash     string
	Box      string
	Path     string
	HPath    string
	Name     string
	Alias    string
	Memo     string
	Tag      string
	Content  string
	FContent string
	Markdown string
	Length   int
	Type     string
	SubType  string
	IAL      string
	Sort     int
	Created  string
	Updated  string
}

func updateRootContent(tx *sql.Tx, content, updated, id string) (err error) {
	stmt := "UPDATE blocks SET content = ?, fcontent = ?, updated = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, content, content, updated, id); nil != err {
		return
	}
	stmt = "UPDATE blocks_fts SET content = ?, fcontent = ?, updated = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, content, content, updated, id); nil != err {
		return
	}
	if !caseSensitive {
		stmt = "UPDATE blocks_fts_case_insensitive SET content = ?, fcontent = ?, updated = ? WHERE id = ?"
		if err = execStmtTx(tx, stmt, content, content, updated, id); nil != err {
			return
		}
	}
	removeBlockCache(id)
	cache.RemoveBlockIAL(id)
	return
}

func updateBlockContent(tx *sql.Tx, block *Block) (err error) {
	stmt := "UPDATE blocks SET content = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, block.Content, block.ID); nil != err {
		tx.Rollback()
		return
	}
	stmt = "UPDATE blocks_fts SET content = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, block.Content, block.ID); nil != err {
		tx.Rollback()
		return
	}
	if !caseSensitive {
		stmt = "UPDATE blocks_fts_case_insensitive SET content = ? WHERE id = ?"
		if err = execStmtTx(tx, stmt, block.Content, block.ID); nil != err {
			tx.Rollback()
			return
		}
	}

	putBlockCache(block)
	return
}

func indexNode(tx *sql.Tx, id string) (err error) {
	bt := treenode.GetBlockTree(id)
	if nil == bt {
		return
	}

	luteEngine := util.NewLute()
	tree, _ := filesys.LoadTree(bt.BoxID, bt.Path, luteEngine)
	if nil == tree {
		return
	}

	node := treenode.GetNodeInTree(tree, id)
	if nil == node {
		return
	}

	content := treenode.NodeStaticContent(node, nil, true, indexAssetPath, true)
	stmt := "UPDATE blocks SET content = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, content, id); nil != err {
		tx.Rollback()
		return
	}
	stmt = "UPDATE blocks_fts SET content = ? WHERE id = ?"
	if err = execStmtTx(tx, stmt, content, id); nil != err {
		tx.Rollback()
		return
	}
	if !caseSensitive {
		stmt = "UPDATE blocks_fts_case_insensitive SET content = ? WHERE id = ?"
		if err = execStmtTx(tx, stmt, content, id); nil != err {
			tx.Rollback()
			return
		}
	}
	return
}
