import {Input, Component, ViewEncapsulation, OnInit} from '@angular/core';
import {appModuleAnimation} from '../../../shared/animations/routerTransition';
import {CaloriesDialogSectionComponent} from '../../../food/components/order/1-items/sections/calories-dialog/calories-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ItemsService} from '../../../food/services/items-service/items.service';
import {CreateDeliveryTimeDto, CreateOrderBasketItemDto} from '../../../shared/service-proxies/service-proxies';
import {DatesHelper} from '../../../shared/helpers/dates-helper';

@Component({
    selector: 'order-add-items-section',
    templateUrl: './order-items-section.component.html',
    animations: [appModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class OrderItemsSectionComponent implements OnInit {
    @Input() rows: CreateOrderBasketItemDto[] = [];
    columns = [];

    constructor(public dialog: MatDialog, public itemsService: ItemsService) {
        this.columns = ['Typ', 'Ilość', 'Okres'];
    }

    ngOnInit() {
    }

    addItem(e: any) {
        e.stopPropagation();
        e.preventDefault();
        const dialogRef = this.dialog.open(CaloriesDialogSectionComponent, {
            panelClass: 'calories-dialog-section',
            data: {
                productId: 0,
                name: name,
                startDate: undefined,
                periodLengthInDays: 0,
                weekendsIncluded: false,
                cutleryIncluded: false,
                caloriesId: 0,
                count: 1,
                NoBasketWithGenericProductSelectionMode: true
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
                return;
            }

            let createOrder = new CreateOrderBasketItemDto();
            createOrder.weekendsIncluded = result.weekendsIncluded;
            createOrder.productId = result.productId;
            createOrder.deliveryTimes = [];

            const dates =
                DatesHelper.getDates(
                    result.startDate,
                    DatesHelper.addDays(result.startDate, result.periodLengthInDays)
                );

            dates.forEach(date => {
                createOrder.deliveryTimes.push(CreateDeliveryTimeDto.fromJS({
                    'dateTime': date
                }));
            });

            createOrder.cutleryFeeId = result.cutleryIncluded ? this.itemsService.getAdditionalCutlery(undefined)?.id || 0 : 0;
            createOrder.caloriesId = result.caloriesId;
            createOrder.count = result?.count;

            this.rows.push(createOrder);
        });
    }

    deleteItem(index) {
        this.rows.splice(index, 1);
    }
}
