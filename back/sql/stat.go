package sql

import (
	"database/sql"
	"strings"

	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/util"
)

type Stat struct {
	Key string `json:"key"`
	Val string `json:"value"`
}

func getDatabaseVer() (ret string) {
	key := "siyuan_database_ver"
	stmt := "SELECT value FROM stat WHERE `key` = ?"
	row := db.QueryRow(stmt, key)
	if err := row.Scan(&ret); nil != err {
		if !strings.Contains(err.Error(), "no such table") {
			logging.LogErrorf("query database version failed: %s", err)
		}
	}
	return
}

func setDatabaseVer() {
	key := "siyuan_database_ver"
	tx, err := beginTx()
	if nil != err {
		return
	}
	if err = putStat(tx, key, util.DatabaseVer); nil != err {
		return
	}
	commitTx(tx)
}

func putStat(tx *sql.Tx, key, value string) (err error) {
	stmt := "DELETE FROM stat WHERE `key` = '" + key + "'"
	if err = execStmtTx(tx, stmt); nil != err {
		return
	}

	stmt = "INSERT INTO stat VALUES ('" + key + "', '" + value + "')"
	err = execStmtTx(tx, stmt)
	return
}

func getStat(key string) (ret string) {
	stmt := "SELECT value FROM stat WHERE `key` = '" + key + "'"
	row := queryRow(stmt)
	row.Scan(&ret)
	return
}
