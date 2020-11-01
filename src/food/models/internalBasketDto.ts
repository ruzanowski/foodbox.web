import {
  CreateBasketDto,
  CreateOrderBasketItemDto,
  DiscountDto
} from '@shared/service-proxies/service-proxies'

export class InternalBasketDto extends CreateBasketDto {
  totalPrice: number = 0
  totalPriceWithoutDiscountsAndFees: number = 0
  totalDiscounts: number = 0
  discountApplied: DiscountDto
  totalCutleryPrice: number = 0
  totalDeliveryPrice: number = 0

  static fromJS(data: any): InternalBasketDto {
    data = typeof data === 'object' ? data : {}
    let result = new InternalBasketDto()
    result.init(data)
    return result
  }

  init(_data?: any) {
    if (_data) {
      this.totalPrice = _data['totalPrice']
      this.totalPriceWithoutDiscountsAndFees =
        _data['totalPriceWithoutDiscountsAndFees']
      this.totalDiscounts = _data['totalDiscounts']
      this.discountApplied = _data['discountApplied']
      this.totalCutleryPrice = _data['totalCutleryPrice']
      this.totalDeliveryPrice = _data['totalDeliveryPrice']

      if (Array.isArray(_data['items'])) {
        this.items = [] as any
        for (let item of _data['items']) {
          this.items.push(CreateOrderBasketItemDto.fromJS(item))
        }
      }
    }
  }
}
