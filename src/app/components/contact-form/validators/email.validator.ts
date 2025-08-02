import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return { 'invalidContact': { value: value } };
    }
    return null;
  };
}
