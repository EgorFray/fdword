package main

import (
	"github.com/EgorFray/fdword/internal/handlers"
	"github.com/EgorFray/fdword/internal/service"
	"github.com/gin-gonic/gin"
)


func main() {
	formatService := service.NewFormatService()
	handler := handlers.NewHandler(formatService)

	r := gin.Default()
	r.POST("/format", handler.FormatDoc)
	r.Run(":8000")
}