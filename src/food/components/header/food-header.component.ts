import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'food-header',
  templateUrl: './food-header.component.html',
  styleUrls: ['./food-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodHeaderComponent {
  scroll(id) {
    const elmnt = document.getElementById(id)
    elmnt.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }
}
