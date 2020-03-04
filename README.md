_______PETAZOA - FINAL RED BADGE PROJECT BY JUSTIN TERRY, DYLAN MOROSOWSKI, KARL GIRONDA MARCH 2020_______

FROM GITHUB -
    clone repo address from github. (One for CLIENT and one for SERVER)

IN TERMINAL - 
    git clone "(cloned URL from github)"


SERVER REACT APP START -
    nodemon to start.

CLIENT REACT APP START -
    npm install to download the node package manager.
    npm start to start react app.

_______SEVER DEPLOYMENT_______

IN .ENV FILE - 
    add DATABASE_URL = postgresql://postgres:(postgres password inserted here).localhost/(database name inserted here)

IN .DB FILE -
    remove local host
    add (process.env.DATABASE_URL) to new sequelize.

IN PACKAGE.JSON - 
    in "start" add your base(App.tsx) instead of node modules routing.

IN TERMINAL -
    run Heroku help
    type Heroku login/Click login in browser.
    type Heroku create (name of project)
    type Heroku add-ons: create heroku-postgresql: hobby-dev--app
    type git add .
    type git commit -m "message inserted here"
    type git push heroku master

IN HEROKU -
    select server => settings => Config Vars => add JWT_SECRET
    click updated live URL

_______CLIENT DEPLOYMENT________

IN TERMINAL - 
    type Heroku login
    type Heroku create (insert name here)-- buildpack https:github.com/mars/create-react-app-buildpack.git
    type git init
    type git add .
    type git commit -m "(add message here)"

CREATE A HELPERS FOLDER - 
    add environment.tsx file
    add APIURL = "(add API URL here)"

WRITE A SWITCH -
    to run between localhost or APIURL depending on wer you are running your server.

CHANGE FETCH -
    to API URL

IN TERMINAL - 
    type npm run build everytime to push
    type git add .
    type git add -m "(message inserted here)"
    type git push origin master
    type git push Heroku master







