import { Component, Injector } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { appModuleAnimation } from '@shared/animations/routerTransition'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base'
import {
  DiscountServiceProxy,
  DiscountDto,
  DiscountDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'
import { CreateDiscountDialogComponent } from './create-discount/create-discount-dialog.component'
import { EditDiscountDialogComponent } from './edit-discount/edit-discount-dialog.component'

class PagedDiscountsRequestDto extends PagedRequestDto {
  keyword: string
  isActive: boolean | null
}

@Component({
  templateUrl: './discounts.component.html',
  animations: [appModuleAnimation()]
})
export class DiscountsComponent extends PagedListingComponentBase<DiscountDto> {
  discounts: DiscountDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _discountService: DiscountServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
  }

  list(
    request: PagedDiscountsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.maxResultCount = 20

    this._discountService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: DiscountDtoPagedResultDto) => {
        this.discounts = result.items
        this.showPaging(result, pageNumber)
      })
  }

  delete(discount: DiscountDto): void {
    abp.message.confirm(
      this.l('DiscountDeleteWarningMessage', discount.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._discountService
            .delete(discount.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('Pomyślnie usunięto'))
                this.refresh()
              })
            )
            .subscribe(() => {})
        }
      }
    )
  }

  createDiscount(): void {
    this.showCreateOrEditDiscountDialog()
  }

  editDiscount(discount: DiscountDto): void {
    this.showCreateOrEditDiscountDialog(discount.id)
  }

  showCreateOrEditDiscountDialog(id?: number): void {
    let createOrEditDiscountDialog: BsModalRef
    if (!id) {
      createOrEditDiscountDialog = this._modalService.show(
        CreateDiscountDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditDiscountDialog = this._modalService.show(
        EditDiscountDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditDiscountDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }
}
