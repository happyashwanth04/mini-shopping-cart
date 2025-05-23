package models

type Product struct {
	ID       string             `json:"id"`
	Name     string             `json:"name"`
	Price    float64            `json:"price"`
	Category string             `json:"category"`
	Image    *map[string]string `json:"image"`
}
