import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'
import { Basket } from '../../../models/basket'
import { BasketService } from '../../../services/basket-service/basket.service'

@Component({
  selector: 'food-confirmation',
  templateUrl: './food-confirmation.component.html',
  styleUrls: ['./food-confirmation.component.css']
})
export class FoodConfirmationComponent implements OnInit {
  currentOrder: number = AppConsts.ordering.order.confirmation
  basket: Basket
  badge: any

  constructor(private basketService: BasketService) {
    this.badge = {
      title: 'Dziękujemy!',
      description:
        'Twoje zamówienie zostanie zrealizowane zgodnie z Twoim wyborem. W zakładce "Moje zakupy" znajdziesz więcej informacji.'
    }
  }

  ngOnInit(): void {
    this.basket = this.basketService.get()
  }
}
