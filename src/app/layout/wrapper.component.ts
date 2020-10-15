import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../core/state.service';

@Directive({
  selector: 'xe-wrapper-toolbar',
})
export class XeWrapperToolbarDirective {}

@Component({
  selector: 'xe-wrapper',
  template: `
    <div class="wrapper">
      <!-- HEADER -->
      <div class="header">
        <div><i class="fas fa-mail-bulk"></i>{{ title }}</div>
        <div class="toolbar">
          <div>
            <ng-content select="xe-wrapper-toolbar"></ng-content>
          </div>
          <div class="user" *ngIf="user; else notLogged">
            <div><i class="fas fa-user-circle"></i> {{ user.name }}</div>
            <i class="fas fa-sign-out-alt" (click)="onLogout()"></i>
          </div>
        </div>
      </div>
      <div class="container">
        <ng-content></ng-content>
      </div>
    </div>
    <!-- @else -->
    <ng-template #notLogged>
      <div class="txt"><a (click)="onLogin()">Accedi</a> per continuare</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['wrapper.component.scss'],
})
export class XeWrapperComponent {
  @Input() title: string;
  @Input() user: User;
  @Output() logoutClick = new EventEmitter<void>();
  @Output() loginClick = new EventEmitter<void>();

  constructor() {}

  onLogout() {
    this.logoutClick.emit();
  }
  onLogin() {
    this.loginClick.emit();
  }
}
