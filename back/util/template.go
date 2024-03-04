package util

import (
	"github.com/Masterminds/sprig/v3"
	"github.com/spf13/cast"
	"math"
	"text/template"
)

func BuiltInTemplateFuncs() (ret template.FuncMap) {
	ret = sprig.TxtFuncMap()
	ret["Weekday"] = Weekday
	ret["WeekdayCN"] = WeekdayCN
	ret["WeekdayCN2"] = WeekdayCN2
	ret["ISOWeek"] = ISOWeek
	ret["pow"] = pow
	ret["powf"] = powf
	ret["log"] = log
	ret["logf"] = logf
	return
}

func pow(a, b interface{}) int64    { return int64(math.Pow(cast.ToFloat64(a), cast.ToFloat64(b))) }
func powf(a, b interface{}) float64 { return math.Pow(cast.ToFloat64(a), cast.ToFloat64(b)) }
func log(a, b interface{}) int64 {
	return int64(math.Log(cast.ToFloat64(a)) / math.Log(cast.ToFloat64(b)))
}
func logf(a, b interface{}) float64 { return math.Log(cast.ToFloat64(a)) / math.Log(cast.ToFloat64(b)) }
