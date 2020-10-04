import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { XeButton } from 'src/app/shared/components';

@Component({
  selector: 'xe-login',
  template: `
    <div class="wrapper"></div>
    <xe-card [formGroup]="frm" class="form">
      <xe-card-header class="header">
        <div class="title">Posts Login</div>
        <i class="fas fa-user-circle"></i>
      </xe-card-header>
      <xe-card-content class="content">
        <div>
          <xe-validation [ctrl]="frm.get('username')"></xe-validation>
          <input
            type="text"
            formControlName="username"
            placeholder="Username"
          />
        </div>
        <div>
          <xe-validation [ctrl]="frm.get('password')"></xe-validation>

          <input
            type="password"
            formControlName="password"
            placeholder="Password"
          />
        </div>
      </xe-card-content>
      <xe-button [btn]="loginButton"></xe-button>
      <hr />
      <div>Oppure <a>accedi</a> senza autenticazione</div>
      <div>Just another awesome <i class="fab fa-angular"></i>Angular app</div>
    </xe-card>
  `,
  styleUrls: ['login.component.scss'],
})
export class XeLoginComponent implements OnInit {
  loginButton: XeButton = {
    title: 'login',
    state: 'primary',
    click: () => this.login(),
  };
  frm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.minLength(5)),
  });
  constructor() {}

  ngOnInit() {}

  private login() {}
}
