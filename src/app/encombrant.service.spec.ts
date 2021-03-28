import { TestBed } from '@angular/core/testing';

import { EncombrantService } from './encombrant.service';

describe('EncombrantService', () => {
  let service: EncombrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncombrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
