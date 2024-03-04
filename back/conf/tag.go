package conf

import (
	"github.com/siyuan-note/siyuan/kernel/util"
)

type Tag struct {
	Sort int `json:"sort"` // 排序方式
}

func NewTag() *Tag {
	return &Tag{
		Sort: util.SortModeAlphanumASC,
	}
}
