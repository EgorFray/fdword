package user

import "time"

type User struct {
	ID int64
	GoogleID string
	Email string
	Name *string
	AvatarURL *string
	CreatedAt time.Time
}

type GoogleUser struct {
	GoogleID string
	Email string
	Name string
	AvatarURL string
}