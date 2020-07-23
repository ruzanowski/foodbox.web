import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BasketService } from '../../../../../services/basket-service/basket.service'
import { SimpleBasketItem } from '../../../../../models/basket-item'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { Period } from '../../../../../models/period'

@Component({
  selector: 'calories-dialog-section',
  templateUrl: './calories-dialog.component.html',
  styleUrls: ['./calories-dialog.component.css']
})
export class CaloriesDialogSectionComponent implements OnInit {
  calories: number[]
  periods: Period[]
  formGroup = new FormGroup({
    quantity: new FormControl('', [Validators.min(1), Validators.required]),
    calories: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    period: new FormControl('', [Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<CaloriesDialogSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaloriesDialog,
    private itemsService: ItemsService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.calories = this.itemsService.getCalories(this.data.name)
    this.periods = this.itemsService.getPeriods()
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
    this.formGroup.markAllAsTouched()
    this.basketService.add(this.transform(this.data))
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

export interface CaloriesDialog {
  name: string
  priceNominal: number
  calories: number
  quantity: number
  startDate: Date
  periodLengthInDays: number
}
