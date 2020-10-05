import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, StateService } from 'src/app/core/state.service';
import { apiUrl } from 'utils/api.url';

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
}
