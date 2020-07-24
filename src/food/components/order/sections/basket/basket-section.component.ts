import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Basket } from '../../../../models/basket'
import { BasketService } from '../../../../services/basket-service/basket.service'

@Component({
  selector: 'basket-section',
  templateUrl: './basket-section.component.html',
  styleUrls: ['./basket-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketSectionComponent implements OnInit {
  daysSelected: any[] = []
  event: any
  date: any
  basket: Basket

  constructor(private basketService: BasketService) {}

  ngOnInit() {
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
