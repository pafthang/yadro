package util

import (
	"os"
	"sort"
	"strings"

	"github.com/88250/gulu"
	"github.com/ConradIrwin/font/sfnt"
	"github.com/flopp/go-findfont"
	"github.com/siyuan-note/logging"
	ttc "golang.org/x/image/font/sfnt"
	textUnicode "golang.org/x/text/encoding/unicode"
	"golang.org/x/text/transform"
)

func GetSysFonts(currentLanguage string) (ret []string) {
	fonts := loadFonts(currentLanguage)
	ret = []string{}
	for _, font := range fonts {
		ret = append(ret, font.Family)
	}
	ret = gulu.Str.RemoveDuplicatedElem(ret)
	ret = removeUnusedFonts(ret)
	sort.Strings(ret)
	return
}

func removeUnusedFonts(fonts []string) (ret []string) {
	ret = []string{}
	for _, font := range fonts {
		if strings.HasPrefix(font, "Noto Sans") {
			continue
		}
		ret = append(ret, font)
	}
	return
}

type Font struct {
	Path   string
	Family string
}

func loadFonts(currentLanguage string) (ret []*Font) {
	ret = []*Font{}
	for _, fontPath := range findfont.List() {
		if strings.HasSuffix(strings.ToLower(fontPath), ".ttc") {
			data, err := os.ReadFile(fontPath)
			if nil != err {
				logging.LogErrorf("read font file [%s] failed: %s", fontPath, err)
				continue
			}
			collection, err := ttc.ParseCollection(data)
			if nil != err {
				//LogErrorf("parse font collection [%s] failed: %s", fontPath, err)
				continue
			}

			for i := 0; i < collection.NumFonts(); i++ {
				font, err := collection.Font(i)
				if nil != err {
					//LogErrorf("get font [%s] failed: %s", fontPath, err)
					continue
				}
				if family := parseFontFamily(font); "" != family {
					ret = append(ret, &Font{fontPath, family})
					//LogInfof("[%s] [%s]", fontPath, family)
				}
			}
		} else if strings.HasSuffix(strings.ToLower(fontPath), ".otf") || strings.HasSuffix(strings.ToLower(fontPath), ".ttf") {
			fontFile, err := os.Open(fontPath)
			if nil != err {
				//LogErrorf("open font file [%s] failed: %s", fontPath, err)
				continue
			}
			font, err := sfnt.Parse(fontFile)
			if nil != err {
				//LogErrorf("parse font [%s] failed: %s", fontPath, err)
				continue
			}

			t, err := font.NameTable()
			if nil != err {
				//LogErrorf("parse font name table [%s] failed: %s", fontPath, err)
				return
			}
			fontFile.Close()
			var family, familyChinese string
			for _, e := range t.List() {
				if sfnt.NameFontFamily != e.NameID && sfnt.NamePreferredFamily != e.NameID {
					continue
				}

				if sfnt.PlatformLanguageID(1033) == e.LanguageID {
					v, _, err := transform.Bytes(textUnicode.UTF16(textUnicode.BigEndian, textUnicode.IgnoreBOM).NewDecoder(), e.Value)
					if nil != err {
						//LogErrorf("decode font family [%s] failed: %s", fontPath, err)
						continue
					}
					val := string(v)
					if sfnt.NameFontFamily == e.NameID && "" != val {
						family = val
					}
					if sfnt.NamePreferredFamily == e.NameID && "" != val {
						family = val
					}
				} else if sfnt.PlatformLanguageID(2052) == e.LanguageID {
					if "zh_CN" != currentLanguage {
						continue
					}

					v, _, err := transform.Bytes(textUnicode.UTF16(textUnicode.BigEndian, textUnicode.IgnoreBOM).NewDecoder(), e.Value)
					if nil != err {
						//LogErrorf("decode font family [%s] failed: %s", fontPath, err)
						continue
					}
					val := string(v)
					if sfnt.NameFontFamily == e.NameID && "" != val {
						familyChinese = val
					}
					if sfnt.NamePreferredFamily == e.NameID && "" != val {
						familyChinese = val
					}
				}
			}
			if "" != family && !strings.HasPrefix(family, ".") {
				ret = append(ret, &Font{fontPath, family})
				//LogInfof("[%s] [%s]", fontPath, family)
			}
			if "" != familyChinese && !strings.HasPrefix(familyChinese, ".") {
				ret = append(ret, &Font{fontPath, familyChinese})
				//LogInfof("[%s] [%s]", fontPath, family)
			}
		}
	}
	return
}

func parseFontFamily(font *ttc.Font) string {
	family, _ := font.Name(nil, ttc.NameIDTypographicFamily)
	if "" == family {
		family, _ = font.Name(nil, ttc.NameIDFamily)
	}
	if strings.HasPrefix(family, ".") {
		return ""
	}
	return family
}
