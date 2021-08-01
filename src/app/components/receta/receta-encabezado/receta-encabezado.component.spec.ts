import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajadorSiniestroRecetaDTO } from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';

import { RecetaEncabezadoComponent } from './receta-encabezado.component';

xdescribe('RecetaEncabezadoComponent', () => {
  let component: RecetaEncabezadoComponent;
  let fixture: ComponentFixture<RecetaEncabezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEncabezadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEncabezadoComponent);
    component = fixture.componentInstance;
    const objTrabajadorSiniestro = {} as TrabajadorSiniestroRecetaDTO;
    component.setTrabajadorSiniestroReceta = objTrabajadorSiniestro;
    fixture.detectChanges();
  });

  it('recibe objTrabajadorSiniestro vacio', () => {
    expect(component).toBeTrue();
  });

});
