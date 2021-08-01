import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// Componentes
import { ModalComponent } from './genericos/modal/modal.component';
import { ConsultaDetalleRecetaComponent } from './receta/buscar/consulta-detalle-receta/consulta-detalle-receta.component';
import { ConsultaEncabezadoRecetaComponent } from './receta/buscar/consulta-encabezado/consulta-encabezado-receta.component';
import { DiagnosticosComponent } from './receta/diagnosticos/diagnosticos.component';
import { MedicamentosModalComponent } from './receta/medicamentos/modal/medicamentos/medicamentos.modal.component';
import { RecetaEncabezadoComponent } from './receta/receta-encabezado/receta-encabezado.component';
import { DiagnosticosMedicamentosComponent } from './receta/ver-detalle/diagnosticos-medicamentos/diagnosticos-medicamentos.component';
import { EncabezadoComponent } from './receta/ver-detalle/encabezado/encabezado.component';
import { TrabajadorSiniestroTarjetasComponent } from './receta/ver-detalle/trabajador-siniestro/trabajador-siniestro.component';
import { ConsultaDetalleComponent } from './trabajador/consulta-detalle/consulta-detalle.component';
import { ConsultaEncabezadoComponent } from './trabajador/consulta-encabezado/consulta-encabezado.component';
import { TrabajadorSiniestroComponent } from './trabajador/trabajador-siniestro/trabajador-siniestro.component';
import { ListadoRecetasEncabezadoComponent } from './auditor/listado-recetas-encabezado/listado-recetas-encabezado.component';
import { ListadoRecetasDetalleComponent } from './auditor/listado-recetas-detalle/listado-recetas-detalle.component';
import { VerDetalleEncabezadoAuditorComponent } from './auditor/ver-detalle-encabezado-auditor/ver-detalle-encabezado-auditor.component';
import { VerDetalleAlertasAuditorComponent } from './auditor/ver-detalle-alertas-auditor/ver-detalle-alertas-auditor.component';
import { VerDetalleDecisionAuditorComponent } from './auditor/ver-detalle-decision-auditor/ver-detalle-decision-auditor.component';
import { DetalleTabsComponent } from './auditor/detalle-tabs/detalle-tabs.component';

// Angular Material
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';


// Servicios
import { RecetaService } from '../services/receta/receta.service';
import { AfiliadoService } from '../services/afiliado/afiliado.service';
import { AuditorService } from '../pages/auditor/services/auditor.service';


@NgModule({
  declarations: [
    ConsultaEncabezadoComponent,
    ConsultaDetalleComponent,
    TrabajadorSiniestroComponent,
    RecetaEncabezadoComponent,
    DiagnosticosComponent,
    MedicamentosModalComponent,
    ConsultaEncabezadoRecetaComponent,
    ConsultaDetalleRecetaComponent,
    EncabezadoComponent,
    TrabajadorSiniestroTarjetasComponent,
    DiagnosticosMedicamentosComponent,
    ModalComponent,
    ListadoRecetasEncabezadoComponent,
    ListadoRecetasDetalleComponent,
    VerDetalleEncabezadoAuditorComponent,
    VerDetalleAlertasAuditorComponent,
    VerDetalleDecisionAuditorComponent,
    DetalleTabsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    TranslateModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule
  ],
  exports: [
    ConsultaEncabezadoComponent,
    ConsultaDetalleComponent,
    TrabajadorSiniestroComponent,
    RecetaEncabezadoComponent,
    DiagnosticosComponent,
    MedicamentosModalComponent,
    ConsultaEncabezadoRecetaComponent,
    ConsultaDetalleRecetaComponent,
    EncabezadoComponent,
    TrabajadorSiniestroTarjetasComponent,
    DiagnosticosMedicamentosComponent,
    ModalComponent,
    ListadoRecetasEncabezadoComponent,
    ListadoRecetasDetalleComponent,
    VerDetalleEncabezadoAuditorComponent,
    VerDetalleAlertasAuditorComponent,
    VerDetalleDecisionAuditorComponent,
    DetalleTabsComponent
  ],
  providers: [AfiliadoService, RecetaService,
    AuditorService, MatDatepickerModule, MatMomentDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
})
export class ComponentsModule { }
