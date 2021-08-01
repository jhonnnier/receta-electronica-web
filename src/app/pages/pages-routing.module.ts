import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ConsultaTrabajadorComponent} from './consulta-trabajador/consulta-trabajador.component';
import {VerDetalleComponent} from './receta/ver-detalle/ver-detalle.component';
import { BuscarRecetaComponent } from './receta/buscar/buscar-receta/buscar-receta.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { RecetaComponent } from './receta/receta.component';
import {PagesComponent} from './pages.component';

// @ts-ignore
const routes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [
    {
      path: 'consultaTrabajador',
      component: ConsultaTrabajadorComponent
    },
    {
      path: 'trabajadorSiniestro',
      component: TrabajadorComponent
    },
    {
      path: 'receta',
      component: RecetaComponent
    },
    {
      path: 'receta/buscarReceta',
      component: BuscarRecetaComponent
    },
    {
      path: 'receta/verDetalle',
      component: VerDetalleComponent
    },
    {
      path: 'auditor',
      loadChildren: () => import('./auditor/auditor-routing.module').then(m => m.AuditorRoutingModule)
    },
    {
      path: '**',
      component: ConsultaTrabajadorComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
