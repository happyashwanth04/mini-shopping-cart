package order

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"shoppingcart/models"

	"shoppingcart/repositories/product"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type OrderController struct {
	productService *product.ProductRepository
}

func NewOrderController(prod *product.ProductRepository) *OrderController {
	return &OrderController{
		productService: prod,
	}
}

func (oc *OrderController) CreateOrder(gc *gin.Context) {
	request := new(models.OrderReq)
	if err := gc.Bind(request); err != nil {
		gc.JSON(422, gin.H{"error": "Validation exception"})
		return
	}
	if err := orderRequestValidator(request); err != nil {
		gc.JSON(400, gin.H{"error": "Invalid input"})
		return
	}
	products, err := oc.productService.GetProductsFromDB()
	if err != nil {
		gc.JSON(400, gin.H{"error": err.Error()})
		return
	}
	// below logic needs to be handled better
	var productsList []*models.Product
	for _, item := range request.Items {
		for _, prod := range products {
			if prod.ID == item.ProductId {
				productsList = append(productsList, prod)
			}
		}
	}
	if len(productsList) == 0 {
		gc.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	id := uuid.New()
	fileName := fmt.Sprintf("order-%s.json", id)
	file, err := os.Create(fileName)
	responseObject := &models.OrderResponse{
		ID:         id,
		Products:   productsList,
		CouponCode: request.CouponCode,
		Items:      request.Items,
	}
	if err != nil {
		gc.JSON(400, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()
	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "    ")
	err = encoder.Encode(responseObject)
	if err != nil {
		gc.JSON(500, gin.H{"error": err.Error()})
		return
	}
	gc.JSON(200, responseObject)

}

func orderRequestValidator(r *models.OrderReq) error {
	if len(r.Items) <= 0 {
		return errors.New("no items to create order")
	}
	return nil
}
