package main

import (
	"shoppingcart/routes/order"
	"shoppingcart/routes/product"

	"github.com/gin-gonic/gin"
)

// type Product struct {
// 	ID       int     `json:"id"`
// 	Name     string  `json:"name"`
// 	Price    float64 `json:"price"`
// 	Category string  `json: "category"`
// }

// var cart = make(map[int]int) // productID -> quantity
// var products = []Product{
// 	{ID: 1, Name: "Laptop", Price: 999.99},
// 	{ID: 2, Name: "Phone", Price: 699.99},
// 	{ID: 3, Name: "Headphones", Price: 149.99},
// }

func main() {
	r := gin.Default()
	var productController *product.ProductController
	var orderController *order.OrderController
	r.GET("/api/product", productController.GetProducts)
	r.GET("/api/product/:productID", productController.GetProduct)
	r.POST("/api/order", orderController.CreateOrder)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run(":8080")
}
