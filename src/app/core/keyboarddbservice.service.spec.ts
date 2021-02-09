import { TestBed } from '@angular/core/testing';

import { KeyboarddbService } from './keyboarddbservice.service';

describe('KeyboarddbserviceService', () => {
  let service: KeyboarddbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboarddbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
