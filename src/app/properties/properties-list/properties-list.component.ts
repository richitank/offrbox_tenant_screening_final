import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Property } from '../properties.model';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-properties-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit, DoCheck {

  infoSentToServer: Property[] = [];
  private infoSentToServerSub: Subscription;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.propertiesService.getInfo();
    this.infoSentToServerSub = this.propertiesService.getInfoUpdateListener()
      .subscribe((listings) => {
        this.infoSentToServer = listings;
      });
  }
  ngDoCheck() {

  }

  onClickDeleteProperty(propertyId: string) {
    console.log("Id: " + propertyId)
    this.propertiesService.deleteProperty(propertyId);
  }

  ngOnDestroy() {
    this.infoSentToServerSub.unsubscribe();
  }

}
