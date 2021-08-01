import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(mod => mod.LoginModule),
        // loadChildren: () =>  import('./login/login.module').then(mod => mod.LoginModule),
      },
      {
        path: 'recetas',
        loadChildren: () => import('./dispensacion/dispensacion.module').then(mod => mod.DispensacionModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: '',
        loadChildren: () =>  import('./pages/pages.module').then(mod => mod.PagesModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
})
export class AppRoutingModule {
}
