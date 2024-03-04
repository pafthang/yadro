package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/sql"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func flushTransaction(c *gin.Context) {
	// Add internal kernel API `/api/sqlite/flushTransaction` https://github.com/siyuan-note/siyuan/issues/10005
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	sql.FlushQueue()
}

func SQL(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	stmt := arg["stmt"].(string)
	result, err := sql.Query(stmt, model.Conf.Search.Limit)
	if nil != err {
		ret.Code = 1
		ret.Msg = err.Error()
		return
	}

	ret.Data = result
}
