import { Injectable, Injector, OnChanges, SimpleChanges } from '@angular/core'
import {
  CreateOrderBasketItemDto,
  CreateOrderDto,
  CreateOrderFormDto,
  OrderDto,
  OrderServiceProxy
} from '@shared/service-proxies/service-proxies'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { AppSessionService } from '@shared/session/app-session.service'
import { InternalBasketDto } from '../../models/internalBasketDto'
import { AppComponentBase } from '@shared/app-component-base'
import { Observable } from '@node_modules/rxjs'

@Injectable()
export class OrderService implements OnChanges {
  private readonly _order = new BehaviorSubject<CreateOrderDto>(
    CreateOrderDto.fromJS({})
  )
  private readonly _form = new BehaviorSubject<CreateOrderFormDto>(
    CreateOrderFormDto.fromJS({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      street: null,
      city: null,
      postCode: null,
      buildingNumber: null
    })
  )
  private readonly _basket = new BehaviorSubject<InternalBasketDto>(
    InternalBasketDto.fromJS({
      items: [],
      totalPrice: 0,
      totalPriceWithoutDiscountsAndFees: 0,
      totalDiscounts: 0,
      totalCutleryPrice: 0,
      totalDeliveryPrice: 0
    })
  )

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

  readonly isFormValid$ = this._form.pipe(
    map(
      (f) =>
        f.firstName !== null &&
        f.lastName !== null &&
        f.phoneNumber !== null &&
        f.email !== null &&
        new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).exec(f.email) &&
        f.postCode !== null &&
        f.city !== null &&
        f.street !== null &&
        f.buildingNumber !== null
    )
  )

  constructor(
    public appSessionService: AppSessionService,
    private orderServiceProxy: OrderServiceProxy
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.reCalculateTotals()
  }

  get basket(): InternalBasketDto {
    return this._basket.getValue()
  }

  set basket(val: InternalBasketDto) {
    this._basket.next(val)
  }

  get form(): CreateOrderFormDto {
    return this._form.getValue()
  }

  set form(val: CreateOrderFormDto) {
    this._form.next(val)
  }

  get order(): CreateOrderDto {
    return this._order.getValue()
  }

  set order(val: CreateOrderDto) {
    this._order.next(val)
  }

  add(basketItem: CreateOrderBasketItemDto): void {
    this.basket.items.push(basketItem)
    this._basket.next(this.basket)

    this.reCalculateTotals()
    this._basket.next(this.basket)

    const product = this.appSessionService.getProduct(basketItem.productId)

    abp.notify.success(
      basketItem.count + 'x ' + product.name,
      'Dodano do koszyka'
    )
  }

  remove(item: CreateOrderBasketItemDto): void {
    this.basket.items = this.basket.items.filter((x) => x !== item)
    this.reCalculateTotals()
    abp.notify.error(
      item.count +
        'x ' +
        this.appSessionService.getProduct(item.productId).name,
      'Usunięto z koszyka'
    )
  }

  //computed fields
  private reCalculateTotals() {
    let discountSavesTotal = 0
    let priceWithoutDiscountAndFeesTotal = 0
    let deliveryCostTotal = 0
    let cutleryCostTotal = 0

    this.basket.totalPrice = this.basket.items.reduce((sum, current) => {
      const price =
        ((1 + this.appSessionService.getProduct(current.productId).tax.value) *
          this.appSessionService.getProduct(current.productId).priceNet +
          this.appSessionService.getCalory(current.caloriesId)
            .additionToPrice) *
        current.count *
        current.deliveryTimes.length

      const priceWithDiscount =
        price *
        (1 -
          (this.appSessionService.getDiscountIfAny(this.getTotalDays())
            ?.value || 0))
      priceWithoutDiscountAndFeesTotal += price
      discountSavesTotal += price - priceWithDiscount
      const deliveryCostTemp =
        this.appSessionService.getAdditionalDelivery(undefined)?.valueGross || 0
      deliveryCostTotal += deliveryCostTemp

      const cutleryCostTemp =
        current.cutleryFeeId === undefined
          ? 0
          : (this.appSessionService.getAdditionalCutlery(current.cutleryFeeId)
              ?.valueGross || 0) *
            current.deliveryTimes.length *
            current.count
      cutleryCostTotal += cutleryCostTemp

      return sum + priceWithDiscount + deliveryCostTemp + cutleryCostTemp
    }, 0)

    this.basket.totalDiscounts = discountSavesTotal || 0
    this.basket.totalPriceWithoutDiscountsAndFees =
      priceWithoutDiscountAndFeesTotal || 0
    this.basket.totalCutleryPrice = cutleryCostTotal || 0
    this.basket.totalDeliveryPrice = deliveryCostTotal || 0
    this._basket.next(this.basket)
  }

  getTotalDays(): number {
    return this.basket.items.reduce(
      (sum, current) => sum + current.deliveryTimes.length,
      0
    )
  }

  anyItems(): boolean {
    return this.basket.items.length > 0
  }

  set(form: CreateOrderFormDto): void {
    const orderToChange = this._order.getValue()
    orderToChange.form = form
    this._order.next(this._order.getValue())
  }

  submit(): Observable<OrderDto> {
    const orderToSubmit = this.order
    orderToSubmit.basket = this.basket
    orderToSubmit.form = this.form
    this.order = orderToSubmit

    return this.orderServiceProxy.create(this.order)
  }
}
