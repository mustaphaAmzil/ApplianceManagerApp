import { TestBed } from '@angular/core/testing';

import { SceanceService } from './sceance.service';

describe('SceanceService', () => {
  let service: SceanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
