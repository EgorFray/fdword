package service

import (
	doc "github.com/EgorFray/fdword/internal/doc"
)

type FormatService struct {
	DocModifier doc.DocModifierInterface
}

func NewFormatService(docM doc.DocModifierInterface) *FormatService {
	return &FormatService{DocModifier: docM}
}

