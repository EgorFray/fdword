package doc

import "github.com/beevik/etree"

type WDoc struct {
	Styles *etree.Document
	Document *etree.Document
	files map[string][]byte
}