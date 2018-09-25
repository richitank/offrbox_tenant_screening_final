import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TenantAddCoapplicantModel } from "./tenant-add-copplicant.model";

import { environment } from "../../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/tenant/tenant-application-form/add-co-applicant";


@Injectable()
export class TenantAddCoApplicantService {
    coApplicantDetails: TenantAddCoapplicantModel[] = [];
    constructor(private http: HttpClient) { }

    sendMail(coApplicantDetails) {
        this.coApplicantDetails = coApplicantDetails;
        console.log(this.coApplicantDetails)
        this.http.post(BACKEND_URL, coApplicantDetails)
            .subscribe((response) => {
                console.log(response);
            })
    }
}