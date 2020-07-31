import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'food-home',
  templateUrl: './food-home.component.html',
  styleUrls: ['./food-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodHomeComponent {}
