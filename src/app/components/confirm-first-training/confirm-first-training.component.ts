import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CloudflareWorkerService } from './../../services/cloudflare-worker.service';

@Component({
  selector: 'app-confirm-first-training',
  templateUrl: './confirm-first-training.component.html',
  styleUrls: ['./confirm-first-training.component.css']
})
export class ConfirmFirstTrainingComponent {
  form: FormGroup;
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
      this.token = params.get('token')!.trim().replace(/\/+$/, "");
    });
  }
  

  onDateSelected(date: string) {
    this.form.patchValue({ trainingDay: date });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        token: this.token
      };
      this.cloudflareWorkerService.sendFirstTrainingConfirmation(payload).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isError = false;
        },
        error: () => {
          this.isSuccess = false;
          this.isError = true;
        }
      });
    }
  }
}