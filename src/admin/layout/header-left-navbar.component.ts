import {Component, ChangeDetectionStrategy, OnInit, Injector} from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service'
import {MenuItem} from '../../shared/layout/menu-item';
import {AppComponentBase} from '../../shared/app-component-base';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean
  menuItems: MenuItem[]

  constructor(injector: Injector, private _layoutStore: LayoutStoreService) {
      super(injector)
  }

  ngOnInit(): void {
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value
    })
    this.menuItems = this.getMenuItems()

  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded)
  }

    getMenuItems(): MenuItem[] {
        return [
            new MenuItem(
                this.l('Zamówienia'),
                '/manage/orders',
                'fas fa-cart-plus',
                'Pages.Orders'
            ),
            new MenuItem(
                this.l('Płatności'),
                '/manage/payments',
                'fas fa-theater-masks',
                'Pages.Payments'
            ),
            new MenuItem(
                this.l('Produkty'),
                '/manage/products',
                'fas fa-theater-masks',
                'Pages.Products'
            ),
            new MenuItem(
                this.l('Tenants'),
                '/manage/tenants',
                'fas fa-building',
                'Pages.Tenants'
            ),
            new MenuItem(
                this.l('Użytkownicy'),
                '/manage/users',
                'fas fa-users',
                'Pages.Users'
            ),
            new MenuItem(
                this.l('Role'),
                '/manage/roles',
                'fas fa-theater-masks',
                'Pages.Roles'
            ),
            new MenuItem(this.l('Strona główna'), '/', 'fas fa-home')
        ]
    }
}
