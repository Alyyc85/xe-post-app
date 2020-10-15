import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, StateService } from 'src/app/core/state.service';
import { apiUrl } from 'utils/api.url';

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable()
export class PostsService {
  constructor(private http: HttpClient, private stateSrv: StateService) {}

  /**
   * Carico i post dell'utente e li mando
   * allo stateService per la cache
   *
   * @memberof LoginService
   */
  loadPostsByUser(userId?: number) {
    const filterByUserId = userId ? `?userId=${userId}` : '';
    console.log('ADESSO', filterByUserId);
    this.http
      .get<Post[]>(`${apiUrl}posts${filterByUserId}`)
      .subscribe((val) => this.stateSrv.dispatchPostNlikesNtags(val));
  }

  getPostComment(id: number) {
    return this.http.get<PostComment[]>(`${apiUrl}comments?postId=${id}`);
  }
}
