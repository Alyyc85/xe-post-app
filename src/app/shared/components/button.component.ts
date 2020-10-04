import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface XeButton {
  title: string;
  click: () => void;
  state: 'primary' | 'secondary' | 'default';
}

@Component({
  selector: 'xe-button',
  template: `
    <button
      role="button"
      [ngClass]="btn.state"
      (click)="btn.click()"
      [disabled]="disabled"
    >
      {{ btn.title }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['button.component.scss'],
})
export class XeButtonComponent {
  @Input() btn: XeButton;
  @Input() disabled: boolean;
}
