import { Component, Injector } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { appModuleAnimation } from '@shared/animations/routerTransition'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base'
import {
  CaloriesServiceProxy,
  CaloriesDto,
  CaloriesDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'
import { CreateCaloriesDialogComponent } from './create-calories/create-calories-dialog.component'
import { EditCaloriesDialogComponent } from './edit-calories/edit-calories-dialog.component'

class PagedCaloriessRequestDto extends PagedRequestDto {
  keyword: string
  isActive: boolean | null
}

@Component({
  templateUrl: './calories.component.html',
  animations: [appModuleAnimation()]
})
export class CaloriesComponent extends PagedListingComponentBase<CaloriesDto> {
  calories: CaloriesDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _caloriesService: CaloriesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
  }

  list(
    request: PagedCaloriessRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.maxResultCount = 20

    this._caloriesService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: CaloriesDtoPagedResultDto) => {
        this.calories = result.items
        this.showPaging(result, pageNumber)
      })
  }

  delete(calories: CaloriesDto): void {
    abp.message.confirm(
      this.l('CaloriesDeleteWarningMessage', calories.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._caloriesService
            .delete(calories.id)
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

  createCalories(): void {
    this.showCreateOrEditCaloriesDialog()
  }

  editCalories(calories: CaloriesDto): void {
    this.showCreateOrEditCaloriesDialog(calories.id)
  }

  showCreateOrEditCaloriesDialog(id?: number): void {
    let createOrEditCaloriesDialog: BsModalRef
    if (!id) {
      createOrEditCaloriesDialog = this._modalService.show(
        CreateCaloriesDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditCaloriesDialog = this._modalService.show(
        EditCaloriesDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditCaloriesDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }
}
