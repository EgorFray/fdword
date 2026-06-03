package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PsqlConnUri string
}

func InitConfig() *Config {
	loadEnv()
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("Database url is empty")
	}

	return &Config{
		PsqlConnUri: databaseURL,
	}
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Couldn't load .env file")
	}
}