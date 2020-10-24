import { Injectable } from '@angular/core'

import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { OrderService } from '../../food/services/order-service/order.service'

@Injectable()
export class BasketRouteGuard implements CanActivate {
  constructor(private _router: Router, private _basketService: OrderService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // if (!this._basketService.anyItems()) {
    //   this._router.navigate(['/' + 'items'])
    //   abp.notify.warn(
    //     'Nie możesz przejść do tej strony, nie masz nic w koszyku.'
    //   )
    //   return false
    // }
    return true
  }
}
