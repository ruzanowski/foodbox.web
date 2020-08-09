import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'
import { slideModuleAnimation } from '../../../../shared/animations/routerTransition'

@Component({
  selector: 'food-payment',
  templateUrl: './food-payment.component.html',
  styleUrls: ['./food-payment.component.css']
})
export class FoodPaymentComponent implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.payment
  nextLink: string = '/' + AppConsts.routes.confirmation
  previousLink: string = '/' + AppConsts.routes.items
  ngOnInit(): void {}
}
