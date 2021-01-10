import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesTrucar } from '../models/dadesTrucar.model';
import { CallService } from '../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.scss']
})
export class IniciComponent implements OnInit {

  // constructor(private titleService: Title, private metaService: Meta) { }
  constructor(public meta: Meta, public title: Title, public translate: TranslateService, private callService: CallService, private router: Router) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
  }

  //Validació formulari
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  
  //Botó
  buttonTop: any;

  //DadesContacte
  dadesContacte = new DadesTrucar();

  ngOnInit(): void 
  {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.meta.addTags([
         {name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI')}
       ]);
       this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
     });
    // this.titleService.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
    // this.metaService.updateTag({name: 'description', content: 'Suport integral 360 de Creem la teva web - Marketing Digital - Suport Dolibarr - Manteniments informàtics al núvol- Seguretat informàtica | GIROHOSTING'}, 'name="description"');

    window.scrollTo(0, 0);
    //Quan es recarregui la web, si hi ha l'adreça d'un link intern a la URL aquesta es neteja
    window.onload = function()
    {
      var url = window.location.href;
      if(url.includes('#'))
      {
        var aux = url.split('#')[0];
        window.location.href = aux;
      }
    }

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
    this.callService.enviarCorreuTrucar(this.dadesContacte).subscribe(
      res =>
      {
        alert("Et trucarem en un máxim de 48hs. Grácies per la teva confiança.")
        this.router.navigate(['/contacte']);
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
