import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './services/authguard.service';


import { IniciComponent } from './inici/inici.component';
// import { AdminComponent } from './admin/admin.component';
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
import { PressupostosComponent } from './pressupostos/pressupostos.component';
import { ContractesComponent } from './contractes/contractes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { AdminfieldComponent } from './adminfield/adminfield.component';
import { AdcontractesComponent } from './adcontractes/adcontractes.component';
import { AdfacturasComponent } from './adfacturas/adfacturas.component';
import { AdpressupostosComponent } from './adpressupostos/adpressupostos.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { DeleteComponent } from './user/delete/delete.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { UserpageComponent } from './userpage/userpage.component';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [


  { path: 'createtest/:id', component: CreatetestComponent },
  { path: 'userpage/:id', component: UserpageComponent },

  { path: 'inici', component: IniciComponent },
  { path: 'creem-la-teva-web', component: CreemlatevawebComponent },
  { path: 'marketing-digital', component: MarketingdigitalComponent },
  { path: 'dolibarr', component: DolibarrsoftwareComponent },
  { path: 'manteniments-informatics', component: MantenimentsinformaticsComponent },
  { path: 'contacte', component: ContacteComponent },
  { path: 'avis-legal', component: AvislegalComponent },
  { path: 'politica-privacitat', component: PoliticaprivacitatComponent },
  { path: 'ciberseguretat', component: SeguretatComponent },
  { path: 'blog-dolibarr', component: BlogdolibarrComponent },
  { path: 'area-clients', component: InicisessioComponent },
  // { path: 'area-admins', component: AdminComponent },
  { path: 'admin-field', component: AdminfieldComponent },
  { path: 'worker/:id', component: WorkerComponent },

  { path: 'createuser/:id', component: CreateuserComponent },
  { path: 'edituser/:id', component: EdituserComponent },
  { path: 'delete', component: DeleteComponent },


  { path: 'crear-compte', component: RegistreComponent },
  { path: 'politica-cookies', component: PoliticacookiesComponent },
  { path: 'configuracio-del-compte', component: ProfileComponent, canActivate: [AuthguardService] },
  { path: 'vxcbhkypwnbniuqwezmncaerdfbwtopkjjhsers', component: PublicararticleComponent},
  { path: 'els-meus-pressupostos/:id', component: PressupostosComponent, canActivate: [AuthguardService]},
  { path: 'els-meus-contractes/:id', component: ContractesComponent, canActivate: [AuthguardService]},
  { path: 'els-meus-facturas/:id', component: FacturasComponent, canActivate: [AuthguardService]},
  { path: 'els-meus-adpressupostos', component: AdpressupostosComponent, canActivate: [AuthguardService]},
  { path: 'els-meus-adcontractes', component: AdcontractesComponent, canActivate: [AuthguardService]},
  { path: 'els-meus-adfacturas', component: AdfacturasComponent, canActivate: [AuthguardService]},
  
  


  { path: '',   redirectTo: 'inici', pathMatch: 'full'},
  { path:'**', component: VistaerrorservidorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
