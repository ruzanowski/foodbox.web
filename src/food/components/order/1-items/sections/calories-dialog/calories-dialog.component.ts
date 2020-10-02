import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BasketService } from '../../../../../services/basket-service/basket.service'
import { SimpleBasketItem } from '../../../../../models/basket-item'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { CaloriesDialog } from '../../../../../models/calories-dialog'
import { Period } from '../../../../../models/period'

@Component({
  selector: 'calories-dialog-section',
  templateUrl: './calories-dialog.component.html',
  styleUrls: ['./calories-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CaloriesDialogSectionComponent implements OnInit {
  calories: number[]
  periods: Period[]
  mainForm: FormGroup
  minDate: Date
  weekendsIncluded = false
  cutleryIncluded = false

  constructor(
    public dialogRef: MatDialogRef<CaloriesDialogSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaloriesDialog,
    private itemsService: ItemsService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.calories = this.itemsService.getCalories(this.data.name)
    this.periods = this.itemsService.getPeriods()

    this.mainForm = new FormGroup({
      quantity: new FormControl('', [Validators.min(1), Validators.required]),
      calories: new FormControl('', [Validators.required]),
      startDate: new FormControl(new Date()),
      period: new FormControl('', [Validators.required])
    })
    this.minDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
  }

  addItem() {
    this.mainForm.markAllAsTouched()
    if (this.mainForm.valid) {
      this.basketService.add(this.transform(this.data))
      this.onNoClick()
    } else {
      if (this.mainForm.errors && !this.mainForm.errors.mustMatch) {
        return
      }

      this.mainForm.setErrors(null)
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.mainForm.controls[controlName].hasError(errorName)
  }

  transform(calories: CaloriesDialog): SimpleBasketItem {
    return {
      name: calories.name,
      calories: calories.calories,
      quantity: calories.quantity,
      periodIncludesWeekends: false,
      priceNominal: calories.priceNominal,
      startDate: calories.startDate,
      periodLengthInDays: calories.periodLengthInDays
    }
  }
}
