package main

import (
	"archive/zip"
	"fmt"
	"io"
	"log"
	"os"
)


func main() {
	testdata := "test/test.docx"
	doc, err := zip.OpenReader(testdata)
	if err != nil {
		log.Fatalf("Failed to open doc: %v", err)
	}
	defer doc.Close()

	for _, file := range doc.File {
		fmt.Println(file.Name)
		if file.Name == "word/styles.xml" {
			data, err := file.Open()
			if err != nil {
				log.Fatal(err)
			}

			d, err := io.ReadAll(data)
			if err != nil {
				log.Fatal(err)
			}

			fmt.Println(string(d))
			os.WriteFile("styles.xml", d, 0644)
		}
	}

}