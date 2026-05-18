package doc

import "github.com/beevik/etree"

// Main model of neccessary files from word doc
type WDoc struct {
	Styles *etree.Document
	Document *etree.Document
	Numbering *etree.Document
	files map[string][]byte
}

// Helper model to get neccessary fields of styling ListParagraphs
type ListRef struct {
	NumId string
  Ilvl string
}

// This struct is need for updating specific ListParagraph. Ilvl is responsible for level of nesting and AbstructNumId - for specific rules of styling for each paragraph.
type ListUpdate struct {
	Ilvl string
	AbstractNumId string
}