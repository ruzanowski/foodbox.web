import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core'
import { appModuleAnimation } from '../../../shared/animations/routerTransition'
import { OrderBasketItemDto } from '../../../shared/service-proxies/service-proxies'

@Component({
  selector: 'order-calendar',
  templateUrl: './order.calendar.component.html',
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})
export class OrderCalendarComponent {
  daysSelected: any[] = []
  @Input()
  orderBasketItem: OrderBasketItemDto

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (this.orderBasketItem.weekendsIncluded) {
      return true
    }

    const day = date.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
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

  select(calendar: any) {
    this.orderBasketItem.deliveryTimes.forEach((d) => {
      const date =
        d.dateTime.year() +
        '-' +
        ('00' + (d.dateTime.month() + 1)).slice(-2) +
        '-' +
        ('00' + d.dateTime.date()).slice(-2)
      this.daysSelected.push(date)
    })
    calendar.updateTodaysDate()
  }

  refreshDates(calendar: any) {
    this.orderBasketItem.deliveryTimes.forEach((d) => {
      this.select(calendar)
    })
  }
}
