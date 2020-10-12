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

    const product = this.itemsService.getProduct(basketItem.productId)

    abp.notify.success(
      basketItem.count + 'x ' + product.name,
      'Dodano do koszyka'
    )
  }

  remove(productId: number, count: number, caloriesId: number): void {
    this.basket.items = this.basket.items.filter(
      (x) =>
        x.productId !== productId &&
        x.count !== count &&
        x.caloriesId !== caloriesId
    )
    this.reCalculateTotals()
    abp.notify.error(count + 'x ' + name, 'Usunięto z koszyka')
  }

  public transformToSimpleBasketItem(
    dialog: FoodMenuDialog
  ): CreateOrderBasketItemDto {
    return CreateOrderBasketItemDto.fromJS({
      productId: dialog.productId,
      caloriesId: dialog.caloriesId,
      count: dialog.count,
      cutleryFeeId: this.itemsService.getAdditionalCutlery(undefined),
      weekendsIncluded: dialog.weekendsIncluded,
      deliveryTimes: DatesHelper.getDeliveryTimes(dialog)
    })
  }

  //computed fields
  private reCalculateTotals() {
    let discountMultiplier =
      1 - (this.itemsService.getDiscountIfAny(this.getTotalDays())?.value || 0)
    let discountSaves = 0
    let priceWithoutDiscountAndFees = 0

    this.basket.totalPrice = this.basket.items.reduce((sum, current) => {
      const price =
        current.count *
        this.itemsService.getProduct(current.productId).priceGross *
        current.deliveryTimes.length

      const priceWithDiscount = price * discountMultiplier
      priceWithoutDiscountAndFees += price
      discountSaves += price - priceWithDiscount

      return (
        sum +
        priceWithDiscount +
        (this.itemsService.getAdditionalDelivery(undefined)?.valueGross || 0) +
        (this.itemsService.getAdditionalCutlery(current.cutleryFeeId)
          ?.valueGross || 0)
      )
    }, 0)

    this.basket.totalDeliveryPrice = this.basket.items.reduce(
      (sum, current) => sum,
      0
    )

    this.basket.totalDiscounts = discountSaves
    this.basket.totalPriceWithoutDiscountsAndFees = priceWithoutDiscountAndFees
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

  getTotalItemPrice(itemDto: CreateOrderBasketItemDto) {
    // this does not include discount as this is going to be substracted in the end of the process
    return (
      itemDto.deliveryTimes.length *
        itemDto.count *
        (this.itemsService.getProduct(itemDto.productId).priceGross || 0) +
      (this.itemsService.getAdditionalCutlery(itemDto.cutleryFeeId)
        ?.valueGross || 0) +
      (this.itemsService.getAdditionalDelivery(undefined)?.valueGross || 0)
    )
  }
}
