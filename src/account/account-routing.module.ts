import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AccountComponent } from './account.component'
import { ChangePasswordComponent } from '../admin/users/change-password/change-password.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        children: [
          { path: '', component: LoginComponent, pathMatch: 'full' },
          { path: 'login', component: LoginComponent, pathMatch: 'full' },
          { path: 'register', component: RegisterComponent, pathMatch: 'full' },
          {
            path: 'update-password',
            component: ChangePasswordComponent,
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
