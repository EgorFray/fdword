package main

import (
	"archive/zip"
	"fmt"
	"io"

	"github.com/beevik/etree"
)

//This function unzip Word file and read document.xml and styles.xml. Then map it on the WDoc struct
func unZip(filename string) (*WDoc, error) {
	archive, err := zip.OpenReader(filename)
	if err != nil {
		fmt.Println("There is an error:", err)
	}
	defer archive.Close()

	var sDoc, dDoc *etree.Document

	for _, f := range archive.File {
		if f.Name == "word/document.xml" || f.Name == "word/styles.xml" {
			r, err := f.Open()
			if err != nil {
				fmt.Println("There is an error:", err)
			}
			d, err := io.ReadAll(r)
			if err != nil {
				fmt.Println("There is an error:", err)
			}

			doc := etree.NewDocument()
			if err = doc.ReadFromBytes(d); err != nil {
				fmt.Println("There is an error:", err)
			}

			if f.Name == "word/styles.xml" {
				sDoc = doc
			}

			if f.Name == "word/document.xml" {
				dDoc = doc
			}			
		}
	}
		return &WDoc{
		Styles: sDoc,
		Document: dDoc,
	}, nil
}

func main() {
	unZip("test/test.docx")
}