# MindTrack

## Project Source Code:

- https://github.com/ShreshtaBalmuri/MentalHealth_Application

We have three main components -> Frontend,Backend and machine learning model, all are are deployed on cloud.

- Backend. - https://github.com/ShreshtaBalmuri/MentalHealth_Application/tree/main/backend
- FrontEnd. - https://github.com/ShreshtaBalmuri/MentalHealth_Application/tree/main/frontend
- Assessment module - https://github.com/ShreshtaBalmuri/MentalHealth_Application/tree/main/assessment

## Steps to run locally:

- Clone the repository: git clone https://github.com/ShreshtaBalmuri/MentalHealth_Application
- Setup backend services:
  - Go to the backend directory.
  - Run "npm install".
  - Create .env file with APP_SECRET, MONGOURI, and PORT.
  - Run "node" to start the backend app on given port.
- Setup assessment services:
  - Go to the assessment directory.
  - Run "pipenv install -r requirements.txt".
  - Create .env file with MONGOURI and PORT.
  - Run "pipenv shell"
  - Run "python assess.py" to start the assessment app on given port.
- Setup frontend app:
  - Go to the frontend directory.
  - Run "npm install".
  - Modify the assessment and backend urls in src/config.js
  - Run "npm start" to start the frontend app on given port.
