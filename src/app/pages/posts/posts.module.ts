import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XePostsComponent } from './posts.component';

const routes: Routes = [{ path: '', component: XePostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [XePostsComponent],
  providers: [],
})
export class PostsModule {}
