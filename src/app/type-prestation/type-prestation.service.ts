import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../login/authentication-service';
import { TypePrestation } from './TypePrestation';


@Injectable({
  providedIn: 'root'
})
export class TypePrestationService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient  , private AuthService : AuthenticationService) {
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

   }
 

  public getTypePrestations(): Observable<TypePrestation[]> {
    return this.http.get<TypePrestation[]>(`${this.apiServerUrl}/typePrestation/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addTypePrestation(typePrestation : TypePrestation): Observable<TypePrestation> {
    return this.http.post<TypePrestation>(`${this.apiServerUrl}/typePrestation/add`, typePrestation,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateTypePrestation(typePrestation : TypePrestation): Observable<TypePrestation> {
    return this.http.put<TypePrestation>(`${this.apiServerUrl}/typePrestation/update`, typePrestation,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteTypePrestation(TypePrestationId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/typePrestation/delete/${TypePrestationId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
    
  } 

  
}
