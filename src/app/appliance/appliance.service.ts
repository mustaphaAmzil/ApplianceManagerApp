import { AuthenticationService } from './../login/authentication-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeAppliance } from '../type-appliance/TypeAppliance';
import { Appliance } from './appliance';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor (private AuthService :AuthenticationService,private http: HttpClient) { 
    if(this.AuthService.jwtToken==null)
     this.AuthService.loadToken();

  }
 

  public getAppliances(): Observable<Appliance[]> {
    return this.http.get<Appliance[]>(`${this.apiServerUrl}/appliance/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addAppliance(appliance : Appliance): Observable<Appliance> {
    return this.http.post<Appliance>(`${this.apiServerUrl}/appliance/add`, appliance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateAppliance(appliance : Appliance): Observable<Appliance> {
    return this.http.put<Appliance>(`${this.apiServerUrl}/appliance/update`, appliance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteAppliance(ApplianceId : number): Observable<void> {
    if(this.AuthService.jwtToken==null)
     this.AuthService.loadToken();
    return this.http.delete<void>(`${this.apiServerUrl}/appliance/delete/${ApplianceId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 
  
  public getTypeAppliances(): Observable<TypeAppliance[]> {
    return this.http.get<TypeAppliance[]>(`${this.apiServerUrl}/typeAppliance/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
}


