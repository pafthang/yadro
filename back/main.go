package main

import (
	"github.com/siyuan-note/siyuan/kernel/cache"
	"github.com/siyuan-note/siyuan/kernel/job"
	"github.com/siyuan-note/siyuan/kernel/model"
	"github.com/siyuan-note/siyuan/kernel/server"
	"github.com/siyuan-note/siyuan/kernel/sql"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func main() {
	util.Boot()

	model.InitConf()
	go server.Serve(false)
	model.InitAppearance()
	sql.InitDatabase(false)
	sql.InitHistoryDatabase(false)
	sql.InitAssetContentDatabase(false)
	sql.SetCaseSensitive(model.Conf.Search.CaseSensitive)
	sql.SetIndexAssetPath(model.Conf.Search.IndexAssetPath)

	model.BootSyncData()
	model.InitBoxes()
	model.LoadFlashcards()
	model.LoadAssetsTexts()

	util.SetBooted()
	util.PushClearAllMsg()

	job.StartCron()
	go model.AutoGenerateDocHistory()
	go cache.LoadAssets()
	go util.CheckFileSysStatus()

	model.WatchAssets()
	model.HandleSignal()
}
