import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StateService } from 'src/app/core/state.service';
import { apiUrl } from 'utils/api.url';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private stateSrv: StateService) {}

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
