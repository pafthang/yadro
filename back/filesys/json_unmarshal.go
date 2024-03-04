package filesys

import (
	"github.com/goccy/go-json"
)

func unmarshalJSON(data []byte, v interface{}) error {
	return json.Unmarshal(data, v)
}
