import { TestBed } from '@angular/core/testing';

import { PersianNumberService } from './persian-number.service';

describe('PersianNumberService', () => {
  let service: PersianNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersianNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
