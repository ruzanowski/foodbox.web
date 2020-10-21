import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppComponentBase } from '@shared/app-component-base'
import {
  PaymentServiceProxy,
  PaymentDto
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'edit-payment-dialog.component.html',
  styleUrls: ['edit-payment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPaymentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  payment: PaymentDto = new PaymentDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _paymentService: PaymentServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._paymentService.get(this.id).subscribe((result: PaymentDto) => {
      this.payment = result
    })
  }

  save(): void {
    this.saving = true

    this._paymentService
      .update(this.payment)
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
