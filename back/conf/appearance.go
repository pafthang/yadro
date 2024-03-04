package conf

type Appearance struct {
	Mode                int      `json:"mode"`                // 模式：0：明亮，1：暗黑
	ModeOS              bool     `json:"modeOS"`              // 模式是否跟随系统
	DarkThemes          []string `json:"darkThemes"`          // 暗黑模式外观主题列表
	LightThemes         []string `json:"lightThemes"`         // 明亮模式外观主题列表
	ThemeDark           string   `json:"themeDark"`           // 选择的暗黑模式外观主题
	ThemeLight          string   `json:"themeLight"`          // 选择的明亮模式外观主题
	ThemeVer            string   `json:"themeVer"`            // 选择的主题版本
	Icons               []string `json:"icons"`               // 图标列表
	Icon                string   `json:"icon"`                // 选择的图标
	IconVer             string   `json:"iconVer"`             // 选择的图标版本
	CodeBlockThemeLight string   `json:"codeBlockThemeLight"` // 明亮模式下代码块主题
	CodeBlockThemeDark  string   `json:"codeBlockThemeDark"`  // 暗黑模式下代码块主题
	Lang                string   `json:"lang"`                // 选择的界面语言，同 AppConf.Lang
	ThemeJS             bool     `json:"themeJS"`             // 是否启用了主题 JavaScript
	CloseButtonBehavior int      `json:"closeButtonBehavior"` // 关闭按钮行为，0：退出，1：最小化到托盘
	HideStatusBar       bool     `json:"hideStatusBar"`       // 是否隐藏底部状态栏
}

func NewAppearance() *Appearance {
	return &Appearance{
		Mode:                0,
		ModeOS:              true,
		ThemeDark:           "midnight",
		ThemeLight:          "daylight",
		Icon:                "material",
		CodeBlockThemeLight: "github",
		CodeBlockThemeDark:  "base16/dracula",
		Lang:                "en_US",
		CloseButtonBehavior: 0,
		HideStatusBar:       false,
	}
}
