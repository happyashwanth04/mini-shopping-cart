package main

import (
	"log"
	"os"
	product_repository "shoppingcart/repositories/product"
	"shoppingcart/routes/order"
	"shoppingcart/routes/product"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	r := gin.Default()
	r.SetTrustedProxies(nil)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     getTrustedOrigins(),
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

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

func getTrustedOrigins() []string {
	origins := os.Getenv("TRUSTED_ORIGIN")
	return strings.Split(origins, ",")
}
