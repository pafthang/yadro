package util

import (
	"sync"
	"time"

	"github.com/siyuan-note/httpclient"
	"github.com/siyuan-note/logging"
)

var cachedRhyResult = map[string]interface{}{}
var rhyResultCacheTime int64
var rhyResultLock = sync.Mutex{}

func GetRhyResult(force bool) (map[string]interface{}, error) {
	rhyResultLock.Lock()
	defer rhyResultLock.Unlock()

	cacheDuration := int64(3600 * 6)
	if ContainerDocker == Container {
		cacheDuration = int64(3600 * 24)
	}

	now := time.Now().Unix()
	if cacheDuration >= now-rhyResultCacheTime && !force && 0 < len(cachedRhyResult) {
		return cachedRhyResult, nil
	}

	request := httpclient.NewCloudRequest30s()
	_, err := request.SetSuccessResult(&cachedRhyResult).Get(GetCloudServer() + "/apis/siyuan/version?ver=" + Ver)
	if nil != err {
		logging.LogErrorf("get version info failed: %s", err)
		return nil, err
	}
	rhyResultCacheTime = now
	return cachedRhyResult, nil
}
