package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/EgorFray/fdword/internal/dto"
	"github.com/gin-gonic/gin"
)

type Handler struct {}

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid json"})
		return
	}

	// Call the service

}