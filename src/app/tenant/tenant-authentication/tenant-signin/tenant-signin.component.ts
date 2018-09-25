import { Component, OnInit } from '@angular/core';
import { TenantAuth } from '../tenant-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tenant-signin',
  templateUrl: './tenant-signin.component.html',
  styleUrls: ['./tenant-signin.component.css']
})
export class TenantSigninComponent implements OnInit {

  constructor(private tenantAuth: TenantAuth) { }
  
  onSignin(form: NgForm) {
    if(form.invalid) 
    {
      return
    }
    this.tenantAuth.login(form.value.email, form.value.password);
    
  }

  ngOnInit() {
  }

}
