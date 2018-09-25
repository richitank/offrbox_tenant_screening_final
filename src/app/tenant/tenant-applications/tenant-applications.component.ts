import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantAppFormService } from '../tenant-app-form/tenant-app-form.service';
import { Subscription } from 'rxjs';
import { TenantAppFormModel } from '../tenant-app-form/tenant-app-form.model';

@Component({
  selector: 'app-tenant-applications',
  templateUrl: './tenant-applications.component.html',
  styleUrls: ['./tenant-applications.component.css']
})
export class TenantApplicationsComponent implements OnInit, OnDestroy {
  infoSentToServer: TenantAppFormModel[] = [];
  private infoSentToServerSub: Subscription;

  constructor(public tenantAppFormService: TenantAppFormService) { }

  ngOnInit() {
    this.tenantAppFormService.getTenantAppForm();
    this.infoSentToServerSub = this.tenantAppFormService.getInfoUpdateListener()
      .subscribe((tenantAppForm: TenantAppFormModel[]) => {
        this.infoSentToServer = tenantAppForm
        console.log(this.infoSentToServer)
      });
  }

  onDeleteApplication(applicationID: string) {
    this.tenantAppFormService.deleteApplication(applicationID);
  }

  ngOnDestroy() {
    this.infoSentToServerSub.unsubscribe();
  }
}
