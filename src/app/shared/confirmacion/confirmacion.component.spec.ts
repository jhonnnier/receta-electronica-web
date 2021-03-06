import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionComponent } from './confirmacion.component';

describe('ComfirmacionComponent', () => {
  let component: ConfirmacionComponent;
  let fixture: ComponentFixture<ConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
