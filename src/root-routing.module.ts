import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppPreloader } from '@shared/helpers/AppPreloader'

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
    path: 'manage',
    loadChildren: () => import('admin/admin.module').then((m) => m.AdminModule) // Lazy load account module
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: AppPreloader
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class RootRoutingModule {}
