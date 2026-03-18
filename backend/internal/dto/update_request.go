package dto

// That's what I've got from the frontend
type UpdateRequest struct {
	LineSpacing *float64 `json:"lineSpacing"`
	// FontSize is float because user could need font size of 13.5 for example. So it's better to be float
	FontSize *float64 `json:"fontSize"`
	FontType *string `json:"fontType"`
	// Margins. We ALWAYS receive values from frontend. default - 2.54 
	MTop *float64 `json:"mTop"`
	MRgh *float64 `json:"mRgh"`
	MBtm *float64 `json:"mBtm"`
	MLft *float64 `json:"mLft"`
	// First line indent
	FLInd *float64 `json:"fLind"`
	// Justify content - left, center, right or both
	JC *string `json:"jc"`
	// Separate dto for styling heading
	Heading *HeadingDTO `json:"heading"`
}

// DTO for styling heading (1st paragraph)
type HeadingDTO struct {
	// Justify heading - left, center, right or both
	JC *string `json:"jc"`
	// First line indent
	FLInd *float64 `json:"fLind"`
	// Capitalize heading
	Caps *bool `json:"caps"`
} 