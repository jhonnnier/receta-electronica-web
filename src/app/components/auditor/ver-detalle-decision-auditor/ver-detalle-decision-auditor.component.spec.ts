import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { VerDetalleDecisionAuditorComponent } from './ver-detalle-decision-auditor.component';

describe('VerDetalleDecisionAuditorComponent', () => {
  let component: VerDetalleDecisionAuditorComponent;
  let fixture: ComponentFixture<VerDetalleDecisionAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,
        ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ VerDetalleDecisionAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleDecisionAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
