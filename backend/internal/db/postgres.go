package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func NewPsqlConnection(uriString string) (*sql.DB, error) {
	db, err := sql.Open("postgres", uriString)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return db, nil
}