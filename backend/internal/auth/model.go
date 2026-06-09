package auth

type GoogleUserInfo struct {
	Sub string `json:"sub"`
	Email string `json:"email"`
	Name string `json:"name"`
	Picture string `json:"picture"`
}