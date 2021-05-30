# Weather-Journal App Project

## Overview
This project is an asynchronous web app that uses Web API and user data to dynamically update the UI.

## Description
The user can enter the city zip code and how he/she feels. By clicking `Generate` button the `Most Recent Entry` section is updated to display today's date, the temperature of the entered city and how the user feels.

## Prerequisites
Before you can run this project you need to install the following:
- [Node.js](https://nodejs.org/en/download/)
- Check that Node.js is installed by typing `node --version` in the terminal (or cmd)
- After Node is installed, open the project directory in terminal and install the required packages:
    - `npm install` will automatically install the dependences in the package.json

## Run the project
To run the project type `node server.js` in the terminal pointing to the project directory. This will setup the server printing `running on localhost: 3000`

## Implementation Overview
You can find the server-side code written in `server.js` and client-side logic in `website/app.js`. 
