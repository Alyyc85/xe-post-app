import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {
  private _logged$ = new BehaviorSubject<boolean>(false);
  private _destroy$ = new Subject<void>();
  constructor(private stateSrv: StateService, private router: Router) {
    this.stateSrv
      .getUserInfo()
      .pipe(
        map((user) => (user ? true : false)),
        takeUntil(this._destroy$)
      )
      .subscribe(this._logged$);
  }

  canActivate() {
    if (!this._logged$.value) {
      this.router.navigate(['**']);
      return false;
    }
    return true;
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
