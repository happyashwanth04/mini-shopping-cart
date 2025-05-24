package product

import (
	"encoding/json"
	"fmt"
	"os"
	"shoppingcart/models"

	"github.com/google/uuid"
)

type ProductRepository struct {
}

func (pr *ProductRepository) GetProductsFromDB() ([]*models.Product, error) {
	data, err := os.ReadFile("products.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal JSON
	var products []*models.Product
	err = json.Unmarshal(data, &products)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (pr *ProductRepository) SetProductToDB(id uuid.UUID, rawObject interface{}) error {
	fileName := fmt.Sprintf("order-%s.json", id)
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()
	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "    ")
	err = encoder.Encode(rawObject)
	if err != nil {
		return err
	}
	return nil
}
