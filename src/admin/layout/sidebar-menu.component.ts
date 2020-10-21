import { Component, Injector, OnInit } from '@angular/core'
import { AppComponentBase } from '@shared/app-component-base'
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { MenuItem } from '@shared/layout/menu-item'

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[]
  menuItemsMap: { [key: number]: MenuItem } = {}
  activatedMenuItems: MenuItem[] = []
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined)
  homeRoute = '/app/manage/home'

  constructor(injector: Injector, private router: Router) {
    super(injector)
    this.router.events.subscribe(this.routerEvents)
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems()
    this.patchMenuItems(this.menuItems)
    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== '/' ? event.url : this.homeRoute
        const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
          .children[PRIMARY_OUTLET]
        if (primaryUrlSegmentGroup) {
          this.activateMenuItems('/' + primaryUrlSegmentGroup.toString())
        }
      })
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
        'fas fa-money-bill-alt',
        'Pages.Payments'
      ),

      new MenuItem(
        this.l('Produkty'),
        '/manage/products',
        'fas fa-cubes',
        'Pages.Products'
      ),
      new MenuItem(
        this.l('Kalorie'),
        '/manage/calories',
        'fas fa-dumbbell',
        'Pages.Calories'
      ),
      new MenuItem(
        this.l('Dodatki'),
        '/manage/additionals',
        'fas fa-utensils',
        'Pages.Additionals'
      ),
      new MenuItem(
        this.l('Zniżki'),
        '/manage/discounts',
        'fas fa-percent',
        'Pages.Discounts'
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

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1
      if (parentId) {
        item.parentId = parentId
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id)
      }
    })
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems)
    this.activatedMenuItems = []
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems)
    foundedItems.forEach((item) => {
      this.activateMenuItem(item)
    })
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false
      item.isCollapsed = true
      if (item.children) {
        this.deactivateMenuItems(item.children)
      }
    })
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item)
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems)
      }
    })
    return foundedItems
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true
    if (item.children) {
      item.isCollapsed = false
    }
    this.activatedMenuItems.push(item)
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId])
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true
    }
    return this.permission.isGranted(item.permissionName)
  }
}
