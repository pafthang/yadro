package api

import (
	"github.com/88250/clipboard"
	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
)

func readFilePaths(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(200, ret)

	var paths []string
	if !gulu.OS.IsLinux() { // Linux 端不再支持 `粘贴为纯文本` 时处理文件绝对路径 https://github.com/siyuan-note/siyuan/issues/5825
		paths, _ = clipboard.ReadFilePaths()
	}
	if 1 > len(paths) {
		paths = []string{}
	}
	ret.Data = paths
}
