import { Component, Input, OnInit } from '@angular/core'
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
        header: 'Wybierz swój zestaw',
        step: 'disabled',
        counter: 1,
        description: 'Wybór',
        routerLink: '/' + 'items',
        fadeInDelay: '0.1s'
      },
      {
        header: 'Uzupełnij swoje dane',
        step: 'disabled',
        counter: 2,
        description: 'Dane',
        routerLink: '/' + 'order',
        fadeInDelay: '0.2s'
      },
      {
        header: 'Zapłać za swój zestaw',
        step: 'disabled',
        counter: 3,
        description: 'Płatność',
        routerLink: '/' + 'payment',
        fadeInDelay: '0.3s'
      }
    ]
  }

  ngOnInit() {
    if (this.activeCounter == 1) {
      this.headerStepItem[0].step = 'active'
      this.headerStepItem[1].step = 'disabled'
      this.headerStepItem[2].step = 'disabled'
    }

    if (this.activeCounter == 2) {
      this.headerStepItem[0].step = 'complete'
      this.headerStepItem[1].step = 'active'
      this.headerStepItem[2].step = 'disabled'
    }

    if (this.activeCounter == 3) {
      this.headerStepItem[0].step = 'complete'
      this.headerStepItem[1].step = 'complete'
      this.headerStepItem[2].step = 'active'
    }
  }
}

export interface HeaderStepItem {
  header: string
  step: string
  counter: number
  description: string
  routerLink: string
  fadeInDelay: string
}
