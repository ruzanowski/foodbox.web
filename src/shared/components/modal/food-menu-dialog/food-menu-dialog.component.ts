import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AppConsts } from '@shared/AppConsts'
import { AppSessionService } from '@shared/session/app-session.service'
import { Period } from '../../../../food/models/period'
import { FoodMenuDialog } from '../../../../food/models/food-menu-dialog'
import { OrderService } from '../../../../food/services/order-service/order.service'
import { CreateOrderBasketItemDto } from '@shared/service-proxies/service-proxies'
import { DatesHelper } from '@shared/helpers/dates-helper'

@Component({
  selector: 'food-menu-dialog-section',
  templateUrl: './food-menu-dialog.component.html',
  styleUrls: ['./food-menu-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FoodMenuDialogSectionComponent implements OnInit, OnChanges {
  mainForm: FormGroup
  minDate: Date
  periods: Period[]

  constructor(
    public dialogRef: MatDialogRef<FoodMenuDialogSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodMenuDialog,
    public appSessionService: AppSessionService,
    private basketService: OrderService
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.mainForm = new FormGroup({
      productId: new FormControl(undefined, []),
      menuCount: new FormControl(undefined, [
        Validators.min(1),
        Validators.required
      ]),
      caloriesId: new FormControl(undefined, [Validators.required]),
      startDate: new FormControl(new Date()),
      periodLengthInDays: new FormControl(undefined, [Validators.required]),
      weekendsIncluded: new FormControl(false, []),
      cutleryIncluded: new FormControl(false, [])
    })
    this.minDate = AppConsts.ordering.minTimeToOrder
    this.periods = this.appSessionService.getPeriods(false)
  }

  onNoClick(): void {
    this.dialogRef.close(this.data)
  }

  addItem() {
    this.data.startDate = this.mainForm.controls['startDate'].value as Date //workaround
    this.mainForm.markAllAsTouched()
    if (this.mainForm.valid) {
      if (!this.data.NoBasketWithGenericProductSelectionMode) {
        this.basketService.add(this.transformToBasketItem(this.data))
      }

      this.onNoClick()
    } else {
      if (this.mainForm.errors && !this.mainForm.errors.mustMatch) {
        return
      }

      this.mainForm.setErrors(null)
    }
  }

  public transformToBasketItem(
    dialog: FoodMenuDialog
  ): CreateOrderBasketItemDto {
    return CreateOrderBasketItemDto.fromJS({
      productId: dialog.productId,
      caloriesId: dialog.caloriesId,
      count: dialog.count,
      cutleryFeeId: dialog.cutleryIncluded
        ? this.appSessionService.getAdditionalCutlery(undefined)?.id || 0
        : undefined,
      weekendsIncluded: dialog.weekendsIncluded,
      deliveryTimes: DatesHelper.getDeliveryTimes(dialog)
    })
  }

  setPeriods() {
    this.periods = this.appSessionService.getPeriods(this.data.weekendsIncluded)
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.mainForm.controls[controlName].hasError(errorName)
  }
}
