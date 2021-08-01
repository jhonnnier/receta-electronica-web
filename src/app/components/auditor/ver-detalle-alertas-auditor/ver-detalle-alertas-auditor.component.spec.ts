import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleAlertasAuditorComponent } from './ver-detalle-alertas-auditor.component';

describe('VerDetalleAlertasComponent', () => {
  let component: VerDetalleAlertasAuditorComponent;
  let fixture: ComponentFixture<VerDetalleAlertasAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleAlertasAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleAlertasAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
