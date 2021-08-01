import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { VerDetalleEncabezadoAuditorComponent } from './ver-detalle-encabezado-auditor.component';

describe('VerDetalleEncabezadoComponent', () => {
  let component: VerDetalleEncabezadoAuditorComponent;
  let fixture: ComponentFixture<VerDetalleEncabezadoAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ VerDetalleEncabezadoAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleEncabezadoAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
