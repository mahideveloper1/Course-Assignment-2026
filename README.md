 ## Skillpath – Framer Assignment

A responsive landing page for a fictional learning platform called Skillpath, built in Framer.

The main focus of the assignment is the dynamic Courses section, which is implemented as a React Code Component and fetches live data from the provided APIs.

Assignment Requirements

The landing page contains three main sections:

Hero – headline, supporting text, and CTA button.

Courses – dynamic course grid powered by the API.

Footer – three links and a copyright line.

Courses Component

The courses section uses two GET endpoints from:

https://syncsphere-hiv6.onrender.com

Course Data

GET /assignment/course-data

Returns an array of 5–10 courses. The number of courses can change between requests, so the UI generates the cards dynamically instead of hardcoding them.

Each course displays:

Course name

Description, limited to two lines

Main category

Price

Refundable status when available

Country Code

GET /assignment/country-code

Returns either:

{ "country_code": "IN" }

or:

{ "country_code": "US" }

The country determines which course price is displayed:

IN → pricePaise / 100 and formatted as INR

US → priceUsdCents / 100 and formatted as USD

API Failure Handling

The APIs intentionally fail sometimes, so the component handles different states gracefully.

Loading

While course data is being fetched, skeleton course cards are shown instead of leaving the section blank.

Error

If the Course API fails, a friendly error message and Try again button are displayed. Clicking the button triggers the API requests again.

Zero Results

If the Course API succeeds but returns an empty array, the component displays:

No courses available right now.

Country API Failure

The Course API and Country API are handled independently.

If the Course API works but the Country API fails, the courses are still displayed. To avoid guessing whether INR or USD should be used, the component caches the last successfully received country code (IN or US) in localStorage and uses that value as a fallback.

If there is no cached country yet, the price is shown as Price unavailable.

Responsive Design

The course grid adapts to different screen sizes:

Desktop: 3 columns

Tablet: 2 columns

Mobile: 1 column

The grid supports any number of courses returned by the API.

Framer Property Controls

The React Code Component exposes two controls in the Framer properties panel:

Card Radius – controls the roundness of course cards.

Card Gap – controls the spacing between cards.

These allow a designer to adjust the visual appearance without touching the code.

Project Structure

- main.tsx               # Main Framer Code Component
- Course.tsx             # Individual course card
- api.ts                 # API requests and country caching
- types.ts               # TypeScript types
- styles.ts              # Component CSS

What I'd Fix With Two More Days

If I had two more days, I’d spend more time polishing the UI, especially the course cards and responsive behavior, and testing the API failure cases.

The main thing I got stuck on was when only the country API fails. Since the course API gives both INR and USD prices, I didn’t want to randomly choose one. I solved this by caching the last successful country (IN or US) and using it as a fallback when the country API fails. If there’s no cached country, I show “Price unavailable”.

I’m happy with the functionality and structure, but I think the visual polish could still be improved with more time.
