package sql

import (
	"database/sql"
	"errors"
	"fmt"
	"runtime/debug"
	"sync"
	"time"

	"github.com/siyuan-note/eventbus"
	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/task"
	"github.com/siyuan-note/siyuan/kernel/util"
)

var (
	historyOperationQueue []*historyDBQueueOperation
	historyDBQueueLock    = sync.Mutex{}

	historyTxLock = sync.Mutex{}
)

type historyDBQueueOperation struct {
	inQueueTime time.Time
	action      string // index/deleteOutdated

	histories []*History // index
	before    string     // deleteOutdated
}

func FlushHistoryTxJob() {
	task.AppendTask(task.HistoryDatabaseIndexCommit, FlushHistoryQueue)
}

func FlushHistoryQueue() {
	ops := getHistoryOperations()
	if 1 > len(ops) {
		return
	}

	historyTxLock.Lock()
	defer historyTxLock.Unlock()
	start := time.Now()

	groupOpsTotal := map[string]int{}
	for _, op := range ops {
		groupOpsTotal[op.action]++
	}

	context := map[string]interface{}{eventbus.CtxPushMsg: eventbus.CtxPushMsgToStatusBar}
	groupOpsCurrent := map[string]int{}
	for i, op := range ops {
		if util.IsExiting.Load() {
			return
		}

		tx, err := beginHistoryTx()
		if nil != err {
			return
		}

		groupOpsCurrent[op.action]++
		context["current"] = groupOpsCurrent[op.action]
		context["total"] = groupOpsTotal[op.action]

		if err = execHistoryOp(op, tx, context); nil != err {
			tx.Rollback()
			logging.LogErrorf("queue operation failed: %s", err)
			eventbus.Publish(util.EvtSQLHistoryRebuild)
			return
		}

		if err = commitHistoryTx(tx); nil != err {
			logging.LogErrorf("commit tx failed: %s", err)
			return
		}

		if 16 < i && 0 == i%128 {
			debug.FreeOSMemory()
		}
	}

	if 128 < len(ops) {
		debug.FreeOSMemory()
	}

	elapsed := time.Now().Sub(start).Milliseconds()
	if 7000 < elapsed {
		logging.LogInfof("database history op tx [%dms]", elapsed)
	}
}

func execHistoryOp(op *historyDBQueueOperation, tx *sql.Tx, context map[string]interface{}) (err error) {
	switch op.action {
	case "index":
		err = insertHistories(tx, op.histories, context)
	case "deleteOutdated":
		err = deleteOutdatedHistories(tx, op.before, context)
	default:
		msg := fmt.Sprintf("unknown history operation [%s]", op.action)
		logging.LogErrorf(msg)
		err = errors.New(msg)
	}
	return
}

func DeleteOutdatedHistories(before string) {
	historyDBQueueLock.Lock()
	defer historyDBQueueLock.Unlock()

	newOp := &historyDBQueueOperation{inQueueTime: time.Now(), action: "deleteOutdated", before: before}
	historyOperationQueue = append(historyOperationQueue, newOp)
}

func IndexHistoriesQueue(histories []*History) {
	historyDBQueueLock.Lock()
	defer historyDBQueueLock.Unlock()

	newOp := &historyDBQueueOperation{inQueueTime: time.Now(), action: "index", histories: histories}
	historyOperationQueue = append(historyOperationQueue, newOp)
}

func getHistoryOperations() (ops []*historyDBQueueOperation) {
	historyDBQueueLock.Lock()
	defer historyDBQueueLock.Unlock()

	ops = historyOperationQueue
	historyOperationQueue = nil
	return
}
