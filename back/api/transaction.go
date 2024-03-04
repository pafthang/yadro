package api

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func performTransactions(c *gin.Context) {
	start := time.Now()
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	trans := arg["transactions"]
	data, err := gulu.JSON.MarshalJSON(trans)
	if nil != err {
		ret.Code = -1
		ret.Msg = "parses request failed"
		return
	}

	if !util.IsBooted() {
		ret.Code = -1
		ret.Msg = fmt.Sprintf(model.Conf.Language(74), int(util.GetBootProgress()))
		ret.Data = map[string]interface{}{"closeTimeout": 5000}
		return
	}

	timestamp := int64(arg["reqId"].(float64))
	var transactions []*model.Transaction
	if err = gulu.JSON.UnmarshalJSON(data, &transactions); nil != err {
		ret.Code = -1
		ret.Msg = "parses request failed"
		return
	}
	for _, transaction := range transactions {
		transaction.Timestamp = timestamp
	}

	model.PerformTransactions(&transactions)

	ret.Data = transactions

	app := arg["app"].(string)
	session := arg["session"].(string)
	if model.IsFoldHeading(&transactions) || model.IsUnfoldHeading(&transactions) {
		model.WaitForWritingFiles()
	}
	pushTransactions(app, session, transactions)

	elapsed := time.Now().Sub(start).Milliseconds()
	c.Header("Server-Timing", fmt.Sprintf("total;dur=%d", elapsed))
}

func pushTransactions(app, session string, transactions []*model.Transaction) {
	pushMode := util.PushModeBroadcastExcludeSelf
	if 0 < len(transactions) && 0 < len(transactions[0].DoOperations) {
		model.WaitForWritingFiles() // 等待文件写入完成，后续渲染才能读取到最新的数据

		action := transactions[0].DoOperations[0].Action
		isAttrViewTx := strings.Contains(strings.ToLower(action), "attrview")
		if isAttrViewTx && "setAttrViewName" != action {
			pushMode = util.PushModeBroadcast
		}
	}

	evt := util.NewCmdResult("transactions", 0, pushMode)
	evt.AppId = app
	evt.SessionId = session
	evt.Data = transactions
	for _, tx := range transactions {
		tx.WaitForCommit()
	}
	util.PushEvent(evt)
}
