import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'xe-posts',
  template: `posts`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XePostsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
