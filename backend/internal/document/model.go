package document

import (
	"encoding/json"
	"time"
)

// This model is used to get authorized user document from db
type Document struct {
	ID int64
	UserID int64
	OriginalFileName string
	FormattedFileName string
	OriginalFilePath string
	FormattedFilePath string
	OptionsJSON json.RawMessage
	CreatedAt time.Time
}