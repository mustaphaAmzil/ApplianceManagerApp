import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Pov } from '../pov/pov';
import { Client } from '../client/client';
import { Sceance } from './sceance';
import { SceanceService } from './sceance.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication-service';

@Component({
  selector: 'app-sceance',
  templateUrl: './sceance.component.html',
  styleUrls: ['./sceance.component.css']
})
export class SceanceComponent implements OnInit {


  public sceances: Sceance[] = [];
  public editSceance:Sceance | undefined;
  public deleteSceance: Sceance | undefined;
  ngSelect : any;
  //selected!: TypeSceance;

  
  updateSeanceForm = new FormGroup({
    id : new FormControl(''),
    date_sceance : new FormControl(''),
    resume : new FormControl(''),
    pov: new FormControl('')
  })

  


  //typeSceances!: TypeSceance[];
  title: any;
  clients: Client[] | undefined;
  povs: any;
  p : any;


  constructor(private sceanceService: SceanceService   , private AuthService : AuthenticationService , private router : Router,  private fb : FormBuilder) { }
  ngOnInit(): void {

    this.getSceances();
    this.OnAddSceance;
     this.getPovs();
    
     this.updateSeanceForm = this.fb.group({
      id: [],
      date_sceance: [],
      resume: [],
      pov: []
     } );

  }
 

  //getPovs 
  public getPovs(): void {
    this.sceanceService.getPovs().subscribe(
      (response: Pov[]) => {
        this.povs = response;

        this.ngSelect = this.povs[0];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }


  public getSceances(): void {
    this.sceanceService.getSceances().subscribe(
      (response: Sceance[]) => {
        this.sceances = response;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 403) {  
          alert("Votre session a expiré. Veuillez vous reconnecter !!");
          this.AuthService.logout();
          this.router.navigateByUrl("/login");
    } else alert(error.message);      }

    );

  }


  public onOpenModal(sceance: Sceance, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addSceanceModal');
    }
    if (mode === 'edit') {
      this.editSceance = sceance;
      console.log(sceance);
      this.ShowSeanceData(this.editSceance);

      button.setAttribute('data-target', '#editSceanceModal');
      setTimeout(() => {
        console.log('test');
        
        this.editSceance = sceance;
      }, 1000);
    }
    if (mode === 'delete') {
      this.deleteSceance = sceance;
      
      button.setAttribute('data-target', '#deleteSceanceModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editSceance = sceance;
      button.setAttribute('data-target', '#describeSceanceModal');
    }

  }


  public OnAddSceance(addForm: NgForm): void {

    document.getElementById('add-sceance-form')?.click();
  console.log(addForm.value);

    this.sceanceService.addSceance(addForm.value).subscribe(
      (response: Sceance) => {
        console.log(response);
        this.getSceances();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateSceance(): void {

    document.getElementById('add-sceance-form')?.click();

    this.sceanceService.updateSceance(this.updateSeanceForm.value).subscribe(
      (response: Sceance) => {
        console.log(response);
        this.getSceances();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ShowSeanceData (sceance: Sceance) {
    console.log(sceance);

    console.warn(this.updateSeanceForm.value);
console.log(sceance);
    this.updateSeanceForm.patchValue( {
      id: sceance.id, 
      date_sceance: sceance.date_sceance,
      resume: sceance.resume,
      pov: sceance.pov,
  
    


    });

  }

  public OnDeleteSceance(Sceance_id: number): void {
    this.sceanceService.deleteSceance(Sceance_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSceances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Sceance[] = [];
    
    for (const sceance of this.sceances) {
      if (  sceance.resume.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
         {
        results.push(sceance);
      }
    }
    this.sceances = results;
    if (results.length === 0 || !keyword) {
      this.getSceances();
    }
  }

 

}
