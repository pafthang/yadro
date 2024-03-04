package util

import (
	"github.com/shirou/gopsutil/v3/host"
	"github.com/siyuan-note/logging"
)

func GetOSPlatform() (plat string) {
	plat, _, _, err := host.PlatformInformation()
	if nil != err {
		logging.LogWarnf("get os platform failed: %s", err)
		return "Unknown"
	}
	return
}
