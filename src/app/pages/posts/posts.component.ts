import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { StateService, User } from 'src/app/core/state.service';
import { PostsService } from './posts.service';

@Component({
  selector: 'xe-posts',
  template: `
    <div class="wrapper">
      <div class="header">
        <div><i class="fas fa-mail-bulk"></i>Read Posts</div>

        <div class="toolbar">
          <input
            type="text"
            [formControl]="search"
            placeholder="Cerca per tag"
          />
          <i class="fas fa-search"></i>
          <div class="user" *ngIf="user$ | async; else notLogged">
            <div>
              <i class="fas fa-user-circle"></i> {{ (user$ | async).name }}
            </div>
            <i class="fas fa-sign-out-alt" (click)="logout()"></i>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content"></div>
      </div>
    </div>
    <ng-template #notLogged>
      <a (click)="goToLogin()">Accedi</a> per continuare
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['posts.component.scss'],
})
export class XePostsComponent implements OnInit {
  user$: Observable<User>;
  search = new FormControl(null);
  constructor(
    private srv: PostsService,
    private stateSrv: StateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.stateSrv.getUserInfo().pipe(share());
    this.srv.loadPosts();
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
  logout() {
    this.router.navigate(['login']);
  }
}
