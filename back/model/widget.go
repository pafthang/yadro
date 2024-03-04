package model

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/siyuan-note/logging"
	"github.com/siyuan-note/siyuan/kernel/search"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func SearchWidget(keyword string) (ret []*Block) {
	ret = []*Block{}
	widgets := filepath.Join(util.DataDir, "widgets")
	entries, err := os.ReadDir(widgets)
	if nil != err {
		logging.LogErrorf("read dir [%s] failed: %s", widgets, err)
		return
	}

	k := strings.ToLower(keyword)
	for _, entry := range entries {
		if !util.IsDirRegularOrSymlink(entry) {
			continue
		}

		isWidgetDir := false
		subEntries, readErr := os.ReadDir(filepath.Join(widgets, entry.Name()))
		if nil != readErr {
			logging.LogWarnf("read dir [%s] failed: %s", filepath.Join(widgets, entry.Name()), readErr)
			continue
		}
		for _, subEntry := range subEntries {
			if !subEntry.IsDir() && "widget.json" == subEntry.Name() {
				isWidgetDir = true
				break
			}
		}
		if !isWidgetDir {
			continue
		}

		name := strings.ToLower(entry.Name())
		if strings.HasPrefix(name, ".") {
			continue
		}

		if strings.Contains(name, k) {
			name = entry.Name()
			if "" != keyword {
				_, name = search.MarkText(entry.Name(), keyword, 32, Conf.Search.CaseSensitive)
			}
			b := &Block{Content: name}
			ret = append(ret, b)
		}
	}
	return
}
