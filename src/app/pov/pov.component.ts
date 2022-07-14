import { Router } from '@angular/router';
import { Appliance } from './../appliance/appliance';
import { Client } from './../client/client';
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Pov } from "./pov";
import { PovService } from "./pov.service";
import { FormGroup , FormControl } from '@angular/forms';
import { AuthenticationService } from '../login/authentication-service';

@Component({
  selector: 'pov-root',
  templateUrl: './pov.component.html',
  styleUrls: ['./pov.component.css']
})
export class PovComponent implements OnInit {

  public povs: Pov[] = [];
  public editPov:any;
  public deletePov: Pov | undefined;
  ngSelect : any;
  //selected!: TypePov;

  updatePovForm = new FormGroup({
    libelle_pov : new FormControl(''),
    analyse_cyber : new FormControl(''),
    compte_manager : new FormControl(''),
    ingenieur_cyber :  new FormControl(''),
    date_debut :  new FormControl(''),
    date_fin :  new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(''),
    client: new FormControl(''),
    appliance: new FormControl('')
  })

 
   
  //typePovs!: TypePov[];
  title: any;
  clients: any;
  appliances: any ;
  p : any;


  constructor(public authService : AuthenticationService ,private povService: PovService  , private AuthService : AuthenticationService , private router : Router, private fb : FormBuilder) { }
  ngOnInit(): void {
    this.getPovs();
    this.OnAddPov;
    this.getClients();
    this.getAppliances();
    this.isManager()
  
    this.updatePovForm = this.fb.group({
      id: [],
      libelle_pov: [],
      analyse_cyber: [],
      compte_manager: [],
      ingenieur_cyber: [],
      date_debut: [],
      date_fin: [],
      description: [],
      client: [],
      appliance: []
    } );

  }

  isManager() {
 let h =   this.authService.isManager();
    console.log(h)
  }
 
   // getClients !!!! : 
   public getClients(): void {
    this.povService.getClients().subscribe (
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 
  //getAppliances 
  public getAppliances(): void {
    this.povService.getAppliances().subscribe(
      (response: Appliance[]) => {
        this.appliances = response;

        this.ngSelect = this.appliances[0];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }


  public getPovs(): void {
    this.povService.getPovs().subscribe(
      (response: Pov[]) => {
        this.povs = response;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(pov: Pov, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addPovModal');
    }
    if (mode === 'edit') {
      this.editPov = pov;
      console.log(pov);
      this.ShowPovData(this.editPov);
      console.log(this.editPov.client.libelle);  
      console.log(this.editPov.appliance.libelle_appliance);  
      button.setAttribute('data-target', '#editPovModal');
      setTimeout(() => {
        console.log('test');
        
        this.editPov = pov;
      }, 1000);
    }
    if (mode === 'delete') {
      this.deletePov = pov;
      
      button.setAttribute('data-target', '#deletePovModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editPov = pov;
      button.setAttribute('data-target', '#describePovModal');
    }

  }


  public OnAddPov(addForm: NgForm): void {

    document.getElementById('add-pov-form')?.click();
  console.log(addForm.value);

    this.povService.addPov(addForm.value).subscribe(
      (response: Pov) => {
        console.log(response);
        this.getPovs();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdatePov(): void {
    console.log(this.editPov.client.libelle);

    document.getElementById('add-pov-form')?.click();
    console.log(this.updatePovForm.value);

    this.povService.updatePov(this.updatePovForm.value).subscribe(
      (response: Pov) => {
        console.log(response);
        this.getPovs();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ShowPovData (pov: Pov) {
    console.warn(this.updatePovForm.value);
console.log(pov);
    this.updatePovForm.patchValue( {
      id: pov.id, 
      libelle_pov: pov.libelle_pov,
      analyse_cyber: pov.analyse_cyber,
      compte_manager: pov.compte_manager,
      ingenieur_cyber: pov.ingenieur_cyber,
      date_debut: pov.date_debut,
      date_fin: pov.date_fin,
      description: pov.description,
      client: pov.client,
      appliance: pov.appliance


    });

  }

  public OnDeletePov(Pov_id: number): void {
    this.povService.deletePov(Pov_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPovs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Pov[] = [];
    
    for (const pov of this.povs) {
      if (pov.analyse_cyber?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || pov.libelle_pov.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || pov.compte_manager.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || pov.ingenieur_cyber.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
         {
        results.push(pov);
      }
    }
    this.povs = results;
    if (results.length === 0 || !keyword) {
      this.getPovs();
    }
  }

}
