import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('xe-login').then((m) => m.LoginModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('xe-posts').then((m) => m.PostsModule),
  },
  {
    path: '**',
    loadChildren: () => import('xe-404').then((m) => m.Page404Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
