package conf

type Graph struct {
	MaxBlocks int `json:"maxBlocks"` // 内容块最大显示数

	Local  *LocalGraph  `json:"local"`  // 局部图
	Global *GlobalGraph `json:"global"` // 全局图
}

func NewGraph() *Graph {
	return &Graph{
		MaxBlocks: 1024 * 10,
		Local:     NewLocalGraph(),
		Global:    NewGlobalGraph(),
	}
}

type LocalGraph struct {
	DailyNote   bool `json:"dailyNote"`
	*TypeFilter `json:"type"`
	*D3         `json:"d3"`
}

func NewLocalGraph() *LocalGraph {
	return &LocalGraph{
		DailyNote:  false,
		TypeFilter: &TypeFilter{},
		D3:         newD3(),
	}
}

type GlobalGraph struct {
	MinRefs     int  `json:"minRefs"` // 引用次数
	DailyNote   bool `json:"dailyNote"`
	*TypeFilter `json:"type"`
	*D3         `json:"d3"`
}

func NewGlobalGraph() *GlobalGraph {
	return &GlobalGraph{
		MinRefs:    0,
		DailyNote:  false,
		TypeFilter: &TypeFilter{},
		D3:         newD3(),
	}
}

type TypeFilter struct {
	Tag        bool `json:"tag"`
	Paragraph  bool `json:"paragraph"`
	Heading    bool `json:"heading"`
	Math       bool `json:"math"`
	Code       bool `json:"code"`
	Table      bool `json:"table"`
	List       bool `json:"list"`
	ListItem   bool `json:"listItem"`
	Blockquote bool `json:"blockquote"`
	Super      bool `json:"super"`
}

type D3 struct {
	NodeSize        float64 `json:"nodeSize"`
	LineWidth       float64 `json:"linkWidth"`
	LineOpacity     float64 `json:"lineOpacity"`
	CenterStrength  float64 `json:"centerStrength"`
	CollideRadius   float64 `json:"collideRadius"`
	CollideStrength float64 `json:"collideStrength"`
	LinkDistance    int     `json:"linkDistance"`
	Arrow           bool    `json:"arrow"`
}

func newD3() *D3 {
	return &D3{
		NodeSize:        15.0,
		LineWidth:       8,
		LineOpacity:     0.36,
		CenterStrength:  0.01,
		CollideRadius:   600,
		CollideStrength: 0.08,
		LinkDistance:    400,
		Arrow:           true,
	}
}
