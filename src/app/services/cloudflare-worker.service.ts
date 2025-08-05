import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudflareWorkerService {
  private contactWorkerUrl: string = 'https://forms-cloudflare-hubspot.wroclawala.workers.dev/';
  private confirmFirstTrainingWorkerUrl: string = 'https://confirm-first-training.wroclawala.workers.dev/';
  
constructor(private httpClient: HttpClient) { }

  sendContactForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
    return this.httpClient.post(this.contactWorkerUrl, formData, { headers });
  }

  sendFirstTrainingConfirmation(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.confirmFirstTrainingWorkerUrl, formData, { headers });
  }
}