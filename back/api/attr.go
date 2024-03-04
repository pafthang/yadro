package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func getBookmarkLabels(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	ret.Data = model.BookmarkLabels()
}

func getBlockAttrs(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	id := arg["id"].(string)
	if util.InvalidIDPattern(id, ret) {
		return
	}

	ret.Data = model.GetBlockAttrs(id)
}

func setBlockAttrs(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	id := arg["id"].(string)
	if util.InvalidIDPattern(id, ret) {
		return
	}

	attrs := arg["attrs"].(map[string]interface{})
	if 1 == len(attrs) && "" != attrs["scroll"] {
		// 不记录用户指南滚动位置
		if b := treenode.GetBlockTree(id); nil != b && (model.IsUserGuide(b.BoxID)) {
			attrs["scroll"] = ""
		}
	}

	nameValues := map[string]string{}
	for name, value := range attrs {
		if nil == value { // API `setBlockAttrs` 中如果存在属性值设置为 `null` 时移除该属性 https://github.com/siyuan-note/siyuan/issues/5577
			nameValues[name] = ""
		} else {
			nameValues[name] = value.(string)
		}
	}
	err := model.SetBlockAttrs(id, nameValues)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func batchSetBlockAttrs(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	blockAttrsArg := arg["blockAttrs"].([]interface{})
	var blockAttrs []map[string]interface{}
	for _, blockAttrArg := range blockAttrsArg {
		blockAttr := blockAttrArg.(map[string]interface{})
		id := blockAttr["id"].(string)
		if util.InvalidIDPattern(id, ret) {
			return
		}

		attrs := blockAttr["attrs"].(map[string]interface{})
		nameValues := map[string]string{}
		for name, value := range attrs {
			if nil == value {
				nameValues[name] = ""
			} else {
				nameValues[name] = value.(string)
			}
		}

		blockAttrs = append(blockAttrs, map[string]interface{}{
			"id":    id,
			"attrs": nameValues,
		})
	}

	err := model.BatchSetBlockAttrs(blockAttrs)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func resetBlockAttrs(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	id := arg["id"].(string)
	attrs := arg["attrs"].(map[string]interface{})
	nameValues := map[string]string{}
	for name, value := range attrs {
		nameValues[name] = value.(string)
	}
	err := model.ResetBlockAttrs(id, nameValues)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}
