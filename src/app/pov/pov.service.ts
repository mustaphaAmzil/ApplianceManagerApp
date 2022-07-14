import { AuthenticationService } from './../login/authentication-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appliance } from '../appliance/appliance';
import { Client } from '../client/client';
import { Pov } from './pov';


@Injectable({
  providedIn: 'root'
})
export class PovService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient , private AuthService :AuthenticationService) {
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

   }
 

  public getPovs(): Observable<Pov[]> {   
    return this.http.get<Pov[]>(`${this.apiServerUrl}/pov/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addPov(pov : Pov): Observable<Pov> {
    return this.http.post<Pov>(`${this.apiServerUrl}/pov/add`, pov,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updatePov(pov : Pov): Observable<Pov> {
    return this.http.put<Pov>(`${this.apiServerUrl}/pov/update`, pov,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deletePov(PovId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/pov/delete/${PovId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 
  public getClients(): Observable<Client[]> {
    
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public getAppliances(): Observable<Appliance[]> {
    return this.http.get<Appliance[]>(`${this.apiServerUrl}/appliance/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  }
   
  

  
}


