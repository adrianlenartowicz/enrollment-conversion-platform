import { AbstractControl, ValidatorFn } from '@angular/forms';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\s*\+\s*48\s*(?:\s*\d\s*){9}|(?:\s*\d\s*){9})\s*$/;


export function EmailOrPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return { 'invalidContact': { value: value } };
    }
    return null;
  };
}

export function detectContactType(value: string): 'email' | 'phone' | null {
  if (emailRegex.test(value)) return 'email';
  if (phoneRegex.test(value)) return 'phone';
  return null;
}
