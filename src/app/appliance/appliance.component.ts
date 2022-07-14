import { TypeAppliance } from './../type-appliance/TypeAppliance';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Appliance } from '../appliance/appliance';
import { ApplianceService } from '../appliance/appliance.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication-service';
//import { TypeAppliance } from '../typeAppliance/typeAppliance';

@Component({
  selector: 'appliance-root',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})
export class ApplianceComponent implements OnInit {

  public appliances: Appliance[] = [];
  public editAppliance:any;
  public deleteAppliance: Appliance | undefined;
  //selected!: TypeAppliance;

  
  //typeAppliances!: TypeAppliance[];
  title: any;
  p : any;
  typeAppliances: any;

  updateApplianceForm = new FormGroup({
    id : new FormControl(''),
    dbid : new FormControl(''),
    disponibilite : new FormControl(''),
    libelle_appliance :  new FormControl(''),
    reference :  new FormControl(''),
    typeAppliance :  new FormControl('')
    
  })

  constructor(private applianceService: ApplianceService   , private AuthService : AuthenticationService , private router : Router, private fb : FormBuilder) { }
  ngOnInit(): void {
    this.getAppliances();
    this.OnAddAppliance;
    this.getTypeAppliances();

    this.updateApplianceForm = this.fb.group({
      id: [],
      dbid: [],
      disponibilite: [],
      libelle_appliance: [],
      reference: [],
      typeAppliance: []
    } );

  }
  // getTypeAppliances !!!! : 
   public getTypeAppliances(): void {
    this.applianceService.getTypeAppliances().subscribe (
      (response: TypeAppliance[]) => {
        this.typeAppliances = response;
        console.log(this.typeAppliances);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 
  
  public getAppliances(): void {
    this.applianceService.getAppliances().subscribe(
      (response: Appliance[]) => {
        this.appliances = response;
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


  public onOpenModal(appliance: Appliance, mode: string): void {

    const container = document.getElementById('main-container');//add an id to the container
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addApplianceModal');
    }
    if (mode === 'edit') {
      this.editAppliance = appliance;
      this.ShowApplianceData(this.editAppliance);
      console.log(this.ShowApplianceData(this.editAppliance));

      button.setAttribute('data-target', '#editApplianceModal');
    }
    if (mode === 'delete') {
      this.deleteAppliance = appliance;
      
      button.setAttribute('data-target', '#deleteApplianceModal');
      container?.appendChild(button);
      button.click();
    }
    if (mode === 'show') {
      this.editAppliance = appliance;
      button.setAttribute('data-target', '#describeApplianceModal');
    }

  }


  public OnAddAppliance(addForm: NgForm): void {

    document.getElementById('add-appliance-form')?.click();
  console.log(addForm.value);

    this.applianceService.addAppliance(addForm.value).subscribe(
      (response: Appliance) => {
        console.log(response);
        this.getAppliances();
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public OnUpdateAppliance(): void {

    document.getElementById('add-appliance-form')?.click();

    this.applianceService.updateAppliance(this.updateApplianceForm.value).subscribe(
      (response: Appliance) => {
        console.log(response);
        this.getAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ShowApplianceData (appliance: Appliance) {
    console.log(appliance);

    console.warn(this.updateApplianceForm.value);
    this.updateApplianceForm.patchValue( {
      id: appliance.id, 
      dbid: appliance.dbid,
     disponibilite : appliance.disponibilite,
     libelle_appliance: appliance.libelle_appliance,
     reference: appliance.reference,
     typeAppliance: appliance.typeAppliance

    });

  }

  public OnDeleteAppliance(Appliance_id: number): void {
    this.applianceService.deleteAppliance(Appliance_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFunction(keyword: string): void {
    console.log(keyword);
    
    const results: Appliance[] = [];
    
    for (const appliance of this.appliances) {
      if (appliance.dbid.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || appliance.libelle_appliance.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || appliance.reference.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
         {
        results.push(appliance);
      }
    }
    this.appliances = results;
    if (results.length === 0 || !keyword) {
      this.getAppliances();
    }
  }

}
