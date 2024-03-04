package conf

type Account struct {
	DisplayTitle bool `json:"displayTitle"`
	DisplayVIP   bool `json:"displayVIP"`
}

func NewAccount() *Account {
	return &Account{
		DisplayTitle: true,
		DisplayVIP:   true,
	}
}
