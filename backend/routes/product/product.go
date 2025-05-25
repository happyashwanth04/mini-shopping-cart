package product

import (
	"shoppingcart/models"

	"shoppingcart/repositories/product"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
	productService *product.ProductRepository
}

func NewProductController(prod *product.ProductRepository) *ProductController {
	return &ProductController{
		productService: prod,
	}
}
func (pc *ProductController) GetProducts(gc *gin.Context) {
	product, err := pc.productService.GetProductsFromDB()
	if err != nil {
		gc.JSON(400, gin.H{"error": err.Error()})
		return
	}
	gc.JSON(200, product)

}

func (pc *ProductController) GetProduct(gc *gin.Context) {
	id := gc.Param("productID")
	if id == "" {
		gc.JSON(400, gin.H{"error": "Invalid ID supplied"})
		return
	}
	products, err := pc.productService.GetProductsFromDB()
	if err != nil {
		gc.JSON(400, gin.H{"error": err.Error()})
		return
	}
	var productItem *models.Product
	for _, product := range products {
		if product.ID == id {
			productItem = product
		}
	}
	if productItem == nil {
		gc.JSON(404, gin.H{"error": "Product not found"})
		return
	}
	gc.JSON(200, productItem)

}
