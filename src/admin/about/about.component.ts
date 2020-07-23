import { Component, Injector, ChangeDetectionStrategy } from '@angular/core'
import { AppComponentBase } from '@shared/app-component-base'
import { appModuleAnimation } from '@shared/animations/routerTransition'

@Component({
  templateUrl: './about.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector)
  }
}
