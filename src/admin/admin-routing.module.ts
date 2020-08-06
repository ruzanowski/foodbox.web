import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { UsersComponent } from './users/users.component'
import { TenantsComponent } from './tenants/tenants.component'
import { RolesComponent } from './roles/roles.component'
import { AdminComponent } from './admin.component'
import { AppRouteGuard } from '../shared/guards/auth-route-guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            canActivate: [AppRouteGuard]
          },
          {
            path: 'home',
            component: HomeComponent,
            canActivate: [AppRouteGuard]
          },
          {
            path: 'users',
            component: UsersComponent,
            data: { permission: 'Pages.Users' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'roles',
            component: RolesComponent,
            data: { permission: 'Pages.Roles' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'tenants',
            component: TenantsComponent,
            data: { permission: 'Pages.Tenants' },
            canActivate: [AppRouteGuard]
          },
          { path: 'about', component: AboutComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
