import { AuthenticationService } from './../login/authentication-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
  import { User } from './user';
import { Role } from '../role/role';



@Injectable({
 providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient ,private AuthService : AuthenticationService) { 
    if(this.AuthService.jwtToken==null) this.AuthService.loadToken();

  }
 


 

  public getUsers(): Observable<User[]> {
     return this.http.get<User[]>(`${this.apiServerUrl}/user/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 
  
  public addUser(user : User): Observable<User> {
 
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

   public updateUser(user : User): Observable<User> {
     

    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
  } 

  public deleteUser(userId : number): Observable<void> {
 

    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});

  }
 
 public getRoleByUserID( UserId : number) : Observable<Role[]> {
  

  return this.http.get<Role[]>(`${this.apiServerUrl}/user/getRoles/${UserId}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});


}

public getRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(`${this.apiServerUrl}/role/all`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});
}
  public exportFile(format : string): Observable<void> {
 

    return this.http.get<void>(`${this.apiServerUrl}/client/report/${format}`,{headers : new HttpHeaders({'Authorization' :this.AuthService.jwtToken})});

  }


  }