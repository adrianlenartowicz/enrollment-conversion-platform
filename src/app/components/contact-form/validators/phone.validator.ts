import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const rawValue = control.value;
    const value = String(rawValue ?? '').trim();

    if (!value) {
      return null;
    }

    const normalized = value
      .replace(/\s+/g, '')
      .replace(/^(\+48|48)/, '');

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(normalized)) {
      return { invalidPhone: true };
    }

    return null;
  };
}
