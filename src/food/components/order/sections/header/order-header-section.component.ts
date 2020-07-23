import { Component, Input, OnInit } from '@angular/core'
import { HeaderStepItem } from '../../../../models/header-step-item'

@Component({
  selector: 'order-header-section',
  templateUrl: './order-header-section.component.html',
  styleUrls: ['./order-header-section.component.css'],
})
export class OrderHeaderSectionComponent implements OnInit {
  headerStepItem: HeaderStepItem[]
  @Input()
  activeCounter = -1

  constructor() {
    this.headerStepItem = [
      {
        activeOrDisabled: 'disabled',
        counter: 1,
        description: 'Wybór',
        routerLink: '/items',
      },
      {
        activeOrDisabled: 'disabled',
        counter: 2,
        description: 'Twoje dane',
        routerLink: '/order',
      },
      {
        activeOrDisabled: 'disabled',
        counter: 3,
        description: 'Płatność',
        routerLink: '/payment',
      },
      {
        activeOrDisabled: 'disabled',
        counter: 4,
        description: 'To wszystko!',
        routerLink: '/thanks',
      },
    ]
  }

  ngOnInit() {
    if (this.activeCounter !== -1) {
      this.headerStepItem[this.activeCounter - 1].activeOrDisabled = 'active'
    }
  }
}
