import { Component, Input, ViewEncapsulation } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CaloriesDialogSectionComponent } from '../calories-dialog/calories-dialog.component'
import { FoodItem } from '../../../../../models/food-item'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { BasketItem } from '../../../../../models/basket-item'
import { Router } from '@angular/router'
import { AppConsts } from '../../../../../../shared/AppConsts'

@Component({
  selector: 'items-main-menu-section',
  templateUrl: './items-main-menu-section.component.html',
  styleUrls: ['./items-main-menu-section.component.css']
})
export class ItemsMainMenuSectionComponent {
  foodItems: FoodItem[]
  result: BasketItem
  @Input()
  modalEnabled: boolean = true

  constructor(
    public dialog: MatDialog,
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.foodItems = this.itemsService.getItems()
  }

  onSubmit(name, priceNominal) {
    if (this.modalEnabled) {
      const dialogRef = this.dialog.open(CaloriesDialogSectionComponent, {
        panelClass: 'calories-dialog-section',
        data: {
          name: name,
          priceNominal: priceNominal,
          calories: undefined,
          quantity: undefined,
          startDate: undefined,
          periodLengthInDays: undefined
        }
      })

      dialogRef.afterClosed().subscribe((result) => {
        this.result = result
      })
    } else {
      this.router.navigate(['/' + AppConsts.routes.items])
    }
  }
}
