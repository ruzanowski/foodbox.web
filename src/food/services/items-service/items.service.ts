import { Injectable, OnInit } from '@angular/core'
import { Period } from '../../models/period'
import {
  AdditionalsDto,
  AdditionalsServiceProxy,
  AdditionalsType,
  CaloriesDto,
  CaloriesServiceProxy,
  DiscountDto,
  DiscountServiceProxy,
  ProductDto,
  ProductServiceProxy
} from '@shared/service-proxies/service-proxies'

@Injectable({
  providedIn: 'root'
})
export class ItemsService implements OnInit {
  calories: CaloriesDto[] = []
  products: ProductDto[] = []
  discounts: DiscountDto[] = []
  additionals: AdditionalsDto[] = []

  constructor(
    private caloriesService: CaloriesServiceProxy,
    private productService: ProductServiceProxy,
    private discountService: DiscountServiceProxy,
    private additionalsService: AdditionalsServiceProxy
  ) {
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.initCalories()
    this.initProducts()
    this.initDiscounts()
    this.initAdditionals()
  }

  getProducts() : ProductDto[] {
    return this.products
  }

  anyItem(name): boolean {
    return this.getProducts().some((value) => name === value.name)
  }

  getProduct(id: number) {
    return (this.getProducts().filter((value) => id === value.id)|| [])[0]
  }

  getProductByName(name: string) {
    return (this.getProducts().filter((value) => name === value.name) || [])[0]
  }

  getDiscountIfAny(numberOfDays): DiscountDto {
    return (this.discounts.filter((x) => x.minimumDays < numberOfDays) || [])[0]
  }

  getCalory(id: number): CaloriesDto {
    return (this.calories.filter((x) => x.id === id) || [])[0]
  }

  getCaloriesValues(): CaloriesDto[] {
    return this.calories
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
        name: '3 tygodnie, zniżka 10%'
      },
      {
        days: 20 + addWeekendDays * 4,
        name: '4 tygodnie, zniżka 15%'
      }
    ]
  }

  getAdditionalDelivery(id: number): AdditionalsDto {
    if (id === undefined) {
      return (this.additionals.filter((x) => x.type === AdditionalsType._1) ||
        [])[0]
    }

    return (this.additionals.filter(
      (x) => x.type === AdditionalsType._1 && id === x.id
    ) || [])[0]
  }

  getAdditionalCutlery(id: number): AdditionalsDto {
    if (id === undefined) {
      return (this.additionals.filter((x) => x.type === AdditionalsType._0) ||
        [])[0]
    }

    return (this.additionals.filter(
      (x) => x.type === AdditionalsType._0 && id === x.id
    ) || [])[0]
  }

  initCalories() {
    this.caloriesService
      .getAll(200, 0)
      .subscribe((src) => (this.calories = src.items))
  }

  initProducts() {
    this.productService
      .getAll(200, 0)
      .subscribe((src) => (this.products = src.items))
  }

  initDiscounts() {
    this.discountService
      .getAll(200, 0)
      .subscribe((src) => (this.discounts = src.items))
  }

  initAdditionals() {
    this.additionalsService
      .getAll(200, 0)
      .subscribe((src) => (this.additionals = src.items))
  }
}
