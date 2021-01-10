import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { UserdetailsService } from '../services/userdetails.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pressupostos',
  templateUrl: './pressupostos.component.html',
  styleUrls: ['./pressupostos.component.scss']
})
export class PressupostosComponent implements OnInit {

  userid: any;
  constructor(
    private authService: AuthenticationService, 
    private userDetailsService: UserdetailsService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ) {
      route.paramMap.subscribe({
        next: params => {
          this.userid = params.get('id');
        }
      });
    }
  myForm = new FormGroup({
    row_id: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
 
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
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
     
  submit(e){
    const formData = new FormData();
    formData.append('row_id', e);
    formData.append('file', this.myForm.get('fileSource').value);
    console.log(formData)
    
    this.userDetailsService.budgetUpdate(formData).subscribe(res => {
      // this.ngOnInit();
      console.log("uploadSuccess")
    })
  }

  pressupostos: any;

  buttonTop: any;

  ngOnInit(): void 
  {
    window.scrollTo(0, 0);

    this.loadingScreen();
    this.budgetinit();
    this.buttonTop = document.getElementById("btnTop");
    this.buttonTop.style.display = "none";
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void
  {
    window.removeEventListener('scroll', this.scroll, true);
  }

  budgetinit()
  {
    this.userDetailsService.getbudget(this.userid).subscribe(
      res =>
      {
        this.pressupostos = res;
        console.log(this.pressupostos);
      },
      error =>
      {
        alert("Your budgets could not be obtained, please try again later.");
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

  download(){
    this.userDetailsService.downloadfile().subscribe(
      res=>{
        console.log(res)
      }
    )
  }

}
