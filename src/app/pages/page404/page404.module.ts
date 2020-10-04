import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XePage404Component } from './page404.component';

const routes: Routes = [{ path: '', component: XePage404Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [XePage404Component],
  providers: [],
})
export class Page404Module {}
