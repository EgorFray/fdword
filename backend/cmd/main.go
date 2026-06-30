package main

import (
	"log"

	cfg "github.com/EgorFray/fdword/config"
	"github.com/EgorFray/fdword/internal/auth"
	"github.com/EgorFray/fdword/internal/db"
	"github.com/EgorFray/fdword/internal/document"
	"github.com/EgorFray/fdword/internal/handlers"
	"github.com/EgorFray/fdword/internal/service"
	"github.com/EgorFray/fdword/internal/storage"
	"github.com/EgorFray/fdword/internal/user"
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

	// User
	userRepo := user.NewUserRepository(psqlDb)
	userService := user.NewUserService(userRepo)
	userHandler := user.NewUserHandler(userService)

	// Auth
	authHandler := auth.NewAuthHandler(config, userService)

	// Storage
	localStorage := storage.NewLocalStorage(config.StoragePath)

		// Document
	documentRepo := document.NewDocumentRepository(psqlDb)
	documentService := document.NewDocumentService(documentRepo)
	documentHandler := document.NewDocumentHandler(documentService, localStorage)

	// Formating
	formatService := service.NewFormatService()
	handler := handlers.NewHandler(formatService, documentService, localStorage)

	r := gin.Default()
	r.Use(cors.New(cfg.CorsConfig()))
	r.POST("/format", auth.OptionalAuthMiddleware(config.JWTSecret), handler.FormatDoc)
	r.GET("/auth/google/login", authHandler.GoogleLogin)
	r.GET("/auth/google/callback", authHandler.GoogleCallback)
	r.GET("/me", authHandler.Me)
	r.GET("/test/create-user", userHandler.TestCreateUser)

	authorized := r.Group("/")
	authorized.Use(auth.AuthMiddleware(config.JWTSecret))
	authorized.GET("/me/documents", documentHandler.GetMyDocuments)
	authorized.GET("/documents/:id/original", documentHandler.DownloadOriginal)
	authorized.GET("/documents/:id/formatted", documentHandler.DownloadFormatted)

	r.Run(":8080")
}