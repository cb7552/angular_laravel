import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesContacte } from '../models/dadesContacte.model';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.scss']
})
export class ContacteComponent implements OnInit {

  // constructor(private titleService: Title, private metaService: Meta) { }
  constructor(public meta: Meta, public title: Title, public translate: TranslateService, private contactService: ContactService, private router: Router) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_CONTACTE')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CONTACTE'));
  }

  //Validació formulari
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    departament: new FormControl('', Validators.required),
    informacio: new FormControl('', Validators.required),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  //Botó
  buttonTop: any;

  //DadesContacte
  dadesContacte = new DadesContacte();

  ngOnInit(): void 
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.meta.addTags([
         {name: 'description', content: this.translate.instant('SEOINFO.META.META_CONTACTE')}
       ]);
       this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CONTACTE'));
     });
    // this.titleService.setTitle('Contacte amb els nostres departaments | Girohosting');
    // this.metaService.updateTag({name: 'description', content: 'Posat en contacte amb el departament que necessitis, estem per ajudar-te i solventar els teus dubtes o incidències tècniques que pugueu tenir | GIROHOSTING'}, 'name="description"');

    window.scrollTo(0, 0);
    
    this.buttonTop = document.getElementById("btnTop");
    this.buttonTop.style.display = "none";

    window.addEventListener('scroll', this.scroll, true);
  }
  ngOnDestroy(): void
  {
    window.removeEventListener('scroll', this.scroll, true);
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

  //Fem un post a la api amb les dades del client que vol contactar
  enviarDadesContacte()
  {
    this.contactService.enviarCorreuContacte(this.dadesContacte).subscribe(
      res =>
      {
        alert("Hem rebut la teva sol·licitud de contacte.")
        this.router.navigate(['/inici']);
      },
      //Control d'errors del servidor
      error =>
      {
        alert("No s'ha pogut enviar la teva sol·licitud de contacte, intenta-ho més tard.");
        this.router.navigate(['error']);
      }
    )
  }
}
