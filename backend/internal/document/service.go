package document

import "context"

type DocumentService struct {
	documentRepository *DocumentRepository
}

func NewDocumentService(docRepo *DocumentRepository) *DocumentService {
	return &DocumentService{documentRepository: docRepo}
}

func (s *DocumentService) GetDocumentById(ctx context.Context, docId string) (*Document, error) {
	return s.documentRepository.GetDocumentById(ctx, docId)
}

func (s *DocumentService) GetDocumentsByUserId(ctx context.Context, userId int64) ([]Document, error) {
	return s.documentRepository.GetDocumentsByUserId(ctx, userId)
}

func (s *DocumentService) CreateDocument(ctx context.Context, doc Document) (*Document, error) {
	return s.documentRepository.CreateDocument(ctx, doc)
}