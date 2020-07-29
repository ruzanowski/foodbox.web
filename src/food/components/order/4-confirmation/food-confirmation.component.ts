import { Component, OnInit } from '@angular/core'
import { AppConsts } from '../../../../shared/AppConsts'
import { Basket } from '../../../models/basket'
import { BasketService } from '../../../services/basket-service/basket.service'

@Component({
  selector: 'food-confirmation',
  templateUrl: './food-confirmation.component.html',
  styleUrls: ['./food-confirmation.component.css']
})
export class FoodConfirmationComponent implements OnInit {
  currentOrder: number = AppConsts.orderingWorkflow.confirmation
  basket: Basket
  daysSelected: any[] = []
  event: any
  date: any

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket = this.basketService.get()
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2)
    return this.daysSelected.find((x) => x == date) ? 'selected' : null
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
  }

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2)
    const index = this.daysSelected.findIndex((x) => x == date)
    if (index < 0) {
      this.daysSelected.push(date)
    } else {
      this.daysSelected.splice(index, 1)
    }

    calendar.updateTodaysDate()
  }
}
