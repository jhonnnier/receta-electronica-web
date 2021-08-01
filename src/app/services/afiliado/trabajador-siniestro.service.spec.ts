import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TrabajadorSiniestroService } from './trabajador-siniestro.service';

describe('TrabajadorSiniestroService', () => {
  let service: TrabajadorSiniestroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrabajadorSiniestroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
