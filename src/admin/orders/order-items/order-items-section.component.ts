import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CreateOrderBasketItemDto } from '@shared/service-proxies/service-proxies'
import { DatesHelper } from '@shared/helpers/dates-helper'
import { AppSessionService } from '@shared/session/app-session.service'
import { FoodMenuDialogSectionComponent } from '@shared/components/modal/food-menu-dialog/food-menu-dialog.component'

@Component({
  selector: 'order-add-items-section',
  templateUrl: './order-items-section.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsSectionComponent {
  @Input()
  rows: CreateOrderBasketItemDto[] = []

  @Output()
  rowsOut = new EventEmitter<CreateOrderBasketItemDto[]>()

  columns = []

  constructor(
    public dialog: MatDialog,
    public appSessionService: AppSessionService
  ) {
    this.columns = ['Typ', 'Ilość', 'Okres']
  }

  addItem(e: any) {
    e.stopPropagation()
    e.preventDefault()
    const dialogRef = this.dialog.open(FoodMenuDialogSectionComponent, {
      panelClass: 'calories-dialog-section',
      data: {
        productId: 0,
        name: undefined,
        startDate: new Date(),
        periodLengthInDays: 0,
        weekendsIncluded: false,
        cutleryIncluded: false,
        caloriesId: 0,
        count: 1,
        NoBasketWithGenericProductSelectionMode: true
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return
      }

      let createOrder = new CreateOrderBasketItemDto()
      createOrder.weekendsIncluded = result.weekendsIncluded
      createOrder.productId = result.productId
      createOrder.deliveryTimes = DatesHelper.getDeliveryTimes(result)
      createOrder.cutleryFeeId = result.cutleryIncluded
        ? this.appSessionService.getAdditionalCutlery(undefined)?.id || 0
        : undefined
      createOrder.caloriesId = result.caloriesId
      createOrder.count = result?.count

      this.rows.push(createOrder)
      this.rowsOut.emit(this.rows)
    })
  }

  deleteItem(index) {
    this.rows.splice(index, 1)
    this.rowsOut.emit(this.rows)
  }
}
