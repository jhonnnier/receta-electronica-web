import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ConsultaEncabezadoRecetaComponent } from './consulta-encabezado-receta.component';

describe('ConsultaEncabezadoComponent', () => {
  let component: ConsultaEncabezadoRecetaComponent;
  let fixture: ComponentFixture<ConsultaEncabezadoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ ConsultaEncabezadoRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEncabezadoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
