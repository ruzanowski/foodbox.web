import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FoodComponent } from './food.component'
import { FoodHomeComponent } from './components/home/food-home.component'
import { FoodItemsComponent } from './components/order/1-items/food-items.component'
import { FoodOrderComponent } from './components/order/2-order/food-order.component'
import { FoodPaymentComponent } from './components/order/3-payment/food-payment.component'
import { FoodConfirmationComponent } from './components/order/4-confirmation/food-confirmation.component'
import { AppConsts } from '../shared/AppConsts'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FoodComponent,
        children: [
          { path: '', component: FoodHomeComponent },
          { path: 'items', component: FoodItemsComponent },
          { path: 'order', component: FoodOrderComponent },
          { path: 'payment', component: FoodPaymentComponent },
          { path: 'confirmation', component: FoodConfirmationComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class FoodRoutingModule {}
