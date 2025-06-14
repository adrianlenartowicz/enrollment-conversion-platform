import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailOrPhoneValidator } from './validators/email-or-phone.validator';
import { MailService } from '../../services/mail.service';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { detectContactType } from './validators/email-or-phone.validator';
import { firstValueFrom } from 'rxjs';

type contactFormPlacement = 'landing' | 'section';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
    standalone: false
})
export class ContactFormComponent implements OnInit {
  isSubmited: boolean = false;
  wasButtonClicked: boolean = false;
  form!: FormGroup;
  groups: string[] = ['U8: 5-7 lat', 'U10: 8-9 lat', 'U12: 10-11 lat', 'U14: 12-13 lat'];
  canDisplayRodoReminder: boolean = false;
  @Input({required: true}) placement!: contactFormPlacement;

  constructor(private formBuilder: FormBuilder, private mailService: MailService, private metaPixelService: MetaPixelService) {};

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        contact: ['', [EmailOrPhoneValidator()]],
        rodo: ['', Validators.requiredTrue],
        group: ['', Validators.required]
      }
    );
  }

  async submitEmail() {
    this.isSubmited = true;

    const contact = this.form.get('contact')?.value;
    const contactType = detectContactType(contact);

    const payload = {
      phoneNumber: contactType === 'phone' ? contact : undefined,
      email: contactType === 'email' ? contact : undefined,
      ageGroup: this.form.get('group')?.value,
      placement: this.placement,
    };


  try {
      const res = await firstValueFrom(this.mailService.sendEmail(payload));
      console.log(res);
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
    if (this.form.get('contact')!.valid && this.form.get('group')!.valid)
      this.canDisplayRodoReminder = true;
  }

  acknowledgeConversion() {
    this.metaPixelService.track('Lead', {contact: this.form.get('contact')?.value, group: this.form.get('group')?.value});
  }
}
