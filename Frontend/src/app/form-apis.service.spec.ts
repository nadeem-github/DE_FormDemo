import { TestBed } from '@angular/core/testing';

import { FormAPIsService } from './form-apis.service';

describe('FormAPIsService', () => {
  let service: FormAPIsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAPIsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
