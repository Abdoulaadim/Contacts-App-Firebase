import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {

  statusContact : boolean =false;

  contact : Contact = {
     name  :'',
     telephone : 0
  }

  constructor(private contactService: ContactService) { }



  ngOnInit(): void {
  }

  newContact(){
    this.contactService.createContact(this.contact);
    this.contact.name='';
    this.contact.telephone= null;
    this.statusContact = false;
  }

}
