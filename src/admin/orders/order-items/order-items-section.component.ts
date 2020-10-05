import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';
import { appModuleAnimation } from '../../../shared/animations/routerTransition'
import {CaloriesDialogSectionComponent} from '../../../food/components/order/1-items/sections/calories-dialog/calories-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BasketItem} from '../../../food/models/basket-item';
import {ItemsService} from '../../../food/services/items-service/items.service';
import {CreateOrderBasketItemDto, CreateOrderDto} from '../../../shared/service-proxies/service-proxies';
import {CaloriesDialog} from '../../../food/models/calories-dialog';

@Component({
  selector: 'order-add-items-section',
  templateUrl: './order-items-section.component.html',
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})
export class OrderItemsSectionComponent {
    @Input() rows: CreateOrderBasketItemDto[] = [];
    columns = [];

    constructor(public dialog: MatDialog,
    private itemsService: ItemsService) {
        this.columns = [
            "Typ",
            "Ilość",
            "Okres"
        ];
    }

    addItem(e: any) {
        e.stopPropagation();
        e.preventDefault();
        const dialogRef = this.dialog.open(CaloriesDialogSectionComponent, {
            panelClass: 'calories-dialog-section',
            data: {
                productId: 0,
                name: name,
                priceNominal: this.itemsService.getNominalPrice(name),
                calories: undefined,
                quantity: undefined,
                startDate: undefined,
                periodLengthInDays: undefined,
                weekendsIncluded: false,
                count: undefined,
                addToBasket: false
            }
        })

        dialogRef.afterClosed().subscribe((result) => {
            let calories = new CreateOrderBasketItemDto();
            calories.weekendsIncluded = result.weekendsIncluded;
            calories.productId = result.productId;
            calories.deliveryTimes = [];
            calories.count = result.count;

            this.rows.push(calories);
        })
    }

    deleteItem(index) {
        this.rows.splice(index, 1);
    }
}
