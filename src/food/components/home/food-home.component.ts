import { ChangeDetectionStrategy, Component } from '@angular/core'
import { appModuleAnimation } from '../../../shared/animations/routerTransition'

@Component({
  selector: 'food-home',
  templateUrl: './food-home.component.html',
  styleUrls: ['./food-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appModuleAnimation()]
})
export class FoodHomeComponent {}
