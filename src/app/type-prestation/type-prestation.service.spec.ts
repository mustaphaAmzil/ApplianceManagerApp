import { TestBed } from '@angular/core/testing';

import { TypePrestationService } from './type-prestation.service';

describe('TypePrestationService', () => {
  let service: TypePrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
