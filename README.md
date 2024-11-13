# Running Scheduler

This repo contains a full working demo project of a MERN (MongoDB, Express.js React, Node.js) full stack web application for a Running Scheduler providing the following (main) features:
  - creating training schedules based on user preferences
  - logging performed runs by uploading .gpx files and extracting the relevant data
  - tracking of equipment (distance & time)
  - providing an overview of whole training blocks

## [deployed-demo](https://www.runningjournal.online)

## Setup
### Backend (be-running-scheduler)
### Setup .env file

```js

MONGO_URI=*connection string to MongoDB*
PORT=*server port*
JWT_SECRET=*string for signing JSON Web Token*
NODE_ENV=*development | production*
FRONTEND_URL=*url of frontend*

```
### Frontend (fe-running-scheduler)
### Setup .env file

```js

VITE_APP_RUNNING_SCHEDULER_API_URL=*url of backend server*

```


