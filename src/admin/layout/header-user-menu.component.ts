import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { AppAuthService } from '../../shared/guards/app-auth.service'
import { AppSessionService } from '../../shared/session/app-session.service'

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent implements OnInit {
  constructor(
    private _authService: AppAuthService,
    private sessionService: AppSessionService
  ) {}
  currentUserId: number
  currentUserName: string

  logout(): void {
    this._authService.logout()
  }

  ngOnInit() {
    this.currentUserId = this.sessionService.userId
    this.currentUserName = this.sessionService.user.name || ''
  }
}
