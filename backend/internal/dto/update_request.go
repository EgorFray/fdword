package dto

// That's what I've got from the frontend
type UpdateRequest struct {
	LineSpacing *float64 `json:"lineSpacing"`
	// FontSize is float because user could need font size of 13.5 for example. So it's better to be float
	FontSize *float64 `json:"fontSize"`
	FontType *string `json:"fontType"`
}