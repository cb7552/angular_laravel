import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../services/article.service';
import {  Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blogdolibarr',
  templateUrl: './blogdolibarr.component.html',
  styleUrls: ['./blogdolibarr.component.scss']
})
export class BlogdolibarrComponent implements OnInit {

//El route es prueba
  constructor(private articleService: ArticleService, private router: Router, public translate: TranslateService) { }

  buttonTop: any;

  id: any;

  articles: any;
  filteredArticles: any;

  idioma: any = "CAT";

  ngOnInit(): void {

    this.articleService.obtenirArticles(this.idioma).subscribe(
      res=>
      {
        this.articles = res;

        // this.filtrarArticles('generals');
        this.filteredArticles = this.filtrarArticles('generals');
      },
      error =>
      {
        alert("No s'han pogut obtenir els articles, intenta-ho més tard.");
      });
  
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => 
    {
      this.idioma = event.lang;

      this.articleService.obtenirArticles(this.idioma).subscribe(
        res=>
        {
          this.articles = res;

          this.filteredArticles = this.filtrarArticles('generals');
        },
        error =>
        {
          alert("No s'han pogut obtenir els articles, intenta-ho més tard.");
        }
      )
    });
    

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

  obrirModalArticle(article)
  {
    $(".article").attr("data-toggle", "modal");
    $(".article").attr("data-target", "#exampleModalLong");
    
    var titol = document.getElementById("exampleModalLongTitle"),
        descripcio = document.getElementById("primeraDescripcio"),
        contingut = document.getElementById("contingutArticle");
        
    titol.innerHTML = article.title_article;
    $("#imatgePrincipal").attr("src", "https://drive.google.com/uc?id=" + article.img);
    descripcio.innerHTML = article.descripcio1;
    contingut.innerHTML = article.content;
  }

  // Funció que filtra els elements per tipus (paràmetre)
  filtrarArticles(tipus)
  { 
    // //Agafem els elements corresponents
    // var articles = document.getElementsByClassName("article") as HTMLCollectionOf<HTMLElement>;

    // //Recorrem tots els blocs de imatges
    // for (var i = 0; i < articles.length; i++)
    // {
    //   var tipusArticle = this.articles[i].categoria;
      

    //   if (tipus == tipusArticle) 
    //   {
    //       articles[i].style.display = "";
    //   } 
    //   else 
    //   {
    //       articles[i].style.display = "none";
    //   }
    // }
    return this.articles.filter(article => article.categoria === tipus);
  }
  
}
