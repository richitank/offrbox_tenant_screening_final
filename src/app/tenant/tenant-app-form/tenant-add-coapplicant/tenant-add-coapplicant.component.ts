import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from "@angular/forms";
import { TenantAddCoApplicantService } from './tenant-add-coapplicant.service';

@Component({
  selector: 'app-tenant-add-coapplicant',
  templateUrl: './tenant-add-coapplicant.component.html',
  styleUrls: ['./tenant-add-coapplicant.component.css']
})
export class TenantAddCoapplicantComponent implements OnInit {

  constructor(private router: Router, private tenantAddCoApplicantService: TenantAddCoApplicantService) { }

  onClick(form: NgForm) {
    console.log(form.value);  

    const coApplicantDetails = {
      name: form.value.coAppName,
      email: form.value.coAppEmail
    }
    this.tenantAddCoApplicantService.sendMail(coApplicantDetails);
    this.router.navigate(['/tenant-rent-application-form/renter-profile']);
    
  }

  ngOnInit() {
  }

}
