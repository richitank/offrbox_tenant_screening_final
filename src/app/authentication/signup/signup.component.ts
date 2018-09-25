import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupAuthenticationComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription
  
  constructor(public authentication: AuthenticationService) { }

  ngOnInit() {     
   
  }
  
  onSignup(form: NgForm) {
    if(form.invalid) {
     return
   }
   
   
  this.authentication.createUser(form.value.noOfUnits, form.value.firstName, form.value.lastName, 
    form.value.applicantPhoneNo, form.value.email, form.value.password)
                               
    }
    

ngOnDestroy() {
  //this.authStatusSub.unsubscribe();
}
   

}
