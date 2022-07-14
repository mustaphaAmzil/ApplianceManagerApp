import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Client } from '../client/client';
import { AuthenticationService } from '../login/authentication-service';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient  , private AuthService : AuthenticationService) {
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

   }
 

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiServerUrl}/contact/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
     // Token with contacts .. Relations
  } 
  
  public addcontact(contact : Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiServerUrl}/contact/add`, contact,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateContact(contact : Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiServerUrl}/contact/update`, contact,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteContact(contactId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/contact/delete/${contactId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 

   public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
}
 