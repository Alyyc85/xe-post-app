import { Component, Directive, OnInit } from '@angular/core';

@Directive({
  selector: 'xe-card-header',
})
export class XeCardHeaderDirective {}
@Directive({
  selector: 'xe-card-content',
})
export class XeCardContentDirective {}

@Component({
  selector: 'xe-card',
  template: `
    <div class="container">
      <div class="header">
        <ng-content select="xe-card-header"></ng-content>
      </div>
      <div class="content">
        <ng-content select="xe-card-content"></ng-content>
      </div>
      <div class="footer">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['card.component.scss'],
})
export class XeCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
