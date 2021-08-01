import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

// Componentes
import { ConsultaTrabajadorComponent } from './consulta-trabajador/consulta-trabajador.component';
import { BuscarRecetaComponent } from './receta/buscar/buscar-receta/buscar-receta.component';
import { RecetaComponent } from './receta/receta.component';
import { VerDetalleComponent } from './receta/ver-detalle/ver-detalle.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { ListadoRecetasComponent } from './auditor/listado-recetas/listado-recetas.component';
import { VerDetalleAuditorComponent } from './auditor/ver-detalle/ver-detalle-auditor.component';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {PagesRoutingModule} from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    ConsultaTrabajadorComponent,
    BuscarRecetaComponent,
    VerDetalleComponent,
    RecetaComponent,
    TrabajadorComponent,
    ListadoRecetasComponent,
    VerDetalleAuditorComponent,
    PagesComponent
  ],
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    ComponentsModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule
  ],
  exports: [
    ConsultaTrabajadorComponent,
    BuscarRecetaComponent,
    VerDetalleComponent,
    RecetaComponent,
    TrabajadorComponent,
    VerDetalleAuditorComponent
  ]
})
export class PagesModule { }
