package user

import (
	"context"
)


type UserService struct {
	userRepo *UserRepository
}

func NewUserService(uRepo *UserRepository) *UserService {
	return &UserService{userRepo: uRepo}
}

// Gets context and google user data as an input. If user exists in db - return user. Else - create new user 
func (s *UserService) GetOrCreateUser(ctx context.Context, googleUser GoogleUser) (*User, error) {
	// 1. Check if User exists in db. For that we have method GetUserByGoogleId
	existingUser, err := s.userRepo.GetUserByGoogleId(ctx, googleUser.GoogleID)
	if err != nil {
		return nil, err
	}
  // if user exists - return user
	if existingUser != nil {
		return existingUser, nil
	}
  // 2. if user doesn't exist - create new user
	newUser := User{
		GoogleID: googleUser.GoogleID,
		Email: googleUser.Email,
		Name: &googleUser.Name,
		AvatarURL: &googleUser.AvatarURL,
	}

	return s.userRepo.CreateUser(ctx, newUser)
}