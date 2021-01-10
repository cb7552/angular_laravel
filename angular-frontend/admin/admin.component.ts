import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  credentials: TokenPayload = {
    id: null,
    email: '',
    password: ''

  }
  constructor(private auth: AuthenticationService, private router: Router, private userdetail: UserdetailsService) { }

  // //Login
  // login = new Login();

  userrole: any;
  userid: any;
  users: any;
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  enviarCredencials()
  {
    this.auth.login(this.credentials).subscribe(
      res => {
        this.getrole();
        alert("Login correcte.");
        if(this.userrole==1){
          this.router.navigate(['/admin-field']);
        }
        if(this.userrole==2){
          this.router.navigate(['/worker']);
        }
        if(this.userrole==3){
          this.router.navigate(['/']);
        }
      },
      //Control d'errors del servidor
      error => {
          alert("No s'ha pogut iniciar sessió, revisa que l'email o la contrasenya siguin vàlids.");
          // this.router.navigate(['error']);
      });
  }

  getrole(){
    this.userdetail.getrole(this.userid).subscribe(
      res=>{
        this.userrole = res;
      }
    )
  }

}
