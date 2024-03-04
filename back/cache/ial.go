package cache

import (
	"strings"

	"github.com/88250/lute/editor"
	"github.com/dgraph-io/ristretto"
)

var docIALCache, _ = ristretto.NewCache(&ristretto.Config{
	NumCounters: 102400,
	MaxCost:     10240,
	BufferItems: 64,
})

func PutDocIAL(p string, ial map[string]string) {
	docIALCache.Set(p, ial, 1)
}

func GetDocIAL(p string) (ret map[string]string) {
	ial, _ := docIALCache.Get(p)
	if nil == ial {
		return
	}

	ret = map[string]string{}
	for k, v := range ial.(map[string]string) {
		ret[k] = strings.ReplaceAll(v, editor.IALValEscNewLine, "\n")
	}
	return
}

func RemoveDocIAL(p string) {
	docIALCache.Del(p)
}

func ClearDocsIAL() {
	docIALCache.Clear()
}

var blockIALCache, _ = ristretto.NewCache(&ristretto.Config{
	NumCounters: 102400,
	MaxCost:     10240,
	BufferItems: 64,
})

func PutBlockIAL(id string, ial map[string]string) {
	blockIALCache.Set(id, ial, 1)
}

func GetBlockIAL(id string) (ret map[string]string) {
	ial, _ := blockIALCache.Get(id)
	if nil == ial {
		return
	}
	return ial.(map[string]string)
}

func RemoveBlockIAL(id string) {
	blockIALCache.Del(id)
}
