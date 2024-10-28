import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async postFormSubmission(submissionData: any) {
    const collectionName = 'form-submissions';
      try {
        const colRef = collection(this.firestore, collectionName);
        await addDoc(colRef, submissionData);
      } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
      }
    }
}
