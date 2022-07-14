import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../login/authentication-service';
import { Pov } from '../pov/pov';
import { TypePrestation } from '../type-prestation/TypePrestation';
import { Suivi } from './suivi';

@Injectable({
  providedIn: 'root'
})

export class SuiviService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient , private AuthService : AuthenticationService) {
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

   }
 

  public getSuivis(): Observable<Suivi[]> {
    return this.http.get<Suivi[]>(`${this.apiServerUrl}/suivi/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addSuivi(suivi : Suivi): Observable<Suivi> {
    return this.http.post<Suivi>(`${this.apiServerUrl}/suivi/add`, suivi,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateSuivi(suivi : Suivi): Observable<Suivi> {
    return this.http.put<Suivi>(`${this.apiServerUrl}/suivi/update`, suivi,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteSuivi(SuiviId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/suivi/delete/${SuiviId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 


  public getPovs(): Observable<Pov[]> {
    return this.http.get<Pov[]>(`${this.apiServerUrl}/pov/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 
  public getTypePrestations(): Observable<TypePrestation[]> {
    return this.http.get<TypePrestation[]>(`${this.apiServerUrl}/typePrestation/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 

  

  
}
