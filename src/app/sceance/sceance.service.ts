import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../login/authentication-service';

import { Pov } from '../pov/pov';
import { Sceance } from './sceance';

@Injectable({
  providedIn: 'root'
})
export class SceanceService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient ,  private AuthService : AuthenticationService) { 
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

  }
 

  public getSceances(): Observable<Sceance[]> {
    return this.http.get<Sceance[]>(`${this.apiServerUrl}/sceance/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addSceance(sceance : Sceance): Observable<Sceance> {
    return this.http.post<Sceance>(`${this.apiServerUrl}/sceance/add`, sceance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateSceance(sceance : Sceance): Observable<Sceance> {
    return this.http.put<Sceance>(`${this.apiServerUrl}/sceance/update`, sceance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteSceance(SceanceId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/sceance/delete/${SceanceId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 


  public getPovs(): Observable<Pov[]> {
    return this.http.get<Pov[]>(`${this.apiServerUrl}/pov/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 
  

  
}
