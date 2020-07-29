import { Component, Input, OnInit } from '@angular/core'
import { HeaderStepItem } from '../../../../models/header-step-item'
import { AppConsts } from '../../../../../shared/AppConsts'

@Component({
  selector: 'order-header-section',
  templateUrl: './order-header-section.component.html',
  styleUrls: ['./order-header-section.component.css']
})
export class OrderHeaderSectionComponent implements OnInit {
  headerStepItem: HeaderStepItem[]
  @Input()
  activeCounter = -1

  constructor() {
    this.headerStepItem = [
      {
        step: 'disabled',
        counter: 1,
        description: 'Wybór',
        routerLink: '/' + AppConsts.routes.items
      },
      {
        step: 'disabled',
        counter: 2,
        description: 'Twoje dane',
        routerLink: '/' + AppConsts.routes.order
      },
      {
        step: 'disabled',
        counter: 3,
        description: 'Płatność',
        routerLink: '/' + AppConsts.routes.payment
      },
      {
        step: 'disabled',
        counter: 4,
        description: 'To wszystko!',
        routerLink: '/' + AppConsts.routes.confirmation
      }
    ]
  }

  ngOnInit() {
    if (this.activeCounter == 1) {
      this.headerStepItem[0].step = 'active'
      this.headerStepItem[1].step = 'disabled'
      this.headerStepItem[2].step = 'disabled'
      this.headerStepItem[3].step = 'disabled'
    }

    if (this.activeCounter == 2) {
      this.headerStepItem[0].step = 'complete'
      this.headerStepItem[1].step = 'active'
      this.headerStepItem[2].step = 'disabled'
      this.headerStepItem[3].step = 'disabled'
    }

    if (this.activeCounter == 3) {
      this.headerStepItem[0].step = 'complete'
      this.headerStepItem[1].step = 'complete'
      this.headerStepItem[2].step = 'active'
      this.headerStepItem[3].step = 'disabled'
    }

    if (this.activeCounter == 4) {
      this.headerStepItem[0].step = 'complete'
      this.headerStepItem[1].step = 'complete'
      this.headerStepItem[2].step = 'complete'
      this.headerStepItem[3].step = 'active'
    }
  }
}
