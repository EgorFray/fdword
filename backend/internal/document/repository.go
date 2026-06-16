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
		&document.FormattedFileName,
		&document.OriginalFilePath,
		&document.FormattedFilePath,
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
func (r *DocumentRepository) GetDocumentsByUserId(ctx context.Context, userId int64) ([]Document, error) {
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
			&document.FormattedFileName,
			&document.OriginalFilePath,
			&document.FormattedFilePath,
			&document.OptionsJSON,
			&document.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		documents = append(documents, document)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return documents, nil
}

// Save authorized user document in the db
func (r *DocumentRepository) CreateDocument(ctx context.Context, doc Document) (*Document, error) {
	query := `INSERT INTO documents (
		user_id,
		original_file_name,
		formatted_file_name,
		original_file_path,
		formatted_file_path,
		options_json
	)
	VALUES ($1, $2, $3, $4, $5, $6)
	RETURNING 
		id, 
		user_id, 
		original_file_name,
		formatted_file_name,
		original_file_path,
		formatted_file_path,
		options_json,
		created_at
	`

	var created Document

	err := r.db.QueryRowContext(
		ctx, 
		query, 
		doc.UserID, 
		doc.OriginalFileName,
		doc.FormattedFilePath,
		doc.OriginalFilePath,
		doc.FormattedFilePath,
		doc.OptionsJSON,
	).Scan(
		&created.ID,
		&created.UserID,
		&created.OriginalFileName,
		&created.FormattedFileName,
		&created.OriginalFilePath,
		&created.FormattedFilePath,
		&created.OptionsJSON,
		&created.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &created, nil
}