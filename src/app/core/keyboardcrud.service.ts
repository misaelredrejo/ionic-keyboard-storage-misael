import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class KeyboardcrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Keyboard(record) {
    return this.firestore.collection('Keyboards').add(record);
  }
  read_Keyboards() {
    return this.firestore.collection('Keyboards').snapshotChanges();
  }
  update_Keyboard(recordID, record) {
    this.firestore.doc('Keyboards/' + recordID).update(record);
  }
  delete_Keyboard(record_id) {
    this.firestore.doc('Keyboards/' + record_id).delete();
  }
}