import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AnchorScrollService } from './services/anchor-scroll-service/anchor-scroll.service'
import { Router } from '@angular/router'

declare var $: any

@Component({
  templateUrl: './food.component.html'
})
export class FoodComponent implements OnInit, OnDestroy {
  private subscription: Subscription

  constructor(
    private router: Router,
    private anchorService: AnchorScrollService
  ) {}

  scroll(id) {
    const element = document.getElementById(id)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    })
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
}
