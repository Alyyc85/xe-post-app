import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'xe-shared';
import { XeLoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: XeLoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [XeLoginComponent],
  providers: [],
})
export class LoginModule {}
