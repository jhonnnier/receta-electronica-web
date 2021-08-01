import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DispensacionRoutingModule} from './dispensacion-routing.module';
import {DispensacionComponent} from './component/verificacion-codigo/dispensacion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import { DetalleDispensacionComponent } from './component/detalle-dispensacion/detalle-dispensacion.component';
import { EnviarRecetaComponent } from './component/enviarReceta/enviarReceta.component';
import { MatIconModule } from '@angular/material/icon';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [DispensacionComponent, DetalleDispensacionComponent, EnviarRecetaComponent],
  imports: [
    CommonModule,
    DispensacionRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    ButtonModule
  ]
})
export class DispensacionModule { }
