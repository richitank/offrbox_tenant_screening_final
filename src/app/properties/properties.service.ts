import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';

import { Property } from "./properties.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/properties";

@Injectable()
export class PropertiesService {
    private infoSentToServer: Property[] = [];
    private infoUpdated = new Subject<Property[]>()

    constructor(private httpClient: HttpClient, private router: Router) { }

    sendListingInfoToBackend(infoSentToServer) {
        const propertyData = new FormData();
        propertyData.append('propertyType', infoSentToServer.propertyType);
        propertyData.append('propertyAddress', infoSentToServer.propertyAddress);
        propertyData.append('propertyAddress2', infoSentToServer.propertyAddress2);
        propertyData.append('propertyCity', infoSentToServer.propertyCity);
        propertyData.append('propertyState', infoSentToServer.propertyState);
        propertyData.append('propertyZipCode', infoSentToServer.propertyZipCode);
        //propertyData.append('propertyImage', infoSentToServer.propertyImage, infoSentToServer.propertyAddress);

        this.infoSentToServer.push(infoSentToServer);
        this.infoUpdated.next([...this.infoSentToServer]);
        this.httpClient.post(BACKEND_URL, infoSentToServer)
            .subscribe((responseData) => {
                console.log(responseData);
                this.getInfo();
            });
    }

    getInfo() {
        this.httpClient.get<{ PropertyForm: any }>(BACKEND_URL)
            .subscribe((data) => {
                this.infoSentToServer = data.PropertyForm;
                this.infoUpdated.next([...this.infoSentToServer]);
                console.log(data);
            });
    }

    getInfoUpdateListener() {
        return this.infoUpdated.asObservable();
    }

    deleteProperty(propertyId: string) {
        this.httpClient.delete(BACKEND_URL + "/" + propertyId)
            .subscribe((response) => {
                const updatedProperty = this.infoSentToServer.filter(property => property._id !== propertyId);
                this.infoSentToServer = updatedProperty;
                this.infoUpdated.next([...this.infoSentToServer])
                console.log(response)
            });
    }
}