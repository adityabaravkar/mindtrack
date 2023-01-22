# MindTrack

In this project, we've developed a special kind of assessment that estimates the susceptibility of the user to depression using item response theory's graded response model applied to the reliable PHQ9 questionnaire. Unlike classical tests where the score is calculated for the enitre set of questions this time est estimates the score after each response to a question and based on all the previous responses the next question is presented.

## Steps to run locally:

- Clone the repository
- Setup backend directory:
  - Go to the backend directory.
  - Run "pipenv install -r requirements.txt".
  - Create .env file with MONGOURI, PORT, JWT_SECRET_KEY, STD_ERROR_MIN and MAX_ITEMS.
  - Run "pipenv shell"
  - Run "python main.py" to start the assessment app on given port.
- Setup frontend app:
  - Go to the frontend directory.
  - Run "npm install".
  - Modify the assessment and backend urls in src/config.js
  - Run "npm start" to start the frontend app on given port.
