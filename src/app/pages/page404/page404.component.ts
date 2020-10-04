import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'xe-page404',
  template: `
    <div>Oooops, something went wrong</div>
    <div><a (click)="goToLogin()">Torna alla login</a></div>
  `,
})
export class XePage404Component {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/src/login']);
  }
}
