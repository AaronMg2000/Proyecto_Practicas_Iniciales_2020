import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[passwordValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}]
})
export class PasswordValidationDirective implements Validator {

  passwordsProhibidos = ['123456', 'query', '123456789'];
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    const password = control.value as string;

    if (!password) {return null; }
    if ( password.length < 4){return null; }
    if (this.passwordsProhibidos.indexOf(password) !== -1){
      return {passwordValidation: {message: 'Escoge una mejor contraseña'}};
    }
    if (password === password.toLowerCase()){
      return {passwordValidation: {message: 'La contraseña debe contener una mayúscula'}};
    }

    if (password === password.toUpperCase()){
      return {passwordValidation: {message: 'La contraseña debe contener una minuscula'}};
    }

    if (!/\d/.test(password)){
      return {passwordValidation: {message: 'La contraseña debe contener por lo menos un caracter numerico'}};
    }

    return null;
  }

}
