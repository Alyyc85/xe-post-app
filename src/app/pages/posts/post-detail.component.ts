import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StateService } from 'src/app/core/state.service';
import { md5 } from 'src/app/shared/functions/md5';
import { BasePostClass } from './post-base';
import { PostComment, PostsService } from './posts.service';

@Component({
  selector: 'xe-post-detail',
  template: `
    <xe-wrapper
      title="Read Comments"
      [user]="user$ | async"
      (logoutClick)="logout()"
      (loginClick)="goToLogin()"
    >
      <div class="content">
        <ng-container *ngFor="let comment of comments$ | async">
          <div class="comment">
            <img [attr.src]="gravatar(comment.email)" />
            <div class="detail">
              <div class="title">{{ comment.name }}</div>
              <div class="body">{{ comment.body }}</div>
              <div class="from">{{ comment.email }}</div>
            </div>
          </div>
        </ng-container>
      </div>
    </xe-wrapper>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['posts.component.scss', 'post-detail.component.scss'],
})
export class XePostDetailComponent extends BasePostClass implements OnInit {
  comments$: Observable<PostComment[]>;
  constructor(
    private srv: PostsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected stateSrv: StateService
  ) {
    super(router, route, stateSrv);
  }

  ngOnInit() {
    this.comments$ = this.route.params.pipe(
      map((params) => +params['id']),
      tap(console.log),
      switchMap((id: number) => this.srv.getPostComment(id)),
      takeUntil(this._destroy$)
    );
  }

  gravatar(email: string) {
    return `https://s.gravatar.com/avatar/${md5(email)}?s=80`;
  }
}
