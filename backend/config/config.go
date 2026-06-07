package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PsqlConnUri string
	GoogleClientID    string
	GoogleClientSecret string
	GoogleRedirectURL string
	FrontendURL       string
}

func InitConfig() *Config {
	loadEnv()
	// database url
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("Database url is empty")
	}

	// google client id
	googleId := os.Getenv("GOOGLE_CLIENT_ID")
	if googleId == "" {
		log.Fatal("Google client ID is empty")
	}

	// google client secret
	googleSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	if googleSecret == "" {
		log.Fatal("Google client secret is empty")
	}

	// google redirect url
	googleRedirect := os.Getenv("GOOGLE_REDIRECT_URL")
	if googleRedirect == "" {
		log.Fatal("Google redirect URL is empty")
	}

	// frontend url
	frontendUrl := os.Getenv("FRONTEND_URL")
	if frontendUrl == "" {
		log.Fatal("Frontend URL is empty")
	}

	return &Config{
		PsqlConnUri: databaseURL,
		GoogleClientID: googleId,
		GoogleClientSecret: googleSecret,
		GoogleRedirectURL: googleRedirect,
		FrontendURL: frontendUrl,
	}
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Couldn't load .env file")
	}
}