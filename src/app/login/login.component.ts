 import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AuthenticationService } from './authentication-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
 
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  mode: any;
  //user1  = new Login("admin1","12345");
/*
  loginForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
    
  })
*/
  constructor(private AuthService : AuthenticationService,private fb: FormBuilder,private router:Router) {
  }

  ngOnInit() {

   

//    this.loginForm  = this.fb.group({
     // username:  ['', [Validators.required]],
     // password: ['', [Validators.required, Validators.minLength(4)]]
  //  })

//  this.createForm();
  }

 


/*
  private createForm() {
    loginForm = new FormGroup({
      // tslint:disable-next-line
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
    });
  } */

  onLogin(user : any){
     console.log('salut :: bienvenue');
    this.AuthService.authLogin(user).subscribe(resp=>{
   //   console.log(resp);
      let jwt=resp.headers.get('Authorization');
    
      
     //show token
      console.log("Jwt : "+jwt);
      this.AuthService.saveToken(jwt);
      console.log(this.AuthService.roles);

      this.AuthService.isAuthenticated();
      this.AuthService.loadUsername();

      if(this.AuthService.isManager()) {
        console.log("I am a manager"); }

        if(this.AuthService.isManager() ) {
          this.router.navigateByUrl("/pov");
         }
          if(this.AuthService.isAdmin() ) {
          this.router.navigateByUrl("/client");
         }
         if(this.AuthService.isSuperAdmin() ) {
          this.router.navigateByUrl("/client");
         }
      
    },err=>{
      this.mode=1;
    })
  }
     
   /*

  OnLogin() {

  //  let Form = JSON.stringify(this.loginForm.value);

    this.AuthService.login(this.user1).subscribe (
      response=>{

        console.log();
        let jwtToken = response.headers.get('authorization');
        console.log("jwtToken");
      //  this.AuthService.saveToken(jwtToken);

       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 
  */

}
