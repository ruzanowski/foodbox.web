import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import {
  CreateBasketDto,
  CreateOrderBasketItemDto,
  CreateOrderDto,
  CreateOrderFormDto,
  OrderServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/app-component-base'

@Component({
  templateUrl: 'create-order-dialog.component.html'
})
export class CreateOrderDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  order: CreateOrderDto

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.order = new CreateOrderDto()
    this.order.form = new CreateOrderFormDto()
    this.order.basket = new CreateBasketDto()
    this.order.basket.items = []
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._orderService
      .create(this.order)
      .pipe(
        finalize(() => {
          this.saving = false
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'))
        this.bsModalRef.hide()
        this.onSave.emit()
      })
  }
}
