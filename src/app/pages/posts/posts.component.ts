import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostUnion, StateService, User } from 'src/app/core/state.service';

@Component({
  selector: 'xe-posts',
  template: `
    <div class="wrapper">
      <!-- HEADER -->
      <div class="header">
        <div><i class="fas fa-mail-bulk"></i>Read Posts</div>
        <div class="toolbar">
          <input
            type="text"
            [formControl]="search"
            placeholder="Cerca per tag"
          />
          <i class="fas fa-search"></i>
          <!-- -->
          <div class="user" *ngIf="user$ | async; else notLogged">
            <div>
              <i class="fas fa-user-circle"></i> {{ (user$ | async).name }}
            </div>
            <i class="fas fa-sign-out-alt" (click)="logout()"></i>
          </div>
        </div>
      </div>
      <!-- CONTENT -->
      <div class="container">
        <div class="content">
          <ng-container
            *ngFor="
              let post of posts$ | async;
              let i = index;
              trackBy: trackByFn
            "
          >
            <xe-card>
              <xe-card-header class="c-header">
                {{ post.title }}
              </xe-card-header>
              <xe-card-content class="c-content">
                {{ post.body }}
              </xe-card-content>
              <div class="c-info">
                <div
                  class="c-likes"
                  [ngStyle]="{
                    cursor: loggedState ? 'pointer' : 'default'
                  }"
                  (click)="incrementLike(i)"
                >
                  <i class="fas fa-thumbs-up"></i>{{ post.likes }}
                </div>
                <div class="c-tag">
                  <div *ngFor="let tag of post.hashtags">#{{ tag }}</div>
                </div>
              </div>
            </xe-card>
          </ng-container>
        </div>
      </div>
    </div>
    <!-- @else -->
    <ng-template #notLogged>
      <div class="txt"><a (click)="goToLogin()">Accedi</a> per continuare</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['posts.component.scss'],
})
export class XePostsComponent implements OnInit {
  user$: Observable<User>;
  posts$ = new BehaviorSubject<PostUnion[]>([]);
  search = new FormControl(null);
  loggedState: boolean;

  constructor(private stateSrv: StateService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.stateSrv
      .getUserInfo()
      .pipe(tap((user) => (this.loggedState = user ? true : false)));
    this.stateSrv.getPosts().subscribe((res) => {
      this.posts$.next(res);
    });
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
  logout() {
    this.router.navigate(['login']);
  }
  incrementLike(idx: number) {
    if (!this.loggedState) {
      return;
    }
    const matched = this.posts$.value[idx];
    matched.likes = ++matched.likes;
    this.stateSrv.updatePosts(this.posts$.value);
  }
  trackByFn(index: number, e: any) {
    return index;
  }
}
