package doc

import (
	"github.com/beevik/etree"
)

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

func (d *DocModifier) getNormalpPr() *etree.Element {
	ns := d.getNormalStyle()
	// pPr
	npPr := ns.FindElement("w:pPr")
	if npPr == nil {
		npPr = ns.CreateElement("w:pPr")
	}

	return npPr
}

func (d *DocModifier) getNormalrPr() *etree.Element {
	ns := d.getNormalStyle()
	// rPr
	nrPr := ns.FindElement("w:rPr")
	if nrPr == nil {
		nrPr = ns.CreateElement("w:rPr")
	}

	return nrPr
}


	
