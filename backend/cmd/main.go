package main

import (
	"archive/zip"
	"fmt"
	"io"
	"os"
	"strings"
)

//Unzip word file and get document.xml and styles.xml
func unZip(filename string) {
	archive, err := zip.OpenReader(filename)
	if err != nil {
		fmt.Println("There is an error:", err)
	}
	defer archive.Close()

	for _, f := range archive.File{
		if f.Name == "word/document.xml" || f.Name == "word/styles.xml" {
			r, err := f.Open()
			if err != nil {
				fmt.Println("There is an error:", err)
			}
			d, err := io.ReadAll(r)
			if err != nil {
				fmt.Println("There is an error:", err)
			}
			err = os.WriteFile(strings.Split(f.Name, "/")[1], d, 0644)
			if err != nil {
				fmt.Println("ERROR:", err)
			}
		}
	}
}

func main() {
	unZip("test/test.docx")
}