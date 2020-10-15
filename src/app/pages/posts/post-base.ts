import { Directive, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StateService, User } from 'src/app/core/state.service';

@Directive({})
export abstract class BasePostClass implements OnDestroy {
  protected _destroy$ = new Subject<void>();
  user$: Observable<User>;
  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected stateSrv: StateService
  ) {
    this.user$ = this.stateSrv.getUserInfo();
  }
  public goToLogin() {
    this.router.navigate(['login']);
  }
  public logout() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
