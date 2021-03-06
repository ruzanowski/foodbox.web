import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppConsts } from '../../../shared/AppConsts'
import { AnchorScrollService } from '../../services/anchor-scroll-service/anchor-scroll.service'

declare var $: any
declare var jQuery: any

@Component({
  selector: 'food-header',
  templateUrl: './food-header.component.html',
  styleUrls: ['./food-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodHeaderComponent implements OnInit {
  mapSectionId: string
  aboutSectionId: string
  contactSectionId: string
  dietsSectionId: string
  faqSectionId: string

  constructor(
    private router: Router,
    private anchorScrollService: AnchorScrollService
  ) {
    this.mapSectionId = AppConsts.sectionsIds.deliveryMap
    this.aboutSectionId = AppConsts.sectionsIds.about
    this.contactSectionId = AppConsts.sectionsIds.contacts
    this.dietsSectionId = AppConsts.sectionsIds.diets
    this.faqSectionId = AppConsts.sectionsIds.faq
  }

  isMobile(): boolean {
    return document.body.clientWidth < 700
  }

  closeMobileMenu(element: any) {
    if (this.isMobile()) {
      element?.click()
    }
  }

  scroll(id) {
    this.closeMobileMenu(document.getElementById('close_in'))

    this.anchorScrollService.updateMessage(id)
  }

  ngOnInit() {
    $('a.open_close').on('click', function () {
      $('.main-menu').toggleClass('show'),
        $('.layer').toggleClass('layer-is-visible')
    }),
      $('a.show-submenu').on('click', function () {
        $(this).next().toggleClass('show_normal')
      }),
      $('a.show-submenu-mega').on('click', function () {
        $(this).next().toggleClass('show_mega')
      }),
      $(window).width() <= 600 &&
        $('a.open_close').on('click', function () {
          $('.cmn-toggle-switch').removeClass('active')
        })
    for (
      var toggles = document.querySelectorAll('.cmn-toggle-switch'),
        i = toggles.length - 1;
      i >= 0;
      i--
    ) {
      var toggle = toggles[i]
      toggleHandler(toggle)
    }

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 1) {
        $('.header').addClass('sticky')
      } else {
        $('.header').removeClass('sticky')
      }
    })
  }
}

function toggleHandler(e) {
  e.addEventListener('click', function (e) {
    e.preventDefault(),
      this.classList.contains('active') === !0
        ? this.classList.remove('active')
        : this.classList.add('active')
  })
}
