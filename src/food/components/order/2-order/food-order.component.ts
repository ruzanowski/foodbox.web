import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'

@Component({
  selector: 'food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodOrderComponent implements OnInit {
  currentOrder: number = AppConsts.ordering.order.order
  nextLink: string = '/' + 'payment'
  previousLink: string = '/' + 'items'
  ngOnInit(): void {}
}
