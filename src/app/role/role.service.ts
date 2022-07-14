import { AuthenticationService } from './../login/authentication-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
  import { Role } from './role';



@Injectable({
 providedIn: 'root'
})
export class RoleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient ,private AuthService : AuthenticationService) { 
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

  }
 


 

  public getRoles(): Observable<Role[]> {
     return this.http.get<Role[]>(`${this.apiServerUrl}/role/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addRole(role : Role): Observable<Role> {
 
    return this.http.post<Role>(`${this.apiServerUrl}/role/add`, role,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateRole(role : Role): Observable<Role> {
     

    return this.http.put<Role>(`${this.apiServerUrl}/role/update`, role,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteRole(roleId : number): Observable<void> {
 

    return this.http.delete<void>(`${this.apiServerUrl}/role/delete/${roleId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});

  }


  }