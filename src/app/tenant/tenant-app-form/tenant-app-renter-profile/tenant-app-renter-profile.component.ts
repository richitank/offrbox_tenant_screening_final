import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TenantRenterProfileService } from './tenant-app-renter-profile.service';

@Component({
  selector: 'app-tenant-app-renter-profile',
  templateUrl: './tenant-app-renter-profile.component.html',
  styleUrls: ['./tenant-app-renter-profile.component.css']
})
export class TenantAppRenterProfileComponent implements OnInit {
  annualSalary: number = 0;
  tenantAppForm: FormGroup;

  constructor(private tenantRenterProfileService: TenantRenterProfileService) { }

  ngOnInit() {
    let formDataSerialized = localStorage.getItem('tenantAppForm');
    let formDataDeserialized = JSON.parse(formDataSerialized);
    

    this.tenantAppForm = new FormGroup({
      employer: new FormControl(Validators.required),
      employmentPosition: new FormControl(null, Validators.required),
      employmentStartDate: new FormControl(null, Validators.required),
      employmentEndDate: new FormControl(null, Validators.required),
      contactFirstName: new FormControl(null, Validators.required),
      contactLastName: new FormControl(null, Validators.required),
      contactEmail: new FormControl(null, [Validators.required,Validators.email]),
      contactPhone: new FormControl(null, Validators.required),

      incomeSource: new FormControl(null, Validators.required),
      monthlyAmount: new FormControl(null, Validators.required),
      addIncomeInfo: new FormControl(null),

      streetAddress: new FormControl(null, Validators.required),
      residenceCity: new FormControl(null, Validators.required),
      residenceState: new FormControl(null, Validators.required),
      residenceZipCode: new FormControl(null, Validators.required),
      residenceMoveInDate: new FormControl(null, Validators.required),
      residenceMoveOutDate: new FormControl(null, Validators.required),

      refFirstName: new FormControl(null, Validators.required),
      refLastName: new FormControl(null, Validators.required),
      refPhone: new FormControl(null, Validators.required),
      refEmail: new FormControl(null, [Validators.required,Validators.email]),
      refRelation: new FormControl(null, Validators.required),
      refYearsKnown: new FormControl(null, Validators.required)

    })

    this.tenantAppForm.setValue({
      employer: formDataDeserialized.employer,
      employmentPosition: formDataDeserialized.employmentPosition,
      employmentStartDate: formDataDeserialized.employmentStartDate,
      employmentEndDate: formDataDeserialized.employmentEndDate,
      contactFirstName: formDataDeserialized.contactFirstName,
      contactLastName: formDataDeserialized.contactLastName,
      contactEmail: formDataDeserialized.contactEmail,
      contactPhone: formDataDeserialized.contactPhone,

      incomeSource: formDataDeserialized.incomeSource,
      monthlyAmount: formDataDeserialized.monthlyAmount,
      addIncomeInfo: formDataDeserialized.addIncomeInfo,

      streetAddress: formDataDeserialized.streetAddress,
      residenceCity: formDataDeserialized.residenceCity,
      residenceState: formDataDeserialized.residenceState,
      residenceZipCode: formDataDeserialized.residenceZipCode,
      residenceMoveInDate: formDataDeserialized.residenceMoveInDate,
      residenceMoveOutDate: formDataDeserialized.residenceMoveOutDate,

      refFirstName:formDataDeserialized.refFirstName,
      refLastName: formDataDeserialized.refLastName,
      refPhone: formDataDeserialized.refPhone,
      refEmail: formDataDeserialized.refEmail,
      refRelation: formDataDeserialized.refRelation,
      refYearsKnown: formDataDeserialized.refYearsKnown
    })
  }

  onClickReview() {
    this.tenantRenterProfileService.formDetails(this.tenantAppForm.value);
  }

}
