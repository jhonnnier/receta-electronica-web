import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TrabajadorSiniestroComponent } from './trabajador-siniestro.component';

describe('TrabajadorSiniestroComponent', () => {
  let component: TrabajadorSiniestroComponent;
  let fixture: ComponentFixture<TrabajadorSiniestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot(),
        ReactiveFormsModule],
      declarations: [ TrabajadorSiniestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
