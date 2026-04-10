package service

import (
	doc "github.com/EgorFray/fdword/internal/doc"
	"github.com/EgorFray/fdword/internal/dto"
)

type FormatService struct {}

func NewFormatService() *FormatService {
	return &FormatService{}
}


func (f *FormatService) FormatDoc(fileBytes []byte, req dto.UpdateRequest) ([]byte, error) {
	// Loading the document
	file, err := doc.Load(fileBytes)
	if err != nil {
		return nil, err
	}

	// Create modifier
	modifier := doc.NewDocModifier(file)

	// Check if we have a neccessary field. If yes - call SetLineSpacing method
	if req.LineSpacing != nil {
		if err := modifier.SetLineSpacing(*req.LineSpacing); err != nil {
			return nil, err
		}
	}

	// Check if we have fontSize in dto. If yes - call SetFontSize
	if req.FontSize != nil {
		if err := modifier.SetFontSize(*req.FontSize); err != nil {
			return nil, err
		}
	}

	// Check if we have fontType in dto. If yes - call SetFontType
	if req.FontType != nil {
		if err := modifier.SetFontType(*req.FontType); err != nil {
			return nil, err
		}
	}

	// Check if we have marginTop in dto. If yes - call SetMarginTop
	if req.MTop != nil {
		if err := modifier.SetMarginTop(*req.MTop); err != nil {
			return nil, err
		}
	}
	
	// Check if we have marginRight in dto. If yes - call SetMarginRight
	if req.MRgh != nil {
		if err := modifier.SetMarginRight(*req.MRgh); err != nil {
			return nil, err
		}
	}
	
	// Check if we have marginBottom in dto. If yes - call SetMarginBottom
	if req.MBtm != nil {
		if err := modifier.SetMarginBottom(*req.MBtm); err != nil {
			return nil, err
		}
	}
	
	// Check if we have marginLeft in dto. If yes - call SetMarginLeft
	if req.MLft != nil {
		if err := modifier.SetMarginLeft(*req.MLft); err != nil {
			return nil, err
		}
	}  

	// Check if we have first line indent. If yes - call SetFirstLineIndent
	if req.FLInd != nil {
		if err := modifier.SetFirstLineIndent(*req.FLInd); err != nil {
			return nil, err
		}
	}

	// Check if we have justify content. If yes - call SetJC
	if req.JC != nil {
		if err := modifier.SetJC(*req.JC); err != nil {
			return nil, err
		}
	}
	// Check if we have something to style in heading
	if req.Heading!= nil {
		if err := f.FormatHeading(*req.Heading, modifier); err != nil {
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

func(f *FormatService) FormatHeading(req dto.HeadingDTO, modifier *doc.DocModifier) error {
	// Check if we have justify content in heading dto
	if req.JC != nil {
		if err := modifier.SetHeadingJC(*req.JC); err != nil {
			return err
		}
  // Check if we have first line indent in heading dto
	if req.FLInd != nil {
		if err := modifier.SetHeadingFLI(*req.FLInd); err != nil {
			return err
		}
	}
	// Check if we have capitalize=true in heading dto
	if req.Caps != nil {
		if err := modifier.SetHeadingCaps(); err != nil {
			return err
		}
	}
	// Check if we have bold=true in heading dto
	if req.Bold != nil {
		if err := modifier.SetHeadingBold(); err != nil {
			return err
		}
	}
	}

	return nil
}