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
  AdditionalsDto,
  BasketDto,
  CaloriesDto,
  CreateOrderBasketItemDto,
  OrderBasketItemDto,
  OrderDto,
  OrderFormDto,
  OrderServiceProxy,
  ProductDto
} from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/app-component-base'
import { ItemsService } from '../../../food/services/items-service/items.service'

@Component({
  templateUrl: 'edit-order-dialog.component.html'
})
export class EditOrderDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  order: OrderDto
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    public bsModalRef: BsModalRef,
    public itemsService: ItemsService
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
    })
  }

  save(): void {
    this.saving = true

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
      item.productId = x.product.id
      item.caloriesId = x.calories?.id
      item.cutleryFeeId = x.cutlery?.id
      createOrder.push(item)
    })

    return createOrder
  }

  transformBack(orderItems: CreateOrderBasketItemDto[]): OrderBasketItemDto[] {
    let createOrder: OrderBasketItemDto[] = []
    orderItems.forEach((x) => {
      let item = OrderBasketItemDto.fromJS(x.toJSON())
      item.product = new ProductDto()
      item.product.id = x.productId
      item.calories = new CaloriesDto()
      item.calories.id = x.caloriesId
      item.cutlery = new AdditionalsDto()
      item.cutlery.id = x.cutleryFeeId
      item.delivery = new AdditionalsDto()
      createOrder.push(item)
    })

    return createOrder
  }

  acceptOrderItems(items: CreateOrderBasketItemDto[]) {
    this.order.basket.items = this.transformBack(items)
  }
}
