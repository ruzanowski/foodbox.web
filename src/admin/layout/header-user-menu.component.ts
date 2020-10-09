import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector
} from '@angular/core'
import { AppAuthService } from '../../shared/guards/app-auth.service'
import { AppSessionService } from '../../shared/session/app-session.service'
import { MenuItem } from '../../shared/layout/menu-item'
import { AppComponentBase } from '../../shared/app-component-base'

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent extends AppComponentBase
  implements OnInit {
  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    private sessionService: AppSessionService
  ) {
    super(injector)
  }

  currentUserId: number
  currentUserName: string
  menuItems: MenuItem[]

  logout(): void {
    this._authService.logout()
  }

  ngOnInit() {
    this.currentUserId = this.sessionService.userId
    this.currentUserName = this.sessionService.user.name || ''
    this.menuItems = this.getMenuItems()
  }

  getMenuItems(): MenuItem[] {
    return [
      new MenuItem(
        this.l('Zarządzaj'),
        '/manage',
        'fas fa-pencil-alt',
        'Pages.Orders'
      ),
      new MenuItem(
        this.l('Płatności'),
        '/manage/payments',
        'fas fa-user-edit',
        'Pages.Payments'
      )
    ]
  }
}
