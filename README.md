# Travel Blog

## Description
This is a blogsite focused on sharing vacation tips organized by an individual user's plans. A user planning a trip can create a page for the location being visited that details some of their vacation planning and users who have experience with that location can add comments or tips.


## Table of Contents
* [Installation](#installation)
* [Technology](#technology)
* [Usage](#usage)
* [Issues](#issues)
* [Credits](#credits)
* [Contact](#contact)


## Installation
Open this application using the website linked below.


## Technology
This application follows the Model-View-Controller paradigm. It uses Handlebars.js for the Views, MySQL2 and Sequelize for the database models and an Express.js back end for the Controller. There is also the ability to sign in using your Google id and password.  It also uses bcrypt to hash passwords and express-session and connect-session-sequelize for authentication. It is deployed using Heroku.


## Usage
This website opens on the landing page where there is a carousel of existing blog.  There is a side navigation bar with options with a login/signup button. In order to go to another page, the user must log in or sign up.  The user can also login using a Google Id.  Once the user has done so, a page comes up with images for all the location sites that have associated pages.  On the individual post page, there is a calendar, an area to put notes about your trip, a cloudinary link to upload videos, a short description of the trip being planned and a place to add a comment. When a comment is added, it can be tagged with a category, Accommodations, Entertainment, Food/Drink or Transportation. The tag that is chosen displays next to the comment.

Notes can be made in the calendar by clicking on the date and adding your information in the modal that pops up.  The modal closes with an exit button in the top right or upon saving via the save button.


## Issues
There is a known issue with the calendar. When a note is placed on a date, that note information persists until the page is refreshed. The information is not saved for the following modal unless the save button is used but the modal textarea is not cleared upon saving.

## Contact
This project was created by Xavier Vergara, Jung Dettelback, Bryan Davie and Isaac Daniels.
Contact us at:
    []
    [jdettelback@gmail.com](mailto:jdettelback@gmail.com) if you have any questions.  

You can see more of our work at:
    <https://github.com/NyqEvo>
    <https://github.com/jdettelback>
    <https://github.com/gnrt>
    <https://github.com/isaackice>

  ![screenshot](https://raw.githubusercontent.com/jdettelback/notetaker/main/images/screenshotnotetaker.png)
  
  ![screenshot](https://raw.githubusercontent.com/jdettelback/notetaker/main/images/screenshotnotetaker2.png)

Link to deployed website:

https://techblog-jung.herokuapp.com/
