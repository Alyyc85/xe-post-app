import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { apiUrl } from 'utils/api.url';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  authenticate(username: string): Observable<boolean> {
    return this.http.get(`${apiUrl}users?username=${username}`).pipe(
      switchMap((value: any[]) => {
        if (value && value.length > 0) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
