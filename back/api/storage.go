package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func getRecentDocs(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	data, err := model.GetRecentDocs()
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
	ret.Data = data
}

func removeCriterion(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	name := arg["name"].(string)
	err := model.RemoveCriterion(name)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func setCriterion(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	param, err := gulu.JSON.MarshalJSON(arg["criterion"])
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	criterion := &model.Criterion{}
	if err = gulu.JSON.UnmarshalJSON(param, criterion); nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	err = model.SetCriterion(criterion)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func getCriteria(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	data := model.GetCriteria()
	ret.Data = data
}

func removeLocalStorageVals(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	var keys []string
	keysArg := arg["keys"].([]interface{})
	for _, key := range keysArg {
		keys = append(keys, key.(string))
	}

	err := model.RemoveLocalStorageVals(keys)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	app := arg["app"].(string)
	evt := util.NewCmdResult("removeLocalStorageVals", 0, util.PushModeBroadcastMainExcludeSelfApp)
	evt.AppId = app
	evt.Data = map[string]interface{}{"keys": keys}
	util.PushEvent(evt)
}

func setLocalStorageVal(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	key := arg["key"].(string)
	val := arg["val"].(interface{})
	err := model.SetLocalStorageVal(key, val)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	app := arg["app"].(string)
	evt := util.NewCmdResult("setLocalStorageVal", 0, util.PushModeBroadcastMainExcludeSelfApp)
	evt.AppId = app
	evt.Data = map[string]interface{}{"key": key, "val": val}
	util.PushEvent(evt)
}

func setLocalStorage(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	val := arg["val"].(interface{})
	err := model.SetLocalStorage(val)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	app := arg["app"].(string)
	evt := util.NewCmdResult("setLocalStorage", 0, util.PushModeBroadcastMainExcludeSelfApp)
	evt.AppId = app
	evt.Data = val
	util.PushEvent(evt)
}

func getLocalStorage(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	data := model.GetLocalStorage()
	ret.Data = data
}
