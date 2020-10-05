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

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string
}

@Component({
  templateUrl: './orders.component.html',
  animations: [appModuleAnimation()]
})
export class OrdersComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _productService: ProductServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
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
}
