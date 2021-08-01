import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DiagnosticosMedicamentosComponent } from './diagnosticos-medicamentos.component';

describe('DiagnosticosMedicamentosComponent', () => {
  let component: DiagnosticosMedicamentosComponent;
  let fixture: ComponentFixture<DiagnosticosMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ DiagnosticosMedicamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticosMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
