# What you'd fix with two more days. Where you got stuck. What you're not happy with ?

## If I had two more days, I’d spend more time polishing the UI and making the course cards feel more refined across different screen sizes. I’d also do more testing around the API randomly failing, especially the different loading and error cases.

## The main thing I got stuck on was what to do when only the country API fails. The course API still gives both INR and USD prices, but the country API is what tells us which one to show. I didn’t want to just default to INR or USD and potentially show the wrong price. So I added a small caching fallback whenever the country API works, I save the last successful country (IN or US). If the country API fails later, I use that cached country to decide which price to show. If there’s no cached value yet, I show "Price unavailable".

## I’m mostly happy with the functionality and the way the component is structured now. The main thing I’m not completely happy with is that the visual design could still use another round of refinement. I’d also spend more time testing edge cases and making the component feel more polished rather than just functionally complete.
