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

func TestSetFontSize(t *testing.T) {
	doc := LoadTestDoc(t, "../testdata/styles.xml", "../testdata/document.xml")

	modifier := NewDocModifier(doc)

	err := modifier.SetFontSize(16)
	if err != nil {
		t.Fatal(err)
	}
	
	fontSize := doc.Styles.Root().FindElement("w:docDefaults/w:rPrDefault/w:rPr/w:sz")

	val := fontSize.SelectAttrValue("w:val", "")
	// assert with 32 because in word font size is 2 times bigger than input value
	assert.Equal(t, "32", val)
}