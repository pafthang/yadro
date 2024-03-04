package util

import (
	"github.com/dustin/go-humanize"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/siyuan-note/logging"
)

func NeedWarnDiskUsage(dataSize int64) bool {
	usage, err := disk.Usage(WorkspaceDir)
	if nil != err {
		logging.LogErrorf("get disk usage failed: %s", err)
		return false
	}
	logging.LogInfof("disk usage [total=%s, used=%s, free=%s]", humanize.Bytes(usage.Total), humanize.Bytes(usage.Used), humanize.Bytes(usage.Free))
	return usage.Free < uint64(dataSize*2)
}
