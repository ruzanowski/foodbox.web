import { BasketItem } from './basket-item'

export interface Basket {
  items: BasketItem[]
  nominalPriceSummary: number
  priceSummary: number
  deliveryFeeSummary: number
  discountsSummary: number
  currency: string
}
