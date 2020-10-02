import { Component, Injector } from '@angular/core'
import { finalize, map } from 'rxjs/operators'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '../../shared/paged-listing-component-base'
import {
  OrderBasketItemDto,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
  ProductDto,
  ProductServiceProxy
} from '../../shared/service-proxies/service-proxies'
import { appModuleAnimation } from '../../shared/animations/routerTransition'
import { CreateOrderDialogComponent } from './create-order/create-order-dialog.component'
import { EditOrderDialogComponent } from './edit-order/edit-order-dialog.component'
import { FormControl, FormGroup } from '@angular/forms'

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string
}

@Component({
  templateUrl: './orders.component.html',
  animations: [appModuleAnimation()]
})
export class OrdersComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = []
  productDict = new Map<string, ProductDto>()
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false
  daysSelected: any[] = []
  campaignOne: FormGroup

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _productService: ProductServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)

    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    })
  }

  list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword

    this._orderService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items

        this.showPaging(result, pageNumber)
      })
  }

  delete(order: OrderDto): void {
    abp.message.confirm(
      this.l('OrderDeleteWarningMessage', order.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService
            .delete(order.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'))
                this.refresh()
              })
            )
            .subscribe(() => {})
        }
      }
    )
  }

  createOrder(): void {
    this.showCreateOrEditOrderDialog()
  }

  editOrder(tenant: OrderDto): void {
    this.showCreateOrEditOrderDialog(tenant.id)
  }

  showCreateOrEditOrderDialog(id?: number): void {
    let createOrEditOrderDialog: BsModalRef
    if (!id) {
      createOrEditOrderDialog = this._modalService.show(
        CreateOrderDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditOrderDialog = this._modalService.show(
        EditOrderDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditOrderDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2)
    return this.daysSelected.find((x) => x == date) ? 'selected' : null
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
  }

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2)
    const index = this.daysSelected.findIndex((x) => x == date)
    if (index < 0) {
      this.daysSelected.push(date)
    } else {
      this.daysSelected.splice(index, 1)
    }

    calendar.updateTodaysDate()
  }

  selectedDate(order: OrderDto) {
    let deliveryTimes = Array<any>()
    order.basket.items.forEach((item) => {
      item.deliveryTimes.forEach((d) => deliveryTimes.push(d.dateTime))
    })
  }
}
