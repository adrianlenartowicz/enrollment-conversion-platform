import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private firestoreService: FirestoreService) {}

  sendEmail(formData: FormData): Promise<Response> {

    //TEMPORARLY HANDLE LOGIC FOR POSTING DATA TO FIRESTORE IN MAIL SERVIE 
    const contactData = formData.get('contact') as string;
    const groupData = formData.get('group') as string;
    let submissionData = {
      name: '',
      email: '', 
      group: groupData,
      phoneNumber: '',
      dateOfFirstTraining: ''

    };
    this.isEmail(contactData) === true ? submissionData.email = contactData : submissionData.phoneNumber = contactData;
    this.firestoreService.postFormSubmission(submissionData);
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
  }

  isEmail(value: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

}
