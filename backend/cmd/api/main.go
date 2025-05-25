package main

import (
	product_repository "shoppingcart/repositories/product"
	"shoppingcart/routes/order"
	"shoppingcart/routes/product"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "content-type")
		if c.Request.Method == "OPTIONS" {
			c.Status(200)
			return
		}

		c.Next()
	})
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
