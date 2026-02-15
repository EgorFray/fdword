package doc

import (
	"archive/zip"
	"bytes"
	"errors"
	"io"

	"github.com/beevik/etree"
)

//This function unzip Word file and read document.xml and styles.xml. Then map it on the WDoc struct
func Load(fileBytes []byte) (*WDoc, error) {
	archive, err := zip.NewReader(bytes.NewReader(fileBytes), int64(len(fileBytes)))
	if err != nil {
		return nil, err
	}

	var sDoc, dDoc *etree.Document

	for _, f := range archive.File {
		if f.Name == "word/document.xml" || f.Name == "word/styles.xml" {
			r, err := f.Open()
			if err != nil {
				return nil, err
			}
			d, err := io.ReadAll(r)
			if err != nil {
				return nil, err
			}

			doc := etree.NewDocument()
			if err = doc.ReadFromBytes(d); err != nil {
				return nil, err
			}

			if f.Name == "word/styles.xml" {
				sDoc = doc
			}

			if f.Name == "word/document.xml" {
				dDoc = doc
			}	
			
			if sDoc == nil || dDoc == nil {
				return nil, errors.New("invalid document signature")
			}
		}
	}
		return &WDoc{
		Styles: sDoc,
		Document: dDoc,
	}, nil
}