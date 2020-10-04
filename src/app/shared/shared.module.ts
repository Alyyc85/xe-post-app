import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  XeButtonComponent,
  XeCardComponent,
  XeCardContentDirective,
  XeCardHeaderDirective,
  XeValidationComponent,
} from './components';

@NgModule({
  imports: [CommonModule],
  exports: [
    XeCardHeaderDirective,
    XeCardContentDirective,
    XeCardComponent,
    XeButtonComponent,
    XeValidationComponent,
  ],
  declarations: [
    XeCardHeaderDirective,
    XeCardContentDirective,
    XeCardComponent,
    XeButtonComponent,
    XeValidationComponent,
  ],
})
export class SharedModule {}
