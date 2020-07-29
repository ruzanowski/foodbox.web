export interface SimpleBasketItem {
  name: string
  calories: number
  quantity: number
  startDate: Date
  periodLengthInDays: number
  periodIncludesWeekends: boolean
  priceNominal: number
}

export interface BasketItem extends SimpleBasketItem {
  currency: string
  deliveryDates: Date[]
  datesTableSummary: string
  discount: number
  deliveryFee: number
  totalItemPrice: number
}
