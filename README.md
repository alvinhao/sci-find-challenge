## Summary

This project is my homework for [Sci Find coding challenge](https://github.com/bguan2020/scifind_coding_challenge).
It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), built and hosted on [Firebase](https://firebase.google.com/). 

## URL
https://sci-fi-challenge.web.app/

## Features
- Current Home page is blank, clicking on Home navigation link will lead users to [sign in page](https://sci-fi-challenge.web.app/signin).
- A user can sign up for an account on the [sign up page](https://sci-fi-challenge.web.app/signup).
- When signing up a user will specify email address, password, and the services he/she wants to enable. 
- After signing in, users will be redirected to their profile page, listing their email addresses and services that are enabled. 
- Signed in the users can click on the Edit button to update their email addresses and services. 
- In theory clicking on the Submit button after editing should submit users' changes to the database: this feature has NOT been implemented.
- If a signed in user launches a profile page that's not his/her own (UIDs don't match), the Edit button will be disabled. 
- If a user launches a profile page without signing in, he/she will be asked to sign in.

## Key tech choices
- ReactJS
- Firebase - Originally I was going to build APIs on either Java + Spring or NodeJS + NestJS but eventually I decided to stick with Firebase for the following reasons: 
    - After a quick tutorial I found Firebase a real fun solution to dive deeper. I'll probably start using it for my personal projects.
    - It's light and easy to pick up.
    - It has everything we need for this exercise.
    - The UX is pretty. LOL.
- Firebase Hosting - After using User Authentication and Database of Firebase, using the hosting service to host my app seems to be a straightforward choice. It's surprisingly simple to deploy, especially after I failed deploying a blank React app to Google Cloud (likely due to some issues with GCP CLI for Windows). 
- Styled-Component - It may not be obvious that I added some styling, LOL. "Everybody loves working on frontend until they have to deal with CSS ''. I like the concept of Styled-Component and I enjoyed using Styled-Component when I was working for Cruise. 

## References
- I gathered major parts of my code and functionalities from this [tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial).
- I followed this [instruction](https://medium.com/swlh/how-to-deploy-a-react-app-with-firebase-hosting-98063c5bf425) for Firebase deployment. 

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
