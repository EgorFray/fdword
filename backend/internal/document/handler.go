package document

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type DocumentHandler struct {
	docService *DocumentService
}

func NewDocumentHandler(documentService *DocumentService) *DocumentHandler {
	return &DocumentHandler{docService: documentService}
}

func (h *DocumentHandler) GetMyDocuments(c *gin.Context) {
	ctx := c.Request.Context()

	userIdVal, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userId, ok := userIdVal.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid user id"})
		return
	} 

	documents, err := h.docService.GetDocumentsByUserId(ctx, userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get documents"})
		return
	}

	c.JSON(http.StatusOK, documents)
}