import { ApplianceComponent } from './appliance/appliance.component';
import { ContactComponent } from './contact/contact.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClientService } from './client/client.service';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactService } from './contact/contact.service';
import { PovComponent } from './pov/pov.component';
import { SceanceComponent } from './sceance/sceance.component';
import { SuiviComponent } from './suivi/suivi.component';
import { TypeApplianceComponent } from './type-appliance/type-appliance.component';
import { TypePrestationComponent } from './type-prestation/type-prestation.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationService } from './login/authentication-service';
import { ParticipantsComponent } from './participants/participants.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component'; // <-- import the module
        



@NgModule({
  declarations: [
    AppComponent, ClientComponent,ContactComponent,ApplianceComponent, PovComponent, SceanceComponent, SuiviComponent, TypeApplianceComponent, TypePrestationComponent, LoginComponent, RegisterComponent, NavbarComponent, ParticipantsComponent, UserComponent, RoleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgSelectModule ,
    MatButtonModule,
    MatCardModule,
    MatInputModule,   
    NgxPaginationModule,
  ],
  providers: [ClientService,ContactService, AuthenticationService], //Manually
  bootstrap: [AppComponent,ClientComponent]
})
export class AppModule { }
