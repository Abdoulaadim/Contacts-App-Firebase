import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactDoc:AngularFirestoreDocument<Contact>;
  contactCollection : AngularFirestoreCollection<Contact>;
  contacts : Observable<Contact[]>;


  constructor(private afs : AngularFirestore) {

      this.contactCollection=this.afs.collection('contacts');
     // this.contacts=this.contactCollection.valueChanges();

     //recuperer les id en doit appelé snapshotChanges
     this.contacts=this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

   }

   getContacts(){
     return this.contacts;
   }

   createContact(contact: Contact){
     this.contactCollection.add(contact);
   }

   updateContact(contact : Contact){

    this.contactDoc=this.contactCollection.doc<Contact>(contact.id)
    this.contactDoc.update(contact);

   }

   destroyContact(contact){
    this.contactDoc=this.contactCollection.doc<Contact>(contact.id)
    this.contactDoc.delete();
   }
}



