package conf

type Snpt struct {
	EnabledCSS bool `json:"enabledCSS"`
	EnabledJS  bool `json:"enabledJS"`
}

func NewSnpt() *Snpt {
	return &Snpt{
		EnabledCSS: true,
		EnabledJS:  true,
	}
}

type Snippet struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"` // js/css
	Enabled bool   `json:"enabled"`
	Content string `json:"content"`
}
