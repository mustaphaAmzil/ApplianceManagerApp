import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'povmanagerapp';

  user: any;

  constructor(public authService: AuthenticationService , private router :Router ) {
  }
 ngOnInit(): void  {
  // this.checkToken();
   this.loginAgain();

}
  checkToken() {

   if( this.authService.isAuthenticated() == false) {
    this.router.navigateByUrl('/login');

    console.log(  this.authService.isAuthenticated());
    console.log( "You have to authenticate  !!! ");
   }

  }
  onLogout() {
      this.authService.logout();
      this.router.navigateByUrl('/login');
  }
//if the acces token was ewpired
  loginAgain () {
    if(this.authService.isAuthenticated()==false ) {
      this.authService.logout();
      this.router.navigateByUrl('/login');
      console.log( "You have to authenticate again  !!! ");

    };
  }
 
}
