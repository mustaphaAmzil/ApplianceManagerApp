import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../client/client';
import { AuthenticationService } from '../login/authentication-service';
import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'contact-root',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contacts: Contact[] = [];
  public editContact:any;
  public deleteContact: Contact | undefined;

  
  clients: any;
  title: any;
  p : any;

  updateContactForm = new FormGroup({
    id : new FormControl(''),
    email : new FormControl(''),
    fonction : new FormControl(''),
    nom :  new FormControl(''),
    prenom :  new FormControl(''),
    telephone :  new FormControl(''),
    client: new FormControl('')
  })

constructor(private contactService: ContactService  , private AuthService : AuthenticationService , private router : Router , private fb : FormBuilder) { }
  ngOnInit(): void {
    this.getContacts();
    this.OnAddContact;
    this.getClients();

    this.updateContactForm = this.fb.group({ 
      id: [],
      nom: [],
      prenom: [],
      email: [],
      fonction: [],
      telephone: [],
      client: []
    } );


  }
  // getClients !!!! : 
  public getClients(): void {
    this.contactService.getClients().subscribe (
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 
  
  public getContacts(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(contact: Contact, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addContactModal');
    }
    if (mode === 'edit') {
      this.editContact = contact;
      this.ShowContactData(this.editContact);
      console.log(this.editContact.client.libelle);  


      button.setAttribute('data-target', '#editContactModal');
    }
    if (mode === 'delete') {
      this.deleteContact = contact;
      button.setAttribute('data-target', '#deleteContactModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editContact = contact;
      console.log(this.editContact.client);
      button.setAttribute('data-target', '#describeContactModal');
    }

  }


  public OnAddContact(addForm: NgForm): void {

    document.getElementById('add-contact-form')?.click();
  console.log(addForm.value);

    this.contactService.addcontact(addForm.value).subscribe(
      (response: Contact) => {
        console.log(response);
        this.getContacts();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateContact(): void {

    document.getElementById('add-contact-form')?.click();
    console.log(this.updateContactForm.value);


    this.contactService.updateContact(this.updateContactForm.value).subscribe(
      (response: Contact) => {
        console.log(response);
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  
  ShowContactData (contact: Contact) {
    console.log(contact);

    console.warn(this.updateContactForm.value);
console.log(contact);
    this.updateContactForm.patchValue( {
      id: contact.id, 
      nom: contact.nom,
      prenom: contact.prenom,
      email: contact.email,
      fonction: contact.fonction,
      telephone: contact.telephone,
    
      client: contact.client


    });

  }

  public OnDeleteContact(Contact_id: number): void {
    this.contactService.deleteContact(Contact_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Contact[] = [];
    
    for (const contact of this.contacts) {
      if (contact.email.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || contact.fonction.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || contact.nom.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || contact.prenom.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 
        || contact.telephone.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
         {
        results.push(contact);
      }
    }
    this.contacts = results;
    if (results.length === 0 || !keyword) {
      this.getContacts();
    }
  }

}
