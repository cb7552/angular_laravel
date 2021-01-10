import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';
import { UserdetailsService } from '../services/userdetails.service';
import { CountryService } from '../services/country.service';
import { DepartementService } from '../services/departement.service';
import { UserFullData } from '../models/userFullData.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Validació formulari actualitzar perfil
  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)])
  })

  buttonTop: any;

  userEmail: any;

  paisos: any;

  provincies: any;

  details: UserDetails = 
  {
    nom: '',
    name_alias: '',
    email: '',
    phone: null,
    address: '',
    town: '',
    fk_pays: null,
    fk_departement: null,
    zip: null,
    siren: '',
    password: '',
    exp: null,
    iat: null
  };

  dadesUsuari = new UserFullData();

  constructor(private auth: AuthenticationService,
    private userData: UserdetailsService,
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router) { }

   ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loadingScreen();
    
    this.auth.profile().subscribe(
      res => {
        // this.details.id = res.id;
        // this.details.exp = res.exp;
        // this.details.iat = res.iat;
        // console.log(res);

        this.dadesUsuari.id = res.id;
        this.dadesUsuari.rowid = res.idClient;
        this.userEmail = res.email;

        this.obtenirPaisosProvincies();
        this.obtenirDadesUsuariAutenticat();
        

      },
      error => {
        alert('Error del servidor.');
      }
    );

    this.buttonTop = document.getElementById("btnTop");
    this.buttonTop.style.display = "none";

    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void
  {
    window.removeEventListener('scroll', this.scroll, true);
  }

  obtenirPaisosProvincies()
  {
    this.countryService.obtenirPaisos().subscribe(
      res => {
        this.paisos = res;
      });
      // this.departementService.obtenirProvincies().subscribe(
      //   res => {
      //     this.provincies = res;
          
      //   });
  }
  
  obtenirDadesUsuariAutenticat()
  {
    this.userData.obtenirDadesUsuari(this.userEmail).subscribe(
     (res:any)  => {

        this.details.nom = res.nom;
        this.details.name_alias = res.name_alias;
        this.details.email = res.email;
        this.details.phone = res.phone;
        this.details.address = res.address;
        this.details.town = res.town;
        // this.details.fk_pays = res.fk_pays;
        // this.details.fk_departement = res.fk_departement;
        this.details.zip = res.zip;
        this.details.siren = res.siren;

        // console.log(this.paisos);
        // console.log(this.provincies);
        
        

        
        this.paisos.forEach(pais => {
          if(pais.rowid == res.fk_pays)
          {
            // console.log(pais.label);
            
            this.details.fk_pays = pais.label;
          }
        });

        // this.provincies.forEach(provincia => {
        //   if(provincia.rowid == res.fk_departement)
        //   {
        //     // console.log(provincia.nom);
            
        //     this.details.fk_departement = provincia.nom;
        //   }
        // });

        // for (var j = 0; j < this.provincies.length; j++) {
        //   if (this.provincies[j].rowid == res.fk_departement) {
        //     this.details.fk_departement = this.provincies[j].nom;
        //   }
        // }

        // for (var i = 0; i < this.paisos.length; i++) {
        //   if (this.paisos[i].rowid == res.fk_pays) {
        //     this.details.fk_pays = this.paisos[i].label;
        //   }
        // }

        

        
      }
    );
  
  }

  actualitzarPerfilUsuari()
  {
    this.userData.updateProfile(this.dadesUsuari).subscribe(
      res =>
      {
        // console.log(this.dadesUsuari);
        alert("S'ha actualitzat el teu perfil correctament.");
        this.tancarPopup();
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/configuracio-del-compte']);
      }); 
      },
      error =>
      {
        alert("No s'ha pogut actualitzar el teu perfil d'usuari, intenta-ho més tard.");
      });
  }

  loadingScreen()
  {
    $('.container').addClass('hidden');

    setTimeout(function() {
      $('.container').removeClass('hidden');
    }, 4000);

    setTimeout(function() {
      $('.load').addClass('hidden');
    }, 4000);
  }

  //Funció per tancar Pop-up
  tancarPopup()
  {
    $('#tancarPopup').click();
  }

  //Lógica botó per tornar al principi de la pàgina
  scroll = (event): void => {
    this.scrollFunction();
  };
  
  scrollFunction() 
  {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
    {
      this.buttonTop.style.display = "block";
      this.buttonTop.style.animation = "backInRight 0.9s"
    } 
    else
    {
      this.buttonTop.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  topFunction() 
  {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
