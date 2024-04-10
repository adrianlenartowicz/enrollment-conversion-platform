import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailOrPhoneValidator } from './validators/email-or-phone.validator';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isSubmited: boolean = false;
  wasButtonClicked: boolean = false;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private mailService: MailService) {};

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        contact: ['', [EmailOrPhoneValidator()]],
        rodo: ['', Validators.requiredTrue]
      }
    )
  }

  async submitEmail() {
    this.isSubmited = true;
    let formData: FormData = new FormData();
    formData.append('contact', this.form.get('contact')?.value);
    formData.append('access_key', environment.formAccessKey);

    try {
      const res = await this.mailService.sendEmail(formData);
      console.log(res)
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
    }
  }

  informAboutClick() {
    this.wasButtonClicked = true;
  }

}
