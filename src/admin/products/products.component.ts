import { Component, Injector } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { appModuleAnimation } from '@shared/animations/routerTransition'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base'
import {
  ProductServiceProxy,
  ProductDto,
  ProductDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'
import { CreateProductDialogComponent } from './create-product/create-product-dialog.component'
import { EditProductDialogComponent } from './edit-product/edit-product-dialog.component'

class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string
  isActive: boolean | null
}

@Component({
  templateUrl: './products.component.html',
  animations: [appModuleAnimation()]
})
export class ProductsComponent extends PagedListingComponentBase<ProductDto> {
  products: ProductDto[] = []
  keyword = ''
  isActive: boolean | null
  advancedFiltersVisible = false

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector)
  }

  list(
    request: PagedProductsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.maxResultCount = 20

    this._productService
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe((result: ProductDtoPagedResultDto) => {
        this.products = result.items
        this.showPaging(result, pageNumber)
      })
  }

  delete(product: ProductDto): void {
    abp.message.confirm(
      this.l('ProductDeleteWarningMessage', product.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productService
            .delete(product.id)
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

  createProduct(): void {
    this.showCreateOrEditProductDialog()
  }

  editProduct(product: ProductDto): void {
    this.showCreateOrEditProductDialog(product.id)
  }

  showCreateOrEditProductDialog(id?: number): void {
    let createOrEditProductDialog: BsModalRef
    if (!id) {
      createOrEditProductDialog = this._modalService.show(
        CreateProductDialogComponent,
        {
          class: 'modal-lg'
        }
      )
    } else {
      createOrEditProductDialog = this._modalService.show(
        EditProductDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          }
        }
      )
    }

    createOrEditProductDialog.content.onSave.subscribe(() => {
      this.refresh()
    })
  }

  clearFilters(): void {
    this.keyword = ''
    this.isActive = undefined
    this.getDataPage(1)
  }
}
