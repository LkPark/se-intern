#!/bin/sh

echo '1) Login to Heroku'

heroku login

echo '2) Login to Heroku container'

heroku container:login

echo "3) Create app with name: $HEROKU_APP_NAME"

heroku create $HEROKU_APP_NAME

echo "4) Build container and push on Heroku"

heroku container:push web --app $HEROKU_APP_NAME

echo '5) Open Heroku'

heroku open --app $HEROKU_APP_NAME