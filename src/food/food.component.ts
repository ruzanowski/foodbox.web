import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Subscription } from 'rxjs'
import { AnchorScrollService } from './services/anchor-scroll-service/anchor-scroll.service'
import { Router } from '@angular/router'
import { WOW } from 'wowjs/dist/wow.min'
import { AppComponentBase } from '../shared/app-component-base'

declare var $: any

@Component({
  templateUrl: './food.component.html'
})
export class FoodComponent extends AppComponentBase
  implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription

  constructor(
    injector: Injector,
    private router: Router,
    private anchorService: AnchorScrollService
  ) {
    super(injector)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.anchorService.getMessage().subscribe((id) => {
      this.router.navigate(['']).then(() => {
        this.scroll(id)
      })
    })
  }

  ngAfterViewInit() {
    new WOW({
      live: false
    }).init()
  }
}
