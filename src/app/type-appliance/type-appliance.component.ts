import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication-service';
import { TypeApplianceService } from './type-appliance.service';
import { TypeAppliance } from './TypeAppliance';
//import { TypeAppliance } from '../TypeAppliance/TypeAppliance';

@Component({
  selector: 'typeAppliance-root',
  templateUrl: './type-appliance.component.html',
  styleUrls: ['./type-appliance.component.css']
})
export class TypeApplianceComponent implements OnInit {

  public typeAppliances: TypeAppliance[] = [];
  public editTypeAppliance:any;
  public deleteTypeAppliance: TypeAppliance | undefined;
  title: any;
  p : any;


  constructor(private typeApplianceService: TypeApplianceService  , private AuthService : AuthenticationService , private router : Router) { }
  ngOnInit(): void {
    this.getTypeAppliances();
    this.OnAddTypeAppliance;
  
  }
  // getTypeAppliances !!!! : 
  /* public getTypeAppliances(): void {
    //this.TypeApplianceService.getTypeAppliances().subscribe (
      (response: TypeAppliance[]) => {
        this.TypeAppliances = response;
        console.log(this.TypeAppliances);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } */
  
  public getTypeAppliances(): void {
    this.typeApplianceService.getTypeAppliances().subscribe(
      (response: TypeAppliance[]) => {
        this.typeAppliances = response;
        console.log(this.typeAppliances);
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(typeAppliance: TypeAppliance, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTypeApplianceModal');
    }
    if (mode === 'edit') {
      this.editTypeAppliance = typeAppliance;
      button.setAttribute('data-target', '#editTypeApplianceModal');
    }
    if (mode === 'delete') {
      this.deleteTypeAppliance = typeAppliance;
      
      button.setAttribute('data-target', '#deleteTypeApplianceModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editTypeAppliance = typeAppliance;
      console.log(this.editTypeAppliance.TypeAppliance);
      button.setAttribute('data-target', '#describeTypeApplianceModal');
    }

  }


  public OnAddTypeAppliance(addForm: NgForm): void {

    document.getElementById('add-TypeAppliance-form')?.click();
  console.log(addForm.value);

    this.typeApplianceService.addTypeAppliance(addForm.value).subscribe(
      (response: TypeAppliance) => {
        console.log(response);
        this.getTypeAppliances();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateTypeAppliance(typeAppliance: TypeAppliance): void {

    document.getElementById('add-TypeAppliance-form')?.click();

    this.typeApplianceService.updateTypeAppliance(typeAppliance).subscribe(
      (response: TypeAppliance) => {
        console.log(response);
        this.getTypeAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnDeleteTypeAppliance(TypeAppliance_id: number): void {
    this.typeApplianceService.deleteTypeAppliance(TypeAppliance_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTypeAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: TypeAppliance[] = [];
    
    for (const typeAppliance of this.typeAppliances) {
      if (
         typeAppliance.libelle.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
         {
        results.push(typeAppliance);
      }
    }
    this.typeAppliances = results;
    if (results.length === 0 || !keyword) {
      this.getTypeAppliances();
    }
  }

}
