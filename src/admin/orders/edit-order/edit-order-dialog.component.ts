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
  OrderDto,
  OrderServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '../../../shared/app-component-base'

@Component({
  templateUrl: 'edit-order-dialog.component.html'
})
export class EditOrderDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  tenant: OrderDto = new OrderDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _tenantService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._tenantService.get(this.id).subscribe((result: OrderDto) => {
      this.tenant = result
    })
  }

  save(): void {
    this.saving = true

    this._tenantService
      .update(this.tenant)
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
