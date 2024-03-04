package util

import (
	"bytes"
	"strconv"
	"strings"
	"unicode"

	"github.com/88250/lute/html"
)

// InsertElem inserts value at index into a.
// 0 <= index <= len(s)
func InsertElem[T any](s []T, index int, value T) []T {
	if len(s) == index { // nil or empty slice or after last element
		return append(s, value)
	}

	s = append(s[:index+1], s[index:]...) // index < len(s)
	s[index] = value
	return s
}

// RemoveElem removes the element at index i from s.
func RemoveElem[T any](s []T, index int) []T {
	return append(s[:index], s[index+1:]...)
}

func EscapeHTML(s string) string {
	if ContainsSubStr(s, []string{"&amp;", "&#39;", "&lt;", "&gt;", "&#34;", "&#13;"}) {
		return s
	}
	return html.EscapeString(s)
}

func Reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func RemoveRedundantSpace(str string) string {
	buf := bytes.Buffer{}
	lastIsChinese := false
	lastIsSpace := false
	for _, r := range str {
		if unicode.IsSpace(r) {
			if lastIsChinese || lastIsSpace {
				continue
			}
			buf.WriteRune(' ')
			lastIsChinese = false
			lastIsSpace = true
			continue
		}

		lastIsSpace = false
		buf.WriteRune(r)
		if unicode.Is(unicode.Han, r) {
			lastIsChinese = true
			continue
		} else {
			lastIsChinese = false
		}
	}
	return buf.String()
}

func IsNumeric(s string) bool {
	_, err := strconv.ParseFloat(s, 64)
	return err == nil
}

func ContainsSubStr(s string, subStrs []string) bool {
	for _, v := range subStrs {
		if strings.Contains(s, v) {
			return true
		}
	}
	return false
}
