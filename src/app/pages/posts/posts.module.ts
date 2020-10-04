import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { XePostsComponent } from './posts.component';
import { PostsService } from './posts.service';

const routes: Routes = [{ path: '', component: XePostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [XePostsComponent],
  providers: [PostsService],
})
export class PostsModule {}
