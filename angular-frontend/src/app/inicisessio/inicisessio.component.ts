import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';

// import { Login } from '../models/login.model';
// import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-inicisessio',
  templateUrl: './inicisessio.component.html',
  styleUrls: ['./inicisessio.component.scss']
})
export class InicisessioComponent implements OnInit {

  credentials: TokenPayload = {
    id: null,
    email: '',
    password: ''

  }
  constructor(private auth: AuthenticationService, private router: Router, private userdetail: UserdetailsService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  userid: any;
  userrole: any;
  users: any;
  enviarCredencials()
  {
    // console.log("this is login function")
    this.auth.login(this.credentials).subscribe(
      res => {
        this.userid=res.userid;
        this.getrole();
      },
      //Control d'errors del servidor
      error => {
          alert("Couldn't sign in, check that the email or password is valid.");
          // this.router.navigate(['error']);
      });
  }

  getrole(){
    // console.log("this is getrole function")
    this.userdetail.getrole(this.userid).subscribe(
      res=>{
        this.userrole=res;
        console.log(this.userrole)
        if(this.userrole==1){
          this.router.navigate(['/admin-field']);
        }
        if(this.userrole==2){
          this.router.navigate(['/worker', this.userid]);
        }
        if(this.userrole==3){
          this.router.navigate(['/']);
        }
      }
    )
  }

}
