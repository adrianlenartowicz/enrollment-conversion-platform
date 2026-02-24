import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './validators/email.validator';
import { PhoneValidator } from './validators/phone.validator';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { CloudflareWorkerService } from '../../services/cloudflare-worker.service';

type ContactFormPlacement = 'landing' | 'section';

const STORAGE_CONVERSION_DEBUG_KEY = 'tracking_debug';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isSubmitting = false;
  wasButtonClicked = false;
  submitError: string | null = null;
  form!: FormGroup;
  groups = [
    { label: '5-7 lat', value: '5-7' },
    { label: '8-10 lat', value: '8-10' },
    { label: '11-13 lat', value: '11-13' }
  ];


  @Input({ required: true }) placement!: ContactFormPlacement;
  @Output() formSubmitted = new EventEmitter<void>();

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

  onGroupSelected(value: string): void {
    this.groupControl.setValue(value);
    this.groupControl.markAsTouched();
    this.groupControl.updateValueAndValidity();
  }

  get shouldShowRodo(): boolean {
    return this.groupControl.valid && this.phoneControl.valid && this.emailControl.valid;
  }

  private getTrackingDebug() {
    const raw = localStorage.getItem(STORAGE_CONVERSION_DEBUG_KEY);
    return raw ? JSON.parse(raw) : null;
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

  async submitEmail(): Promise<void> {
    this.isSubmitting = true;
    this.submitError = null;
    let didEmit = false;
    let mailSucceeded = false;
    const emitSuccess = () => {
      if (didEmit) {
        return;
      }
      didEmit = true;
      this.submitError = null;
      this.formSubmitted.emit();
    };

    const phone = this.normalizedPhone();
    const email = this.normalizedEmail();
    const group = String(this.groupControl.value ?? '');

    const formData: FormData = new FormData();
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('group', group);
    formData.append('placement', this.placement);
    formData.append('access_key', environment.formAccessKey);

    try {
      const res = await this.mailService.sendEmail(formData);
      if (!res.ok) {
        throw new Error();
      }
      mailSucceeded = true;
      emitSuccess();
    } catch (err) {
      console.error(err);
    }

    const trackingDebug = this.getTrackingDebug();

    try {
      const res = this.cloudflareWorkerService.sendContactForm({
        phone,
        email,
        group,
        placement: this.placement,
        tracking: {
          debug: trackingDebug
        }
      });

      res.subscribe({
        next: (response) => {
          if (response?.success === true) {
            this.acknowledgeConversion();
            emitSuccess();
            return;
          }
          if (!didEmit && !mailSucceeded) {
            this.submitError = 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub zadzwoń: 459 119 894.';
          }
        },
        error: (err) => {
          console.error('Error sending contact form via Cloudflare Worker:', err);
          if (!didEmit && !mailSucceeded) {
            this.submitError = 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub zadzwoń: 459 119 894.';
          }
        }
      });
    } catch (err) {
      console.error('Error sending contact form:', err);
      if (!didEmit && !mailSucceeded) {
        this.submitError = 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub zadzwoń: 459 119 894.';
      }
    } finally {
      this.isSubmitting = false;
    }
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

    this.submitEmail();
  }

  acknowledgeConversion(): void {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'form_submit_success'
    });

    this.metaPixelService.track('Lead', {
      contact: this.normalizedPhone() || this.normalizedEmail(),
      group: this.groupControl.value
    });
  }

}
