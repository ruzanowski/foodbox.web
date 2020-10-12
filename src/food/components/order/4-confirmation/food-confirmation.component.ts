import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'
import { BasketService } from '../../../services/basket-service/basket.service'
import { InternalBasketDto } from '../../../services/basket-service/internalBasketDto'
import { ItemsService } from '../../../services/items-service/items.service'

@Component({
  selector: 'food-confirmation',
  templateUrl: './food-confirmation.component.html',
  styleUrls: ['./food-confirmation.component.css']
})
export class FoodConfirmationComponent {
  currentOrder: number = AppConsts.ordering.order.confirmation
  badge: any

  constructor(
    public basketService: BasketService,
    public itemsService: ItemsService
  ) {
    this.badge = {
      title: 'Dziękujemy!',
      description:
        'Twoje zamówienie zostanie zrealizowane zgodnie z Twoim wyborem. W zakładce "Moje zakupy" znajdziesz więcej informacji.'
    }
  }
}
