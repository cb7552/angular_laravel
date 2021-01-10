import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import {DataService} from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: TranslateService, public auth: AuthenticationService) { 
    // translate.addLangs(['CAT', 'ESP']);
    // translate.setDefaultLang('CAT');
    // const browserLang = translate.getBrowserCultureLang();
    // translate.use(browserLang.match(/CAT|ESP/) ? browserLang : 'CAT');
  }
  
  userid: number;
  adminstate: boolean;
  
  ngOnInit(): void {
    // location.reload();
    this.auth.profile().subscribe(
      res=>{
        this.userid=res.idClient;
        console.log(res); 
        console.log(this.userid); 
        console.log("this is navbar")
      },(error: HttpErrorResponse) => {
        console.log(error.status);
        console.log(error.error);
      }
    )


    $(function() {
      // ------------------------------------------------------- //
      // Multi Level dropdowns
      // ------------------------------------------------------ //
      $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
    
        $(this).siblings().toggleClass("show");
    
    
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-submenu .show').removeClass("show");
        });
    
      });
    });
  }

}
