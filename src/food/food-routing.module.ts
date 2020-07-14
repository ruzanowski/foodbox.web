import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FoodComponent } from './food.component'
import { FoodHomeComponent } from './components/home/food-home.component'
import { FoodOrderComponent } from './components/order/food-order.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FoodComponent,
        children: [
          { path: '', component: FoodHomeComponent },
          { path: 'order', component: FoodOrderComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
