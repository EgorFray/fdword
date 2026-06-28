package document

import (
	"net/http"
	"strconv"

	"github.com/EgorFray/fdword/internal/storage"
	"github.com/gin-gonic/gin"
)

type DocumentHandler struct {
	docService *DocumentService
	storage *storage.LocalStorage
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
func (h *DocumentHandler) DownloadOriginal(c *gin.Context) {
	ctx := c.Request.Context()

	userIdValue, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userId, ok := userIdValue.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid user id"})
	}

	docIdParam := c.Param("id")

	docId, err := strconv.ParseInt(docIdParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid document id"})
		return
	}

	doc, err := h.docService.GetDocumentById(ctx, docId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "faild to get document"})
		return
	}

	if doc == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "document not found"})
		return
	}

	if doc.UserID != userId {
		c.JSON(http.StatusForbidden, gin.H{"error": "access denied"})
		return
	}

	fullPath := h.storage.FullPath(doc.OriginalFilePath)

	c.FileAttachment(fullPath, doc.OriginalFileName)
}

// This is for downloading formatted documnt file
func (h *DocumentHandler) DownloadFormatted(c *gin.Context) {}