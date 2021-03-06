import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import {
  BasketDto,
  CreateOrderBasketItemDto,
  OrderBasketItemDto,
  OrderDto,
  OrderFormDto,
  OrderServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/app-component-base'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'edit-order-dialog.component.html',
  styleUrls: ['edit-order-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditOrderDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  order: OrderDto
  createOrderItems: CreateOrderBasketItemDto[] = []
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
    this.order = new OrderDto()
    this.order.form = new OrderFormDto()
    this.order.basket = new BasketDto()
    this.order.basket.items = []
  }

  ngOnInit(): void {
    this._orderService.get(this.id).subscribe((result: OrderDto) => {
      this.order = result
      this.createOrderItems = this.transform(result.basket.items)
    })
  }

  save(): void {
    this.saving = true

    this.order.basket.items.forEach((x) => {
      x.cutlery = null
      x.delivery = null
      x.calories = null
      x.product = null
    })

    this._orderService
      .update(this.order)
      .pipe(
        finalize(() => {
          this.saving = false
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('Pomyślnie zapisano'))
        this.bsModalRef.hide()
        this.onSave.emit()
      })
  }

  transform(orderItems: OrderBasketItemDto[]): CreateOrderBasketItemDto[] {
    let createOrder: CreateOrderBasketItemDto[] = []
    orderItems.forEach((x) => {
      let item = CreateOrderBasketItemDto.fromJS(x.toJSON())
      createOrder.push(item)
    })

    return createOrder
  }

  transformBack(orderItems: CreateOrderBasketItemDto[]): OrderBasketItemDto[] {
    let createOrder: OrderBasketItemDto[] = []
    orderItems.forEach((x) => {
      let item = OrderBasketItemDto.fromJS(x.toJSON())
      createOrder.push(item)
    })

    return createOrder
  }

  acceptOrderItems(items: CreateOrderBasketItemDto[]) {
    this.order.basket.items = this.transformBack(items)
  }
}
