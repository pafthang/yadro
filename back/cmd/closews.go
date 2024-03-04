package cmd

import (
	"github.com/siyuan-note/siyuan/kernel/util"
)

type closews struct {
	*BaseCmd
}

func (cmd *closews) Exec() {
	id, _ := cmd.session.Get("id")
	util.ClosePushChan(id.(string))
	cmd.Push()
}

func (cmd *closews) Name() string {
	return "closews"
}

func (cmd *closews) IsRead() bool {
	return true
}
