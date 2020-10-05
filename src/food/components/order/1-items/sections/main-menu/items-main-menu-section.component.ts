import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CaloriesDialogSectionComponent } from '../calories-dialog/calories-dialog.component'
import { FoodItem } from '../../../../../models/food-item'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { BasketItem } from '../../../../../models/basket-item'
import { ActivatedRoute, Router } from '@angular/router'
import { AppConsts } from '../../../../../../shared/AppConsts'
import { AppComponentBase } from '../../../../../../shared/app-component-base'
import {CaloriesDialog} from '../../../../../models/calories-dialog';

@Component({
  selector: 'items-main-menu-section',
  templateUrl: './items-main-menu-section.component.html',
  styleUrls: ['./items-main-menu-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsMainMenuSectionComponent extends AppComponentBase
  implements AfterViewInit {
  foodItems: FoodItem[]
  result: CaloriesDialog
  @Input()
  modalEnabled: boolean = true
  animationLoopCounter: number = 0

  constructor(
    public dialog: MatDialog,
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector)
    this.foodItems = this.itemsService.getItems()
  }

  ngAfterViewInit() {
    if (this.modalEnabled) {
      const hasName = this.route.snapshot.queryParamMap.has('name')

      if (!hasName) {
        return
      }

      const name = this.route.snapshot.queryParamMap.get('name')

      if (name !== undefined) {
        this.onSubmit(name)
      }
    }
  }

  isItemNameCorrect(name): boolean {
    return this.itemsService.anyItem(name)
  }

  onSubmit(name) {
    if (this.modalEnabled) {
      this.scroll('mainMenuItems')

      let check = this.isItemNameCorrect(name)

      if (!check) {
        this.notify.error('Nie istnieje taki produkt jak: ' + '"' + name + '"')
        return
      }

      const dialogRef = this.dialog.open(CaloriesDialogSectionComponent, {
        panelClass: 'calories-dialog-section',

        data: {
          name: name,
          priceNominal: this.itemsService.getNominalPrice(name),
          calories: undefined,
          quantity: undefined,
          startDate: undefined,
          periodLengthInDays: undefined,
          addToBasket: true
        }
      })

      dialogRef.afterClosed().subscribe((result) => {
        this.result = result
      })
    } else {
      this.router.navigate(['/' + 'items'], {
        queryParams: { name: name }
      })
    }
  }

  wowSlideInDirection(): string {
    this.animationLoopCounter++
    if (this.animationLoopCounter % 2) {
      return 'slideInLeft'
    } else {
      return 'slideInRight'
    }
  }
}
