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
  DiscountServiceProxy,
  DiscountDto
} from '@shared/service-proxies/service-proxies'
import { ItemsService } from '../../../food/services/items-service/items.service'

@Component({
  templateUrl: 'edit-discount-dialog.component.html',
  styleUrls: ['edit-discount-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDiscountDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  discount: DiscountDto = new DiscountDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _discountService: DiscountServiceProxy,
    public bsModalRef: BsModalRef,
    public itemsService: ItemsService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._discountService.get(this.id).subscribe((result: DiscountDto) => {
      this.discount = result
    })
  }

  save(): void {
    this.saving = true

    this._discountService
      .update(this.discount)
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
