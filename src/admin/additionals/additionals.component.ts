import { Component, Injector } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { appModuleAnimation } from '@shared/animations/routerTransition'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base'
import {
  AdditionalsServiceProxy,
  AdditionalsDto,
  AdditionalsDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'
import { CreateAdditionalsDialogComponent } from './create-additionals/create-additionals-dialog.component'
import { EditAdditionalsDialogComponent } from './edit-additionals/edit-additionals-dialog.component'

class PagedAdditionalssRequestDto extends PagedRequestDto {
  keyword: string
  isActive: boolean | null
}

@Component({
  templateUrl: './additionals.component.html',
  animations: [appModuleAnimation()]
})
export class AdditionalsComponent extends PagedListingComponentBase<
  AdditionalsDto
> {
  additionals: AdditionalsDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _additionalsService: AdditionalsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
  }

  list(
    request: PagedAdditionalssRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.maxResultCount = 20

    this._additionalsService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: AdditionalsDtoPagedResultDto) => {
        this.additionals = result.items
        this.showPaging(result, pageNumber)
      })
  }

  delete(additionals: AdditionalsDto): void {
    abp.message.confirm(
      this.l('AdditionalsDeleteWarningMessage', additionals.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._additionalsService
            .delete(additionals.id)
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

  createAdditionals(): void {
    this.showCreateOrEditAdditionalsDialog()
  }

  editAdditionals(additionals: AdditionalsDto): void {
    this.showCreateOrEditAdditionalsDialog(additionals.id)
  }

  showCreateOrEditAdditionalsDialog(id?: number): void {
    let createOrEditAdditionalsDialog: BsModalRef
    if (!id) {
      createOrEditAdditionalsDialog = this._modalService.show(
        CreateAdditionalsDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditAdditionalsDialog = this._modalService.show(
        EditAdditionalsDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditAdditionalsDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }
}
