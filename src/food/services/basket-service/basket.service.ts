import { Injectable } from '@angular/core'
import { Basket } from '../../models/basket'
import { BasketItem, SimpleBasketItem } from '../../models/basket-item'
import { DatesHelper } from '../../../shared/helpers/dates-helper'
import { ItemsService } from '../items-service/items.service'

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
      currency: 'zł',
    }
  }

  add(basketItem: SimpleBasketItem): void {
    this.basket.items.push(this.transform(basketItem))
    this.reCalculateTotals()
  }

  remove(basketItem: SimpleBasketItem): void {
    this.basket.items.filter(
      (x) =>
        x.name != basketItem.name &&
        x.quantity != basketItem.quantity &&
        x.calories != basketItem.calories
    )
    this.reCalculateTotals()
  }

  private transform(simpleBasketItem: SimpleBasketItem): BasketItem {
    return {
      name: simpleBasketItem.name,
      priceNominal: simpleBasketItem.priceNominal,
      dates: DatesHelper.getDates(
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
      periodIncludesWeekends: simpleBasketItem.periodIncludesWeekends,
      quantity: simpleBasketItem.quantity,
      deliveryFee: this.itemsService.getDeliveryPrice(simpleBasketItem.name),
      discount: this.itemsService.getDiscount(simpleBasketItem.name),
    }
  }

  get(): Basket {
    return this.basket
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
