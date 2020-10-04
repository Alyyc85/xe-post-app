import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
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
              <!-- Esempio stile applicato direttamente 
            <xe-card-header
                class="c-header"
                [attr.style]="getStyleHeader(post.likes)"
              >
                {{ post.title }}
              </xe-card-header> -->
              <!-- Esempio con componente
              che gestisce internamente un ngSwitch -->
              <xe-card-header class="c-header">
                <xe-dynamic-heads
                  [level]="getHeaderLevel(post.likes)"
                  [title]="post.title"
                ></xe-dynamic-heads>
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
                  <div
                    *ngFor="let tag of post.hashtags"
                    (click)="handleTag(tag)"
                  >
                    #{{ tag }}
                  </div>
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
export class XePostsComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  posts$ = new BehaviorSubject<PostUnion[]>([]);
  search = new FormControl(null);
  loggedState: boolean;
  private _bkPost$ = new BehaviorSubject<PostUnion[]>([]);
  private _destroy$ = new Subject<void>();

  constructor(private stateSrv: StateService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.stateSrv
      .getUserInfo()
      .pipe(tap((user) => (this.loggedState = user ? true : false)));
    this.stateSrv.getPosts().subscribe((res) => {
      this.posts$.next(res);
      this._bkPost$.next(res);
    });
    this.handleSearch();
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
    this._bkPost$.next(this.posts$.value);
  }

  handleTag(tag: string) {
    this.search.patchValue(tag);
  }
  private handleSearch() {
    this.search.valueChanges
      .pipe(
        map((txt) => this.filterPost(txt)),
        takeUntil(this._destroy$)
      )
      .subscribe(this.posts$);
  }

  getHeaderLevel(likes: number): number {
    const level = likes >= 42 ? 0 : 6 - Math.floor(likes / 6);
    return level;
  }
  /**
   * Workaround template header
   * esempi diversi per raggiungere
   * scopi simili
   *
   * @param {number} likes
   * @returns {string}
   * @memberof XePostsComponent
   */
  getStyleHeader(likes: number): string {
    const level = likes >= 42 ? 0 : 6 - Math.floor(likes / 6);
    console.log(level);
    switch (level) {
      case 0:
        return 'color: rgba(218,54,54,1); text-transform:uppercase';
      case 1:
        return 'color: rgba(218,54,54,0.8); text-transform:uppercase';
      case 2:
        return 'color: rgba(218,54,54,0.6); text-transform:uppercase';
      case 3:
        return 'color: rgba(0,0,0,0.9)';
      case 4:
        return 'color: rgba(0,0,0,0.6)';
      case 5:
        return 'color: rgba(0,0,0,0.5)';
      case 6:
        return 'color: rgba(0,0,0,0.3)';
    }
  }

  private filterPost(txt: string): PostUnion[] {
    const copy = JSON.parse(JSON.stringify(this._bkPost$.value)) as PostUnion[];
    return copy.filter((c) => c.hashtags.find((h) => h.includes(txt)));
  }
  trackByFn(index: number, e: any) {
    return index;
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
