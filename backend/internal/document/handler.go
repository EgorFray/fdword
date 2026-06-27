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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, documents)
}

// This is for downloading original document file
func (h *DocumentHandler) DownloadOriginal(c *gin.Context) {}

// This is for downloading formatted documnt file
func (h *DocumentHandler) DownloadFormatted(c *gin.Context) {}