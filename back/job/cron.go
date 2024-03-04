package job

import (
	"time"

	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/sql"
	"github.com/siyuan-note/siyuan/kernel/task"
	"github.com/siyuan-note/siyuan/kernel/treenode"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func StartCron() {
	go every(100*time.Millisecond, task.ExecTaskJob)
	go every(5*time.Second, task.StatusJob)
	go every(5*time.Second, treenode.SaveBlockTreeJob)
	go every(5*time.Second, model.SyncDataJob)
	go every(2*time.Hour, model.StatJob)
	go every(2*time.Hour, model.RefreshCheckJob)
	go every(3*time.Second, model.FlushUpdateRefTextRenameDocJob)
	go every(util.SQLFlushInterval, sql.FlushTxJob)
	go every(util.SQLFlushInterval, sql.FlushHistoryTxJob)
	go every(util.SQLFlushInterval, sql.FlushAssetContentTxJob)
	go every(10*time.Minute, model.FixIndexJob)
	go every(10*time.Minute, model.IndexEmbedBlockJob)
	go every(10*time.Minute, model.CacheVirtualBlockRefJob)
	go every(30*time.Second, model.OCRAssetsJob)
	go every(30*time.Second, model.FlushAssetsTextsJob)
	go every(30*time.Second, model.HookDesktopUIProcJob)
}

func every(interval time.Duration, f func()) {
	util.RandomSleep(50, 200)
	for {
		func() {
			defer logging.Recover()
			f()
		}()

		time.Sleep(interval)
	}
}
