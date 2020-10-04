import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'xe-shared';
import { XeLoginComponent } from './login.component';
import { LoginService } from './login.service';

const routes: Routes = [{ path: '', component: XeLoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [XeLoginComponent],
  providers: [LoginService],
})
export class LoginModule {}
