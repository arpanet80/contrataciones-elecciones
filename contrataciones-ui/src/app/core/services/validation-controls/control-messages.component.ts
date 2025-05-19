import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ValidationService } from './validation.service';

@Component({
  selector: 'control-messages',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `<div *ngIf="errorMessage !== null" > <span class="form-text text-danger"> {{errorMessage}} </span>  </div>`

})
export class ControlMessagesComponent {

  @Input() control!: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);

      }
    }

    return null;
  }
}
