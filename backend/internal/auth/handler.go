package auth

import (
	"encoding/json"
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

func (h *AuthHandler) GoogleCallback(c *gin.Context) {
	ctx := c.Request.Context()
	state := c.Query("state")
	code := c.Query("code")

	if state != "temporary-state" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid state"})
		return
	}

	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "code is required"})
		return
	}

	token, err := h.googleOAuthConfig.Exchange(ctx, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to exchange code for token"})
		return
	}

	client := h.googleOAuthConfig.Client(ctx, token)

	resp, err := client.Get("https://openidconnect.googleapis.com/v1/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get user info from google"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to decode google user info"})
	}

	var googleUserInfo GoogleUserInfo

	if err := json.NewDecoder(resp.Body).Decode(&googleUserInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to decode google user info"})
		return
	}

	googleUserData := user.GoogleUser{
		GoogleID: googleUserInfo.Sub,
		Email: googleUserInfo.Email,
		Name: googleUserInfo.Name,
		AvatarURL: googleUserInfo.Picture,
	}

	appUser, err := h.userService.GetOrCreateUser(ctx, googleUserData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get or create user"})
		return
	}

	c.JSON(http.StatusOK, appUser)
}