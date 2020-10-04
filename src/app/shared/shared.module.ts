import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  XeButtonComponent,
  XeCardComponent,
  XeCardContentDirective,
  XeCardHeaderDirective,
  XeDynamicHeadsComponent,
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
    XeDynamicHeadsComponent,
  ],
  declarations: [
    XeCardHeaderDirective,
    XeCardContentDirective,
    XeCardComponent,
    XeButtonComponent,
    XeValidationComponent,
    XeDynamicHeadsComponent,
  ],
})
export class SharedModule {}
