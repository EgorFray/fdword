package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/EgorFray/fdword/internal/document"
	"github.com/EgorFray/fdword/internal/dto"
	"github.com/EgorFray/fdword/internal/storage"
	"github.com/EgorFray/fdword/internal/validation"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type FormatServiceInterface interface {
	FormatDoc(fileBytes []byte, req dto.UpdateRequest) ([]byte, error)
}

type Handler struct {
	formatService FormatServiceInterface
	documentService *document.DocumentService
	localStorage *storage.LocalStorage
	Validator *validator.Validate
}

func NewHandler(s FormatServiceInterface, docService *document.DocumentService, locStorage *storage.LocalStorage) *Handler {
	return &Handler{
		formatService: s, 
		documentService: docService,
		localStorage: locStorage,
		Validator: validation.New(),
	}
}

func (h *Handler) FormatDoc(c *gin.Context) {
	// Getting file from the form-data
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file is required"})
		return
	}
	// Open the file
	f, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close();

	// Get byteslice 
	fileBytes, err := io.ReadAll(f)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// get JSON data
	data := c.PostForm("data")

	var req dto.UpdateRequest

	if err := json.Unmarshal([]byte(data), &req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validation
	if err := h.Validator.Struct(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// Call the service
	result, err := h.formatService.FormatDoc(fileBytes, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Check if there is userId
	// If user is authorized - save original and formatted document to history.
	userIdValue, exists := c.Get("userId")
	if exists {
		userId, ok := userIdValue.(int64)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid user id"})
			return
		}

		storageId := uuid.NewString()
		originalPath := fmt.Sprintf("user_%d/%s/original.docx", userId, storageId)
		formattedPath := fmt.Sprintf("user_%d/%s/formatted.docx", userId, storageId)

		// Save original file
		if err := h.localStorage.Save(originalPath, fileBytes); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save original file"})
			return
		}

		// Sav formatted file
		if err := h.localStorage.Save(formattedPath, result); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save formatted file"})
			return
		}

		// This is for options - what params change in the app
		optionsJson, err := json.Marshal(req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to marshal options"})
			return
		}

		_, err = h.documentService.CreateDocument(c, document.Document{
			UserID: userId,
			OriginalFileName: file.Filename,
			FormattedFileName: ,
		})

	}

	c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  c.Header("Content-Disposition", "attachment; filename=formatted.docx")

	c.Data(http.StatusOK, 
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			result,
	)
}