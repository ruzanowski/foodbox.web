import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppComponentBase } from '@shared/app-component-base'
import {
  CreatePaymentDto,
  PaymentServiceProxy
} from '@shared/service-proxies/service-proxies'
import { ItemsService } from '../../../food/services/items-service/items.service'

@Component({
  templateUrl: 'create-payment-dialog.component.html',
  styleUrls: ['create-payment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePaymentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  payment: CreatePaymentDto = new CreatePaymentDto()
  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _paymentService: PaymentServiceProxy,
    public bsModalRef: BsModalRef,
    public itemsService: ItemsService
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._paymentService
      .create(this.payment)
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
}
