import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantPropertyService } from './tenant-property.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-tenant-property',
  templateUrl: './tenant-property.component.html',
  styleUrls: ['./tenant-property.component.css']
})
export class TenantPropertyComponent implements OnInit, OnDestroy {
  public propertyForm = [];
  private propertyUpdated: Subscription;

  constructor(private tenantPropertyService: TenantPropertyService) { }

  ngOnInit() {
    this.tenantPropertyService.getInfo();
    this.propertyUpdated = this.tenantPropertyService.getInfoUpdateListener()
      .subscribe((property: any) => {
        console.log(property);
        this.propertyForm = property;
        for(let property in this.propertyForm){
          const filtered = Object.keys(property);
          console.log(filtered)
          console.log(this.propertyForm[property])
        }
      });
  }
  sendApplicationInfo() {
    alert("Still working on it!")
  }

  ngOnDestroy() {
    this.propertyUpdated.unsubscribe();
  }

}
