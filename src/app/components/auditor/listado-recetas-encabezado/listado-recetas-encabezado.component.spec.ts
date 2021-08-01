import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ListadoRecetasEncabezadoComponent } from './listado-recetas-encabezado.component';

describe('ListadoRecetasEncabezadoComponent', () => {
  let component: ListadoRecetasEncabezadoComponent;
  let fixture: ComponentFixture<ListadoRecetasEncabezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,
        HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ ListadoRecetasEncabezadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRecetasEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
