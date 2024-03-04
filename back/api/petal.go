package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func loadPetals(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	frontend := arg["frontend"].(string)

	petals := model.LoadPetals(frontend)
	ret.Data = petals
}

func setPetalEnabled(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	packageName := arg["packageName"].(string)
	enabled := arg["enabled"].(bool)
	frontend := arg["frontend"].(string)
	data, err := model.SetPetalEnabled(packageName, enabled, frontend)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	ret.Data = data
}
