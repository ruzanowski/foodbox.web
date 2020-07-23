import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'

@Component({
  selector: 'food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css'],
})
export class FoodOrderComponent implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.order

  ngOnInit(): void {}
}
