import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { BasketService } from '../../../../services/basket-service/basket.service'
import { MatDialog } from '@angular/material/dialog'
import { AppSessionService } from '../../../../../shared/session/app-session.service'

@Component({
  selector: 'basket-section',
  templateUrl: './basket-section.component.html',
  styleUrls: ['./basket-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketSectionComponent implements OnInit {
  @Input()
  previousLink: string

  @Input()
  previousString: string

  @Input()
  nextLink: string

  previousLinkExists: boolean

  constructor(
    public basketService: BasketService,
    public appSessionService: AppSessionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.previousLinkExists = this.previousLink !== undefined
  }
}
