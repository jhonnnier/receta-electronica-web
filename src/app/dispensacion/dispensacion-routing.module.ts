import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DispensacionComponent} from './component/verificacion-codigo/dispensacion.component';

const routes: Routes = [
  {
    path: 'dispensacion/:idReceta',
    component: DispensacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensacionRoutingModule { }
