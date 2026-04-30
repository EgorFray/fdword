package doc

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/beevik/etree"
)

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
	pPr := d.getpPr()
	// spacing
	spacing := pPr.FindElement("w:spacing")
	if spacing == nil {
		spacing = pPr.CreateElement("w:spacing")
	}

	// This is for spacing in defaults
	spacing.RemoveAttr("w:line")
	spacing.RemoveAttr("w:lineRule")

	spacing.CreateAttr("w:line", strconv.Itoa(line))
	spacing.CreateAttr("w:lineRule", "auto")

	// And the same for Normal style
	npPr := d.getNormalpPr()
	// spacing
	nspacing := npPr.FindElement("w:spacing")
	if nspacing == nil {
		nspacing = npPr.CreateElement("w:spacing")
	}

	nspacing.RemoveAttr("w:line")
	nspacing.RemoveAttr("w:lineRule")

	nspacing.CreateAttr("w:line", strconv.Itoa(line))
	nspacing.CreateAttr("w:lineRule", "auto")

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
	// Create global style of font size in Styles.Xml
	rPr := d.getrPr()
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

	// Now we need to change the same proprties in normal style in Styles.xml
	// Path to font size is ns -> w:rPr -> w:sz / w:szCs -> w:val
	nrPr := d.getNormalrPr()
	// sz
	nsz := nrPr.FindElement("w:sz")
	if nsz == nil {
		nsz = nrPr.CreateElement("w:sz")
	}
	// w:szCs
	nszCs := nrPr.FindElement("w:szCs")
	if nszCs == nil {
		nszCs = nrPr.CreateElement("w:szCs")
	}

	nsz.RemoveAttr("w:val")
	nszCs.RemoveAttr("w:val")

	nsz.CreateAttr("w:val", strconv.Itoa(fontSize))
	nszCs.CreateAttr("w:val", strconv.Itoa(fontSize))
	
	return nil
}

func (d *DocModifier) SetFontType(val string) error {
	// Delete all local overrides of font type in Document.xml
	// Path to font type: docDefaults -> rPrDefault -> rPr -> rFonts 
	for _, el := range d.doc.Document.FindElements("//w:rPr/w:rFonts") {
		el.Parent().RemoveChild(el)
	}

	// Path to font type in Styles.xml: <w:docDefaults> -> <w:rPrDefault> -> <w:rPr> -> <w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi" />
	// Create global style of font type in Styles.Xml
	rPr := d.getrPr();
	// rFonts
	rFonts := rPr.FindElement("w:rFonts")
	if rFonts == nil {
		rFonts = rPr.CreateElement("w:rFonts")
	}

	// Remove theme attributes
	rFonts.RemoveAttr("w:asciiTheme")
	rFonts.RemoveAttr("w:eastAsiaTheme")
	rFonts.RemoveAttr("w:hAnsiTheme")
	rFonts.RemoveAttr("w:cstheme")

	// Remove actual attributes
	rFonts.RemoveAttr("w:ascii")
	rFonts.RemoveAttr("w:eastAsia")
	rFonts.RemoveAttr("w:hAnsi")
	rFonts.RemoveAttr("w:cs")

	// Create attributes. We don't need to create themeAttr. Only attr  
	rFonts.CreateAttr("w:ascii", val)
	rFonts.CreateAttr("w:eastAsia", val)
	rFonts.CreateAttr("w:hAnsi", val)
	rFonts.CreateAttr("w:cs", val)

	// And the same for Normal style
	nrPr := d.getNormalrPr()
	// rFonts
	nrFonts := nrPr.FindElement("w:rFonts")
	if nrFonts == nil {
		nrFonts = rPr.CreateElement("w:rFonts")
	}

	// Remove theme attributes
	nrFonts.RemoveAttr("w:asciiTheme")
	nrFonts.RemoveAttr("w:eastAsiaTheme")
	nrFonts.RemoveAttr("w:hAnsiTheme")
	nrFonts.RemoveAttr("w:cstheme")

	// Create attributes. Not themes but actual attrs
	nrFonts.CreateAttr("w:ascii", val)
	nrFonts.CreateAttr("w:eastAsia", val)
	nrFonts.CreateAttr("w:hAnsi", val)
	nrFonts.CreateAttr("w:cs", val)

	return nil
}

// Margins 1st helper - get element where we will change attributes
func (d *DocModifier) getMarginsPath() *etree.Element {
	// We don't need to remove pgMar, because there are attrs, that we don't change - header, footer and gutter. 
	// Path to margins in Document.xml: <w:body> -> <w:sectPr> -> <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left=" 1440" />
	sectPr := d.doc.Document.Root().FindElement("//w:sectPr")
	if sectPr == nil {
		d.doc.Document.Root().CreateElement("//w:sectPr")
	}

	pgMar := sectPr.FindElement("w:pgMar")
	if pgMar == nil {
		pgMar = sectPr.CreateElement("w:pgMar")
	}

	return pgMar
}

// Margins 2nd helper - set margin attribute
func (d *DocModifier) setMargin(attr string, val float64) error {
	pgMar := d.getMarginsPath()
	// Calculating twips. In word margins calculates in twips. 1 twip = 1 inch ~ 2.54 cm
	valTwip := int(val * 567)

	pgMar.RemoveAttr(attr)
	pgMar.CreateAttr(attr, strconv.Itoa(valTwip))

	return nil
}

