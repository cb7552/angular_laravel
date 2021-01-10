import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  id: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userDetailsService: UserdetailsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
      }
    });
  }

  customers: any;

  ngOnInit(): void {
    this.mycustomer();
    this.getlogo()
  }


  getlogo() {
    let userid = 166;
    this.userDetailsService.getlogo(userid).subscribe(
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

  onSubmit() {
    // $("#submit").hide();
    const formData = new FormData();
    formData.append('row_id', this.id);
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

  mycustomer() {
    this.userDetailsService.getmycustomer(this.id).subscribe(
      res => {
        console.log("there are my customers")
        console.log(res)
        this.customers = res;
      }
    )
  }

  getcustomer(id){
    console.log("getcustomer is work~!")
    console.log(id)
    this.router.navigate(['userpage', id]);
  }
}
