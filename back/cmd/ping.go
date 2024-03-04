package cmd

type ping struct {
	*BaseCmd
}

func (cmd *ping) Exec() {
}

func (cmd *ping) Name() string {
	return "ping"
}

func (cmd *ping) IsRead() bool {
	return true
}
