package doc

import (
	"errors"
	"strconv"
)

type DocModifierInterface interface {
	SetLineSpacing(val float64) error
}

type DocModifier struct {
	doc *WDoc
}

func NewDocModifier(doc *WDoc) *DocModifier {
	return &DocModifier{doc: doc}
}

// Function for setting a line space of the document
func (d *DocModifier) SetLineSpacing(val float64) error {
	// Convert a linespace (In word line space of 1 = 240; 1.5 = 360; 2 = 480)
	line := int(val * 240)

	// Delete all local overrides of linespacing in Styles.xml
	for _, el := range d.doc.Styles.FindElements("//w:pPr/w:spacing") {
		el.Parent().RemoveChild(el)
		}
	
	// Create global style of linespacing in Document.xml
	pPr := d.doc.Document.FindElement("//w:docDefaults/w:pPrDefault/w:pPr")
	if pPr == nil {
		return errors.New("default paragraph properties are not found")
	}

	spacing := pPr.FindElement("w:spacing")
	if spacing == nil {
		spacing = pPr.CreateElement("w:spacing")
	}

	spacing.CreateAttr("w:line", strconv.Itoa(line))
	spacing.CreateAttr("w:lineRule", "auto")

	return nil
}