import { TestBed } from '@angular/core/testing';

import { CursoCatedraticoService } from './curso-catedratico.service';

describe('CursoCatedraticoService', () => {
  let service: CursoCatedraticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoCatedraticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
