import { Injectable } from '@angular/core'
import { Basket } from '../../models/basket'
import { BasketItem, SimpleBasketItem } from '../../models/basket-item'
import { DatesHelper } from '../../../shared/helpers/dates-helper'
import { ItemsService } from '../items-service/items.service'
import {CaloriesDialog} from '../../models/calories-dialog';

@Injectable()
export class BasketService {
  private basket: Basket

  constructor(private itemsService: ItemsService) {
    this.basket = {
      items: [],
      priceSummary: 0,
      nominalPriceSummary: 0,
      discountsSummary: 0,
      deliveryFeeSummary: 0,
      currency: 'zł'
    }
  }

  add(basketItem: SimpleBasketItem): void {
    this.basket.items.push(this.transformToBasketItem(basketItem))
    this.reCalculateTotals()
    abp.notify.success(
      basketItem.quantity + 'x ' + basketItem.name,
      'Dodano do koszyka'
    )
  }

  remove(name: string, quantity: number, calories: number): void {
    console.log(name, quantity, calories)

    this.basket.items = this.basket.items.filter(
      (x) =>
        x.name !== name && x.quantity !== quantity && x.calories !== calories
    )
    this.reCalculateTotals()
    abp.notify.error(quantity + 'x ' + name, 'Usunięto z koszyka')
  }

    public transformToBasketItem(simpleBasketItem: SimpleBasketItem): BasketItem {
    return {
      name: simpleBasketItem.name,
      priceNominal: simpleBasketItem.priceNominal,
      deliveryDates: DatesHelper.getDates(
        simpleBasketItem.startDate,
        DatesHelper.addDays(
          simpleBasketItem.startDate,
          simpleBasketItem.periodLengthInDays
        )
      ),
      periodLengthInDays: simpleBasketItem.periodLengthInDays,
      startDate: simpleBasketItem.startDate,
      currency: 'zł',
      calories: simpleBasketItem.calories,
      datesTableSummary: BasketService.getDatesTableSummary(simpleBasketItem),
      quantity: simpleBasketItem.quantity,
      deliveryFee: this.itemsService.getDeliveryPrice(simpleBasketItem.name),
      discount: this.itemsService.getDiscount(simpleBasketItem.name),
      totalItemPrice:
        simpleBasketItem.quantity *
        simpleBasketItem.priceNominal *
        (1 - this.itemsService.getDiscount(simpleBasketItem.name)),
    }
  }

    public transformToSimpleBasketItem(calories: CaloriesDialog): SimpleBasketItem {
        return {
            name: calories.name,
            calories: calories.calories,
            quantity: calories.quantity,
            priceNominal: calories.priceNominal,
            startDate: calories.startDate,
            periodLengthInDays: calories.periodLengthInDays
        }
    }

  public get(): Basket {
    return this.basket
  }

  public any(): boolean {
    return this.basket.items.length > 0
  }

  //computed fields
  private reCalculateTotals() {
    this.basket.nominalPriceSummary = this.basket.items.reduce(
      (sum, current) => sum + current.quantity * current.priceNominal,
      0
    )
    this.basket.priceSummary = this.basket.items.reduce(
      (sum, current) =>
        sum +
        current.quantity * current.priceNominal * (1 - current.discount) +
        current.deliveryFee,
      0
    )
    this.basket.deliveryFeeSummary = this.basket.items.reduce(
      (sum, current) => sum + current.deliveryFee,
      0
    )
    this.basket.discountsSummary = this.basket.items.reduce(
      (sum, current) =>
        sum +
        current.quantity * current.priceNominal -
        current.quantity * current.priceNominal * (1 - current.discount),
      0
    )
  }

  private static getDatesTableSummary(simpleBasketItem: SimpleBasketItem) {
    return (
      'od ' +
      simpleBasketItem.startDate.toLocaleDateString() +
      ' (' +
      BasketService.getPeriodLengthInputDescriptive(
        simpleBasketItem.periodLengthInDays
      ) +
      ')'
    )
  }

  private static getPeriodLengthInputDescriptive(numberOfDays) {
    if (numberOfDays == 1) {
      return '1 d.'
    }

    if (numberOfDays == 5) {
      return '1 tyg.'
    }

    if (numberOfDays == 10) {
      return '2 tyg.'
    }

    if (numberOfDays == 15) {
      return '3 tyg.'
    }

    if (numberOfDays == 20) {
      return '4 tyg.'
    }
  }
}

function DaysBetween(StartDate, EndDate) {
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
    const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
}
