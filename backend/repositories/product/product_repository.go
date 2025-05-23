package product

import (
	"encoding/json"
	"os"
	"shoppingcart/models"
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
