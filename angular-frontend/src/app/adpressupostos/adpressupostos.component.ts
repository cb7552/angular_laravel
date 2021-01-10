import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { UserdetailsService } from '../services/userdetails.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser'
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';

@Component({
  selector: 'app-adpressupostos',
  templateUrl: './adpressupostos.component.html',
  styleUrls: ['./adpressupostos.component.scss']
})
export class AdpressupostosComponent implements OnInit {

  constructor(private authService: AuthenticationService, private userDetailsService: UserdetailsService, private http: HttpClient) { }
  myForm = new FormGroup({
    row_id: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  get f(){
    return this.myForm.controls;
  }
 
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
  onChange(event) {
    console.log(event.target.value,"value event")
    this.myForm.patchValue({
      // row_id: event.target.value
    })
  }
  isShow:boolean=true;

  func(i){
    console.log(i);
    
    
  }
     
  submit(e){
    const formData = new FormData();
    formData.append('row_id', e);
    formData.append('file', this.myForm.get('fileSource').value);
    
    this.userDetailsService.budgetUpdate(formData).subscribe(res => {
      this.ngOnInit();
    })
    
    // this.http.post('http://localhost:8001/index.php/api/budgetUpload', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
  }

  idUsuariAutenticat: any;

  pressupostos: any;

  buttonTop: any;




  ngOnInit(): void 
  {
    window.scrollTo(0, 0);

    this.loadingScreen();

    //Obtenir id de l'usuari autenticat
    this.authService.profile().subscribe(
      res => 
      {
        this.idUsuariAutenticat = res.idClient;

        this.obtenirPressupostos();
        
        console.log('here is response');
      });
      this.buttonTop = document.getElementById("btnTop");
      this.buttonTop.style.display = "none";

      window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void
  {
    window.removeEventListener('scroll', this.scroll, true);
  }

  obtenirPressupostos()
  {
    // console.log(this.idUsuariAutenticat);
    this.userDetailsService.obtenirPressupostosUsuari(this.idUsuariAutenticat).subscribe(
      res =>
      {
        this.pressupostos = res;
        //fk_projet
        console.log(this.pressupostos);
      },
      error =>
      {
        alert("No s'han pogut obtenir els teus pressupostos, intenta-ho més tard.");
      });
      
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

  loadingScreen()
  {
    $('.container').addClass('hidden');

    setTimeout(function() {
      $('.container').removeClass('hidden');
    }, 2000);

    setTimeout(function() {
      $('.load').addClass('hidden');
    }, 2000);
  }


}
