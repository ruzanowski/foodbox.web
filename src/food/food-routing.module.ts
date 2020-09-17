import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FoodComponent } from './food.component'
import { FoodHomeComponent } from './components/home/food-home.component'
import { FoodItemsComponent } from './components/order/1-items/food-items.component'
import { FoodOrderComponent } from './components/order/2-order/food-order.component'
import { FoodPaymentComponent } from './components/order/3-payment/food-payment.component'
import { FoodConfirmationComponent } from './components/order/4-confirmation/food-confirmation.component'
import { BasketRouteGuard } from '../shared/guards/basket-route-guard'
import { AppRouteGuard } from '../shared/guards/auth-route-guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FoodComponent,
        children: [
          {
            path: '',
            component: FoodHomeComponent,
            data: { animation: 'home', preload: true },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'items',
            component: FoodItemsComponent,
            data: { animation: 'items', preload: true },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'order',
            component: FoodOrderComponent,
            canActivate: [BasketRouteGuard, AppRouteGuard],
            data: { animation: 'order' }
          },
          {
            path: 'payment',
            component: FoodPaymentComponent,
            canActivate: [BasketRouteGuard, AppRouteGuard],
            data: { animation: 'payment' }
          },
          {
            path: 'confirmation',
            component: FoodConfirmationComponent,
            canActivate: [BasketRouteGuard, AppRouteGuard],
            data: { animation: 'confirmation' }
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class FoodRoutingModule {}
