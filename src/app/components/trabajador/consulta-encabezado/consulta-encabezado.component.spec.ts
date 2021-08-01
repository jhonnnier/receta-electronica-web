import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ConsultaEncabezadoComponent } from './consulta-encabezado.component';

describe('ConsultaEncabezadoComponent', () => {
  let component: ConsultaEncabezadoComponent;
  let fixture: ComponentFixture<ConsultaEncabezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,
        FormsModule, TranslateModule.forRoot()],
      declarations: [ ConsultaEncabezadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
