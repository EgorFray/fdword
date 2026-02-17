package service

import (
	doc "github.com/EgorFray/fdword/internal/doc"
	"github.com/EgorFray/fdword/internal/dto"
)

type FormatService struct {}


func (f *FormatService) FormatDoc(fileBytes []byte, req dto.UpdateRequest) ([]byte, error) {
	// Loading the document
	file, err := doc.Load(fileBytes)
	if err != nil {
		return nil, err
	}

	// Create modifier
	modifier := doc.NewDocModifier(file)

	// Check if we have a neccessary field. If yes - call SetLineSpacing method.
	if req.LineSpacing != nil {
		if err := modifier.SetLineSpacing(*req.LineSpacing); err != nil {
			return nil, err
		}
	}

	// Save results
	result, err := file.Save()
	if err != nil {
		return nil, err
	}

	return result, nil
}