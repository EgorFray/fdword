package user

import (
	"context"
	"database/sql"
)


type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
} 


func (r *UserRepository) GetUserByGoogleId(ctx context.Context, googleId string) (*User, error) {
	var user User

	query := `SELECT id, google_id, email, name, avatar_url, created_at FROM users WHERE google_id = $1`

	err := r.db.QueryRowContext(ctx, query, googleId).Scan(
		&user.ID, 
		&user.GoogleID, 
		&user.Email, 
		&user.Name, 
		&user.AvatarURL, 
		&user.CreatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) CreateUser(ctx context.Context, user User) (*User, error) {
	query := "INSERT INTO users (google_id, email, name, avatar_url) VALUES ($1, $2, $3, $4) RETURNING id, google_id, email, name, avatar_url, created_at"

	var createdUser User

	err := r.db.QueryRowContext(
		ctx, 
		query, 
		user.GoogleID, 
		user.Email, 
		user.Name, 
		user.AvatarURL,
		).Scan(
			&createdUser.ID, 
			&createdUser.GoogleID, 
			&createdUser.Email, 
			&createdUser.Name, 
			&createdUser.AvatarURL, 
			&createdUser.CreatedAt,
		)
	
		if err != nil {
			return nil, err
		}

		return &createdUser, nil
}