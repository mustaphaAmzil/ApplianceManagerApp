import { TypePrestation } from './../type-prestation/TypePrestation';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Client } from '../client/client';
import { Pov } from '../pov/pov';
import { Suivi } from './suivi';
import { SuiviService } from './suivi.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication-service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {

  public suivis: Suivi[] = [];
  public editSuivi:Suivi | undefined;
  public deleteSuivi: Suivi | undefined;
  ngSelect : any;
  //selected!: TypeSuivi;

  
  //typeSuivis!: TypeSuivi[];
  title: any;
  povs: any;
  TypePrestations: any;
  p : any;

  
  updateSuiviForm = new FormGroup({
    id : new FormControl(''),
    compte_rendu : new FormControl(''),
    montant : new FormControl(''),
    offer_commercial : new FormControl(''),
    pov: new FormControl(''),
    typePrestation: new FormControl('')
  })

  constructor(private suiviService: SuiviService  , private AuthService : AuthenticationService , private router : Router, private fb : FormBuilder) { }
  ngOnInit(): void {

    this.getSuivis();
    this.OnAddSuivi;
     this.getPovs();
     this.getTypePrestations();

     this.updateSuiviForm = this.fb.group({
      id: [],
      compte_rendu: [],
      montant: [],
      offer_commercial: [],
      pov: [],
      typePrestation: []
     } );

    
  }
 
//getTypePrestations
public getTypePrestations(): void {
  this.suiviService.getTypePrestations().subscribe(
    (response: TypePrestation[]) => {
      this.TypePrestations = response;

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }

  );

}


  //getPovs 
  public getPovs(): void {
    this.suiviService.getPovs().subscribe(
      (response: Pov[]) => {
        this.povs = response;

        this.ngSelect = this.povs[0];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }


  public getSuivis(): void {
    this.suiviService.getSuivis().subscribe(
      (response: Suivi[]) => {
        this.suivis = response;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(suivi: Suivi, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addSuiviModal');
    }
    if (mode === 'edit') {
      this.editSuivi = suivi;
      this.ShowSuiviData(this.editSuivi);

      console.log(suivi);
     
      console.log(this.editSuivi.pov.libelle_pov);  
      button.setAttribute('data-target', '#editSuiviModal');
      setTimeout(() => {
        console.log('test');
        
        this.editSuivi = suivi;
      }, 1000);
    }
    if (mode === 'delete') {
      this.deleteSuivi = suivi;
      
      button.setAttribute('data-target', '#deleteSuiviModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editSuivi = suivi;
      button.setAttribute('data-target', '#describeSuiviModal');
    }

  }


  public OnAddSuivi(addForm: NgForm): void {

    document.getElementById('add-suivi-form')?.click();
  console.log(addForm.value);

    this.suiviService.addSuivi(addForm.value).subscribe(
      (response: Suivi) => {
        console.log(response);
        this.getSuivis();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateSuivi( ): void {

    document.getElementById('add-suivi-form')?.click();

    this.suiviService.updateSuivi(this.updateSuiviForm.value).subscribe(
      (response: Suivi) => {
        console.log(response);
        this.getSuivis();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
  ShowSuiviData (suivi: Suivi) {
    console.log(suivi);

    console.warn(this.updateSuiviForm.value);
console.log(suivi);
    this.updateSuiviForm.patchValue( {
      id: suivi.id, 
      compte_rendu: suivi.compte_rendu,
      montant: suivi.montant,
      offer_commercial: suivi.offer_commercial,
      pov: suivi.pov,
      typePrestation: suivi.typePrestation,
  
    


    });

  }

  public OnDeleteSuivi(Suivi_id: number): void {
    this.suiviService.deleteSuivi(Suivi_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSuivis();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Suivi[] = [];
    
    for (const suivi of this.suivis) {
      if (  suivi.compte_rendu.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )

      

         {
        results.push(suivi);
      }
    }
    this.suivis = results;
    if (results.length === 0 || !keyword) {
      this.getSuivis();
    }
  }

 

}
