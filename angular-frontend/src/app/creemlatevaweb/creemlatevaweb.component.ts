import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesContacte } from '../models/dadesContacte.model';
import { ContactService } from '../services/contact.service';
import { DadesTrucar } from '../models/dadesTrucar.model';
import { CallService } from '../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-creemlatevaweb',
  templateUrl: './creemlatevaweb.component.html',
  styleUrls: ['./creemlatevaweb.component.scss']
})
export class CreemlatevawebComponent implements OnInit {

  // constructor(private titleService: Title, private metaService: Meta) { }
  constructor(public meta: Meta, public title: Title, public translate: TranslateService, private contactService: ContactService, private router: Router, private callService: CallService) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_CREEM_WEB')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CREEM_WEB'));
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

  //Validació formulari
  form2 = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  //Botó
  buttonTop: any;

  //DadesContacte
  dadesContacte = new DadesContacte();

  //Dades trucar
  dadesTrucar = new DadesTrucar();

  ngOnInit(): void 
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => 
    {
      
      this.meta.addTags([
         {name: 'description', content: this.translate.instant('SEOINFO.META.META_CREEM_WEB')}
       ]);
       this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CREEM_WEB'));

       if(event.lang == 'ESP')
       {
         $('.imatgeAngularLaravelBootstrap img').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-angularLaravelBootstrap-esp.png');
         $('.imgMarketing').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-marketing-esp.png');
         $('.imgGoogle').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-google-esp.png');
       }
       else if(event.lang == 'CAT')
       {
        $('.imatgeAngularLaravelBootstrap img').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-angularLaravelBootstrap.png');
        $('.imgMarketing').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-marketing.png');
        $('.imgGoogle').attr('src', '../../assets/imatgesCreemLaTevaWeb/banner-google.png');
       }
     });
    // this.titleService.setTitle('Creem la teva web amb noves tecnologies | Girohosting');
    // this.metaService.updateTag({name: 'description', content: 'Creem la teva web informativa - el teu blog - la teva E-commerce - la teva web de reserves - la teva plataforma web a mida en pocs dies | GIROHOSTING'}, 'name="description"');

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
    
    //Filtre per defecte WEB
    this.filtrarImatges('Web');

    this.buttonTop = document.getElementById("btnTop");
    this.buttonTop.style.display = "none";

    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void
  {
    window.removeEventListener('scroll', this.scroll, true);
  }

  //Funció que filtra els elements per tipus (paràmetre)
  filtrarImatges(tipus)
  { 
    //Agafem els elements corresponents
    var blocImatge = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;

    //Recorrem tots els blocs de imatges
    for (var i = 0; i < blocImatge.length; i++)
    {
      var h4 = blocImatge[i].getElementsByTagName("h4")[0]; //primera etiqueta <h4> trobada
      var textValue = h4.textContent || h4.innerText;

      if (tipus == textValue) 
      {
          blocImatge[i].style.display = "";
      } 
      else 
      {
          blocImatge[i].style.display = "none";
      }
    }
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
        this.tancarPopup();
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

  //Fem un post a la api amb les dades del client que vol contactar
  enviarDadesTrucar()
  {
    this.callService.enviarCorreuTrucar(this.dadesTrucar).subscribe(
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

  //Funció per tancar Pop-up
  tancarPopup()
  {
    $('#tancarPopup').click();
  }



}
