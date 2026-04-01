package doc

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSetLineSpacing(t *testing.T) {
	doc := LoadTestDoc(t, "../testdata/styles.xml", "../testdata/document.xml")

	modifier := NewDocModifier(doc)

	err := modifier.SetLineSpacing(2)
	if err != nil {
		t.Fatal(err)
	}

	spacing := doc.Styles.Root().FindElement("w:docDefaults/w:pPrDefault/w:pPr/w:spacing")
	if spacing == nil {
		t.Fatal("There is no spacing. Something went wrong")
	}

	val := spacing.SelectAttrValue("w:line", "")
	assert.Equal(t, "480", val)
}