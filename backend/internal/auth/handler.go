package auth

import (
	"net/http"

	"github.com/EgorFray/fdword/config"
	"github.com/EgorFray/fdword/internal/user"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type AuthHandler struct {
	googleOAuthConfig *oauth2.Config
	userService *user.UserService
}

func NewAuthHandler(cfg *config.Config, userService *user.UserService) *AuthHandler {
	googleOAuthConfig := &oauth2.Config{
		ClientID: cfg.GoogleClientID,
		ClientSecret: cfg.GoogleClientSecret,
		RedirectURL: cfg.GoogleRedirectURL,
		Scopes: []string{
			"openid",
			"email",
			"profile",
		},
		Endpoint: google.Endpoint,
	}

	return &AuthHandler{
		googleOAuthConfig: googleOAuthConfig,
		userService: userService,
	}
}

func (h *AuthHandler) GoogleLogin(c *gin.Context) {
	state := "temporary-state"

	url := h.googleOAuthConfig.AuthCodeURL(state)

	c.Redirect(http.StatusTemporaryRedirect, url)
}