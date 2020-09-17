import {
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Basket } from '../../../../models/basket'
import { BasketService } from '../../../../services/basket-service/basket.service'
import { LoginModalComponent } from '../../../modals/login/login-modal.component'
import { RegisterModalComponent } from '../../../modals/register/register-modal.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'basket-section',
  templateUrl: './basket-section.component.html',
  styleUrls: ['./basket-section.component.scss']
})
export class BasketSectionComponent implements OnInit {
  daysSelected: any[] = []
  event: any
  date: any
  basket: Basket

  @Input()
  previousLink: string

  @Input()
  previousString: string

  @Input()
  nextLink: string

  previousLinkExists: boolean

  constructor(public basketService: BasketService, public dialog: MatDialog) {}

  ngOnInit() {
    this.basket = this.basketService.get()
    this.previousLinkExists = this.previousLink !== undefined
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

  openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`)
    })
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterModalComponent)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`)
    })
  }
}
