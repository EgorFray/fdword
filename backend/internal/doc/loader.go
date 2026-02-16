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
	archive, err := zip.NewReader(
		bytes.NewReader(fileBytes),
		int64(len(fileBytes)),
	)
	if err != nil {
		return nil, err
	}

	var sDoc, dDoc *etree.Document
	files := make(map[string][]byte)

	for _, f := range archive.File {

		r, err := f.Open()
		if err != nil {
			return nil, err
		}

		data, err := io.ReadAll(r)
		r.Close()
		if err != nil {
			return nil, err
		}

		files[f.Name] = data

		if f.Name == "word/styles.xml" {
			doc := etree.NewDocument()
			if err := doc.ReadFromBytes(data); err != nil {
				return nil, err
			}
			sDoc = doc
		}

		if f.Name == "word/document.xml" {
			doc := etree.NewDocument()
			if err := doc.ReadFromBytes(data); err != nil {
				return nil, err
			}
			dDoc = doc
		}
	}

	if sDoc == nil || dDoc == nil {
		return nil, errors.New("invalid docx structure")
	}

	return &WDoc{
		Styles:   sDoc,
		Document: dDoc,
		files:    files,
	}, nil
}