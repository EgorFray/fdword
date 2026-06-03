package main

import (
	"log"

	cfg "github.com/EgorFray/fdword/config"
	"github.com/EgorFray/fdword/internal/db"
	"github.com/EgorFray/fdword/internal/handlers"
	"github.com/EgorFray/fdword/internal/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {
	// Get config
	config := cfg.InitConfig()
	// Connect to db
	psqlDb, err := db.NewPsqlConnection(config.PsqlConnUri)
	if err != nil {
		log.Fatal(err)
	}

	defer psqlDb.Close()

	formatService := service.NewFormatService()
	handler := handlers.NewHandler(formatService)

	r := gin.Default()
	r.Use(cors.New(cfg.CorsConfig()))
	r.POST("/format", handler.FormatDoc)
	r.Run(":8080")
}