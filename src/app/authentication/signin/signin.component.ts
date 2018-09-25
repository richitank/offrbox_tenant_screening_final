import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninAuthenticationComponent implements OnInit{
  

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    
  }

  
  onSignin(form: NgForm) {
    if(form.invalid) 
    {
      return
    }
    this.authenticationService.login(form.value.email, form.value.password);
 
  }

}
