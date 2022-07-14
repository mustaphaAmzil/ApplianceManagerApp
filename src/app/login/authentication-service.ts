import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})


 
export class AuthenticationService {
  jwtToken: any;
  username: any;
  variable = 0;
  
  user!: string | null;
  roles!: Array<any>;

 
  isAuthenticated2( ){

    return this.variable;

  }

  isAuthenticated(){
    
    this.loadToken();
    if(this.jwtToken!=null){
      this.variable=1;
      return true;
    }
    else{
      this.variable=0;
      return false;
    }
   }

  saveToken(jwt : any){
    this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
    let helper=new JwtHelperService();

    this.username=helper.decodeToken(this.jwtToken).sub;
    localStorage.setItem('username',this.username);

    this.roles = helper.decodeToken(this.jwtToken).roles;


    for ( let r of this.roles ){
      console.log("the role is :"+r);

    }
  }
  
  loadToken(){
    this.jwtToken=localStorage.getItem('token');
    console.log("Jwt WAS "+this.jwtToken);  
    return true;
  }
  loadUsername(){
    this.user=localStorage.getItem('username');
  }
  isAdmin(){
     for(let r of this.roles ){
          if( r=='ADMIN') return true;
     }
     return false;
}

isManager(){
  for(let r of this.roles ){
//console.log(r);

       if(r=='MANAGER') return true;

  } 
  return false;
}

isSuperAdmin(){
  for(let r of this.roles ){
//console.log(r);

       if(r=='SUPER_ADMIN') return true;

  } 
  return false;
}
  private apiServerUrl = environment.apiBaseUrl;

  constructor (private http: HttpClient ) { }

  authLogin(user : any){
    return this.http.post(this.apiServerUrl+"/login",user,{observe:'response'});
   //  this.isAuthenticated();
  }
  logout(){
    this.jwtToken=null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isAuthenticated();
  }


/*
   login(user: Login)  {
    return this.http.post(this.apiServerUrl+"/login", user, {observe : 'response'});
  } */
}

