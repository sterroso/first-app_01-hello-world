import { Injectable } from '@angular/core';

import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private readonly url: string = 'http://localhost:3000/locations';

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const response = await data.json();

    return response ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = await fetch(`${this.url}/${id}`);
    const response = await data.json();

    return response ?? {} as HousingLocation;
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`Home application received: ${firstName} ${lastName}, ${email}.`);
  }
}
