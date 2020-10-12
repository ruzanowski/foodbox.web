import { Injectable, OnChanges, SimpleChanges } from '@angular/core'
import { DatesHelper } from '../../../shared/helpers/dates-helper'
import { ItemsService } from '../items-service/items.service'
import { FoodMenuDialog } from '../../models/food-menu-dialog'
import { CreateOrderBasketItemDto } from '../../../shared/service-proxies/service-proxies'
import { InternalBasketDto } from './internalBasketDto'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class BasketService implements OnChanges {
  private readonly _basket = new BehaviorSubject<InternalBasketDto>(
    InternalBasketDto.fromJS({ items: [] })
  )
  readonly basket$ = this._basket.asObservable()
  readonly items$ = this._basket.pipe(map((basket) => basket.items))
  readonly itemsAny$ = this._basket.pipe(
    map((basket) => basket.items.length > 0)
  )

  readonly totalDiscounts$ = this._basket.pipe(
    map((basket) => basket.totalDiscounts)
  )
  readonly totalPrice$ = this._basket.pipe(map((basket) => basket.totalPrice))
  readonly totalPriceWithoutDiscountsAndFees$ = this._basket.pipe(
    map((basket) => basket.totalPriceWithoutDiscountsAndFees)
  )
  readonly totalDeliveryPrice$ = this._basket.pipe(
    map((basket) => basket.totalDeliveryPrice)
  )
  readonly totalCutleryPrice$ = this._basket.pipe(
    map((basket) => basket.totalCutleryPrice)
  )

  constructor(private itemsService: ItemsService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.reCalculateTotals()
  }

  get basket(): InternalBasketDto {
    return this._basket.getValue()
  }

  set basket(val: InternalBasketDto) {
    this._basket.next(val)
  }

  add(basketItem: CreateOrderBasketItemDto): void {
    this.basket.items.push(basketItem)
    this._basket.next(this.basket)

    this.reCalculateTotals()
    this._basket.next(this.basket)

    const product = this.itemsService.getProduct(basketItem.productId)

    abp.notify.success(
      basketItem.count + 'x ' + product.name,
      'Dodano do koszyka'
    )
  }

  remove(item: CreateOrderBasketItemDto): void {
    this.basket.items = this.basket.items.filter((x) => x !== item)
    this.reCalculateTotals()
    abp.notify.error(
      item.count + 'x ' + this.itemsService.getProduct(item.productId).name,
      'Usunięto z koszyka'
    )
  }

  public transformToSimpleBasketItem(
    dialog: FoodMenuDialog
  ): CreateOrderBasketItemDto {
    return CreateOrderBasketItemDto.fromJS({
      productId: dialog.productId,
      caloriesId: dialog.caloriesId,
      count: dialog.count,
      cutleryFeeId:
        this.itemsService.getAdditionalCutlery(undefined)?.id || null,
      weekendsIncluded: dialog.weekendsIncluded,
      deliveryTimes: DatesHelper.getDeliveryTimes(dialog)
    })
  }

  //computed fields
  private reCalculateTotals() {
    let discountSavesTotal = 0
    let priceWithoutDiscountAndFeesTotal = 0
    let deliveryCostTotal = 0
    let cutleryCostTotal = 0

    this.basket.totalPrice = this.basket.items.reduce((sum, current) => {
      const price =
        ((1 + this.itemsService.getProduct(current.productId).tax.value) *
          this.itemsService.getProduct(current.productId).priceNet +
          (1 + this.itemsService.getProduct(current.productId).tax.value) *
            this.itemsService.getCalory(current.caloriesId).additionToPrice) *
        current.count *
        current.deliveryTimes.length

      const priceWithDiscount =
        price *
        (1 -
          (this.itemsService.getDiscountIfAny(this.getTotalDays())?.value || 0))
      priceWithoutDiscountAndFeesTotal += price
      discountSavesTotal += price - priceWithDiscount
      const deliveryCostTemp =
        this.itemsService.getAdditionalDelivery(undefined)?.valueGross || 0
      deliveryCostTotal += deliveryCostTemp

      const cutleryCostTemp =
        current.cutleryFeeId == 0
          ? 0
          : (this.itemsService.getAdditionalCutlery(current.cutleryFeeId)
              ?.valueGross || 0) *
            current.deliveryTimes.length *
            current.count
      cutleryCostTotal += cutleryCostTemp

      return sum + priceWithDiscount + deliveryCostTemp + cutleryCostTemp
    }, 0)

    this.basket.totalDiscounts = discountSavesTotal
    this.basket.totalPriceWithoutDiscountsAndFees = priceWithoutDiscountAndFeesTotal
    this.basket.totalCutleryPrice = cutleryCostTotal
    this.basket.totalDeliveryPrice = deliveryCostTotal
    this._basket.next(this.basket)
  }

  getTotalDays(): number {
    return this.basket.items.reduce(
      (sum, current) => sum + current.deliveryTimes.length,
      0
    )
  }

  getDatesTableSummary(itemDto: CreateOrderBasketItemDto) {
    return (
      'od ' +
      itemDto.deliveryTimes[0].dateTime.toDate().toLocaleDateString() +
      ' (' +
      itemDto.deliveryTimes.length +
      'd.' +
      ')'
    )
  }
}
