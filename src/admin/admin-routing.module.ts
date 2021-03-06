import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UsersComponent } from './users/users.component'
import { TenantsComponent } from './tenants/tenants.component'
import { RolesComponent } from './roles/roles.component'
import { AdminComponent } from './admin.component'
import { AppRouteGuard } from '../shared/guards/auth-route-guard'
import { OrdersComponent } from './orders/orders.component'
import { ProductsComponent } from './products/products.component'
import { PaymentsComponent } from './payments/payments.component'
import { CaloriesComponent } from './calories/calories.component'
import { AdditionalsComponent } from './additionals/additionals.component'
import { DiscountsComponent } from './discounts/discounts.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'manage',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: OrdersComponent,
            canActivate: [AppRouteGuard]
          },
          {
            path: 'home',
            component: OrdersComponent,
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
          {
            path: 'orders',
            component: OrdersComponent,
            data: { permission: 'Pages.Orders' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'products',
            component: ProductsComponent,
            data: { permission: 'Pages.Products' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'payments',
            component: PaymentsComponent,
            data: { permission: 'Pages.Payments' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'calories',
            component: CaloriesComponent,
            data: { permission: 'Pages.Calories' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'additionals',
            component: AdditionalsComponent,
            data: { permission: 'Pages.Additionals' },
            canActivate: [AppRouteGuard]
          },
          {
            path: 'discounts',
            component: DiscountsComponent,
            data: { permission: 'Pages.Discounts' },
            canActivate: [AppRouteGuard]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
