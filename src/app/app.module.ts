import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { HttpModule } from '@angular/http';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AppComponent } from './app.component';
import { ScreeningRequestComponent } from './screeningRequestForm/screeningRequest/screeningRequest.component';
import { StoreSignup } from './screeningRequestForm/storeSignup.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule, MatExpansionModule, MatButtonModule,  MatCardModule  } from "@angular/material";

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScreeningReportsComponent } from "./screening-reports/screening-reports.component";
import { SigninAuthenticationComponent } from './authentication/signin/signin.component';
import { SignupAuthenticationComponent } from './authentication/signup/signup.component';
import { AuthenticationService } from './authentication/authentication.service';
import { TenantSignupComponent } from "./tenant/tenant-authentication/tenant-signup/tenant-signup.component";
import { TenantSigninComponent } from "./tenant/tenant-authentication/tenant-signin/tenant-signin.component";
import { TenantAuth } from "./tenant/tenant-authentication/tenant-auth.service";

import { AuthInterceptor } from './authentication/auth-interceptor';
import { AuthGuard } from './authentication/auth.guard';
import { TenantDashboardComponent } from './tenant/tenant-dashboard/tenant-dashboard.component';
import { TenantApplicationsComponent } from './tenant/tenant-applications/tenant-applications.component';
import { TenantAuthInterceptor } from "./tenant/tenant-authentication/tenant-auth-interceptor";
import { TenantAuthGuard } from "./tenant/tenant-authentication/tenant-auth.guard";
import { TenantAppFormComponent } from './tenant/tenant-app-form/tenant-app-form.component';
import { TenantAppRenterProfileComponent } from './tenant/tenant-app-form/tenant-app-renter-profile/tenant-app-renter-profile.component';
import { TenantAppFormService } from './tenant/tenant-app-form/tenant-app-form.service';
import { TenantAddCoapplicantComponent } from './tenant/tenant-app-form/tenant-add-coapplicant/tenant-add-coapplicant.component';
import { TenantAddCoApplicantService } from './tenant/tenant-app-form/tenant-add-coapplicant/tenant-add-coapplicant.service';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesService } from './properties/properties.service';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { TenantPropertyComponent } from './tenant/tenant-property/tenant-property.component';
import { TenantPropertyService } from './tenant/tenant-property/tenant-property.service';
import { TenantRenterProfileService } from "./tenant/tenant-app-form/tenant-app-renter-profile/tenant-app-renter-profile.service";
import { TenantReviewComponent } from './tenant/tenant-app-form/tenant-review/tenant-review.component';

const appRoutes = [

  { path: '', component: HomeComponent },

  { path: 'screening-request', component: ScreeningRequestComponent, canActivate: [AuthGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'home-signin', component: SigninAuthenticationComponent },

  { path: 'home-signup', component: SignupAuthenticationComponent },

  { path: 'screening-reports', component: ScreeningReportsComponent, canActivate: [AuthGuard] },

  {path: "property", component: PropertiesComponent, canActivate: [AuthGuard]},

  { path: 'tenant-signup', component: TenantSignupComponent },

  { path: 'tenant-signin', component: TenantSigninComponent },

  { path: 'tenant-dashboard', component: TenantDashboardComponent, canActivate: [TenantAuthGuard] },

  { path: 'tenant-applications', component: TenantApplicationsComponent, canActivate: [TenantAuthGuard] },

  { path: "tenant-rent-application-form", component: TenantAppFormComponent, canActivate: [TenantAuthGuard] },

  { path: "tenant-rent-application-form/renter-profile", component: TenantAppRenterProfileComponent, canActivate: [TenantAuthGuard] },

  { path: "tenant-rent-application-form/add-co-applicant", component: TenantAddCoapplicantComponent, canActivate: [TenantAuthGuard]},

  { path: "tenant-property", component: TenantPropertyComponent, canActivate: [TenantAuthGuard]},

  { path: "review", component: TenantReviewComponent, canActivate: [TenantAuthGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    ScreeningRequestComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    SigninAuthenticationComponent,
    SignupAuthenticationComponent,
    ScreeningReportsComponent,
    TenantSignupComponent,
    TenantSigninComponent,
    TenantDashboardComponent,
    TenantApplicationsComponent,
    TenantAppFormComponent,
    TenantAppRenterProfileComponent,
    TenantAddCoapplicantComponent,
    PropertiesComponent,
    PropertiesListComponent,
    AddPropertyComponent,
    TenantPropertyComponent,
    TenantReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [StoreSignup, AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: TenantAuthInterceptor, multi: true },
    AuthGuard, TenantAuth, TenantAuthGuard, TenantAppFormService, TenantAddCoApplicantService, PropertiesService, TenantPropertyService, TenantRenterProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
