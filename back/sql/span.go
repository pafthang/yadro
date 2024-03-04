package sql

import (
	"database/sql"
	"strconv"
	"strings"

	"github.com/88250/vitess-sqlparser/sqlparser"
	"github.com/siyuan-note/logging"
)

type Span struct {
	ID       string
	BlockID  string
	RootID   string
	Box      string
	Path     string
	Content  string
	Markdown string
	Type     string
	IAL      string
}

func SelectSpansRawStmt(stmt string, limit int) (ret []*Span) {
	parsedStmt, err := sqlparser.Parse(stmt)
	if nil != err {
		//logging.LogErrorf("select [%s] failed: %s", stmt, err)
		return
	}
	switch parsedStmt.(type) {
	case *sqlparser.Select:
		slct := parsedStmt.(*sqlparser.Select)
		if nil == slct.Limit {
			slct.Limit = &sqlparser.Limit{
				Rowcount: &sqlparser.SQLVal{
					Type: sqlparser.IntVal,
					Val:  []byte(strconv.Itoa(limit)),
				},
			}
		}

		stmt = sqlparser.String(slct)
	default:
		return
	}

	stmt = strings.ReplaceAll(stmt, "\\'", "''")
	stmt = strings.ReplaceAll(stmt, "\\\"", "\"")
	stmt = strings.ReplaceAll(stmt, "\\\\*", "\\*")
	stmt = strings.ReplaceAll(stmt, "from dual", "")
	rows, err := query(stmt)
	if nil != err {
		if strings.Contains(err.Error(), "syntax error") {
			return
		}
		logging.LogWarnf("sql query [%s] failed: %s", stmt, err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		span := scanSpanRows(rows)
		ret = append(ret, span)
	}
	return
}

func QueryTagSpansByLabel(label string) (ret []*Span) {
	stmt := "SELECT * FROM spans WHERE type LIKE '%tag%' AND content LIKE '%" + label + "%' GROUP BY block_id"
	rows, err := query(stmt)
	if nil != err {
		logging.LogErrorf("sql query failed: %s", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		span := scanSpanRows(rows)
		ret = append(ret, span)
	}
	return
}

func QueryTagSpansByKeyword(keyword string, limit int) (ret []*Span) {
	stmt := "SELECT * FROM spans WHERE type LIKE '%tag%' AND content LIKE '%" + keyword + "%' GROUP BY markdown"
	stmt += " LIMIT " + strconv.Itoa(limit)
	rows, err := query(stmt)
	if nil != err {
		logging.LogErrorf("sql query failed: %s", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		span := scanSpanRows(rows)
		ret = append(ret, span)
	}
	return
}

func QueryTagSpans(p string) (ret []*Span) {
	stmt := "SELECT * FROM spans WHERE type LIKE '%tag%'"
	if "" != p {
		stmt += " AND path = '" + p + "'"
	}
	rows, err := query(stmt)
	if nil != err {
		logging.LogErrorf("sql query failed: %s", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		span := scanSpanRows(rows)
		ret = append(ret, span)
	}
	return
}

func scanSpanRows(rows *sql.Rows) (ret *Span) {
	var span Span
	if err := rows.Scan(&span.ID, &span.BlockID, &span.RootID, &span.Box, &span.Path, &span.Content, &span.Markdown, &span.Type, &span.IAL); nil != err {
		logging.LogErrorf("query scan field failed: %s", err)
		return
	}
	ret = &span
	return
}
