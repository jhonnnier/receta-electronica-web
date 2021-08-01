import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarRecetaComponent } from './enviarReceta.component';

describe('EnviarRecetaComponent', () => {
  let component: EnviarRecetaComponent;
  let fixture: ComponentFixture<EnviarRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
