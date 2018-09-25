import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from './authentication/authentication.service';
import { TenantAuth } from './tenant/tenant-authentication/tenant-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authenticationService: AuthenticationService, private tenantAuth: TenantAuth) {}

  ngOnInit() {
    this.authenticationService.autoAuthUser();
    this.tenantAuth.autoAuthUser();
    

  }
}
