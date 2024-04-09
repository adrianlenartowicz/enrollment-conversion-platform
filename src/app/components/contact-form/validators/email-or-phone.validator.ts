import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailOrPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\s*\+\s*48\s*(?:\s*\d\s*){9}|(?:\s*\d\s*){9})\s*$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return { 'invalidContact': { value: value } };
    }
    return null;
  };
}
