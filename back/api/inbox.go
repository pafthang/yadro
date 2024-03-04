package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func removeShorthands(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	idsArg := arg["ids"].([]interface{})
	var ids []string
	for _, id := range idsArg {
		ids = append(ids, id.(string))
	}

	err := model.RemoveCloudShorthands(ids)
	if nil != err {
		ret.Code = 1
		ret.Msg = err.Error()
		return
	}
}

func getShorthand(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	id := arg["id"].(string)
	data, err := model.GetCloudShorthand(id)
	if nil != err {
		ret.Code = 1
		ret.Msg = err.Error()
		return
	}
	ret.Data = data
}

func getShorthands(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	page := int(arg["page"].(float64))
	data, err := model.GetCloudShorthands(page)
	if nil != err {
		ret.Code = 1
		ret.Msg = err.Error()
		return
	}
	ret.Data = data
}
