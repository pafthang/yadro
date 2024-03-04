package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/conf"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func resetGraph(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	graph := conf.NewGlobalGraph()
	model.Conf.Graph.Global = graph
	model.Conf.Save()
	ret.Data = map[string]interface{}{
		"conf": graph,
	}
}

func resetLocalGraph(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	graph := conf.NewLocalGraph()
	model.Conf.Graph.Local = graph
	model.Conf.Save()
	ret.Data = map[string]interface{}{
		"conf": graph,
	}
}

func getGraph(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	reqId := arg["reqId"]
	ret.Data = map[string]interface{}{"reqId": reqId}

	query := arg["k"].(string)
	graphConf, err := gulu.JSON.MarshalJSON(arg["conf"])
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	global := conf.NewGlobalGraph()
	if err = gulu.JSON.UnmarshalJSON(graphConf, global); nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	model.Conf.Graph.Global = global
	model.Conf.Save()

	boxID, nodes, links := model.BuildGraph(query)
	ret.Data = map[string]interface{}{
		"nodes": nodes,
		"links": links,
		"conf":  global,
		"box":   boxID,
		"reqId": arg["reqId"],
	}
	util.RandomSleep(200, 500)
}

func getLocalGraph(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	reqId := arg["reqId"]
	ret.Data = map[string]interface{}{"reqId": reqId}
	if nil == arg["id"] {
		return
	}

	keyword := arg["k"].(string)
	id := arg["id"].(string)

	graphConf, err := gulu.JSON.MarshalJSON(arg["conf"])
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	local := conf.NewLocalGraph()
	if err = gulu.JSON.UnmarshalJSON(graphConf, local); nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	model.Conf.Graph.Local = local
	model.Conf.Save()

	boxID, nodes, links := model.BuildTreeGraph(id, keyword)
	ret.Data = map[string]interface{}{
		"id":    id,
		"box":   boxID,
		"nodes": nodes,
		"links": links,
		"conf":  local,
		"reqId": arg["reqId"],
	}
	util.RandomSleep(200, 500)
}
