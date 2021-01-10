import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularEstandard';

  constructor(public translate: TranslateService) {
    // translate.addLangs(['ca', 'es']);
    // translate.setDefaultLang('ca');
    // const browserLang = translate.getBrowserCultureLang();
    // translate.use(browserLang.match(/ca|es/) ? browserLang : 'ca' );
    translate.addLangs(['CAT', 'ESP']);
    translate.setDefaultLang('CAT');
    const browserLang = translate.getBrowserCultureLang();
    translate.use(browserLang.match(/CAT|ESP/) ? browserLang : 'CAT');
  }

  ngOnInit(): void 
  {
    let cc = window as any;
       cc.cookieconsent.initialise({
         palette: {
           popup: {
             background: "black"
           },
           button: {
             background: "#ffe000",
             text: "black"
           }
         },
         theme: "classic",
         content: {
           message: "Utilitzem cookies de Google Analytics per realitzar tasques d'anàlisis. Si segueixes navegant acceptes la política de cookies.",
           dismiss: "Acceptar",
           link: "Política de cookies",
           href: "/politica-cookies" 
         }
       });
  }

}
