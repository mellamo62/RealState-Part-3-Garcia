import { Component, inject } from '@angular/core';
import { HousingLocationComponent} from "./housing-location/housing-location.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { HousingLocation } from './housinglocation';
import { HousingService} from "./housing.service";
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterModule, HomeComponent, NgOptimizedImage],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/']">
          <img class="brand-logo" src="../assets/logo.svg" alt="logo" aria-hidden="true" height="44" width="151">
        </a>

        <a [routerLink]="['/login']" style="float: right;">Login</a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  constructor() {
    // this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    //   this.housingLocationList = housingLocationList;
    //   this.filteredLocationList = housingLocationList;
    // });
  }
}
