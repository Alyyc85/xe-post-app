import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/auth-guard.service';
import { LayoutModule } from 'xe-layout';
import { SharedModule } from 'xe-shared';
import { XePostDetailComponent } from './post-detail.component';
import { XePostHeadsComponent } from './post-heads.component';
import { XePostsComponent } from './posts.component';
import { PostsService } from './posts.service';

const routes: Routes = [
  { path: '', component: XePostsComponent },
  {
    path: 'detail/:id',
    component: XePostDetailComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [RouterModule],
  declarations: [XePostsComponent, XePostHeadsComponent, XePostDetailComponent],
  providers: [PostsService, AuthGuardService],
})
export class PostsModule {}
