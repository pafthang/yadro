package search

import (
	"fmt"
	"github.com/88250/gulu"
	"regexp"
	"strings"
	"unicode/utf8"

	"github.com/88250/lute/lex"
	"github.com/siyuan-note/siyuan/kernel/util"
)

func MarkText(text string, keyword string, beforeLen int, caseSensitive bool) (pos int, marked string) {
	if "" == keyword {
		return -1, util.EscapeHTML(text)
	}
	text = util.EscapeHTML(text)
	keywords := SplitKeyword(keyword)
	marked = EncloseHighlighting(text, keywords, "<mark>", "</mark>", caseSensitive, false)

	pos = strings.Index(marked, "<mark>")
	if 0 > pos {
		return
	}

	var before []rune
	var count int
	for i := pos; 0 < i; { // 关键字前面太长的话缩短一些
		r, size := utf8.DecodeLastRuneInString(marked[:i])
		i -= size
		before = append([]rune{r}, before...)
		count++
		if beforeLen < count {
			before = append([]rune("..."), before...)
			break
		}
	}
	marked = string(before) + marked[pos:]
	return
}

const (
	TermSep         = "__term@sep__"
	SearchMarkLeft  = "__@mark__"
	SearchMarkRight = "__mark@__"
)

func SplitKeyword(keyword string) (keywords []string) {
	keyword = strings.TrimSpace(keyword)
	if "" == keyword {
		return
	}
	words := strings.Split(keyword, TermSep)
	if 1 < len(words) {
		for _, word := range words {
			if "" == word {
				continue
			}
			keywords = append(keywords, word)
		}
	} else {
		keywords = append(keywords, keyword)
	}
	return
}

func EncloseHighlighting(text string, keywords []string, openMark, closeMark string, caseSensitive, splitWords bool) (ret string) {
	ic := "(?i)"
	if caseSensitive {
		ic = "(?)"
	}
	re := ic + "("
	for i, k := range keywords {
		if "" == k {
			continue
		}

		wordBoundary := false
		if splitWords {
			wordBoundary = lex.IsASCIILetterNums(gulu.Str.ToBytes(k)) // Improve virtual reference split words https://github.com/siyuan-note/siyuan/issues/7833
		}
		k = regexp.QuoteMeta(k)
		re += "("
		if wordBoundary {
			re += "\\b"
		}
		re += k
		if wordBoundary {
			re += "\\b"
		}
		re += ")"
		if i < len(keywords)-1 {
			re += "|"
		}
	}
	re += ")"
	ret = text

	if reg, err := regexp.Compile(re); nil == err {
		ret = reg.ReplaceAllStringFunc(text, func(s string) string { return openMark + s + closeMark })
	}

	// 搜索结果预览包含转义符问题 Search results preview contains escape character issue https://github.com/siyuan-note/siyuan/issues/9790
	ret = strings.ReplaceAll(ret, "\\<span", "\\\\<span")
	return
}

const (
	MarkDataType            = "search-mark"
	VirtualBlockRefDataType = "virtual-block-ref"
)

func GetMarkSpanStart(dataType string) string {
	return fmt.Sprintf("<span data-type=\"%s\">", dataType)
}

func GetMarkSpanEnd() string {
	return "</span>"
}
