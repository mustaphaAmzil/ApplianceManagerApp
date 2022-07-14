import { Router } from '@angular/router';
import { ContactService } from './../contact/contact.service';
 import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Client } from './client';

import { NgForm } from '@angular/forms';
import { Contact } from '../contact/contact';
import { AuthenticationService } from '../login/authentication-service';
import { ClientService } from './client.service';


@Component({
  selector: 'client-root',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clients: Client[] = [];
  public editClient: Client | undefined;
  public deleteClient: Client | undefined;
  title: any;
  p : any;
  contacts: Contact[] | undefined;
  
  

  constructor(private clientService: ClientService , private AuthService : AuthenticationService , private router : Router) { }
  ngOnInit(): void {
    this.getClients();
    this.OnAddClient;
  //  this.getContacts();
   this.getContactsByClientId
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => { 
        if(error.status == 403) {  
              alert("Votre session a expiré. Veuillez vous reconnecter !!");
              this.AuthService.logout();
              this.router.navigateByUrl("/login");
        } else alert(error.message);

       

      }

    );
  } 

  /*
   console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                        window.location.href = "/login";
                    }
  */
  //getContactsByClientId 
  

  public getContactsByClientId(clientId: number): void {
    console.log(clientId);
    this.clientService.getContactsByClientId(clientId).subscribe(
      (response: Contact[]) => {
    
        this.contacts = response;

        console.log( this.contacts);
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  } 

exportFile (format : string) : void {
  console.log(format);
  this.clientService.exportFile(format).subscribe(
    (response: void) => {
       alert("Le fichier listClients.pdf a été téléchargé avec succès !!");

    },
    (error: HttpErrorResponse) => {
     // alert(error.message);
      alert("Le fichier listClients.pdf a été téléchargé avec succès !!");

     }

  );

}  
  
  // getContacts 
  /*
  public getContacts(): void {
    this.clientService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        console.log("contacts ");
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  } 
*/


  public onOpenModal(client: Client, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
      
    }
    if (mode === 'edit') {
      this.editClient = client;
      button.setAttribute('data-target', '#editClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
      container?.appendChild(button);
      button.click();
    }

    if (mode === 'show') {
      this.editClient = client;
      this.getContactsByClientId(this.editClient!.id)
      //console.log(this.editClient.Contacts);
      button.setAttribute('data-target', '#describeContactModal');
    }
  }


  public OnAddClient(addForm: NgForm): void {

    document.getElementById('add-client-form')?.click();

    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        addForm.reset;
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateClient(client: Client): void {

    document.getElementById('add-client-form')?.click();

    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnDeleteClient(Client_id: number): void {
    this.clientService.deleteClient(Client_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Client[] = [];
    
    for (const client of this.clients) {
      if (client.libelle.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || client.activite.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || client.secteur.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !keyword) {
      this.getClients();
    }
  }

}
