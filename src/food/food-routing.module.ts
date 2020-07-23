import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FoodComponent } from './food.component'
import { FoodHomeComponent } from './components/home/food-home.component'
import { FoodItemsComponent } from './components/order/1-items/food-items.component'
import { FoodOrderComponent } from './components/order/2-personal-details/food-order.component'

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
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
