import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserdetailsService } from '../services/userdetails.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  userid: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userDetailsService: UserdetailsService,
    private http: HttpClient
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
      }
    });
  }

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    console.log(formData, "check formdata")
    this.userDetailsService.budgetUpdate(formData).subscribe(res => {
      console.log(res, "upload status");
      alert('Uploaded Successfully.');
    })
  }

  facturas: any;
  buttonTop: any;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadingScreen();
    this.invoiceinit();
    this.buttonTop = document.getElementById("btnTop");
    this.buttonTop.style.display = "none";

    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  invoiceinit() {
    this.userDetailsService.getinvoice(this.userid).subscribe(
      res => {
        this.facturas = res;
        // console.log(this.facturas);
      },
      error => {
        alert("No s'han pogut obtenir els teus facturas, intenta-ho més tard.");
      });

  }

  //Lógica botó per tornar al principi de la pàgina
  scroll = (event): void => {
    this.scrollFunction();
  };

  scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      this.buttonTop.style.display = "block";
      this.buttonTop.style.animation = "backInRight 0.9s"
    }
    else {
      this.buttonTop.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  loadingScreen() {
    $('.container').addClass('hidden');

    setTimeout(function () {
      $('.container').removeClass('hidden');
    }, 2000);

    setTimeout(function () {
      $('.load').addClass('hidden');
    }, 2000);
  }


}
