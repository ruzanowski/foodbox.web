import { Injectable } from '@angular/core'

import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { BasketService } from '../../food/services/basket-service/basket.service'
import { AppConsts } from '../AppConsts'

@Injectable()
export class BasketRouteGuard implements CanActivate {
  constructor(private _router: Router, private _basketService: BasketService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this._basketService.any()) {
      this._router.navigate(['/' + 'items'])
      abp.notify.info(
        'Nie możesz przejść do tej strony, nie masz nic w koszyku.'
      )
      return false
    }
    return true
  }
}
