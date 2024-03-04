package api

import (
	"net/http"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func startFreeTrial(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	err := model.StartFreeTrial()
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func useActivationcode(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	code := arg["data"].(string)
	err := model.UseActivationcode(code)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func checkActivationcode(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	code := arg["data"].(string)
	ret.Code, ret.Msg = model.CheckActivationcode(code)
}

func deactivateUser(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	err := model.DeactivateUser()
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func login(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	arg, ok := util.JsonArg(c, ret)
	if !ok {
		c.JSON(http.StatusOK, ret)
		return
	}

	name := arg["userName"].(string)
	password := arg["userPassword"].(string)
	captcha := arg["captcha"].(string)
	cloudRegion := int(arg["cloudRegion"].(float64))
	ret = model.Login(name, password, captcha, cloudRegion)
	c.JSON(http.StatusOK, ret)
}
