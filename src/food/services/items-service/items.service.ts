import { Injectable, OnInit } from '@angular/core'
import { Period } from '../../models/period'
import {
    AdditionalsDto,
    AdditionalsServiceProxy,
    AdditionalsType,
    CaloriesDto,
    CaloriesServiceProxy,
    CreateOrderBasketItemDto,
    DiscountDto,
    DiscountServiceProxy, PaymentDto, PaymentServiceProxy,
    ProductDto,
    ProductServiceProxy,
    TaxDto,
    TaxServiceProxy
} from '@shared/service-proxies/service-proxies';
import { BehaviorSubject } from '@node_modules/rxjs'
import { InternalBasketDto } from '../basket-service/internalBasketDto'
import { FoodMenuDialog } from '../../models/food-menu-dialog'

@Injectable({
  providedIn: 'root'
})
export class ItemsService implements OnInit {
  private _calories = new BehaviorSubject<CaloriesDto[]>([])
  private _products = new BehaviorSubject<ProductDto[]>([])
  private _discounts = new BehaviorSubject<DiscountDto[]>([])
  private _additionals = new BehaviorSubject<AdditionalsDto[]>([])
  private _taxes = new BehaviorSubject<TaxDto[]>([])
  private _payments = new BehaviorSubject<PaymentDto[]>([])

  calories$ = this._calories.asObservable()
  products$ = this._products.asObservable()
  discounts$ = this._discounts.asObservable()
  additionals$ = this._additionals.asObservable()
  taxes$ = this._taxes.asObservable()
  payments$ = this._payments.asObservable()

  constructor(
    private caloriesService: CaloriesServiceProxy,
    private productService: ProductServiceProxy,
    private discountService: DiscountServiceProxy,
    private additionalsService: AdditionalsServiceProxy,
    private taxesService: TaxServiceProxy,
    private paymentsService: PaymentServiceProxy
  ) {}

  ngOnInit() {
    this.init()
  }

  init() {
    this.initCalories()
    this.initProducts()
    this.initDiscounts()
    this.initAdditionals()
    this.initTaxes()
    this.initPayments()
  }

  anyItem(name): boolean {
    return this._products.getValue().some((value) => name === value.name)
  }

  getProduct(id: number) {
    return (this._products.getValue().filter((value) => id === value.id) ||
      [])[0]
  }

  getProductByName(name: string) {
    return (this._products.getValue().filter((value) => name === value.name) ||
      [])[0]
  }

  getDiscountIfAny(numberOfDays): DiscountDto {
    return (this._discounts
      .getValue()
      .filter((x) => x.minimumDays < numberOfDays) || [])[0]
  }

  getCalory(id: number): CaloriesDto {
    return (this._calories.getValue().filter((x) => x.id === id) || [])[0]
  }

  getPeriods(weekends: boolean): Period[] {
    let addWeekendDays = weekends ? 2 : 0

    return [
      {
        days: 1,
        name: '1 dzień (próbny)'
      },
      {
        days: 5 + addWeekendDays,
        name: '1 tydzień'
      },
      {
        days: 10 + addWeekendDays * 2,
        name: '2 tygodnie'
      },
      {
        days: 15 + addWeekendDays * 3,
        name: '3 tygodnie'
      },
      {
        days: 20 + addWeekendDays * 4,
        name: '4 tygodnie'
      }
    ]
  }

  getPriceNominal(item: CreateOrderBasketItemDto) {
    return (
      (this.getProduct(item.productId).priceNet *
        (1 + this.getProduct(item.productId).tax.value) +
        (this.getCalory(item.caloriesId)?.additionToPrice || 0) *
          (1 + this.getProduct(item.productId).tax.value)) *
        item.count *
        item.deliveryTimes.length +
      (item.cutleryFeeId == 0
        ? 1
        : (this.getAdditionalCutlery(item.cutleryFeeId)?.valueGross || 0) *
          item.deliveryTimes.length *
          item.count)
    )
  }

  getPriceNominalByDialog(item: FoodMenuDialog) {
    return (
      (this.getProduct(item.productId).priceNet *
        (1 + this.getProduct(item.productId).tax.value) +
        (this.getCalory(item.caloriesId)?.additionToPrice || 0) *
          (1 + this.getProduct(item.productId).tax.value)) *
        item.count *
        item.periodLengthInDays +
      (!item.cutleryIncluded
        ? 1
        : (this.getAdditionalCutlery(undefined)?.valueGross || 0) *
          item.periodLengthInDays *
          item.count)
    )
  }

  getAdditionalDelivery(id: number): AdditionalsDto {
    if (id === undefined) {
      return (this._additionals
        .getValue()
        .filter((x) => x.type === AdditionalsType._1) || [])[0]
    }

    return (this._additionals
      .getValue()
      .filter((x) => x.type === AdditionalsType._1 && id === x.id) || [])[0]
  }

  getAdditionalCutlery(id: number): AdditionalsDto {
    if (id === undefined) {
      return (this._additionals
        .getValue()
        .filter((x) => x.type === AdditionalsType._0) || [])[0]
    }

    return (this._additionals
      .getValue()
      .filter((x) => x.type === AdditionalsType._0 && id === x.id) || [])[0]
  }

  initCalories() {
    this.caloriesService
      .getAll(200, 0)
      .subscribe((src) => this._calories.next(src.items))
  }

  initProducts() {
    this.productService
      .getAll(200, 0)
      .subscribe((src) => this._products.next(src.items))
  }

  initDiscounts() {
    this.discountService
      .getAll(200, 0)
      .subscribe((src) => this._discounts.next(src.items))
  }

  initAdditionals() {
    this.additionalsService
      .getAll(200, 0)
      .subscribe((src) => this._additionals.next(src.items))
  }
  initTaxes() {
    this.taxesService
      .getAll(200, 0)
      .subscribe((src) => this._taxes.next(src.items))
  }
  initPayments() {
    this.paymentsService
        .getAll(200, 0)
        .subscribe((src) => this._payments.next(src.items))
  }
}
