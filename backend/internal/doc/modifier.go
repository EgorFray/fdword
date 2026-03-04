package doc

import (
	"strconv"
)

type DocModifierInterface interface {
	SetLineSpacing(val float64) error
	SetFontSize(val float64) error
	SetFontType(val string) error
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

	// Delete all local overrides of linespacing in Document.xml
	for _, el := range d.doc.Document.FindElements("//w:pPr/w:spacing") {
		el.Parent().RemoveChild(el)
		}
	
	// Create global style of linespacing in Styles.Xml
	root := d.doc.Styles.Root()
	// docDefaults
	docDefaults := root.FindElement("w:docDefaults")
	if docDefaults == nil {
		docDefaults = root.CreateElement("w:docDefaults")
	}
	// pPrDefault
	pPrDefault := docDefaults.FindElement("w:pPrDefault")
	if pPrDefault == nil {
		pPrDefault = docDefaults.CreateElement("w:pPrDefault")
	}
	// pPr
	pPr := pPrDefault.FindElement("w:pPr")
	if pPr == nil {
    pPr = pPrDefault.CreateElement("w:pPr")
	}
	// spacing
	spacing := pPr.FindElement("w:spacing")
	if spacing == nil {
		spacing = pPr.CreateElement("w:spacing")
	}

	spacing.RemoveAttr("w:line")
	spacing.RemoveAttr("w:lineRule")

	spacing.CreateAttr("w:line", strconv.Itoa(line))
	spacing.CreateAttr("w:lineRule", "auto")

	return nil
}

func (d *DocModifier) SetFontSize(val float64) error {
	// Setting fontSize. In word font size is 2 times then actual value. For example 14pt = 28.
	fontSize := int(val * 2)

	// Delete all local overrides of font size in Document.xml
	// Path to font size: docDefaults -> rPrDefault -> rPr -> sz 
	for _, el := range d.doc.Document.FindElements("//w:rPr/w:sz") {
		el.Parent().RemoveChild(el)
	}

	// Also remove all local overrides of w:szCs
	for _, el := range d.doc.Document.FindElements("//w:rPr/w:szCs") {
	 el.Parent().RemoveChild(el)
	}

	// Path to sizes in Styles.xml: <w:docDefaults> -> <w:rPrDefault> -> <w:rPr> -> <w:sz w:val="24" /> and <w:szCs w:val="24" />
	// Create global style of linespacing in Styles.Xml
	root := d.doc.Styles.Root()
	// docDefaults
	docDefaults := root.FindElement("w:docDefaults")
	if docDefaults == nil {
		docDefaults = root.CreateElement("w:docDefaults")
	}
	// rPrDefault
	rPrDefault := docDefaults.FindElement("w:rPrDefault")
	if rPrDefault == nil {
		rPrDefault = docDefaults.CreateElement("w:rPrDefault")
	}
	// rPr
	rPr := rPrDefault.FindElement("w:rPr")
	if rPr == nil {
		rPr = rPrDefault.CreateElement("w:rPr")
	}
	// sz
	sz := rPr.FindElement("w:sz")
	if sz == nil {
		sz = rPr.CreateElement("w:sz")
	}
	// szCs 
	szCs := rPr.FindElement("w:szCs")
	if szCs == nil {
		szCs = rPr.CreateElement("w:szCs")
	}

	sz.RemoveAttr("w:val")
	szCs.RemoveAttr("w:val")

	sz.CreateAttr("w:val", strconv.Itoa(fontSize))
	szCs.CreateAttr("w:val", strconv.Itoa(fontSize))

	return nil
}

func (d *DocModifier) SetFontType(val string) error {
	// Delete all local overrides of font type in Document.xml
	// Path to font type: docDefaults -> rPrDefault -> rPr -> rFonts 
	for _, el := range d.doc.Document.FindElements("//w:rPr/w:rFonts") {
		el.Parent().RemoveChild(el)
	}

	// Path to font type in Styles.xml: <w:docDefaults> -> <w:rPrDefault> -> <w:rPr> -> <w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi" />
	// Create global style of linespacing in Styles.Xml
	root := d.doc.Styles.Root()
	// docDefaults
	docDefaults := root.FindElement("w:docDefaults")
	if docDefaults == nil {
		docDefaults = root.CreateElement("w:docDefaults")
	}
	// rPrDefault
	rPrDefault := docDefaults.FindElement("w:rPrDefault")
	if rPrDefault == nil {
		rPrDefault = docDefaults.CreateElement("w:rPrDefault")
	}
	// rPr
	rPr := rPrDefault.FindElement("w:rPr")
	if rPr == nil {
		rPr = rPrDefault.CreateElement("w:rPr")
	}
	// rFonts
	rFonts := rPr.FindElement("w:rFonts")
	if rFonts == nil {
		rFonts = rPr.CreateElement("w:rFonts")
	}

	rFonts.RemoveAttr("w:asciiTheme")
	rFonts.RemoveAttr("w:eastAsiaTheme")
	rFonts.RemoveAttr("w:hAnsiTheme")
	rFonts.RemoveAttr("w:cstheme")

	rFonts.CreateAttr("w:asciiTheme", val)
	rFonts.CreateAttr("w:eastAsiaTheme", val)
	rFonts.CreateAttr("w:hAnsiTheme", val)
	rFonts.CreateAttr("w:cstheme", val)

	return nil
}
