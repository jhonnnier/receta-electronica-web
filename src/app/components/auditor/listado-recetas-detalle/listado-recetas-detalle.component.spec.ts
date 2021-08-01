import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListadoRecetasDetalleComponent } from './listado-recetas-detalle.component';

describe('ListadoRecetasDetalleComponent', () => {
  let component: ListadoRecetasDetalleComponent;
  component = new ListadoRecetasDetalleComponent(null);
  let fixture: ComponentFixture<ListadoRecetasDetalleComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ListadoRecetasDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRecetasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
