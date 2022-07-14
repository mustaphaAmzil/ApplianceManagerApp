import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication-service';
import { TypePrestationService } from './type-prestation.service';
import { TypePrestation } from './TypePrestation';

@Component({
  selector: 'app-type-prestation',
  templateUrl: './type-prestation.component.html',
  styleUrls: ['./type-prestation.component.css']
})
export class TypePrestationComponent implements OnInit {
  public typePrestations: TypePrestation[] = [];
  public editTypePrestation:any;
  public deleteTypePrestation: TypePrestation | undefined;
  title: any;
  p : any;


  constructor(private typePrestationService: TypePrestationService  , private AuthService : AuthenticationService , private router : Router) { }
  ngOnInit(): void {
    this.getTypePrestations();
    this.OnAddTypePrestation;
  
  }
  // getTypePrestations !!!! : 
  /* public getTypePrestations(): void {
    //this.TypePrestationService.getTypePrestations().subscribe (
      (response: TypePrestation[]) => {
        this.TypePrestations = response;
        console.log(this.TypePrestations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } */
  
  public getTypePrestations(): void {
    this.typePrestationService.getTypePrestations().subscribe(
      (response: TypePrestation[]) => {
        this.typePrestations = response;
        console.log(this.typePrestations);
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(typePrestation: TypePrestation, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTypePrestationModal');
    }
    if (mode === 'edit') {
      this.editTypePrestation = typePrestation;
      button.setAttribute('data-target', '#editTypePrestationModal');
    }
    if (mode === 'delete') {
      this.deleteTypePrestation = typePrestation;
      
      button.setAttribute('data-target', '#deleteTypePrestationModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editTypePrestation = typePrestation;
      console.log(this.editTypePrestation.TypePrestation);
      button.setAttribute('data-target', '#describeTypePrestationModal');
    }

  }


  public OnAddTypePrestation(addForm: NgForm): void {

    document.getElementById('add-TypePrestation-form')?.click();
  console.log(addForm.value);

    this.typePrestationService.addTypePrestation(addForm.value).subscribe(
      (response: TypePrestation) => {
        console.log(response);
        this.getTypePrestations();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateTypePrestation(typePrestation: TypePrestation): void {

    document.getElementById('add-TypePrestation-form')?.click();

    this.typePrestationService.updateTypePrestation(typePrestation).subscribe(
      (response: TypePrestation) => {
        console.log(response);
        this.getTypePrestations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnDeleteTypePrestation(TypePrestation_id: number): void {
    this.typePrestationService.deleteTypePrestation(TypePrestation_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTypePrestations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: TypePrestation[] = [];
    
    for (const typePrestation of this.typePrestations) {
      if (
         typePrestation.libelle_prestation.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
         {
        results.push(typePrestation);
      }
    }
    this.typePrestations = results;
    if (results.length === 0 || !keyword) {
      this.getTypePrestations();
    }
  }

}
