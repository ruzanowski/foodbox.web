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
  CreateProductDto,
  ProductServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'create-product-dialog.component.html',
  styleUrls: ['create-product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProductDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  product: CreateProductDto = new CreateProductDto()
  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._productService
      .create(this.product)
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
