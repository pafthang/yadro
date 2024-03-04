package conf

type Bazaar struct {
	Trust         bool `json:"trust"`
	PetalDisabled bool `json:"petalDisabled"`
}

func NewBazaar() *Bazaar {
	return &Bazaar{
		Trust:         false,
		PetalDisabled: false,
	}
}
