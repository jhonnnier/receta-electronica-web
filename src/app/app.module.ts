import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import {AuthInterceptor} from './interceptor/AuthInterceptor';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DispensacionModule} from './dispensacion/dispensacion.module';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    PagesModule,
    ComponentsModule,
    NgxSpinnerModule,
    HttpClientModule,
    DispensacionModule
  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http);
}
