import { AbpMultiTenancyService } from 'abp-ng2-module'
import { Injectable } from '@angular/core'
import {
  AdditionalsDto,
  AdditionalsType,
  ApplicationInfoDto,
  CaloriesDto,
  CreateOrderBasketItemDto,
  DiscountDto,
  GetInitialInformation,
  ProductDto,
  SessionServiceProxy,
  TaxDto,
  TenantLoginInfoDto,
  UserLoginInfoDto
} from '@shared/service-proxies/service-proxies'
import { BehaviorSubject } from '@node_modules/rxjs'
import { Period } from '../../food/models/period'
import { FoodMenuDialog } from '../../food/models/food-menu-dialog'

@Injectable()
export class AppSessionService {
  private _user: UserLoginInfoDto
  private _tenant: TenantLoginInfoDto
  private _application: ApplicationInfoDto
  private _calories = new BehaviorSubject<CaloriesDto[]>([])
  private _products = new BehaviorSubject<ProductDto[]>([])
  private _discounts = new BehaviorSubject<DiscountDto[]>([])
  private _additionals = new BehaviorSubject<AdditionalsDto[]>([])
  private _taxes = new BehaviorSubject<TaxDto[]>([])

  calories$ = this._calories.asObservable()
  products$ = this._products.asObservable()
  taxes$ = this._taxes.asObservable()

  constructor(
    private _sessionService: SessionServiceProxy,
    private _abpMultiTenancyService: AbpMultiTenancyService
  ) {}

  get application(): ApplicationInfoDto {
    return this._application
  }

  get user(): UserLoginInfoDto {
    return this._user
  }

  get userId(): number {
    return this.user ? this.user.id : null
  }

  get tenant(): TenantLoginInfoDto {
    return this._tenant
  }

  getShownLoginName(): string {
    const userName = this._user.userName
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName
    }

    return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._sessionService
        .getCurrentLoginInformations()
        .toPromise()
        .then(
          (result: GetInitialInformation) => {
            this._application = result.application
            this._user = result.user
            this._tenant = result.tenant
            this._calories.next(result.calories)
            this._discounts.next(result.discounts)
            this._taxes.next(result.taxes)
            this._products.next(result.products)
            this._additionals.next(result.additionals)

            resolve(true)
          },
          (err) => {
            reject(err)
          }
        )
    })
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
        (this.getCalory(item.caloriesId)?.additionToPrice || 0)) *
        item.count *
        item.deliveryTimes.length +
      (item.cutleryFeeId == undefined
        ? 0
        : (this.getAdditionalCutlery(item.cutleryFeeId)?.valueGross || 0) *
          item.deliveryTimes.length *
          item.count)
    )
  }

  getPriceNominalByDialog(item: FoodMenuDialog) {
    return (
      (this.getProduct(item.productId).priceNet *
        (1 + this.getProduct(item.productId).tax.value) +
        (this.getCalory(item.caloriesId)?.additionToPrice || 0)) *
        item.count *
        item.periodLengthInDays +
      (!item.cutleryIncluded
        ? 0
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
}
