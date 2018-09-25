import { Injectable } from "@angular/core";
import { Router } from "../../../../../node_modules/@angular/router";

@Injectable()
export class TenantRenterProfileService {
    constructor(private router: Router) { }

    formDetails(formValue) {
        //convert the objects to JSON format usinf stringify
        let formValueSerialized = JSON.stringify(formValue);
        localStorage.setItem('tenantAppForm', formValueSerialized);

        //redirect user to review the form
        this.router.navigate(['/review']);
    }

}