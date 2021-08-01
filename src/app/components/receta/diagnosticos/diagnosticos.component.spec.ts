import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';
import { DiagnosticosComponent } from './diagnosticos.component';

describe('DiagnosticosComponent', () => {
  let component: DiagnosticosComponent;
  let fixture: ComponentFixture<DiagnosticosComponent>;
  const trabajadorSiniestroService = new TrabajadorSiniestroService(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), HttpClientTestingModule, MatAutocompleteModule
      ],
      declarations: [ DiagnosticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Contador de dx agregados cuando es 0 y muestra en label 0', () => {
    let contDx = 0;
    let validContDx = false;
    component.cantidadDx.subscribe(cantDx => contDx = cantDx);
    validContDx = component.emitirCantidadDx(0);
    expect(validContDx).toBe(false);
  });

  it('Contador de dx agregados cuando es mayor a 0 y muestra en label la cantidad de dx agregados', () => {
    let contDx = 0;
    let validContDx = false;
    component.cantidadDx.subscribe(cantDx => contDx = cantDx);
    validContDx = component.emitirCantidadDx(5);
    expect(validContDx).toBe(true);
  });

  it('Contador de alertasDx agregados cuando es 0 y no muestra alertas', () => {
    let contAlertasDx = 0;
    let validContDx = false;
    component.cantidadDx.subscribe(cantDx => contAlertasDx = cantDx);
    validContDx = component.emitirCantidadDx(0);
    expect(validContDx).toBe(false);
  });

  it('Contador de alertasDx agregados cuando es mayor a 0 y muestra en label la cantidad de alertas', () => {
    let contAlertasDx = 0;
    let validContDx = false;
    component.cantidadDx.subscribe(cantDx => contAlertasDx = cantDx);
    validContDx = component.emitirCantidadDx(5);
    expect(validContDx).toBe(true);
  });

});
