import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {

  statusContact = false;
  myContact : Contact;
  contacts ;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {

    this.contactService.getContacts().subscribe(contacts => {
      this.contacts =contacts;

      console.log(this.contacts);
      
    })
  }

  updateContact(contact){
    this.contactService.updateContact(contact);
    this.statusContact =false;
  }

  editContact(contact){

    this.statusContact =true;
    this.myContact =contact;
    
 

  }

  deleteContact(contact){
    if(confirm('Are you sure you want to delete this contact')){
      this.contactService.destroyContact(contact);
    }else{
      this.statusContact=false;
    }
    
  }

}
