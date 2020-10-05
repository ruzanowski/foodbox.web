import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BasketService } from '../../../../../services/basket-service/basket.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { CaloriesDialog } from '../../../../../models/calories-dialog'
import { Period } from '../../../../../models/period'
import {AppConsts} from '../../../../../../shared/AppConsts';
import {FoodItem} from '../../../../../models/food-item';

@Component({
  selector: 'calories-dialog-section',
  templateUrl: './calories-dialog.component.html',
  styleUrls: ['./calories-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CaloriesDialogSectionComponent implements OnInit {
  calories: number[]
  productIds: FoodItem[]
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
    this.productIds = this.itemsService.getItems();
    this.periods = this.itemsService.getPeriods()

    this.mainForm = new FormGroup({
      productIds: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.min(1), Validators.required]),
      calories: new FormControl('', [Validators.required]),
      startDate: new FormControl(new Date()),
      period: new FormControl('', [Validators.required])
    })
    this.minDate = AppConsts.ordering.minTimeToOrder;
  }

  onNoClick(): void {



    this.dialogRef.close(this.data)
  }

  addItem() {
    this.mainForm.markAllAsTouched()
    if (this.mainForm.valid) {

        if(this.data.addToBasket){
            this.basketService.add(this.basketService.transformToSimpleBasketItem(this.data))
        }

        this.onNoClick()
    } else {
      if (this.mainForm.errors && !this.mainForm.errors.mustMatch) {
        return
      }

      this.mainForm.setErrors(null)
    }
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

