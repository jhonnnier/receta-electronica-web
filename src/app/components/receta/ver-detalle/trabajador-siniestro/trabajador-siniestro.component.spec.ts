import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TrabajadorSiniestroTarjetasComponent } from './trabajador-siniestro.component';

describe('TrabajadorSiniestroComponent', () => {
  let component: TrabajadorSiniestroTarjetasComponent;
  let fixture: ComponentFixture<TrabajadorSiniestroTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ TrabajadorSiniestroTarjetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorSiniestroTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
