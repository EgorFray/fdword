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

func (d *DocModifier) removeListParagraphsIndent() {
	// lp -> list paragraph
	lp := d.doc.Document.FindElements("//w:body/w:p")

	for _, p := range lp {
		pPr := p.FindElement("w:pPr")
		if pPr == nil {
			continue
		}

		ind := pPr.FindElement("w:ind")
		if ind == nil {
			continue
		}

		pPr.RemoveChild(ind)
	}
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

// Takes index int as an argument and return paragraph from list of first paragraphs with index
func(d *DocModifier) getParagraphByIndex(index int) *etree.Element {
	paragraphs := d.getFirstParagraphs(index + 1)

	if len(paragraphs) <= index {
		return nil
	}

	return paragraphs[index]
}

// Takes int as an argument and returns list of i first paragraphs
func(d *DocModifier) getFirstParagraphs(index int) []*etree.Element {
	var res []*etree.Element

	paragraphs := d.doc.Document.FindElements("//w:body/w:p")

	for _, p := range paragraphs {
		if p.FindElement(".//w:t") == nil {
			continue
		}

		res = append(res, p)

		if len(res) == index {
			break
		}
	}
	return res
}

// THESE ARE HELPERS FOR THE STYLING LIST PARAGRAPH
// Helper function to get unique NumId and Ilvl from document.xml - we need it later to get and style ListParagraphs
func(d *DocModifier) getListParagraphRefs() map[ListRef]bool {
	refs := make(map[ListRef]bool)
	// Get list of all w:p which have w:numPr
	lp := d.doc.Document.FindElements("//w:body/w:p")
	// get the numId and ilvl
	for _, el := range lp {
		numIdEl := el.FindElement("w:pPr/w:numPr/w:numId")
		if numIdEl == nil {
			continue
		}
		// Now getting the numId attribute
		numId := numIdEl.SelectAttrValue("w:val", "")
		if numId == "" {
			continue
		}

		// And getting ilvl attribute
		ilvl := "0"
		ilvlEl := el.FindElement("w:pPr/w:numPr/w:ilvl")
		if ilvlEl != nil {
			ilvl = ilvlEl.SelectAttrValue("w:val", "0")
		}

		refs[ListRef{
			NumId: numId,
			Ilvl: ilvl,
		}] = true
	}
	return refs
}

// Next we need to get <w:num> from numbring xml, where attr w:numId = ListRef.numId
func (d *DocModifier) getListParagraphData() []ListUpdate {
	var res []ListUpdate
	// Check if numbering.xml exists
	if d.doc.Numbering == nil {
		return nil
	}
	
	refs := d.getListParagraphRefs()
	// We need 'seen' for imitating set - so we can add to 'res' only unique ListUpdate data. Better for performance. 
	seen := make(map[ListUpdate]bool)

	for ref := range refs {
		for _, num := range d.doc.Numbering.FindElements("//w:num") {
			if num.SelectAttrValue("w:numId", "") == ref.NumId {
				// get the abstractNumIdEl
				abstractNumIdEl := num.FindElement("w:abstractNumId")
				if abstractNumIdEl == nil {
					continue
				}
				// And finally get the value from abstractNumId
				ani := abstractNumIdEl.SelectAttrValue("w:val", "")
				if ani == "" {
					continue
				}

				update := ListUpdate{
					Ilvl: ref.Ilvl, 
					AbstractNumId: ani,
				}

				// Add only unique 'update' to res 
				if !seen[update] {
					seen[update] = true
					res = append(res, update)
				}	
			}
		}
	}
	return res
}
