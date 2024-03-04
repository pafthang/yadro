package conf

import (
	"path/filepath"

	"github.com/siyuan-note/siyuan/kernel/util"
)

type Repo struct {
	Key []byte `json:"key"` // AES 密钥

	// 同步索引计时，单位毫秒，超过该时间则提示用户索引性能下降
	// If the data repo indexing time is greater than 12s, prompt user to purge the data repo https://github.com/siyuan-note/siyuan/issues/9613
	// Supports configuring data sync index time-consuming prompts https://github.com/siyuan-note/siyuan/issues/9698
	SyncIndexTiming int64 `json:"syncIndexTiming"`
}

func NewRepo() *Repo {
	return &Repo{
		SyncIndexTiming: 12 * 1000,
	}
}

func (*Repo) GetSaveDir() string {
	return filepath.Join(util.WorkspaceDir, "repo")
}
