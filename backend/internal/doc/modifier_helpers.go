package doc

import (
	"strconv"

	"github.com/beevik/etree"
)

//  These 2 helpers (getpPr & getrPr) get path to styles.xml docDefaults page settings.
func (d *DocModifier) getpPr() *etree.Element {
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

	return pPr
}

func (d *DocModifier) getrPr() *etree.Element {
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

	return rPr
}

// In word we should not only change docDefaults in Styles.xml but also normal style in Style.xml
func (d *DocModifier) getNormalStyle() *etree.Element {
	root := d.doc.Styles.Root()

	for _, style := range root.FindElements("//w:style") {
		if style.SelectAttrValue("w:styleId", "") == "Normal" {
			return style
		}
		}
		style := root.CreateElement("w:style")
		style.CreateAttr("w:type", "paragraph")
		style.CreateAttr("w:default", "1")
		style.CreateAttr("w:styleId", "Normal")

		name := style.CreateElement("w:name")
		name.CreateAttr("w:val", "Normal")

		return style
}

// path to Normal style pPr
func (d *DocModifier) getNormalpPr() *etree.Element {
	ns := d.getNormalStyle()
	// pPr
	npPr := ns.FindElement("w:pPr")
	if npPr == nil {
		npPr = ns.CreateElement("w:pPr")
	}

	return npPr
}

// path to Normal style rPr
func (d *DocModifier) getNormalrPr() *etree.Element {
	// ns - normal style
	ns := d.getNormalStyle()
	// rPr
	nrPr := ns.FindElement("w:rPr")
	if nrPr == nil {
		nrPr = ns.CreateElement("w:rPr")
	}

	return nrPr
}

// Get Style of ListParagraph. We need this because lists have unique styling, so it's another place where we should set our values
func (d *DocModifier) getListParagraph() *etree.Element {
	root := d.doc.Styles.Root()

	for _, style := range root.FindElements("//w:style") {
		if style.SelectAttrValue("w:styleId", "") == "ListParagraph" {
			return style
		}
		}
	
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
