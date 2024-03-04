package api

import (
	"net/http"
	"strings"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func pushMsg(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	msg := strings.TrimSpace(arg["msg"].(string))
	if "" == msg {
		ret.Code = -1
		ret.Msg = "msg can't be empty"
		return
	}

	timeout := 7000
	if nil != arg["timeout"] {
		timeout = int(arg["timeout"].(float64))
	}
	msgId := util.PushMsg(msg, timeout)

	ret.Data = map[string]interface{}{
		"id": msgId,
	}
}

func pushErrMsg(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	msg := arg["msg"].(string)
	timeout := 7000
	if nil != arg["timeout"] {
		timeout = int(arg["timeout"].(float64))
	}
	msgId := util.PushErrMsg(msg, timeout)

	ret.Data = map[string]interface{}{
		"id": msgId,
	}
}
