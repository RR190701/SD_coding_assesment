# Share Your PDFS
> PDF sharing and collaboration platform build on mern stack :fire:.

## Features
</br>

- [x] User login and register
- [x] owned and shared pdf sections
- [x] Only upload PDF file
- [x] PDF viewer
- [x] Let user comment on PDF
- [x] Share PDF with your friends

## Demo version
</br>
A demo version is automatically deployed for this repositories:

- Deployment -[https://share-your-pdfs.netlify.app/](https://share-your-pdfs.netlify.app/)

## Technology Stack 
</br>
Please get familiar with the components of the project in order to be able to contribute.

### components
- CSS: Styling web pages, html files
- Javascript: Primary programing language
- ReactJS: Javascript library for building User Interfaces
- nodejs: Used in the backend
- express: To create the calling API
- Material-UI: UI library for design system

#### External Service Dependencies
- MongoDB Atlas: A cloud database used to store user personal data username, passwords and individuals chats

## Requirements
</br>

- node --version >= 6
- npm --version >= 3


## Local Installation for frontend
</br>

### Steps
- `git clone <repository-url>` where `<repository-url>`is the link to the forked repository
- `cd SD_coding_assesment`
- `cd client`

Note : If you want to contribute, first fork the original repository and clone the forked repository into your local machine followed by `cd` into the directory


git clone https://github.com/RR190701/SD_coding_assesment

cd SD_coding_assesment

cd client


## Local Installation for backend
</br>

### Steps
- `cd ..`
- `cd server`

Note : If you want to contribute, first fork the original repository and clone the forked repository into your local machine followed by `cd` into the directory

cd ..

cd  server


#### Config Variables
Define config variables in config.env.

- Create a free mongoDB atlas account at [https://www.mongodb.com](https://www.mongodb.com) and set a new cluster connection url equal to `db_connection_URL`
- Set `JWT_SECRET = <your_jwt_secret_string>` where `<your_jwt_secret_string>` is long alphanumerical string 
- Set `JWT_EXPIRE = <jwt_token_life_time>` where `<jwt_token_life_time>` is a string e.g. 10min, 30min

#### Starting server


cd server

- Install all the dependencies with `npm install`
- Start the server with `npm run server`
- Visit your API at [http://localhost:5000](http://localhost:5000.) :tada:

#### Starting frontend


cd client

- Install all the dependencies with `npm install`
- Start the server with `npm start`
- Visit your app at [http://localhost:3000](http://localhost:3000.) :tada:

## Contributing

> Feel free to *contribute* :heart_eyes:
- When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change."