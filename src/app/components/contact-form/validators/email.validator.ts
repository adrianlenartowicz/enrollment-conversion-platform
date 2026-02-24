import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = String(control.value ?? '').trim();

    if (!value) {
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
