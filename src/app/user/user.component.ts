import { Router } from '@angular/router';
  import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
 import { AuthenticationService } from '../login/authentication-service';
import { UserService } from './user.service';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';


@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users!: User[];
  public editUser: User | undefined;
  public deleteUser: User | undefined;
  title: any;
  p : any;
  roles: Role[] = [];
  
  updateUserForm = new FormGroup({
    id : new FormControl(''),
    nom : new FormControl(''),
    prenom : new FormControl(''),
    email : new FormControl(''),
    username : new FormControl(''),
    password : new FormControl(''),
    telephone :  new FormControl(''),
    role: new FormControl('')
  })
  user: any;
  role : Role | undefined;
  K: string | undefined;
  Roles!: Role[];

   constructor(public roleService : RoleService,public userService: UserService , public AuthService : AuthenticationService , private router : Router, private fb : FormBuilder) { }
  ngOnInit(): void {
    this.getUsers();
    this.getRolesByUserId
    this.getRoles();
     this.updateUserForm = this.fb.group({ 
    id: [],
    nom: [],
    prenom: [],
    email: [],
    username: [],
    password: [],
    telephone: [],
    role: []
  } );
   }


  public getRolesByUserId(userID: number): void {
    console.log(userID);
    this.userService.getRoleByUserID(userID).subscribe(
      (response: Role[]) => {
    
        this.roles = response;

        console.log( this.roles);
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  } 
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => { 
        if(error.status == 403) {  
              alert("Votre session a expiré. Veuillez vous reconnecter !!");
              this.AuthService.logout();
              this.router.navigateByUrl("/login");
        } else alert(error.message);

       

      }

    );
  } 
  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.Roles = response;
      },
      (error: HttpErrorResponse) => { 
        if(error.status == 403) {  
              alert("Votre session a expiré. Veuillez vous reconnecter !!");
              this.AuthService.logout();
              this.router.navigateByUrl("/login");
        } else alert(error.message);

       

      }

    );
  } 
  /*
   console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                        window.location.href = "/login";
                    }
  */
 

// exportFile (format : string) : void {
//   console.log(format);
//   this.userService.exportFile(format).subscribe(
//     (response: void) => {
//        alert("Le fichier listUsers.pdf a été téléchargé avec succès !!");

//     },
//     (error: HttpErrorResponse) => {
//      // alert(error.message);
//       alert("Le fichier listUsers.pdf a été téléchargé avec succès !!");

//      }

//   );

// }  
  
  // getContacts 
  /*
  public getContacts(): void {
    this.userService.getContacts().subscribe(
      (response: Contact[]) => {
        this.users = response;
        console.log("users ");
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  } 
*/


  public onOpenModal(user: User, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
      
    }
    if (mode === 'edit') {
      this.editUser = user;
      this.ShowUserData(this.editUser);
      button.setAttribute('data-target', '#editUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
      container?.appendChild(button);
      button.click();
    }

    if (mode === 'show') {
      this.editUser = user;
      this.getRolesByUserId(this.editUser!.id)

       //console.log(this.editUser.Contacts);
      button.setAttribute('data-target', '#describeContactModal');
    }
  }


  public OnAddUser(addForm: NgForm): void {

    document.getElementById('add-user-form')?.click();

    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        addForm.reset;
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateUser(): void {

    document.getElementById('add-user-form')?.click();

    this.userService.updateUser(this.updateUserForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ShowUserData (user: User) {
    console.log(user);

    console.warn(this.updateUserForm.value);
console.log(user);
    this.updateUserForm.patchValue( {
      id: user.id, 
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      username: user.username,
      password: user.password,
      telephone: user.telephone,
    
      role: this.roles


    });

  }

  public OnDeleteUser(User_id: number): void {
    this.userService.deleteUser(User_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: User[] = [];
    
    for (const user of this.users) {
      if (user.nom.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || user.prenom.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || user.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || user.telephone.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !keyword) {
      this.getUsers();
    }
  }
  exportFile (format : string) : void {
    console.log(format);
    this.userService.exportFile(format).subscribe(
      (response: void) => {
         alert("Le fichier listClients.pdf a été téléchargé avec succès !!");
  
      },
      (error: HttpErrorResponse) => {
       // alert(error.message);
        alert("Le fichier listClients.pdf a été téléchargé avec succès !!");
  
       }
  
    );
  
  }  

  SetRole () {
    if(this.AuthService.isManager() ) {
      this.K="MANAGER";     }
    if(this.AuthService.isAdmin() ) {
      this.K="ADMIN";     }
      if(this.AuthService.isSuperAdmin() ) {
        this.K="SUPER_ADMIN";     }
      
   }
  
}
