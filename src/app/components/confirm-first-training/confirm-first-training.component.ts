import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CloudflareWorkerService } from './../../services/cloudflare-worker.service';
import { on } from 'node:events';

@Component({
  selector: 'app-confirm-first-training',
  templateUrl: './confirm-first-training.component.html',
  styleUrls: ['./confirm-first-training.component.css']
})
export class ConfirmFirstTrainingComponent {
  form: FormGroup;
  wasButtonClicked: boolean = false;
  isSubmitted = false;
  isSuccess = false;
  isError = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cloudflareWorkerService: CloudflareWorkerService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      trainingDay: ['', Validators.required]
    });

    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token')?.trim() || null;
    });
  }
  

  onDateSelected(date: string) {
    this.form.patchValue({ trainingDay: date });
  }

  informAboutClick() {
    this.wasButtonClicked = true;
     if (this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    const payload = {
        ...this.form.value,
        token: this.token
      };
      this.cloudflareWorkerService.sendFirstTrainingConfirmation(payload).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isError = false;
        },
        error: (error) => {
          this.isSuccess = false;
          this.isError = true;
          console.error('Error submitting confirmation:', error);
        }
      });
  }
}