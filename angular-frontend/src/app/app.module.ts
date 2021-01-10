import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { IniciComponent } from './inici/inici.component';
import { CreemlatevawebComponent } from './creemlatevaweb/creemlatevaweb.component';
import { MarketingdigitalComponent } from './marketingdigital/marketingdigital.component';
import { DolibarrsoftwareComponent } from './dolibarrsoftware/dolibarrsoftware.component';
import { MantenimentsinformaticsComponent } from './mantenimentsinformatics/mantenimentsinformatics.component';
import { ContacteComponent } from './contacte/contacte.component';
import { AvislegalComponent } from './avislegal/avislegal.component';
import { PoliticaprivacitatComponent } from './politicaprivacitat/politicaprivacitat.component';
import { SeguretatComponent } from './seguretat/seguretat.component';
import { VistaerrorservidorComponent } from './vistaerrorservidor/vistaerrorservidor.component';
import { BlogdolibarrComponent } from './blogdolibarr/blogdolibarr.component';
import { InicisessioComponent } from './inicisessio/inicisessio.component';
import { RegistreComponent } from './registre/registre.component';
import { PoliticacookiesComponent } from './politicacookies/politicacookies.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicararticleComponent } from './publicararticle/publicararticle.component';

import { AuthguardService } from './services/authguard.service';
import { AuthenticationService } from './services/authentication.service';
import { PressupostosComponent } from './pressupostos/pressupostos.component';

import { ContractesComponent } from './contractes/contractes.component';
import { FacturasComponent } from './facturas/facturas.component';
// import { AdminComponent } from './admin/admin.component';
import { AdminfieldComponent } from './adminfield/adminfield.component';
import { AdpressupostosComponent } from './adpressupostos/adpressupostos.component';
import { AdcontractesComponent } from './adcontractes/adcontractes.component';
import { AdfacturasComponent } from './adfacturas/adfacturas.component';
import { BudgetComponent } from './budget/budget.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { DeleteComponent } from './user/delete/delete.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { UserpageComponent } from './userpage/userpage.component';
import { WorkerComponent } from './worker/worker.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddComponent } from './add/add/add.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IniciComponent,
    CreemlatevawebComponent,
    MarketingdigitalComponent,
    DolibarrsoftwareComponent,
    MantenimentsinformaticsComponent,
    ContacteComponent,
    AvislegalComponent,
    PoliticaprivacitatComponent,
    SeguretatComponent,
    VistaerrorservidorComponent,
    BlogdolibarrComponent,
    InicisessioComponent,
    RegistreComponent,
    PoliticacookiesComponent,
    ProfileComponent,
    PublicararticleComponent,
    
    PressupostosComponent,
    ContractesComponent,
    FacturasComponent,
    // AdminComponent,
    AdminfieldComponent,
    AdpressupostosComponent,
    AdcontractesComponent,
    AdfacturasComponent,
    BudgetComponent,
    CreateuserComponent,
    EdituserComponent,
    DeleteComponent,
    CreatetestComponent,
    UserpageComponent,
    WorkerComponent,
    ConfirmationDialogComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [Title, Meta, AuthguardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
