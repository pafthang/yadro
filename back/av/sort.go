package av

type Sortable interface {
	SortRows()
}

type ViewSort struct {
	Column string    `json:"column"` // 列 ID
	Order  SortOrder `json:"order"`  // 排序顺序
}

type SortOrder string

const (
	SortOrderAsc  SortOrder = "ASC"
	SortOrderDesc SortOrder = "DESC"
)
