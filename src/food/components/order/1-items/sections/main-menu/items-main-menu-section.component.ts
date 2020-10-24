import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  ViewEncapsulation
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { AppComponentBase } from '../../../../../../shared/app-component-base'
import { FoodMenuDialog } from '../../../../../models/food-menu-dialog'
import { AppSessionService } from '../../../../../../shared/session/app-session.service'
import { FoodMenuDialogSectionComponent } from '../../../../../../shared/components/modal/food-menu-dialog/food-menu-dialog.component'

@Component({
  selector: 'items-main-menu-section',
  templateUrl: './items-main-menu-section.component.html',
  styleUrls: ['./items-main-menu-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ItemsMainMenuSectionComponent extends AppComponentBase
  implements AfterViewInit {
  result: FoodMenuDialog
  @Input()
  modalEnabled: boolean = true
  animationLoopCounter: number = 0

  constructor(
    public dialog: MatDialog,
    public appSessionService: AppSessionService,
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

      let productFromRoute = this.appSessionService.getProductByName(name)

      if (!productFromRoute) {
        this.notify.error('Nie istnieje taki produkt jak: ' + '"' + name + '"')
        return
      }

      const dialogRef = this.dialog.open(FoodMenuDialogSectionComponent, {
        panelClass: 'calories-dialog-section',

        data: {
          productId: productFromRoute.id,
          name: name,
          caloriesId: undefined,
          count: undefined,
          startDate: undefined,
          periodLengthInDays: undefined,
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
