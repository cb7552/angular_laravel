import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-politicaprivacitat',
  templateUrl: './politicaprivacitat.component.html',
  styleUrls: ['./politicaprivacitat.component.scss']
})
export class PoliticaprivacitatComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, public translate: TranslateService) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
   }

  ngOnInit(): void 
  {
    window.scrollTo(0, 0);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.meta.addTags([
         {name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI')}
       ]);
       this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
     });
  }

}
