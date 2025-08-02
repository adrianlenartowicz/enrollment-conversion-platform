import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const phoneRegex = /^\d{9}$/;

    if (!phoneRegex.test(value)) {
      return { 'invalidContact': { value: value } };
    }
    return null;
  };
}
