import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PostUnion, StateService } from 'src/app/core/state.service';
import { BasePostClass } from './post-base';
import { PostsService } from './posts.service';

@Component({
  selector: 'xe-posts',
  template: `
    <xe-wrapper
      title="Read Posts"
      [user]="user$ | async"
      (logoutClick)="logout()"
      (loginClick)="goToLogin()"
    >
      <xe-wrapper-toolbar>
        <input type="text" [formControl]="search" placeholder="Cerca per tag" />
        <i class="fas fa-search"></i>
      </xe-wrapper-toolbar>
      <div class="content">
        <ng-container
          *ngFor="let post of posts$ | async; let i = index; trackBy: trackByFn"
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
              <xe-post-heads
                [level]="getHeaderLevel(post.likes)"
                [title]="post.title"
                (click)="goToDetail(post.id)"
                [attr.role]="loggedState ? 'button' : ''"
              ></xe-post-heads>
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
                <div *ngFor="let tag of post.hashtags" (click)="handleTag(tag)">
                  #{{ tag }}
                </div>
              </div>
            </div>
          </xe-card>
        </ng-container>
      </div>
    </xe-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['posts.component.scss'],
})
export class XePostsComponent extends BasePostClass implements OnInit {
  posts$ = new BehaviorSubject<PostUnion[]>([]);
  search = new FormControl(null);
  loggedState: boolean;
  private _bkPost$ = new BehaviorSubject<PostUnion[]>([]);

  constructor(
    protected stateSrv: StateService,
    protected router: Router,
    private postSrv: PostsService,
    protected route: ActivatedRoute
  ) {
    super(router, route, stateSrv);
    this.user$.pipe(takeUntil(this._destroy$)).subscribe((user) => {
      console.log;
      this.loggedState = user ? true : false;
      //CARICO I POST DELL'UTENTE CORRENTE
      this.postSrv.loadPostsByUser(user?.id);
    });
  }

  ngOnInit() {
    this.stateSrv
      .getPosts()
      .pipe(takeUntil(this._destroy$)) //GESTIONE UNSUBSCRIBE!!
      .subscribe((res) => {
        //TODO: IO QUESTA PARTE DI GESTIONE L'AVREI VISTA BENE ESTERNALIZZATA NEL PostService MA VA BENE ANCHE COSI' ;-)
        this.posts$.next(res);
        this._bkPost$.next(res);
      });
    this.handleSearch();
  }

  goToDetail(postId: number) {
    this.router.navigate(['detail', postId], { relativeTo: this.route });
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
}
