import { NgModule } from '@angular/core';
import {
  XeButtonComponent,
  XeCardComponent,
  XeCardContentDirective,
  XeCardHeaderDirective,
} from './components';

@NgModule({
  imports: [],
  exports: [
    XeCardHeaderDirective,
    XeCardContentDirective,
    XeCardComponent,
    XeButtonComponent,
  ],
  declarations: [
    XeCardHeaderDirective,
    XeCardContentDirective,
    XeCardComponent,
    XeButtonComponent,
  ],
})
export class SharedModule {}
