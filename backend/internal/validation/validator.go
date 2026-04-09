package validation

import (
	"github.com/go-playground/validator/v10"
)

func New()*validator.Validate {
	v := validator.New()
	_ = v.RegisterValidation("fonttype", validateFontType)

	return v
}

var allowedFonts = map[string]struct{}{
	"Times New Roman": {},
	"Calibri":         {},
	"Arial":           {},
	"Georgia":         {},
	"Helvetica":       {},
	"Verdana":         {},
	"Tahoma":          {},
	"Century":         {},
	"Courier":         {},
}

func validateFontType(fl validator.FieldLevel) bool {
	field := fl.Field()

	if field.Kind().String() != "string" {
		return false
	}

	value := field.String()
	if value == "" {
		return true
	}

	_, ok := allowedFonts[value]
	return ok
}