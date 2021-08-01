import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalleRecetaComponent } from './consulta-detalle-receta.component';

describe('ConsultaDetalleRecetaComponent', () => {
  let component: ConsultaDetalleRecetaComponent;
  let fixture: ComponentFixture<ConsultaDetalleRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ConsultaDetalleRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalleRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
