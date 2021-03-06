import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppComponentBase } from '@shared/app-component-base'
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies'
import { AbpValidationError } from '@shared/components/validation/abp-validation.api'
import * as _ from 'lodash'

@Component({
  templateUrl: './create-user-dialog.component.html'
})
export class CreateUserDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  user = new CreateUserDto()
  roles: RoleDto[] = []
  checkedRolesMap: { [key: string]: boolean } = {}
  defaultRoleCheckedStatus = false
  passwordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'pattern',
      localizationKey:
        'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber'
    }
  ]
  confirmPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'validateEqual',
      localizationKey: 'PasswordsDoNotMatch'
    }
  ]

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.user.isActive = true

    this._userService.getRoles().subscribe((result) => {
      this.roles = result.items
      this.setInitialRolesStatus()
    })
  }

  setInitialRolesStatus(): void {
    _.map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      )
    })
  }

  isRoleChecked(normalizedName: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultRoleCheckedStatus
  }

  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap[role.normalizedName] = $event.target.checked
  }

  getCheckedRoles(): string[] {
    const roles: string[] = []
    _.forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key)
      }
    })
    return roles
  }

  save(): void {
    this.saving = true

    this.user.roleNames = this.getCheckedRoles()

    this._userService
      .create(this.user)
      .pipe(
        finalize(() => {
          this.saving = false
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('Pomy??lnie zapisano'))
        this.bsModalRef.hide()
        this.onSave.emit()
      })
  }
}
