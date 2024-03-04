package conf

import (
	"github.com/siyuan-note/siyuan/kernel/util"
	"os"
	"strconv"

	"github.com/sashabaranov/go-openai"
)

type AI struct {
	OpenAI *OpenAI `json:"openAI"`
}

type OpenAI struct {
	APIKey       string `json:"apiKey"`
	APITimeout   int    `json:"apiTimeout"`
	APIProxy     string `json:"apiProxy"`
	APIModel     string `json:"apiModel"`
	APIMaxTokens int    `json:"apiMaxTokens"`
	APIBaseURL   string `json:"apiBaseURL"`
	APIUserAgent string `json:"apiUserAgent"`
	APIProvider  string `json:"apiProvider"` // OpenAI, Azure
	APIVersion   string `json:"apiVersion"`  // Azure API version
}

func NewAI() *AI {
	openAI := &OpenAI{
		APITimeout:   30,
		APIModel:     openai.GPT3Dot5Turbo,
		APIBaseURL:   "https://api.openai.com/v1",
		APIUserAgent: util.UserAgent,
		APIProvider:  "OpenAI",
	}

	openAI.APIKey = os.Getenv("SIYUAN_OPENAI_API_KEY")

	if timeout := os.Getenv("SIYUAN_OPENAI_API_TIMEOUT"); "" != timeout {
		timeoutInt, err := strconv.Atoi(timeout)
		if nil == err {
			openAI.APITimeout = timeoutInt
		}
	}

	if proxy := os.Getenv("SIYUAN_OPENAI_API_PROXY"); "" != proxy {
		openAI.APIProxy = proxy
	}

	if maxTokens := os.Getenv("SIYUAN_OPENAI_API_MAX_TOKENS"); "" != maxTokens {
		maxTokensInt, err := strconv.Atoi(maxTokens)
		if nil == err {
			openAI.APIMaxTokens = maxTokensInt
		}
	}

	if baseURL := os.Getenv("SIYUAN_OPENAI_API_BASE_URL"); "" != baseURL {
		openAI.APIBaseURL = baseURL
	}

	if userAgent := os.Getenv("SIYUAN_OPENAI_API_USER_AGENT"); "" != userAgent {
		openAI.APIUserAgent = userAgent
	}
	return &AI{OpenAI: openAI}
}
