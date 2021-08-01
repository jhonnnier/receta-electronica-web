import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { VerDetalleComponent } from './ver-detalle.component';

describe('VerDetalleComponent', () => {
  let component: VerDetalleComponent;
  let fixture: ComponentFixture<VerDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ VerDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
