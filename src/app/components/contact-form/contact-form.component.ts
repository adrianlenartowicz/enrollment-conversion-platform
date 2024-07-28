import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailOrPhoneValidator } from './validators/email-or-phone.validator';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isSubmited: boolean = false;
  wasButtonClicked: boolean = false;
  form!: FormGroup;
  groups: string[] = ['U8: 5-7 lat', 'U10: 8-9 lat', 'U12: 10-11 lat', 'U14: 12-13 lat'];
  canDisplayRodoReminder: boolean = false;

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
    let formData: FormData = new FormData();
    formData.append('contact', this.form.get('contact')?.value);
    formData.append('group', this.form.get('group')?.value); 
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
    if (this.form.get('contact')!.valid && this.form.get('group')!.valid)
      this.canDisplayRodoReminder = true;
  }

  acknowledgeConversion() {
    this.metaPixelService.track('Lead', {contact: this.form.get('contact')?.value, group: this.form.get('group')?.value});
  }
}
