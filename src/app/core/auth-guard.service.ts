import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {
  private _destroy$ = new Subject<void>();
  constructor(private stateSrv: StateService, private router: Router) {}

  canActivate() {
    console.log(this.stateSrv.getUser());
    if (!this.stateSrv.getUser()) {
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
