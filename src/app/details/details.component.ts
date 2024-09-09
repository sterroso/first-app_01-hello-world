import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have WiFi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Appy now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" />

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" />

          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styles: ``
})
export class DetailsComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [Validators.minLength(1)]),
    lastName: new FormControl<string>('', [Validators.minLength(1)]),
    email: new FormControl<string>('', [Validators.minLength(1), Validators.email]),
  });

  constructor() {
    const housingLocationId = Number(this._route.snapshot.params['id']);
    this.housingLocation = this._housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication(): void {
    this._housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
