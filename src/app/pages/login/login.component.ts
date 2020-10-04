import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { XeButton } from 'src/app/shared/components';
import { LoginService } from './login.service';

@Component({
  selector: 'xe-login',
  template: `
    <div class="wrapper"></div>
    <xe-card [formGroup]="frm" class="form">
      <xe-card-header class="header">
        <div class="title">Posts Login</div>
        <div>Just another awesome Angular app</div>

        <i class="fab fa-angular"></i>
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
        <xe-button [btn]="loginButton" [disabled]="!valid"></xe-button>
      </xe-card-content>
      <div>
        Oppure <a (click)="login(false)">accedi</a> senza autenticazione
      </div>
    </xe-card>
  `,
  styleUrls: ['login.component.scss'],
})
export class XeLoginComponent {
  loginButton: XeButton;

  frm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  get valid() {
    return this.frm.valid;
  }
  constructor(private router: Router, private srv: LoginService) {
    // Quando atterro alla login pulisco tutto perchè
    // o ho fatto logout
    // o è la prima autenticazione
    // o sono stato reindirizzato per fare la login
    this.srv.reset();
    this.loginButton = {
      title: 'login',
      state: 'primary',
      click: () => this.login(true),
    };
  }

  login(authenticated: boolean) {
    if (!authenticated) {
      this.router.navigate(['posts']);
      return;
    }
    this.srv
      .authenticate(this.frm.get('username').value)
      .pipe(filter((v) => v === true))
      .subscribe(() => this.router.navigate(['posts']));
  }
}
