import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'items-main-menu-section',
    templateUrl: './items-main-menu-section.component.html',
    styleUrls: ['./items-main-menu-section.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ItemsMainMenuSectionComponent {

    const;
    foodItems: FoodItem[] = [
        {price: 50, name: 'Standard', description: 'Zbilansowane posiłki zawierające mięso.'},
        {price: 40, name: 'Vege', description: 'Zbilansowane wegetariańskie posiłki.'},
        {price: 30, name: 'Sport', description: 'Zbilansowane posiłki dla sportowców.'},
    ];
}

export interface FoodItem {
    name: string;
    price: number;
    description: string;
}
