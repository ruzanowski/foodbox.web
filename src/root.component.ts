import { Component } from '@angular/core'
import { slideModuleAnimation } from '@shared/animations/routerTransition'

declare var $: any

@Component({
  selector: 'app-root',
  template: `
      <router-outlet>
      </router-outlet>`,
  animations: [slideModuleAnimation()]
})
export class RootComponent {}
