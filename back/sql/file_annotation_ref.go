package sql

import (
	"github.com/siyuan-note/logging"
)

type FileAnnotationRef struct {
	ID           string
	FilePath     string
	AnnotationID string
	BlockID      string
	RootID       string
	Box          string
	Path         string
	Content      string
	Type         string
}

func QueryRefIDsByAnnotationID(annotationID string) (refIDs, refTexts []string) {
	refIDs = []string{}
	rows, err := query("SELECT block_id, content FROM file_annotation_refs WHERE annotation_id = ?", annotationID)
	if nil != err {
		logging.LogErrorf("sql query failed: %s", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var id, content string
		if err = rows.Scan(&id, &content); nil != err {
			logging.LogErrorf("query scan field failed: %s", err)
			return
		}
		refIDs = append(refIDs, id)
		refTexts = append(refTexts, content)
	}
	return
}
