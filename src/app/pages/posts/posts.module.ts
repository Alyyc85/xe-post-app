import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'xe-shared';
import { XePostHeadsComponent } from './post-heads.component';
import { XePostsComponent } from './posts.component';
import { PostsService } from './posts.service';

const routes: Routes = [{ path: '', component: XePostsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  declarations: [XePostsComponent, XePostHeadsComponent],
  providers: [PostsService],
})
export class PostsModule {}
