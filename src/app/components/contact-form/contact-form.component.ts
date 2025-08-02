import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './validators/email.validator';
import { PhoneValidator } from './validators/phone.validator';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';
import { MetaPixelService } from '../../services/meta-pixel.service';

type contactFormPlacement = 'landing' | 'section';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isSubmited: boolean = false;
  wasButtonClicked: boolean = false;
  form!: FormGroup;
  groups = [
    { label: '5-7 lat', value: '5-7' },
    { label: '8-10 lat', value: '8-10' },
    { label: '11-13 lat', value: '11-13' }
  ];
  canDisplayRodoReminder: boolean = false;
  @Input({required: true}) placement!: contactFormPlacement;

  constructor(private formBuilder: FormBuilder, private mailService: MailService, private metaPixelService: MetaPixelService) {};

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        phone: ['', [PhoneValidator()]],
        email: ['', [EmailValidator()]],
        rodo: ['', Validators.requiredTrue],
        group: ['', Validators.required]
      }
    );
  }

  async submitEmail() {
    this.isSubmited = true;
    let formData: FormData = new FormData();
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('group', this.form.get('group')?.value);
    formData.append('placement', this.placement);
    formData.append('access_key', environment.formAccessKey);

    try {
      const res = await this.mailService.sendEmail(formData);
      console.log(res);
      if (!res.ok) {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitEmail();
      this.acknowledgeConversion();
    }
  }

  informAboutClick() {
    this.wasButtonClicked = true;
    if (this.form.get('phone')!.valid && this.form.get('email')!.valid && this.form.get('group')!.valid)
      this.canDisplayRodoReminder = true;
  }

  acknowledgeConversion() {
    this.metaPixelService.track('Lead', {contact: this.form.get('contact')?.value, group: this.form.get('group')?.value});
  }
}
