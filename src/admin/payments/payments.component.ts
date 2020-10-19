import { Component, Injector } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { appModuleAnimation } from '@shared/animations/routerTransition'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base'
import {
  PaymentServiceProxy,
  PaymentDto,
  PaymentDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'
import { CreatePaymentDialogComponent } from './create-payment/create-payment-dialog.component'
import { EditPaymentDialogComponent } from './edit-payment/edit-payment-dialog.component'

class PagedPaymentsRequestDto extends PagedRequestDto {
  keyword: string
  isActive: boolean | null
}

@Component({
  templateUrl: './payments.component.html',
  animations: [appModuleAnimation()]
})
export class PaymentsComponent extends PagedListingComponentBase<PaymentDto> {
  payments: PaymentDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _paymentService: PaymentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
  }

  list(
    request: PagedPaymentsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.maxResultCount = 20

    this._paymentService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: PaymentDtoPagedResultDto) => {
        this.payments = result.items
        this.showPaging(result, pageNumber)
      })
  }

  delete(payment: PaymentDto): void {
    abp.message.confirm(
      this.l('PaymentDeleteWarningMessage', payment.transactionId),
      undefined,
      (result: boolean) => {
        if (result) {
          this._paymentService
            .delete(payment.id)
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

  createPayment(): void {
    this.showCreateOrEditPaymentDialog()
  }

  editPayment(payment: PaymentDto): void {
    this.showCreateOrEditPaymentDialog(payment.id)
  }

  showCreateOrEditPaymentDialog(id?: number): void {
    let createOrEditPaymentDialog: BsModalRef
    if (!id) {
      createOrEditPaymentDialog = this._modalService.show(
        CreatePaymentDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditPaymentDialog = this._modalService.show(
        EditPaymentDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditPaymentDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }
}
