import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-properties-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      propertyType: new FormControl(null, { validators: [Validators.required] }),
      propertyAddress: new FormControl(null, { validators: [Validators.required] }),
      propertyAddress2: new FormControl(null),
      propertyCity: new FormControl(null, { validators: [Validators.required] }),
      propertyState: new FormControl(null, { validators: [Validators.required] }),
      propertyZipCode: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })

    })
  }

  onSubmit() {
    alert("Success! You've added " + this.form.value.propertyAddress);

    const propertyDetails = {
      propertyType: this.form.value.propertyType,
      propertyAddress: this.form.value.propertyAddress,
      propertyAddress2: this.form.value.propertyAddress2,
      propertyCity: this.form.value.propertyCity,
      propertyState: this.form.value.propertyState,
      propertyZipCode: this.form.value.propertyZipCode,
      //propertyImage: this.form.value.propertyImage
    }

    this.propertiesService.sendListingInfoToBackend(propertyDetails);
  }

  onImageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


}