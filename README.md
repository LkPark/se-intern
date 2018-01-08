# SE-Intern

## Local Requirements

- git
- docker
- docker-compose
- heroku

## Production deploy on Herokou

1. Login
    ```bash
    heroku login
    ```

1. Login to container
    ```bash
    heroku container:login
    ```

1. Create app
    > If app is created then skip to the next step
    ```bash
    heroku create se-intern
    ```

1. Build container and push
    ```bash
    heroku container:push web --app se-intern
    ```

1. Build container and push
    ```bash
    heroku open --app se-intern
    ```

## Development setup

1. Add __DNS__ to your __hosts__ file
    ```bash
    127.0.0.1   se-intern.localhost
    ```

1. Create custom network __nginx-proxy__

    ```bash
    docker network create nginx-proxy
    ```

1. Run __jwilder/nginx-proxy__ container which binds to our previous network with local port __80__
    > Note: Make sure port 80 is not already used
    ```bash
    docker run -d \
        -p 80:80 \
        -v /var/run/docker.sock:/tmp/docker.sock:ro \
        --name dev-nginx-proxy \
        --net nginx-proxy \
        jwilder/nginx-proxy
    ```

1. Run container
    > Note: To run in daemon mode append `-d` option
    ```bash
    VIRTUAL_HOST=se-intern.localhost PORT=80 docker-compose up
    ```

## Usage

- Validate menu 1 [https://se-intern.herokuapp.com/validate/menu/1](https://se-intern.herokuapp.com/validate/menu/1)
    > https://backend-challenge-summer-2018.herokuapp.com/challenges.json?id=1&page=1
- Validate menu 2 [https://se-intern.herokuapp.com/validate/menu/2](https://se-intern.herokuapp.com/validate/menu/2)
    > https://backend-challenge-summer-2018.herokuapp.com/challenges.json?id=2&page=1