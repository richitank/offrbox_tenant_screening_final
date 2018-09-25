import { TenantAppFormModel } from "./tenant-app-form.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { environment } from "../../../environments/environment";
import { Router } from "../../../../node_modules/@angular/router";


const BACKEND_URL = environment.apiUrl + "/tenant/tenant-application-form";


@Injectable()
export class TenantAppFormService {

    private formInfo: TenantAppFormModel[] = [];
    private infoUpdated = new Subject<TenantAppFormModel[]>()

    constructor(private http: HttpClient, private router: Router) { }

    storeTenantAppForm(formInfo) {
        this.formInfo.push(formInfo);
        this.infoUpdated.next([...this.formInfo])
        this.http.post(BACKEND_URL, formInfo)
            .subscribe(response => {
                console.log(response);
                localStorage.removeItem('tenantAppForm');
                alert("Submit Successful!");
                this.router.navigate(["tenant-applications"]);
            })
    }

    getTenantAppForm() {
        this.http.get<{ TenantAppForm: any }>(BACKEND_URL)
            .subscribe(response => {
                this.formInfo = response.TenantAppForm;
                this.infoUpdated.next([...this.formInfo]);
                
            })
    }

    deleteApplication(applicationID: string) {
        console.log(applicationID);
        this.http.delete(BACKEND_URL + "/" + applicationID)
            .subscribe((response) => {
                const updatedFormList = this.formInfo.filter(property => property._id !== applicationID);
                this.formInfo = updatedFormList;
                this.infoUpdated.next([...this.formInfo])
                console.log(response)
            });
    }

    GoBackAndEdit() {
        this.router.navigate(['tenant-rent-application-form/renter-profile']);
    }

    getInfoUpdateListener() {
        return this.infoUpdated.asObservable();
    }

}