import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'xe-dynamic-heads',
  template: `
    <ng-container [ngSwitch]="level">
      <h6 *ngSwitchCase="6">{{ title }}</h6>
      <h5 *ngSwitchCase="5">{{ title }}</h5>
      <h4 *ngSwitchCase="4">{{ title }}</h4>
      <h3 *ngSwitchCase="3">{{ title }}</h3>
      <h2 *ngSwitchCase="2">{{ title }}</h2>
      <h1 *ngSwitchCase="1">{{ title }}</h1>
      <h1 *ngSwitchCase="0" class="super">{{ title }}</h1>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dynamic-heads.component.scss'],
})
export class XeDynamicHeadsComponent {
  @Input() level: number;
  @Input() title: string;
}
