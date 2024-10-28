import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private firestoreService: FirestoreService) {}

  sendEmail(formData: FormData): Promise<Response> {

    //TEMPORARLY HANDLE LOGIC FOR POSTING DATA TO FIRESTORE IN MAIL SERVIE 
    const contactData = formData.get('contact');
    const groupData = formData.get('group');
    const submissionData = {
      contact: contactData, 
      group: groupData
    };
    this.firestoreService.postFormSubmission(submissionData);
    
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
  }
}
