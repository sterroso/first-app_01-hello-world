import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private _housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[];
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = [];
    this.filteredLocationList = this.housingLocationList;
    
    this._housingService.getAllHousingLocations().
      then((allLocations: HousingLocation[]) => {
        this.housingLocationList = allLocations;
        this.filteredLocationList = this.housingLocationList;
      }).
      catch((reason) => {
        console.error('Housing locations could not be retrieved from Database.');
      });
  }

  filterResults(text: string): void {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((location) => location.city.toLowerCase().includes(text.toLowerCase()));
  }
}
