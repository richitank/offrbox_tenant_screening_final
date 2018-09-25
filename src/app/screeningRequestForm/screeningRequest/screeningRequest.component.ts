import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreSignup } from '../storeSignup.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './screeningRequest.component.html',
  styleUrls: ['./screeningRequest.component.css']
})
export class ScreeningRequestComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authStatusSub: Subscription;


  constructor(
    private storeSignup: StoreSignup,
    private authenticationService: AuthenticationService) //Node.js authentication
  { }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticationService.getIsAuth();
    this.authStatusSub = this.authenticationService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


  onSignup(form: NgForm) {
    console.log(form.value.email);

    //tenant details
    const option = form.value.opt1;
    const applicantFirstName = form.value.applicantFirstName;
    const applicantLastName = form.value.applicantLastName;
    const applicantEmail = form.value.applicantEmail;
    const applicantPhoneNo = form.value.applicantPhoneNo;

    const infoSentToServer = {
      applicantFirstName: applicantFirstName,
      applicantLastName: applicantLastName,
      applicantEmail: applicantEmail,
      applicantPhoneNo: applicantPhoneNo,
      screeningCost: option,
    }


    //if(this.userIsAuthenticated) {
    console.log("userIsAuthenticated: " + this.userIsAuthenticated)//If not logged in, then email will not be sent.
    this.storeSignup.sendSignupInfoToBackend(infoSentToServer)

    
  }

}
