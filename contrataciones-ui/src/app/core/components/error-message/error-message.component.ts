
////////////////////////////////////////////////////////////////////////////////////////
////// FORMA de uso ////////////////////////////////////////////////////////////////////
////  <app-error-message [control]="form.controls['correopersonal']" fieldName="Correo Electrónico"></app-error-message>
////
////  <app-error-message [control]="form.controls['correopersonal']" ></app-error-message>
////////////////////////////////////////////////////////////////////////////////////////

  import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
  import { AbstractControl, FormControl } from '@angular/forms';
  import { ErrorMessageService } from './error-message.service';
  import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
  
  @Component({
    selector: 'app-error-message',
    imports: [ NgIf],
    template: `
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    `,
    styles: [`
      .error-message {
        color: red;
        font-size: 0.8em;
        margin-top: 5px;
      }
    `]
  })
  export class ErrorMessageComponent implements OnChanges, OnDestroy {
    @Input() control: AbstractControl | null = null;
    @Input() fieldName?: string;
    errorMessage: string | null = null;
    private controlSubscription: Subscription | undefined;
  
    constructor(private errorMessageService: ErrorMessageService) { }
  
    ngOnChanges(changes: SimpleChanges): void {
      this.subscribeToControlChanges();
    }
  
    ngOnDestroy(): void {
      if (this.controlSubscription) {
        this.controlSubscription.unsubscribe();
      }
    }
  
    private subscribeToControlChanges() {
      if (this.control instanceof FormControl) {
        if (this.controlSubscription) {
          this.controlSubscription.unsubscribe(); // Unsubscribe from previous if exists
        }
        this.controlSubscription = this.control.valueChanges.subscribe(() => {
          this.errorMessage = this.errorMessageService.getErrorMessage(this.control, this.fieldName);
        });
        this.controlSubscription.add(this.control.statusChanges.subscribe(() => {
          this.errorMessage = this.errorMessageService.getErrorMessage(this.control, this.fieldName);
        }));
        this.errorMessage = this.errorMessageService.getErrorMessage(this.control, this.fieldName); // Initial check
      } else {
        this.errorMessage = this.errorMessageService.getErrorMessage(this.control, this.fieldName); // For FormGroup or AbstractControl
      }
    }
  }