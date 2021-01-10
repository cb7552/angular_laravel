import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesTrucar } from '../models/dadesTrucar.model';
import { CallService } from '../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdetailsService } from '../services/userdetails.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';


@Component({
  selector: 'app-adminfield',
  templateUrl: './adminfield.component.html',
  styleUrls: ['./adminfield.component.scss']
})
export class AdminfieldComponent implements OnInit {

  constructor(private userDetailsService: UserdetailsService,
    private auth: AuthenticationService,
    public meta: Meta, public title: Title,
    public translate: TranslateService,
    // private confirm: ConfirmationDialogService,
    private router: Router) {
    this.meta.addTags([
      { name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI') }
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



  dadesContacte = new DadesTrucar();

  users: any;
  workers: any;
  state: number;
  userid: number;

  ngOnInit(): void {
    
    this.userid = 166;
    this.loadingScreen();
    this.getclient();
    this.getadministrator();
    this.getlogo()
  }

  getlogo() {
    this.userDetailsService.getlogo(this.userid).subscribe(
      res => {
        console.log(res)
        if (res != null) {
          this.previewUrl = res;
        }
        else{this.previewUrl = "http://localhost:8000/logos/default.png";}
      });
  }

  fileData: File = null;
  previewUrl: any = null;

  imgForm = new FormGroup({
    row_id: new FormControl(''),
    imgfile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onfileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData)
    this.imgForm.patchValue({
      fileSource: this.fileData
    });
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      $(".btnimg").attr('src', this.previewUrl);
    }

  }
  rowid: any;

  onSubmit() {
    // $("#submit").hide();
    this.rowid = 166;
    const formData = new FormData();
    formData.append('row_id', this.rowid);
    formData.append('file', this.imgForm.get('fileSource').value);
    console.log(formData)


    this.userDetailsService.logoUpload(formData).subscribe(
      res => {
        alert("Your logo uploaded successfuly")
        this.previewUrl = res;
      }
    )
  }
  clickimg() {
    $('#my_file').click();
  }

  getclient() {
    this.userDetailsService.client().subscribe(
      res => {
        this.users = res;
      },
      error => {
        console.log(error);
        alert('Can not get users');
      }
    );
  }

  getadministrator() {
    this.userDetailsService.worker().subscribe(
      res => {
        this.workers = res;
      },
      error => {
        console.log(error);
        alert('Can not get workers');
      }
    );
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


  createclient() {
    this.state = 3;
    this.router.navigate(['createuser', this.state]);
  }

  editclient(rowid) {
    console.log(rowid)
    this.router.navigate(['edituser', rowid])
  }

  deleteclient(rowid) {
    console.log(rowid)
    this.userDetailsService.delete(rowid).subscribe(
      res => {
        console.log("Delete a user/ts file")
        this.ngOnInit();
      }
    )
  }

  createworker() {
    this.state = 2;
    this.router.navigate(['createuser', this.state]);
  }
  getuser(userid) {
    this.router.navigate(['userpage', userid])
  }
  getworker(userid) {
    this.router.navigate(['worker', userid])
  }

  
}
