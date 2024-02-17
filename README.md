## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Notes

(Mostly to remind myself of all the random projects that have been completed).
- New My Account was a third party site authenticated through Azure Active Directory, which was transitioned to NextJS for Server-Side Rendering and routing -> GraphQL for API codification leveraging resolver functions -> MuleSoft API -> SFMC data store
- Culled bugs on some of the worst greenfield projects imaginable<br>
  PHP and Google Maps store locator for large telecom, built on contract by team of junior devs in non-english speaking country.
- Detailed setup and maintenance instructions<br>
  Added wiki entries to describe the automated backup process for international fiber internet provider and the restoration procedure in case of critical event.
- Massive data batch processing<br>
  In an e-commerce project the client's brick and mortar POS system exported daily inventory as a CSV. Product data (attributes, images, stock) was batch processed by a combination of Bash and PHP/MySQL to be ingested by a Wordpress site.
- Exacted lurking issues quietly impacting millions in annual revenue.<br>
Turned out Safari users were unable to interact with the recaptcha that was used on an invoice payment page, which I found through a find-and-fix dashboard the company added. I pushed hard to remove the security check since it didn't make much sense in the first place.
- The horrible application used as a code repository and code deployments was very slow. I created a site that would build a command-line string to rapidly merge to trunk (SVN) instead of using the clunky UI.
- Built a chrome extension to drill down through the online interface and pre-populate fields.
- Shortened order uuid by encoding, resulted in invalid characters *sometimes*.
- Cypress -> Playwright automation