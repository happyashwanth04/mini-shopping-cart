package order

import (
	"errors"
	"shoppingcart/models"
	"slices"
	"sort"

	"shoppingcart/repositories/product"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var validCouponcodes = []string{"BUYGETONE", "HAPPYHOURS"}

const (
	BUYGETONE  = "BUYGETONE"
	HAPPYHOURS = "HAPPYHOURS"
)

type productPriceDetails struct {
	UnitPrice float64
	Quantity  int
}

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
	var priceDetails []*productPriceDetails
	for _, item := range request.Items {
		for _, prod := range products {
			if prod.ID == item.ProductId {
				productsList = append(productsList, prod)
				priceDetails = append(priceDetails, &productPriceDetails{
					Quantity:  item.Quantity,
					UnitPrice: prod.Price,
				})
			}
		}
	}
	if len(productsList) == 0 {
		gc.JSON(400, gin.H{"error": "Invalid input"})
		return
	}
	id := uuid.New()
	orderTotal := getOrderTotal(priceDetails)
	responseObject := &models.OrderResponse{
		ID:         id,
		Products:   productsList,
		CouponCode: request.CouponCode,
		Items:      request.Items,
		OrderTotal: orderTotal,
	}
	oc.Applycoupon(request.CouponCode, responseObject)
	err = oc.productService.SetProductToDB(id, responseObject)
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

func (oc *OrderController) applyBuyOneGetOne(resp *models.OrderResponse) bool {
	products, err := oc.productService.GetProductsFromDB()
	if err != nil {
		return false
	}
	sort.Slice(products, func(i, j int) bool {
		return products[i].Price < products[j].Price
	})
	lowestPriceProduct := products[0]
	resp.Items = append(resp.Items, &models.OrderItem{
		ProductId: lowestPriceProduct.ID,
		Quantity:  1,
	})
	resp.Products = append(resp.Products, lowestPriceProduct)
	return true
}

func (oc *OrderController) applyHappyHours(resp *models.OrderResponse) bool {
	if len(resp.Products) == 0 {
		return false
	}
	resp.OrderTotal *= 0.82
	return true
}
func (oc *OrderController) Applycoupon(coupon string, resp *models.OrderResponse) bool {
	if !slices.Contains(validCouponcodes, coupon) {
		return false
	}
	switch coupon {
	case HAPPYHOURS:
		return oc.applyHappyHours(resp)
	case BUYGETONE:
		return oc.applyBuyOneGetOne(resp)
	}
	return false
}

func getOrderTotal(priceDetails []*productPriceDetails) float64 {
	var total float64
	for _, item := range priceDetails {
		total += (item.UnitPrice * float64(item.Quantity))
	}
	return total
}
