package api

import (
	"net/http"
	"path/filepath"

	"github.com/88250/gulu"
	"github.com/gin-gonic/gin"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func zip(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	entryPath := arg["path"].(string)
	entryAbsPath, err := util.GetAbsPathInWorkspace(entryPath)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	zipFilePath := arg["zipPath"].(string)
	zipAbsFilePath, err := util.GetAbsPathInWorkspace(zipFilePath)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	zipFile, err := gulu.Zip.Create(zipAbsFilePath)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	base := filepath.Base(entryAbsPath)
	if gulu.File.IsDir(entryAbsPath) {
		err = zipFile.AddDirectory(base, entryAbsPath)
	} else {
		err = zipFile.AddEntry(base, entryAbsPath)
	}
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	if err = zipFile.Close(); nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}

func unzip(c *gin.Context) {
	ret := gulu.Ret.NewResult()
	defer c.JSON(http.StatusOK, ret)

	arg, ok := util.JsonArg(c, ret)
	if !ok {
		return
	}

	zipFilePath := arg["zipPath"].(string)
	zipAbsFilePath, err := util.GetAbsPathInWorkspace(zipFilePath)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	entryPath := arg["path"].(string)
	entryAbsPath, err := util.GetAbsPathInWorkspace(entryPath)
	if nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}

	if err := gulu.Zip.Unzip(zipAbsFilePath, entryAbsPath); nil != err {
		ret.Code = -1
		ret.Msg = err.Error()
		return
	}
}
