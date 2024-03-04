package util

import (
	"strings"

	"github.com/88250/lute"
	"github.com/PuerkitoBio/goquery"
	"github.com/siyuan-note/logging"
)

func NewLute() (ret *lute.Lute) {
	ret = lute.New()
	ret.SetTextMark(true)
	ret.SetProtyleWYSIWYG(true)
	ret.SetBlockRef(true)
	ret.SetFileAnnotationRef(true)
	ret.SetKramdownIAL(true)
	ret.SetTag(true)
	ret.SetSuperBlock(true)
	ret.SetImgPathAllowSpace(true)
	ret.SetGitConflict(true)
	ret.SetMark(true)
	ret.SetSup(true)
	ret.SetSub(true)
	ret.SetInlineMathAllowDigitAfterOpenMarker(true)
	ret.SetFootnotes(false)
	ret.SetToC(false)
	ret.SetIndentCodeBlock(false)
	ret.SetParagraphBeginningSpace(true)
	ret.SetAutoSpace(false)
	ret.SetHeadingID(false)
	ret.SetSetext(false)
	ret.SetYamlFrontMatter(false)
	ret.SetLinkRef(false)
	ret.SetCodeSyntaxHighlight(false)
	ret.SetSanitize(true)
	return
}

func NewStdLute() (ret *lute.Lute) {
	ret = lute.New()
	ret.SetFootnotes(false)
	ret.SetToC(false)
	ret.SetIndentCodeBlock(false)
	ret.SetAutoSpace(false)
	ret.SetHeadingID(false)
	ret.SetSetext(false)
	ret.SetYamlFrontMatter(false)
	ret.SetLinkRef(false)
	ret.SetGFMAutoLink(false) // 导入 Markdown 时不自动转换超链接 https://github.com/siyuan-note/siyuan/issues/7682
	ret.SetImgPathAllowSpace(true)
	ret.SetInlineMathAllowDigitAfterOpenMarker(true) // Formula parsing supports $ followed by numbers when importing Markdown https://github.com/siyuan-note/siyuan/issues/8362
	return
}

func LinkTarget(htmlStr, linkBase string) (ret string) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(htmlStr))
	if nil != err {
		logging.LogErrorf("parse HTML failed: %s", err)
		return
	}

	doc.Find("a").Each(func(i int, selection *goquery.Selection) {
		if href, ok := selection.Attr("href"); ok {
			if IsRelativePath(href) {
				selection.SetAttr("href", linkBase+href)
			}

			// The hyperlink in the marketplace package README fails to jump to the browser to open https://github.com/siyuan-note/siyuan/issues/8452
			selection.SetAttr("target", "_blank")
		}
	})

	ret, _ = doc.Find("body").Html()
	return
}
