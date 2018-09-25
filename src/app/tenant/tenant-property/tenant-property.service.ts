import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Subscription, Subject } from "../../../../node_modules/rxjs";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/tenant-properties/";

@Injectable()
export class TenantPropertyService {
    private propertyForm = [];
    private infoUpdated = new Subject()
    
    constructor(private http: HttpClient) { }

    getInfo() {
        this.http.get<{PropertyForm: any}>(BACKEND_URL)
            .subscribe((response) => {
                this.propertyForm = response.PropertyForm;
                this.infoUpdated.next([...this.propertyForm]);
            })
    }

    getInfoUpdateListener() {
        return this.infoUpdated.asObservable();
    }
}