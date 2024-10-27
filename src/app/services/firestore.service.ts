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
        const docRef = await addDoc(colRef, submissionData);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
      }
    }
}
