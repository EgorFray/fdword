package main

import (
	"log"

	cfg "github.com/EgorFray/fdword/config"
	"github.com/EgorFray/fdword/internal/auth"
	"github.com/EgorFray/fdword/internal/db"
	"github.com/EgorFray/fdword/internal/handlers"
	"github.com/EgorFray/fdword/internal/service"
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

	// Formating
	formatService := service.NewFormatService()
	handler := handlers.NewHandler(formatService)

	// User
	userRepo := user.NewUserRepository(psqlDb)
	userService := user.NewUserService(userRepo)
	userHandler := user.NewUserHandler(userService)

	// Auth
	authHandler := auth.NewAuthHandler(config, userService)

	r := gin.Default()
	r.Use(cors.New(cfg.CorsConfig()))
	r.POST("/format", handler.FormatDoc)
	r.GET("/auth/google/login", authHandler.GoogleLogin)
	r.GET("/auth/google/callback", authHandler.GoogleCallback)
	r.GET("/me", authHandler.Me)
	r.GET("/test/create-user", userHandler.TestCreateUser)
	r.Run(":8080")
}