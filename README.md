# NextTripGo

### What is NextTripGo?

🏝NextTripGo - keep your next trip organised and simple🏝

🚀Create a page for your next trip - add a destination, picture and dates and you’re ready to go!🚀

👥Add friends - see their upcoming trips or add them to your next trip. It is now easier to keep track of all the details before the trip, chip in and enjoy together👥

💸Keep your expenses on track - add all the provisional expenses, no matter the currency. See a graph of all of them combined, convert them to other currencies and avoid surprises in the future!💸

### Tech Stack

NextTripGo is built in React, TypeScript, GraphQL, Node.js, Express and MongoDB.

### Previews

<img src="./readme/Screenshot 3.png" alt="Untitled design (1)" style="zoom:25%;" /><img src="./readme/Screenshot 4.png" alt="Untitled design" style="zoom:25%;" />

### Prerequisites

You will need an active Google API key, Pexels API key and Free Currency Converter API. You can obtain them in the following links:

- Google: https://console.developers.google.com/apis/credentials (make sure to enable the Places API and Maps JavaScript API)
- Pexels: https://www.pexels.com/api/
- Free Currency Converter: https://free.currencyconverterapi.com/

### Getting started

These instruction will help you setup a local development instance of the app.

1. Fork and clone this repository
2. Enter the directory with `cd NextTripGo`
3. Create a copy of the `configExample.js` file in `/client` and rename it to `config.js`. Replace the needed fields with your own API keys.
4. Create a copy of the `configExample.js` file in `/server` and rename it to `config.js`. Replace the field with your desired JWT Secret Key.
5. Run `npm run build-images && docker-compose up` to create images for the client, server and database.
6. Navigate to http://localhost:3000
7. Enjoy NextTripGo!

### Contributors

- Founder, Full-Stack Engineer: David Solsona - [GitHub profile](https://github.com/davidsolsonapuertas)
- Contributor, Full-Stack Developer: Caroline Victor-Pujebet - [GitHub profile](https://github.com/Carolinevp)
- Contributor, Full-Stack Developer: James Hough - [GitHub profile](https://github.com/Hough-Lab)
