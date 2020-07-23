import { Component } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatDialog } from '@angular/material/dialog'
import { CaloriesDialogSectionComponent } from '../calories-dialog/calories-dialog.component'
import { FoodItem } from '../../../../../models/food-item'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { BasketItem } from '../../../../../models/basket-item'
import { BasketService } from '../../../../../services/basket-service/basket.service'

@Component({
  selector: 'items-main-menu-section',
  templateUrl: './items-main-menu-section.component.html',
  styleUrls: ['./items-main-menu-section.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ItemsMainMenuSectionComponent {
  foodItems: FoodItem[]
  result: BasketItem

  constructor(public dialog: MatDialog, private itemsService: ItemsService) {
    this.foodItems = this.itemsService.getItems()
  }

  openDialog(name, priceNominal) {
    const dialogRef = this.dialog.open(CaloriesDialogSectionComponent, {
      panelClass: 'calories-dialog',
      data: {
        name: name,
        priceNominal: priceNominal,
        calories: -1,
        quantity: 1,
        startDate: new Date(),
        periodLengthInDays: -1,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
      this.result = result
    })
  }
}
