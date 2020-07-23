import { Injectable } from '@angular/core'
import { FoodItem } from '../../models/food-item'
import { Period } from '../../models/period'

@Injectable()
export class ItemsService {
  getItems(): FoodItem[] {
    return [
      {
        name: 'Standard',
        description:
          'Zbilansowana dieta, zawierająca w menu składniki pochodzenia zwierzęcego.',
        imgSrc: 'assets/img/breakfast.png',
        nominalPrice: 1100,
      },
      {
        name: 'Vege',
        description: 'Zbilansowana dieta bezmięsna.',
        imgSrc: 'assets/img/avocado-flat.png',
        nominalPrice: 1200,
      },
      {
        name: 'Sport',
        description:
          'Dla osób trenujących, dieta o wysokiej zawartości białka.',
        imgSrc: 'assets/img/meat-flat.png',
        nominalPrice: 1300,
      },
      {
        name: 'Vegan',
        description: 'Tylko produkty pochodzenia roślinnego.',
        imgSrc: 'assets/img/carrot.png',
        nominalPrice: 1400,
      },
    ]
  }

  getDeliveryPrice(name) {
    return 0
  }

  getDiscount(name) {
    return 0.01
  }

  getCalories(name: string): number[] {
    return [1500, 2000, 2500, 3000]
  }

  getPeriods(): Period[] {
    return [
      {
        days: 1,
        name: '1 dzień (próbny)',
      },
      {
        days: 5,
        name: '1 tydzień',
      },
      {
        days: 10,
        name: '2 tygodnie',
      },
      {
        days: 5,
        name: '3 tygodnie, zniżka 10%',
      },
      {
        days: 5,
        name: '4 tygodnie, zniżka 15%',
      },
    ]
  }
}
