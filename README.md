# MindTrack

In this project, we've developed a special kind of assessment that estimates the susceptibility of the user to depression using item response theory's graded response model applied to the reliable PHQ9 questionnaire. Unlike classical tests where the score is calculated for the enitre set of questions this time est estimates the score after each response to a question and based on all the previous responses the next question is presented.

## Steps to run locally:

- Clone the repository
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
