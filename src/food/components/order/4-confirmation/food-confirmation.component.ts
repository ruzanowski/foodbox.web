import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'
import { BasketService } from '../../../services/basket-service/basket.service'
import { AppSessionService } from '../../../../shared/session/app-session.service'

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
    public appSessionService: AppSessionService
  ) {
    this.badge = {
      title: 'Dziękujemy!',
      description:
        'Twoje zamówienie zostanie zrealizowane zgodnie z Twoim wyborem. W zakładce "Moje zakupy" znajdziesz więcej informacji.'
    }
  }
}
