import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FoodComponent } from './food.component'
import { FoodHomeComponent } from './components/food-home/food-home.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FoodComponent,
        children: [{ path: '', component: FoodHomeComponent }],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
