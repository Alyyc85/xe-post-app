import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, StateService } from 'src/app/core/state.service';
import { apiUrl } from 'utils/api.url';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private stateSrv: StateService) {}
  /**
   * Carico i post e li mando
   * allo stateService per la cache
   *
   * @memberof LoginService
   */
  loadPosts() {
    this.http
      .get(`${apiUrl}posts`)
      .subscribe((val) => this.stateSrv.dispatchPostNlikesNtags(val as Post[]));
  }
  /**
   * Finta autenticazione, si basa sul trovare lo
   * username inviato nel payload users che mette a disposizione
   * il sevizio di jsonplaceholder
   *
   * @param {string} username
   * @returns {Observable<boolean>}
   * @memberof LoginService
   */
  authenticate(username: string): Observable<boolean> {
    return this.http.get(`${apiUrl}users?username=${username}`).pipe(
      switchMap((value: any[]) => {
        if (value && value.length > 0) {
          this.stateSrv.dispatchUserInfo(value[0]);
          return of(true);
        }
        window.alert('Utente non trovato');
        return of(false);
      })
    );
  }
  reset() {
    this.stateSrv.reset();
  }
}
