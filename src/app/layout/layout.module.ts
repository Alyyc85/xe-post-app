import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  XeWrapperComponent,
  XeWrapperToolbarDirective,
} from './wrapper.component';

@NgModule({
  imports: [CommonModule],
  exports: [XeWrapperToolbarDirective, XeWrapperComponent],
  declarations: [XeWrapperToolbarDirective, XeWrapperComponent],
})
export class LayoutModule {}
