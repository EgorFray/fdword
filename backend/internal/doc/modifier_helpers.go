package doc

import (
	"github.com/beevik/etree"
)

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

		return nil
	}
	
