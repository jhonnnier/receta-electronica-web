import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RecetaService } from './receta.service';

describe('RecetaService', () => {
  let service: RecetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
