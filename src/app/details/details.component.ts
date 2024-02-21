import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
           alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          <li>Latitude: {{ housingLocation?.coordinates?.latitude }}</li>
          <li>Longitude: {{ housingLocation?.coordinates?.longitude }}</li>
          <li [routerLink]="['/map',housingLocation?.id]">See Location</li>
          <li>Satisfaction:
            <div *ngIf="calification<=4">
              <img src="../../assets/Bad.PNG">
            </div>
            <div *ngIf="calification==5">
              <img src="../../assets/Regular.PNG">
            </div>
            <div *ngIf="calification==6">
              <img src="../../assets/Good.PNG">
            </div>
            <div *ngIf="calification >=7 && calification<=9">
              <img src="../../assets/Very_Good.PNG">
            </div>
            <div *ngIf="calification==10">
              <img src="../../assets/Excellent.PNG">
            </div>
            <h3 class="calification">{{ calification }}</h3>
            <p>Valorate the house:</p>
            <form [formGroup]="calificationForm" (ngSubmit)="submitCalification()">
              <select formControlName="calificationSelected">
                <option *ngFor="let calification of rangeCalification">{{ calification }}</option>
              </select>
              <br>
              <button type="submit" >Submit Calification</button>
            </form>
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  calification: number = 0;
  rangeCalification: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  calificationForm = new FormGroup({calificationSelected: new FormControl('')})

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.calification = <number>this.housingLocation?.calification;
    });

  }

  submitCalification() {
    console.log(this.calificationForm.value)
    this.calification=Number(this.calificationForm.value.calificationSelected);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }


}
