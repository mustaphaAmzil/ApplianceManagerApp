import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../login/authentication-service';
import { TypePrestation } from '../type-prestation/TypePrestation';
import { TypeAppliance } from './TypeAppliance';


@Injectable({
  providedIn: 'root'
})
export class TypeApplianceService {


  private apiServerUrl = environment.apiBaseUrl;
 
  constructor (private AuthService : AuthenticationService,private http: HttpClient) { 
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

  }
 

  public getTypeAppliances(): Observable<TypeAppliance[]> {
 
    return this.http.get<TypeAppliance[]>(`${this.apiServerUrl}/typeAppliance/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addTypeAppliance(typeAppliance : TypeAppliance): Observable<TypeAppliance> {
    return this.http.post<TypeAppliance>(`${this.apiServerUrl}/typeAppliance/add`, typeAppliance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateTypeAppliance(typeAppliance : TypeAppliance): Observable<TypeAppliance> {
    return this.http.put<TypeAppliance>(`${this.apiServerUrl}/typeAppliance/update`, typeAppliance,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteTypeAppliance(TypeApplianceId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/typeAppliance/delete/${TypeApplianceId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 


  
}
