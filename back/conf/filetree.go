package conf

import (
	"github.com/siyuan-note/siyuan/kernel/util"
)

type FileTree struct {
	AlwaysSelectOpenedFile  bool   `json:"alwaysSelectOpenedFile"`  // 是否自动选中当前打开的文件
	OpenFilesUseCurrentTab  bool   `json:"openFilesUseCurrentTab"`  // 在当前页签打开文件
	RefCreateSavePath       string `json:"refCreateSavePath"`       // 块引时新建文档存储路径
	DocCreateSavePath       string `json:"docCreateSavePath"`       // 新建文档存储路径
	MaxListCount            int    `json:"maxListCount"`            // 最大列出数量
	MaxOpenTabCount         int    `json:"maxOpenTabCount"`         // 最大打开页签数量
	AllowCreateDeeper       bool   `json:"allowCreateDeeper"`       // 允许创建超过 7 层深度的子文档
	RemoveDocWithoutConfirm bool   `json:"removeDocWithoutConfirm"` // 删除文档时是否不需要确认
	CloseTabsOnStart        bool   `json:"closeTabsOnStart"`        // 启动时关闭所有页签
	UseSingleLineSave       bool   `json:"useSingleLineSave"`       // 使用单行保存 .sy 文件

	Sort int `json:"sort"` // 排序方式
}

func NewFileTree() *FileTree {
	return &FileTree{
		AlwaysSelectOpenedFile: false,
		OpenFilesUseCurrentTab: false,
		Sort:                   util.SortModeCustom,
		MaxListCount:           512,
		MaxOpenTabCount:        8,
		AllowCreateDeeper:      false,
		CloseTabsOnStart:       false,
		UseSingleLineSave:      util.UseSingleLineSave,
	}
}
