import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription } from 'rxjs';
import { TenantAuth } from '../tenant/tenant-authentication/tenant-auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  tenantIsAuthenticated = false;
  private tenantAuthListenerSubs: Subscription;

  constructor(private authenticationService: AuthenticationService, private tenantAuth: TenantAuth) { }

  ngOnInit() {
    //Landlord/Owner auth listener
    this.userIsAuthenticated = this.authenticationService.getIsAuth();
    this.authListenerSubs = this.authenticationService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    //Tenant auth listener
    this.tenantIsAuthenticated = this.tenantAuth.getIsAuth();
    this.tenantAuthListenerSubs = this.tenantAuth.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.tenantIsAuthenticated = isAuthenticated
      });
  }
  ngOnDestroy() {
    //unsubscribe
    this.authListenerSubs.unsubscribe();
    this.tenantAuthListenerSubs.unsubscribe();
  }

  onOwnerLogout() {
    this.authenticationService.logout();
  }

  onTenantLogout() {
    this.tenantAuth.logout();
  }

}
