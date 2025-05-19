import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  getErrorMessage(control: AbstractControl | null, fieldName?: string): string | null {
    if (!control || !control.errors) {
      return null;
    }

    if (control.hasError('required')) {
      return fieldName ? `El campo ${fieldName} es requerido.` : 'Este campo es requerido.';
    }

    if (control.hasError('email')) {
      return 'Por favor, introduce un correo electrónico válido.';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.errors['minlength']['requiredLength'];
      return fieldName ? `El campo ${fieldName} debe tener al menos ${requiredLength} caracteres.` : `Debe tener al menos ${requiredLength} caracteres.`;
    }

    if (control.hasError('maxlength')) {
      const requiredLength = control.errors['maxlength']['requiredLength'];
      return fieldName ? `El campo ${fieldName} no puede tener más de ${requiredLength} caracteres.` : `No puede tener más de ${requiredLength} caracteres.`;
    }

    // Agrega aquí más casos para otros validadores que utilices

    return null; // No hay error específico conocido
  }
}