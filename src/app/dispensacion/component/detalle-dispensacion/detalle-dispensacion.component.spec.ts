import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDispensacionComponent } from './detalle-dispensacion.component';

describe('DetalleDispensacionComponent', () => {
  let component: DetalleDispensacionComponent;
  let fixture: ComponentFixture<DetalleDispensacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDispensacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDispensacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
