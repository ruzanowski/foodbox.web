import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import { AppConsts } from '../../../../shared/AppConsts'
import { AppComponentBase } from '../../../../shared/app-component-base'

@Component({
  selector: 'food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodItemsComponent extends AppComponentBase implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.items
  nextLink: string = '/order'

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {}
}
