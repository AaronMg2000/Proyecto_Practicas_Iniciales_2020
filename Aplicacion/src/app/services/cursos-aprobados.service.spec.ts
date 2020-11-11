import { TestBed } from '@angular/core/testing';

import { CursosAprobadosService } from './cursos-aprobados.service';

describe('CursosAprobadosService', () => {
  let service: CursosAprobadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosAprobadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
