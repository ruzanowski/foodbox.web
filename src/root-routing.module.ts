import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('food/food.module').then((m) => m.FoodModule), // Lazy load account module
    data: { preload: true }
  },
  {
    path: 'account',
    loadChildren: () =>
      import('account/account.module').then((m) => m.AccountModule), // Lazy load account module
    data: { preload: true }
  },
  {
    path: 'admin',
    loadChildren: () => import('admin/admin.module').then((m) => m.AdminModule), // Lazy load account module
    data: { preload: true }
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class RootRoutingModule {}
