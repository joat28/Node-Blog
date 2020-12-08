[![LinkedIn][linkedin-shield]][linkedin-url]
<br />
<p align="center">
  <h1 align="center">Node-Blog</h1>
  <p align="center">
    A project to make blogging web app with authentication.  
    <br />
    <a href="https://github.com/joat28/Node-Blog/issues">Report Bug</a>
    ·
    <a href="https://github.com/joat28/Node-Blog/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href='#features'>Features and demo</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Here are some details and screenshots of the projects for easy navigation, and to give more info about the features of the project.

### Built With

* [Express.js](https://expressjs.com/) as Node.js Framework.
* [MongoDB](https://www.mongodb.com/) as Database.

### Features

___
#### Landing Page
Move to the root of the project in our local server, to get to the landing page. Scroll down to get options to 'login' or 'Register'.

![Landing Page][landing-page]
___
#### Login and Register Page
Sign in/ Register to continue from here. You can use your Google account to login/ register too.

![Login Page][login-page]
![Register Page][register-page]
___
#### Index Page
This page lists all the blogs written by all the users. You can navigate through the navbar on top. This page is the Home page. To delete your session click on 'Logout' from top menu. To read a particular Blog simply click 'Read more' appearing on each post.

![Home Page][home-page]
___
#### Readpost Page
To read a post simply click read more on the card in Index Page.

![Read Post Page][readpost-page]
___
#### Compose Page
Create new posts from here. Add title, content and file/pictures of your choice to post. On clicking compose, the server redirects to the Home page. Only the Author of the post has the permission to edit or delete the post. Once deleted all the comments of the Original Post will also be deleted.

![Compose page][compose-page]
___
#### Profile Page
To get details about the account. Like username, email and Date of join. There are also options to Edit profile and Delete. Deleting requires confirmations thrice. Once a user is deleted, all posts, comments of the user will be deleted.

![Profile Page][profile-page]
___
#### Comments section
Any user can comment on any of the posts in the feed. Only the author of the comment has the privilege to Edit and Delete the comment (Unless the post itself is deleted by OP).

![Comments][comments]
___
#### Edit and Replace Post
The Original poster can Edit the post and replace it too.

![Edit and Replace Post][editandreplace-page]
___
#### My posts Page
This page is for filtering all the posts written by the user himself/herself.

![My posts][myposts-page]
___

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
1. Make sure you have Node.js and MongoDB installed.
2. A terminal with unix support is preferred.

### Installation and posting

1. Clone the repo
   ```sh
   git clone https://github.com/joat28/Node-Blog.git
   ```
2. Install all NPM packages
   ```sh
   npm install
   ```
 3. Move to localhost:DEFAULT_PORT/compose to compose your first post.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newFeatureName`)
3. Commit your Changes (`git commit -m 'Add some new Feature'`)
4. Push to the Branch (`git push origin feature/newFeatureName`)
5. Open a Pull Request

## Contact

- LinkedIn : [Prabhat Rao][linkedin-url]
- Twitter : [Prabhat Rao][twitter-url]
- Project Link: [https://github.com/joat28/Node-Blog](https://github.com/joat28/Node-Blog)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [EJS](https://ejs.co/)
* [Font Awesome](https://fontawesome.com/)
* [Passport.js](http://www.passportjs.org/)
* [Dribble](https://dribbble.com/)
* [Mongoose](https://mongoosejs.com/)
* [Nodemon](https://nodemon.io/)


<!-- MARKDOWN LINKS & IMAGES -->

[compose-page]: images/Compose-page.png
[register-page]: images/Register-Page.png
[login-page]: images/Login-page.png
[landing-page]: images/Landing-Page.png
[home-page]: images/Home-Page.png
[profile-page]: images/Profile-Page.png
[edit-profile-page]: images/Edit-Profile.png
[comments]: images/Comments.png
[readpost-page]: images/Readpost-Page.png
[editandreplace-page]: images/Editandreplace-Page.png
[myposts-page]: images/Myposts-Page.png

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/prabhat-rao-5b535b178/
[twitter-url]: https://twitter.com/Prabhat38336182
