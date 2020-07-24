import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'

@Component({
  selector: 'food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.items

  ngOnInit(): void {}
}
