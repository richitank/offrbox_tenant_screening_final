import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreSignup } from "../screeningRequestForm/storeSignup.service";
import { ScreeningRequest } from "../screeningRequestForm/screeningRequest.model";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-screening-reports',
  templateUrl: './screening-reports.component.html',
  styleUrls: ['./screening-reports.component.css']
})
export class ScreeningReportsComponent implements OnInit, OnDestroy {

  infoSentToServer: ScreeningRequest[] = [];
  private infoSentToServerSub: Subscription;

  constructor(public storeSignup: StoreSignup) { }

  ngOnInit() {

    this.storeSignup.getInfo(); //trigger http GET when ngOnInit is called


    this.infoSentToServerSub = this.storeSignup.getInfoUpdateListener()
      .subscribe((signupInfo: ScreeningRequest[]) => {
        this.infoSentToServer = signupInfo
      });
  }

  ngOnDestroy() {
    this.infoSentToServerSub.unsubscribe();
  }

}
