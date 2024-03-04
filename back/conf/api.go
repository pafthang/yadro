package conf

import "github.com/88250/gulu"

type API struct {
	Token string `json:"token"`
}

func NewAPI() *API {
	return &API{
		Token: gulu.Rand.String(16),
	}
}
