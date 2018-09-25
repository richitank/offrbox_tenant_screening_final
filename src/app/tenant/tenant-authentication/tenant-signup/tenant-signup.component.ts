import { Component, OnInit } from '@angular/core';
import { TenantAuth } from '../tenant-auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tenant-signup',
  templateUrl: './tenant-signup.component.html',
  styleUrls: ['./tenant-signup.component.css']
})
export class TenantSignupComponent implements OnInit {

  constructor(private tenantAuth: TenantAuth) { }

  onSignup(form: NgForm) {
    if(form.invalid) 
    {
      return;
    }
    this.tenantAuth.createUser(form.value.firstName, form.value.lastName,form.value.applicantPhoneNo,form.value.email,form.value.password);
    
  }

  ngOnInit() {
  }

}
