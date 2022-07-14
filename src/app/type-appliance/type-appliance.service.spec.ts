import { TestBed } from '@angular/core/testing';

import { TypeApplianceService } from './type-appliance.service';

describe('TypeApplianceService', () => {
  let service: TypeApplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeApplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
