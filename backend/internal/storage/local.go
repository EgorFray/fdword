package storage

import (
	"os"
	"path/filepath"
)

type LocalStorage struct {
	basePath string
}

func NewLocalStorage(basePath string) *LocalStorage {
	return &LocalStorage{basePath: basePath}
}

func (s *LocalStorage) Save(relativePath string, data []byte) error {
	fullPath := filepath.Join(s.basePath, relativePath)

	if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
		return err
	}

	return os.WriteFile(fullPath, data, 0644)
}

func (s *LocalStorage) FullPath(relativePath string) string {
	return filepath.Join(s.basePath, relativePath)
}