package user

import "github.com/gin-gonic/gin"

type UserHandler struct {
	userService *UserService
}

func NewUserHandler(uService *UserService) *UserHandler {
	return &UserHandler{userService: uService}
}

func (h *UserHandler) TestCreateUser(c *gin.Context) {
	ctx := c.Request.Context()

	googleUser := GoogleUser{
		GoogleID:  "test-google-id-123",
		Email:     "test@gmail.com",
		Name:      "Test User",
		AvatarURL: "https://example.com/avatar.png",
	}

	createdUser, err := h.userService.GetOrCreateUser(ctx, googleUser)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, createdUser)
} 