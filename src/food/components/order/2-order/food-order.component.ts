import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'

@Component({
  selector: 'food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodOrderComponent implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.order
  nextLink: string = '/' + AppConsts.routes.payment
  previousLink: string = '/' + AppConsts.routes.items
  ngOnInit(): void {}
}