func (d *DocModifier) SetMarginTop(MTop float64) error {
	return d.setMargin("w:top", MTop)
}

func (d *DocModifier) SetMarginRight(MRgh float64) error {
	return d.setMargin("w:right", MRgh)
}
func (d *DocModifier) SetMarginBottom(MBtm float64) error {
	return d.setMargin("w:bottom", MBtm)
}
func (d *DocModifier) SetMarginLeft(MLft float64) error {
	return d.setMargin("w:left", MLft)
}


func(d *DocModifier) SetFirstLineIndent(FLInd float64) error {
	// calculate first line indent. It's calculated in twips. 1cm ~ 567twip.
	lineTwip := int(FLInd * 567)

	// We need to remove all attr of w:firstLine from w:Ind in every w:pPr
	for _, el := range d.doc.Document.FindElements("//w:pPr") {
		ind := el.FindElement("w:ind")
		if ind == nil {
			ind = el.CreateElement("w:ind")
		}
		ind.RemoveAttr("w:firstLine")
	}

	// Create global line indent in Styles.xml
	root := d.doc.Styles.Root()
	if root == nil {
		return fmt.Errorf("styles.xml root is nil")
	}

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
	
	// ind
	ind := pPr.FindElement("w:ind")
	if ind == nil {
		ind = pPr.CreateElement("w:ind")
	}

	ind.RemoveAttr("w:firstLine")
	ind.RemoveAttr("w:hanging")

	ind.CreateAttr("w:firstLine", strconv.Itoa(lineTwip))

	return nil
}

// this method set default text aligment for the whole document.
func(d *DocModifier) SetJC(JC string) error {
	// delete all overrides in document.xml
	for _, el := range d.doc.Document.FindElements("//w:pPr/w:jc") {
		el.Parent().RemoveChild(el)
	}

	// Set default justify content in styles.xml
	root := d.doc.Styles.Root()
	if root == nil {
		return fmt.Errorf("styles.xml root is nil")
	}
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
	// jc
	jc := pPr.FindElement("w:jc")
	if jc == nil {
		jc = pPr.CreateElement("w:jc")
	}

	jc.RemoveAttr("w:val")
	if JC != "left" {
		jc.CreateAttr("w:val", JC)
	}
	return nil
}

// !!!!!!!!!! HEADING MODIFIERS !!!!!!!!!!
// In heading we will work only with document.xml, because we'll change attrs only for 1st paragraph.

// HELPER FUNCTION TO GET FIRST PARAGRAPH WITH TEXT - OUR HEADING
func(d *DocModifier) getFirstParagraph() *etree.Element {
	paragraphs := d.doc.Document.FindElements("//w:body/w:p")

	for _, p := range paragraphs {
		if p.FindElement(".//w:t") != nil {
			return p
		}
	}
	return nil
}

func(d *DocModifier) SetHeadingJC(JC string) error {
	// 1. Find first paragraph with text
	p := d.getFirstParagraph()
	if p == nil {
		return errors.New("There is no paragraph with text")
	}
	// 2. Find/Create path to jc. Path should be: p -> pPr -> w:jc
	pPr := p.FindElement("w:pPr")
	if pPr == nil {
		pPr = p.CreateElement("w:pPr")
	}
	// jc
	jc := pPr.FindElement("w:jc")
	if jc == nil {
		jc = pPr.CreateElement("w:jc")
	}

	if JC != "left" {
		jc.CreateAttr("w:val", JC)
	}
	
	return nil
}

func (d *DocModifier) SetHeadingFLI(FLInd float64) error {
	lineTwip := int(FLInd * 567)
	// Get first paragraph with text
	p := d.getFirstParagraph()
	if p == nil {
		return errors.New("There is no paragraph with text")
	}
	// Get or create path to w:ind. Path: p -> w:pPr -> w:ind w:firstLine
	// pPr
	pPr := p.FindElement("w:pPr")
	if pPr == nil {
		pPr = p.CreateElement("w:pPr")
	}
	// ind
	ind := pPr.FindElement("w:ind")
	if ind == nil {
		ind = pPr.CreateElement("w:ind")
	}

	ind.RemoveAttr("w:firstLine")
	ind.CreateAttr("w:firstLine", strconv.Itoa(lineTwip))

	return nil
}

func (d *DocModifier) SetHeadingCaps() error {
	// Get first paragraph with text
	p := d.getFirstParagraph()
	if p == nil {
		return errors.New("There is no paragraph with text")
	}
	// Path to capitalize property: p -> w:r -> w:rPr -> w:caps
	// w:r
	r := p.FindElement("w:r")
	if r == nil {
		r = p.CreateElement("w:r")
	}
	// w:rPr
	rPr := r.FindElement("w:rPr")
	if r == nil {
		rPr = r.CreateElement("w:rPr")
	}
	// w:caps
	rPr.CreateElement("w:caps")

	return nil
}

func (d *DocModifier) SetHeadingBold() error {
		// Get first paragraph with text
	p := d.getFirstParagraph()
	if p == nil {
		return errors.New("There is no paragraph with text")
	}
		// Path to bold property: p -> w:r -> w:rPr -> w:b
		// w:r
	r := p.FindElement("w:r")
	if r == nil {
		r = p.CreateElement("w:r")
	}
	// w:rPr
	rPr := r.FindElement("w:rPr")
	if r == nil {
		rPr = r.CreateElement("w:rPr")
	}
	// w:b
	rPr.CreateElement("w:b")

	return nil
}
