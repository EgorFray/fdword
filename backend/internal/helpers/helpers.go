package helpers

import (
	"path/filepath"
	"strings"
)

func MakeFormattedFileName(originalName string) string {
	ext := filepath.Ext(originalName)
	name := strings.TrimSuffix(originalName, "_formatted")

	return name + "_formatted" + ext
}