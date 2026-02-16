package doc

import (
	"archive/zip"
	"bytes"
)

func (w *WDoc) Save() ([]byte, error) {
	buf := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buf)

	for name, data := range w.files {
		var content []byte

		switch name {
		case "word/document.xml":
			docBytes, err := w.Document.WriteToBytes()
			if err != nil {
				return nil, err
			}
			content = docBytes
		
		case "word/styles.xml":
			styleBytes, err := w.Styles.WriteToBytes()
			if err != nil {
				return nil, err
			} 
			content = styleBytes

		default:
			content = data
		}

		f, err := zipWriter.Create(name) 
		if err != nil {
			return nil, err
		}

		_, err = f.Write(content)
		if err != nil {
			return nil, err
		} 
	}
	if err := zipWriter.Close(); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}