import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'food-footer',
  templateUrl: './food-footer.component.html',
  styleUrls: ['./food-footer.component.css']
})
export class FoodFooterComponent implements OnInit {
  currentYear: number
  constructor() {
    this.currentYear = new Date().getFullYear()
  }

  ngOnInit(): void {}
}
