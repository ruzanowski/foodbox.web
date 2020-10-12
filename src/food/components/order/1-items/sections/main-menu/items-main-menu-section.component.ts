import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ItemsService } from '../../../../../services/items-service/items.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AppComponentBase } from '../../../../../../shared/app-component-base'
import { FoodMenuDialog } from '../../../../../models/food-menu-dialog'
import { FoodMenuDialogSectionComponent } from '../food-menu-dialog/food-menu-dialog.component'

@Component({
  selector: 'items-main-menu-section',
  templateUrl: './items-main-menu-section.component.html',
  styleUrls: ['./items-main-menu-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsMainMenuSectionComponent extends AppComponentBase
  implements AfterViewInit {
  result: FoodMenuDialog
  @Input()
  modalEnabled: boolean = true
  animationLoopCounter: number = 0

  constructor(
    public dialog: MatDialog,
    public itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector)
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

  onSubmit(name) {
    if (this.modalEnabled) {
      this.scroll('mainMenuItems')

      let productFromRoute = this.itemsService.getProductByName(name)

      if (!productFromRoute) {
        this.notify.error('Nie istnieje taki produkt jak: ' + '"' + name + '"')
        return
      }

      const dialogRef = this.dialog.open(FoodMenuDialogSectionComponent, {
        panelClass: 'calories-dialog-section',

        data: {
          productId: productFromRoute.id,
          name: name,
          caloriesId: 0,
          count: 0,
          startDate: new Date(),
          periodLengthInDays: 0,
          weekendsIncluded: false,
          cutleryIncluded: false,
          NoBasketWithGenericProductSelectionMode: false
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
