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
import { BasketService } from '../../../../../services/basket-service/basket.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { FoodMenuDialog } from '../../../../../models/food-menu-dialog'
import { AppConsts } from '@shared/AppConsts'
import { Period } from '../../../../../models/period'

@Component({
  selector: 'food-menu-dialog-section',
  templateUrl: './food-menu-dialog.component.html',
  styleUrls: ['./food-menu-dialog.component.css'],
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
    public itemsService: ItemsService,
    private basketService: BasketService
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.mainForm = new FormGroup({
      productId: new FormControl(0, []),
      count: new FormControl(0, [Validators.min(1), Validators.required]),
      caloriesId: new FormControl(0, [Validators.required]),
      startDate: new FormControl(new Date()),
      periodLengthInDays: new FormControl(0, [Validators.required]),
      weekendsIncluded: new FormControl(false, []),
      cutleryIncluded: new FormControl(false, [])
    })
    this.minDate = AppConsts.ordering.minTimeToOrder
    this.periods = this.itemsService.getPeriods(false)
  }

  onNoClick(): void {
    this.dialogRef.close(this.data)
  }

  addItem() {
    this.data.startDate = this.mainForm.controls['startDate'].value as Date //workaround
    this.mainForm.markAllAsTouched()
    if (this.mainForm.valid) {
      if (!this.data.NoBasketWithGenericProductSelectionMode) {
        this.basketService.add(
          this.basketService.transformToSimpleBasketItem(this.data)
        )
      }

      this.onNoClick()
    } else {
      if (this.mainForm.errors && !this.mainForm.errors.mustMatch) {
        return
      }

      this.mainForm.setErrors(null)
    }
  }

  setPeriods() {
    this.periods = this.itemsService.getPeriods(this.data.weekendsIncluded)
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
