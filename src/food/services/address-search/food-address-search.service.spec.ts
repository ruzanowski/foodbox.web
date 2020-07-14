import { TestBed } from '@angular/core/testing'

import { FoodAddressSearchService } from './food-address-search.service'

describe('FoodAddressSearchService', () => {
  let service: FoodAddressSearchService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FoodAddressSearchService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
