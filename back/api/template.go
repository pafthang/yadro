package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func renderSprig(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	template := arg["template"].(string)
	content, err := model.RenderGoTemplate(template)
	if nil != err {
		ret.Code = -1
		ret.Msg = util.EscapeHTML(err.Error())
		return
	}
	ret.Data = content
}

func docSaveAsTemplate(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	id := arg["id"].(string)
	name := arg["name"].(string)
	overwrite := arg["overwrite"].(bool)
	code, err := model.DocSaveAsTemplate(id, name, overwrite)
	if nil != err {
		ret.Code = -1
		ret.Msg = util.EscapeHTML(err.Error())
		return
	}
	ret.Code = code
}

func renderTemplate(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	p := arg["path"].(string)
	id := arg["id"].(string)
	if util.InvalidIDPattern(id, ret) {
		return
	}

	preview := false
	if previewArg := arg["preview"]; nil != previewArg {
		preview = previewArg.(bool)
	}

	content, err := model.RenderTemplate(p, id, preview)
	if nil != err {
		ret.Code = -1
		ret.Msg = util.EscapeHTML(err.Error())
		return
	}

	ret.Data = map[string]interface{}{
		"path":    p,
		"content": content,
	}
}
