package main

import (
	"archive/zip"
	"fmt"
	"io"

	"github.com/beevik/etree"
)


func main() {
	unZip("test/test.docx")
}