export interface FoodMenuDialog {
  productId: number
  name: string
  caloriesId: number
  count: number
  startDate: Date
  periodLengthInDays: number
  weekendsIncluded: boolean
  cutleryIncluded: boolean
  NoBasketWithGenericProductSelectionMode: boolean //this enables to have product dropDown selection and does not add a product to basket
}
