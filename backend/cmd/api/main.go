package main

import (
	product_repository "shoppingcart/repositories/product"
	"shoppingcart/routes/order"
	"shoppingcart/routes/product"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	productCtrl := product.NewProductController(&product_repository.ProductRepository{})
	orderCtrl := order.NewOrderController(&product_repository.ProductRepository{})
	r.GET("/api/product", productCtrl.GetProducts)
	r.GET("/api/product/:productID", productCtrl.GetProduct)
	r.POST("/api/order", orderCtrl.CreateOrder)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run(":8080")
}
