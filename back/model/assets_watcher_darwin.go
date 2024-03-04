//go:build darwin

package model

import (
	"path/filepath"
	"time"

	"github.com/radovskyb/watcher"
	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/cache"
	"github.com/siyuan-note/siyuan/kernel/util"
)

var assetsWatcher *watcher.Watcher

func WatchAssets() {
	go func() {
		watchAssets()
	}()
}

func watchAssets() {
	if nil != assetsWatcher {
		assetsWatcher.Close()
	}
	assetsWatcher = watcher.New()

	assetsDir := filepath.Join(util.DataDir, "assets")

	go func() {
		for {
			select {
			case event, ok := <-assetsWatcher.Event:
				if !ok {
					return
				}

				//logging.LogInfof("assets changed: %s", event)
				if watcher.Write == event.Op {
					IncSync()
				}

				// 重新缓存资源文件，以便使用 /资源 搜索
				go cache.LoadAssets()

				if watcher.Remove == event.Op {
					RemoveIndexAssetContent(event.Path)
				} else {
					IndexAssetContent(event.Path)
				}
			case err, ok := <-assetsWatcher.Error:
				if !ok {
					return
				}
				logging.LogErrorf("watch assets failed: %s", err)
			case <-assetsWatcher.Closed:
				return
			}
		}
	}()

	if err := assetsWatcher.Add(assetsDir); nil != err {
		logging.LogErrorf("add assets watcher for folder [%s] failed: %s", assetsDir, err)
		return
	}

	//logging.LogInfof("added file watcher [%s]", assetsDir)
	if err := assetsWatcher.Start(10 * time.Second); nil != err {
		logging.LogErrorf("start assets watcher for folder [%s] failed: %s", assetsDir, err)
		return
	}
}

func CloseWatchAssets() {
	if nil != assetsWatcher {
		assetsWatcher.Close()
	}
}
