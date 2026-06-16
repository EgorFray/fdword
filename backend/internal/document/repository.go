package document

import (
	"context"
	"database/sql"
)

type DocumentRepository struct {
	db *sql.DB
}

func NewDocumentRepository(db *sql.DB) *DocumentRepository {
	return &DocumentRepository{db: db}
}

// Return specific document by docId for downloading it.
func (r *DocumentRepository) GetDocumentById(ctx context.Context, docId string) (*Document, error) {
	query := `SELECT id, user_id, original_file_name, formated_file_name, original_file_path, formated_file_path, options_json, created_at FROM documents WHERE id = $1` 

	var document Document

	err := r.db.QueryRowContext(ctx, query, docId).Scan(
		&document.ID, 
		&document.UserID,
		&document.OriginalFileName,
		&document.FormatedFileName,
		&document.OriginalFilePath,
		&document.FormatedFilePath,
		&document.OptionsJSON,
		&document.CreatedAt,
	)

		if err == sql.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &document, nil
}

// Gets authorized user documents.
func (r *DocumentRepository) GetDocumentsByUserId(ctx context.Context, userId string) ([]Document, error) {
	query := `SELECT id, user_id, original_file_name, formated_file_name, original_file_path, formated_file_path, options_json, created_at FROM documents WHERE user_id = $1`

	var documents []Document
	
	rows, err := r.db.QueryContext(ctx, query, userId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var document Document

		err := rows.Scan(
			&document.ID, 
			&document.UserID,
			&document.OriginalFileName,
			&document.FormatedFileName,
			&document.OriginalFilePath,
			&document.FormatedFilePath,
			&document.OptionsJSON,
			&document.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		documents = append(documents, document)
	}
	
	return documents, nil
}