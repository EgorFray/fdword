package doc

import (
	"os"
	"testing"

	"github.com/beevik/etree"
)

func LoadTestDoc(t *testing.T, stylespath, docpath string) *WDoc {
	t.Helper()
	// Transform styles.xml to byteslice
	stylesBytes, err := os.ReadFile(stylespath)
	if err != nil {
		t.Fatal(err)
	}

	// Transform document.xml to byteslice
	docBytes, err := os.ReadFile(docpath)
	if err != nil {
		t.Fatal(err)
	}

	// Create new etree document for styles and document
	styles := etree.NewDocument()
	if err := styles.ReadFromBytes(stylesBytes); err != nil {
		t.Fatal(err)
	}

	doc := etree.NewDocument()
	if err := doc.ReadFromBytes(docBytes); err != nil {
		t.Fatal(err)
	}

	return &WDoc {
		Styles: styles,
		Document: doc,
	}
}