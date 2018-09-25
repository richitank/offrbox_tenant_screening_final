import { Component, OnInit } from '@angular/core';
import { TenantAppFormService } from '../tenant-app-form.service';
import { TenantRenterProfileService } from '../tenant-app-renter-profile/tenant-app-renter-profile.service';

@Component({
  selector: 'app-tenant-review',
  templateUrl: './tenant-review.component.html',
  styleUrls: ['./tenant-review.component.css']
})
export class TenantReviewComponent implements OnInit {
  public formData;

  constructor(private tenantAppFormService: TenantAppFormService ) { }

  ngOnInit() {
    //retrieve form data on component initialization
    let formDataDeserialized = JSON.parse(localStorage.getItem('tenantAppForm')); 
    console.log(formDataDeserialized);
    this.formData = formDataDeserialized;
    console.log(this.formData.contactFirstName)
  } 

  onSubmit() {
    this.tenantAppFormService.storeTenantAppForm(this.formData);
  }

  onBackButton() {
    this.tenantAppFormService.GoBackAndEdit();
  }

}
