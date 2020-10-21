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
  ProductServiceProxy,
  ProductDto,
  TaxDto
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'edit-product-dialog.component.html',
  styleUrls: ['edit-product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  product: ProductDto = new ProductDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._productService.get(this.id).subscribe((result: ProductDto) => {
      this.product = result
    })
  }

  save(): void {
    this.saving = true
    this.product.tax = null

    this._productService
      .update(this.product)
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
