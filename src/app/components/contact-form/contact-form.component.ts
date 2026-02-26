import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './validators/email.validator';
import { PhoneValidator } from './validators/phone.validator';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { CloudflareWorkerService } from '../../services/cloudflare-worker.service';

interface NormalizedFormValues {
  phone: string;
  email: string;
  group: string;
}

interface ContactFormPayload extends NormalizedFormValues {
  tracking: {
    debug: unknown;
  };
}

const STORAGE_CONVERSION_DEBUG_KEY = 'tracking_debug';
const DATA_LAYER_EVENT = 'form_submit_success';
const SUBMIT_ERROR_MESSAGE = 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub zadzwoń: 459 119 894.';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();

  readonly groups = [
    { label: '5-7 lat', value: '5-7' },
    { label: '8-10 lat', value: '8-10' },
    { label: '11-13 lat', value: '11-13' }
  ];

  form!: FormGroup;
  isSubmitting = false;
  wasButtonClicked = false;
  submitError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private metaPixelService: MetaPixelService,
    private cloudflareWorkerService: CloudflareWorkerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required, PhoneValidator()]],
      email: ['', [Validators.required, EmailValidator()]],
      rodo: [false, Validators.requiredTrue],
      group: ['', Validators.required]
    });
  }

  get phoneControl(): AbstractControl {
    return this.form.get('phone') as AbstractControl;
  }

  get emailControl(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get groupControl(): AbstractControl {
    return this.form.get('group') as AbstractControl;
  }

  get rodoControl(): AbstractControl {
    return this.form.get('rodo') as AbstractControl;
  }

  get shouldShowRodo(): boolean {
    return this.groupControl.valid && this.phoneControl.valid && this.emailControl.valid;
  }

  onGroupSelected(value: string): void {
    this.groupControl.setValue(value);
    this.groupControl.markAsTouched();
    this.groupControl.updateValueAndValidity();
  }

  onSubmit(): void {
    this.wasButtonClicked = true;

    if (this.isSubmitting) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.submitForm();
  }

  private async submitForm(): Promise<void> {
    this.isSubmitting = true;
    this.submitError = null;

    let didEmit = false;
    let mailSucceeded = false;

    // NOTE: Acknowledge conversion on the first successful channel (email preferred, worker fallback).
    const emitSuccess = () => {
      if (didEmit) {
        return;
      }
      didEmit = true;
      this.acknowledgeConversion();
      this.submitError = null;
      this.formSubmitted.emit();
    };

    const values = this.getNormalizedValues();
    const trackingDebug = this.getTrackingDebug();

    try {
      const res = await this.mailService.sendEmail(this.buildFormData(values));
      if (!res.ok) {
        throw new Error();
      }
      mailSucceeded = true;
      emitSuccess();
    } catch (err) {
      console.error(err);
    }

    try {
      const res = this.cloudflareWorkerService.sendContactForm(this.buildWorkerPayload(values, trackingDebug));

      res.subscribe({
        next: (response) => {
          if (response?.success === true) {
            emitSuccess();
            return;
          }
          this.setSubmitErrorIfNeeded(didEmit, mailSucceeded);
        },
        error: (err) => {
          console.error('Error sending contact form via Cloudflare Worker:', err);
          this.setSubmitErrorIfNeeded(didEmit, mailSucceeded);
        }
      });
    } catch (err) {
      console.error('Error sending contact form:', err);
      this.setSubmitErrorIfNeeded(didEmit, mailSucceeded);
    } finally {
      this.isSubmitting = false;
    }
  }

  private getNormalizedValues(): NormalizedFormValues {
    return {
      phone: this.normalizedPhone(),
      email: this.normalizedEmail(),
      group: String(this.groupControl.value ?? '')
    };
  }

  private buildFormData(values: NormalizedFormValues): FormData {
    const formData = new FormData();
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('group', values.group);
    formData.append('access_key', environment.formAccessKey);
    return formData;
  }

  private buildWorkerPayload(values: NormalizedFormValues, trackingDebug: unknown): ContactFormPayload {
    return {
      ...values,
      tracking: {
        debug: trackingDebug
      }
    };
  }

  private getTrackingDebug(): unknown {
    try {
      const raw = localStorage.getItem(STORAGE_CONVERSION_DEBUG_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn('Failed to read tracking debug flag:', err);
      return null;
    }
  }

  private normalizedPhone(): string {
    return String(this.phoneControl.value ?? '')
      .trim()
      .replace(/\s+/g, '')
      .replace(/^(\+48|48)/, '');
  }

  private normalizedEmail(): string {
    return String(this.emailControl.value ?? '').trim().toLowerCase();
  }

  private setSubmitErrorIfNeeded(didEmit: boolean, mailSucceeded: boolean): void {
    if (!didEmit && !mailSucceeded) {
      this.submitError = SUBMIT_ERROR_MESSAGE;
    }
  }

  private acknowledgeConversion(): void {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: DATA_LAYER_EVENT
    });

    this.metaPixelService.track('Lead', {
      contact: this.normalizedPhone() || this.normalizedEmail(),
      group: this.groupControl.value
    });
  }
}
