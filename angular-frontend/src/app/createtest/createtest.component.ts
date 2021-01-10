import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
// import { ClientService } from '../services/client.service';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { CountryService } from '../services/country.service';
import { DepartementService } from '../services/departement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdetailsService } from '../services/userdetails.service';
// import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.scss']
})
export class CreatetestComponent implements OnInit {
  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confContrasenya: new FormControl('', Validators.required),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })
  
  private id: any;

  constructor(
    private auth: AuthenticationService,
    private userdetail: UserdetailsService,
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router,
    private route: ActivatedRoute) {

    route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
      }
    });
  }


  
  // //Client
  client = new Client();

  //Array de paisos
  paisos: any;
  users: any;
  //Array de provincies
  provincies: any;

  ngOnInit(): void {

    this.obtenirPaisos();
    this.obtenirProvincies();
    this.getuserprofile();

    console.log(this.id);
    this.form.patchValue({
      // nomFiscal: this.users.nom, 
      nomComercial: 'dark horse',
      // formControlName2: myValue2 (can be omitted)
    });

  }
  getuserprofile(){
    this.userdetail.getprofile(this.id).subscribe(
      res=>{
        this.users = res;
        console.log(this.users.nom)

      }
    )
  }

  

  passwdMatch() {
    var textContrasenya = $('#inputContrasenya').val();
    var textConfContrasenya = $('#inputConfirmarContrasenya').val();
    if (textContrasenya != textConfContrasenya) {
      $('#inputConfirmarContrasenya').addClass('is-invalid');
    }
    else if (textContrasenya == textConfContrasenya) {
      $('#inputConfirmarContrasenya').removeClass('is-invalid');
    }
  }

  //Fem un post a la API amb les dades del nou client
  onSubmit() {
    console.log(this.form.value)
    this.auth.update(this.client, this.id).subscribe(
      res => {
        alert("Your account has been successfully created. Check your email to make sure it was created correctly.");
        this.router.navigate(['/admin-field']);
      },
      //Control d'errors del servidor
      error => {
        alert("The registration could not be completed, the email you entered may already exist, please review and retry.");
        // this.router.navigate(['error']);
      });

  }

  //Fem un get a la API per obtenir els paisos
  obtenirPaisos() {
    this.countryService.obtenirPaisos().subscribe(
      res => {
        this.paisos = res;

      },
      //Control d'errors del servidor
      error => {
        alert("S'ha produït un error amb el servidor.")
        this.router.navigate(['error']);
      });
  }

  //Fem un get a la API per obtenir les provincies
  obtenirProvincies() {
    this.departementService.obtenirProvincies().subscribe(
      res => {
        this.provincies = res;
      },
      //Control d'errors del servidor
      error => {
        alert("S'ha produït un error amb el servidor.")
        this.router.navigate(['error']);
      });
  }

}
