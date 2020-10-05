import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
/**
 * Componente che interpreta gli errori di validazione
 * di un FormControl e li mappa rispetto a una
 * traduzione custom, mostrando a video
 * la stringa voluta
 *
 * @export
 * @class ValidationComponent
 */
@Component({
  selector: 'xe-validation',
  template: ` <div *ngFor="let error of errors">{{ error }}</div> `,
  styles: [
    `
      div {
        font-size: 12px;
        color: red;
        text-align: right;
      }
    `,
  ],
})
export class XeValidationComponent {
  @Input() ctrl: AbstractControl;
  constructor() {}

  get errors(): string[] {
    const errori: string[] = [];
    if (!this.ctrl || !this.ctrl.errors) {
      return;
    }
    for (const key in this.ctrl.errors) {
      if (
        this.ctrl.errors.hasOwnProperty(key) &&
        (this.ctrl.touched || this.ctrl.dirty)
      ) {
        errori.push(this.translatemsg(key, this.ctrl.errors[key]));
      }
    }
    return errori;
  }

  private translatemsg(validatorName: string, validatorValue?: any) {
    const config: any = {
      required: 'Campo obbligatorio',
      minlength: `Il campo deve contenere almeno ${validatorValue.requiredLength} caratteri`,
    };

    return config[validatorName] ? config[validatorName] : validatorName;
  }
}
