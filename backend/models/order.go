package models

import "github.com/google/uuid"

type OrderResponse struct {
	ID         uuid.UUID   `json:"id"`
	CouponCode string      `json:"couponCode,omitempty"`
	Items      []OrderItem `json:"items"`
	Products   []*Product  `json:"products"`
}

type OrderItem struct {
	ProductId string `json:"productId"`
	Quantity  int    `json:"quantity"`
}

type OrderReq struct {
	CouponCode string      `json:"couponCode"`
	Items      []OrderItem `json:"items"`
}
