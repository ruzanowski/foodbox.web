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
  CreateDiscountDto,
  DiscountServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'create-discount-dialog.component.html',
  styleUrls: ['create-discount-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateDiscountDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  discount: CreateDiscountDto = new CreateDiscountDto()
  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _discountService: DiscountServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._discountService
      .create(this.discount)
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
