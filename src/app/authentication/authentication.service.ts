import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

const BACKEND_URL = environment.apiUrl + "/user";


@Injectable()
export class AuthenticationService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;
    private tokenTimer: any;

    getToken() {
        return this.token;
    }
    
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    constructor(private http: HttpClient, private router: Router) {}

    createUser(noOfUnits: number, firstName: string, lastName: string, applicantPhoneNo: number, email: string, password: string) {
        const authData: AuthData = {
            noOfUnits: noOfUnits, 
            firstName: firstName, 
            lastName: lastName,
            applicantPhoneNo: applicantPhoneNo,
            email: email,
            password: password
        };
        console.log(authData);
        this.http.post(BACKEND_URL + "/signup", authData)
            .subscribe((response) => {
                console.log(response)
                this.router.navigate(['/home-signin'])
            })
            //this.router.navigate(['/home-signin'])

    }

    login(email: string, password: string) {
      
        this.http.post<{token: string, expiresIn: number}>(BACKEND_URL + "/signin", /*authData,*/ {email: email,
        password: password})
        .subscribe((response) => {
            console.log(response)
            const token = response.token
            this.token = token;
            if(token) {
                const expiresInDuration = response.expiresIn; // Sending Token expiration time to Front-End
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                this.authStatusListener.next(true); 
                const now = new Date();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                //console.log(expirationDate);
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/dashboard'])

            }
            // if login is success, then Display logout buton and Remove Login/Signup button
        })

    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.setAuthTimer(expiresIn /1000);
          this.authStatusListener.next(true);
        }
      }

    logout() {
        this.token = null;
        this.authStatusListener.next(false)
        clearTimeout(this.tokenTimer)
        this.clearAuthData();
        this.router.navigate(['/']);

    }

    
    private setAuthTimer(duration: number) { 
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout()
        }, 
        duration * 1000) //logout after 3600s
    }


    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString())
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate)
        }
      }
}