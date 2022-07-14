import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { SuiviComponent } from './suivi/suivi.component';
import { ClientComponent } from './client/client.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { TypeApplianceComponent } from './type-appliance/type-appliance.component';
import { PovComponent } from './pov/pov.component';
import { SceanceComponent } from './sceance/sceance.component';
import { TypePrestationComponent } from './type-prestation/type-prestation.component';


const routes : Routes = [
  { path:"client", component:ClientComponent },
  { path:"contact", component : ContactComponent } ,  
   { path:"appliance", component:ApplianceComponent },
   { path:"typeAppliance", component:TypeApplianceComponent },
   { path:"typePrestation", component:TypePrestationComponent },
   { path:"pov", component:PovComponent },
   { path:"suivi", component:SuiviComponent },  
   { path:"sceance", component:SceanceComponent },
   { path:"login", component:LoginComponent },
   { path:"register", component:RegisterComponent },
   { path:"user", component:UserComponent },
   { path:"", redirectTo : "/login" , pathMatch :"full"},


  
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
