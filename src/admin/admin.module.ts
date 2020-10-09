import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientJsonpModule } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { NgxPaginationModule } from 'ngx-pagination'
import { AdminRoutingModule } from './admin-routing.module'
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module'
import { SharedModule } from '../shared/shared.module'
// tenants
import { TenantsComponent } from './tenants/tenants.component'
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component'
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component'
// roles
import { RolesComponent } from './roles/roles.component'
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component'
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component'
// users
import { UsersComponent } from './users/users.component'
import { CreateUserDialogComponent } from './users/create-user/create-user-dialog.component'
import { EditUserDialogComponent } from './users/edit-user/edit-user-dialog.component'
import { ChangePasswordComponent } from './users/change-password/change-password.component'
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component'
// layout
import { HeaderComponent } from './layout/header.component'
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component'
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component'
import { HeaderUserMenuComponent } from './layout/header-user-menu.component'
import { FooterComponent } from './layout/footer.component'
import { SidebarComponent } from './layout/sidebar.component'
import { SidebarLogoComponent } from './layout/sidebar-logo.component'
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component'
import { SidebarMenuComponent } from './layout/sidebar-menu.component'
import { AdminComponent } from './admin.component'
import { CreateOrderDialogComponent } from './orders/create-order/create-order-dialog.component'
import { EditOrderDialogComponent } from './orders/edit-order/edit-order-dialog.component'
import { OrdersComponent } from './orders/orders.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { OrderCalendarComponent } from './orders/order-calendar/order.calendar.component'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { OrderItemsSectionComponent } from './orders/order-items/order-items-section.component'

@NgModule({
  declarations: [
    AdminComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    //orders
    OrdersComponent,
    CreateOrderDialogComponent,
    EditOrderDialogComponent,
    OrderCalendarComponent,
    OrderItemsSectionComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AdminRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  exports: [HeaderUserMenuComponent, HeaderLanguageMenuComponent],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent
  ]
})
export class AdminModule {}
