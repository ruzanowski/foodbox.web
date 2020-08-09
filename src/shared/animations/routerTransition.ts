import {
  trigger,
  state,
  animate,
  style,
  transition,
  query,
  group
} from '@angular/animations'

export function appModuleAnimation() {
  return slideFromBottom()
}

export function accountModuleAnimation() {
  return slideFromUp()
}

export function slideModuleAnimation() {
  return slideInAnimation()
}

export function slideFromBottom() {
  return trigger('routerTransition', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
    ])
  ])
}

export function slideFromUp() {
  return trigger('routerTransition', [
    state('void', style({ 'margin-top': '10px', opacity: '0' })),
    state('*', style({ 'margin-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    ])
  ])
}

export function slideInAnimation() {
  return trigger('routeAnimations', [
    transition('Contact => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ]),
    transition('home => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(-100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ]),
    transition('home => items', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(-100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ]),
    transition('items => order', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ]),
    transition('order => payment', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ]),
    transition('payment => confirmation', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
        optional: true
      }),
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate(
              '0.5s ease-in-out',
              style({ transform: 'translateX(100%)' })
            )
          ],
          { optional: true }
        )
      ])
    ])
  ])
}
