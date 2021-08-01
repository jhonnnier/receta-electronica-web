import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { VerDetalleAuditorComponent } from './ver-detalle/ver-detalle-auditor.component';

const auditorRoutes: Routes = [
  { path: 'listadoReceta', component: ListadoRecetasComponent },
  { path: 'verDetalleAuditor', component: VerDetalleAuditorComponent }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(auditorRoutes)],
  exports: [RouterModule]
})
export class AuditorRoutingModule { }
