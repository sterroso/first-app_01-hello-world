# My First Angular App

## An Angular 18 Tutorial

### Clone repository

    git clone https://github.com/sterroso/first-app_01-hello-world.git

### Install libraries and dependencies

    npm i

### Create your own housing locations database

Create you own `db.json` file on the project's root path. The `db.json` file
should have the next structure:

    {
      "locations": [
        {
          "id": 0,    // A unique integer, greater or equal to 0 (zero).
          "name": "Acme Fresh Start Housing",   // A string containing the housing location name.
          "city": "Chicago",    // A string, containing the housing location city.
          "state": "IL",    // A two-character, uppercase string, containing the housing location State.
          "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",   // A string containing the housing location photo url.
          "availableUnits": 4,    // An integer containing the number of units available at the housing location.
          "wifi": true,   // true if the housing location unit has WiFi access, false otherwise.
          "laundry": true   // true if the housing location unit has in-premises laundry access, false otherwise.
        },
        ...   // Repeat as many times as required.
      ]
    }

### Run json-server

    npx json-server db.json


### Run the localhost angular server.

    npm run start