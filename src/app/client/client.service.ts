import { AuthenticationService } from './../login/authentication-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../contact/contact';
 import { Client } from './client';



@Injectable({
 providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient ,private AuthService : AuthenticationService) { 
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

  }
 
     // getContacts 
  public getContacts(): Observable<Contact[]> {
 
    return this.http.get<Contact[]>(`${this.apiServerUrl}/contact/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 

 

  public getClients(): Observable<Client[]> {
     return this.http.get<Client[]>(`${this.apiServerUrl}/client/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addClient(client : Client): Observable<Client> {
 
    return this.http.post<Client>(`${this.apiServerUrl}/client/add`, client,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateClient(client : Client): Observable<Client> {
     

    return this.http.put<Client>(`${this.apiServerUrl}/client/update`, client,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteClient(clientId : number): Observable<void> {
 

    return this.http.delete<void>(`${this.apiServerUrl}/client/delete/${clientId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});

  }
  
  public getContactsByClientId( clientId : number) : Observable<Contact[]> {
  

    return this.http.get<Contact[]>(`${this.apiServerUrl}/client/getContacts/${clientId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});


  }
  public exportFile(format : string): Observable<void> {
 

    return this.http.get<void>(`${this.apiServerUrl}/client/report/${format}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});

  }
 
}