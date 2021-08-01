import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopComponent } from './top/top.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import {MatIconModule} from '@angular/material/icon';
import {CampoRequeridoDirective} from './directivas/campo-requerido.directive';
import { ErrorFieldComponent } from './error-field/error-field.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { EmptyConfirmacionSuccessComponent } from './empty-confirmacion-success/empty-confirmacion-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarModule} from "primeng/avatar";
import { MatMenuModule } from '@angular/material/menu';
import {CnxColorsTopComponent} from './cnx-colors-top/cnx-colors-top.component';
import {CnxMessageComponent} from "@shared/cnx-messasge/cnx-message.component";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {CnxModalConfirmationComponent} from "@shared/cnx-modal-confirmation/cnx-modal-confirmation.component";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    TopComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    CampoRequeridoDirective,
    AlertComponent,
    ErrorFieldComponent,
    ConfirmacionComponent,
    EmptyConfirmacionSuccessComponent,
    CnxMessageComponent,
    CnxColorsTopComponent,
    CnxModalConfirmationComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        MatMenuModule,
        MessagesModule,
        ToastModule,
        DialogModule,
        ButtonModule
    ],
    exports: [
        TopComponent,
        SidebarComponent,
        ContentComponent,
        FooterComponent,
        CampoRequeridoDirective,
        AlertComponent,
        ErrorFieldComponent,
        EmptyConfirmacionSuccessComponent,
        CnxColorsTopComponent,
        CnxMessageComponent,
        CnxModalConfirmationComponent
    ]
})
export class SharedModule { }
