package dto

// That's what I've got from the frontend
type UpdateRequest struct {
	LineSpacing *float64 `json:"lineSpacing" validate:"omitempty,min=0.5,max=5"`
	// FontSize is float because user could need font size of 13.5 for example. So it's better to be float
	FontSize *float64 `json:"fontSize" validate:"omitempty,min=5,max=72"`
	FontType *string `json:"fontType" validate:"omitempty,fonttype"`
	// Margins. We ALWAYS receive values from frontend. default - 2.54 
	MTop *float64 `json:"mTop" validate:"omitempty,min=0,max=7"`
	MRgh *float64 `json:"mRgh" validate:"omitempty,min=0,max=7"`
	MBtm *float64 `json:"mBtm" validate:"omitempty,min=0,max=7"`
	MLft *float64 `json:"mLft" validate:"omitempty,min=0,max=7"`
	// First line indent
	FLInd *float64 `json:"fLind" validate:"omitempty,min=0,max=3"`
	// Justify content - left, center, right or both
	JC *string `json:"jc" validate:"omitempty,oneof=left center right both"`
	// Separate dto for styling heading
	Heading *HeadingDTO `json:"heading" validate:"omitempty"`
}

// DTO for styling heading (1st paragraph)
type HeadingDTO struct {
	// Justify heading - left, center, right or both
	JC *string `json:"jc" validate:"omitempty,oneof=left center right both"`
	// First line indent
	FLInd *float64 `json:"fLind" validate:"omitempty,min=0,max=3"`
	// Capitalize heading
	Caps *bool `json:"caps" validate:"omitempty"`
	// Bold heading
	Bold *bool `json:"bold" validate:"omitempty"`
} 