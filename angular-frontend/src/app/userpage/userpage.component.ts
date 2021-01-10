import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';
import { AuthenticationService } from '../services/authentication.service';
import { CountryService } from '../services/country.service';
import { DepartementService } from '../services/departement.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {

  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    // contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    // confContrasenya: new FormControl('', Validators.required),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    // acceptarPolitiques: new FormControl('', Validators.required)
  })

  imgForm = new FormGroup({
    row_id: new FormControl(''),
    imgfile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  userid: any;

  constructor(
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router,
    private route: ActivatedRoute,
    private userdetails: UserdetailsService,
    private auth: AuthenticationService) {
    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
      }
    });
  }


  user: any;
  user_nom: any;
  user_name_alias: any;
  user_address: any;
  user_zip: any;
  user_town: any;
  user_fk_departement: any;
  user_email: any;
  user_fk_pays: any;
  user_phone: any;
  user_siren: any;


  paisos: any;
  provincies: any;

  public imagePath;
  imgURL: any;
  public message: string;

  fileData: File = null;
  previewUrl: any = null;

  onfileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData)
    this.imgForm.patchValue({
      fileSource: this.fileData
    });
    this.preview();
  }
  
  onSubmit() {
    // $("#submit").hide();
    const formData = new FormData();
    formData.append('row_id', this.userid);
    formData.append('file', this.imgForm.get('fileSource').value);
    console.log(formData)


    this.userdetails.logoUpload(formData).subscribe(
      res => {
        alert("Your logo uploaded successfuly")
        this.previewUrl = res;
      }
    )
  }
  clickimg() {
    $('#my_file').click();
  }


  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      $(".btnimg").attr('src', this.previewUrl);
    }

  }

  ngOnInit(): void {
    console.log(this.userid);
    this.getuserprofile();
    this.obtenirPaisos();
    this.obtenirProvincies();
    this.getlogo()
  }

  getlogo() {
    this.userdetails.getlogo(this.userid).subscribe(
      res => {
        console.log(res)
        if (res != null) {
          this.previewUrl = res;
        }
        else{this.previewUrl = "http://localhost:8000/logos/default.png";}
      });
  }

  getuserprofile() {
    this.userdetails.getprofile(this.userid).subscribe(
      res => {
        this.user = res;
        console.log(this.user)
        this.user_nom = this.user.nom;
        this.user_name_alias = this.user.name_alias;
        this.user_address = this.user.address;
        this.user_zip = this.user.zip;
        this.user_town = this.user.town;
        this.user_email = this.user.email;
        this.user_phone = this.user.phone;
        this.user_siren = this.user.siren;
        this.form.patchValue({
          provincia: this.user.fk_departement,
          pais: this.user.fk_pays,
        });
      }
    )
  }

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
  edit(id) {
    console.log(id)
    this.router.navigate(['edituser', id]);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgForm.patchValue({
        fileSource: file
      });
    }
  }

  submit(id) {
    const formData = new FormData();
    formData.append('row_id', id);
    formData.append('file', this.imgForm.get('fileSource').value);
    console.log(formData)
    this.userdetails.logoUpload(formData).subscribe(
      res => {
        // this.ngOnInit();
        console.log(res)
      })
  }
  getbudget(id) {
    this.router.navigate(['els-meus-pressupostos', id])
  }
  getcontract(id) {
    this.router.navigate(['els-meus-contractes', id])
  }
  getinvoice(id) {
    this.router.navigate(['els-meus-facturas', id])
  }
}
