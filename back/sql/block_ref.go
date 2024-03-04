package sql

import (
	"database/sql"

	"github.com/88250/lute/parse"
)

type Ref struct {
	ID               string
	DefBlockID       string
	DefBlockParentID string
	DefBlockRootID   string
	DefBlockPath     string
	BlockID          string
	RootID           string
	Box              string
	Path             string
	Content          string
	Markdown         string
	Type             string
}

func upsertRefs(tx *sql.Tx, tree *parse.Tree) (err error) {
	if err = deleteRefsByPath(tx, tree.Box, tree.Path); nil != err {
		return
	}
	if err = deleteFileAnnotationRefsByPath(tx, tree.Box, tree.Path); nil != err {
		return
	}
	err = insertRefs(tx, tree)
	return
}

func deleteRefs(tx *sql.Tx, tree *parse.Tree) (err error) {
	if err = deleteRefsByPath(tx, tree.Box, tree.Path); nil != err {
		return
	}
	if err = deleteFileAnnotationRefsByPath(tx, tree.Box, tree.Path); nil != err {
		return
	}
	return
}
