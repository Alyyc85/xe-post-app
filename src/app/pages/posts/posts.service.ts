import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, StateService } from 'src/app/core/state.service';
import { apiUrl } from 'utils/api.url';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient, private stateSrv: StateService) {}

  loadPosts() {
    this.http
      .get(`${apiUrl}posts`)
      .subscribe((val) => this.stateSrv.dispatchPostNlikesNtags(val as Post[]));
  }
}
