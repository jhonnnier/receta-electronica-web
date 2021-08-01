import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyConfirmacionSuccessComponent } from './empty-confirmacion-success.component';

describe('EmptyConfirmacionSuccessComponent', () => {
  let component: EmptyConfirmacionSuccessComponent;
  let fixture: ComponentFixture<EmptyConfirmacionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyConfirmacionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyConfirmacionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
