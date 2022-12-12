# Technical Test: Senior
This project is a template base clean code project created for a technical test by RAKOTONDRASOA Nirilala.
# Documentation
Documentation: OpenAPI Documentation is served on /api endpoint
# Versions

Node 16+

# Note

Before starting the project, create .env.local and .env files

## .env.local example
```
# Server Variables
APP_PORT = 8080
APP_DATABASE = mongodb://root:technical-test@127.0.0.1:27020/my-database?authSource=admin&readPreference=primary&ssl=false
```

## if you use docker you must need .env
```
# Database Variables
MONGODB_USER = root
MONGODB_PASSWORD = technical-test
MONGODB_LOCAL_PORT = 27020

# Server Variables
EXPOSED_PORT = 8080
APP_DATABASE = mongodb://root:technical-test@database:27017/app-database-docker?authSource=admin&readPreference=primary&ssl=false
API_KEY = {API-KEY}
BASE_URI = https://api.airvisual.com
```
## Install Packages

``` bash
# With npm
npm install
# Or With yarn
yarn install
```
## Commands
``` bash
# start on development
npm run dev 
# start tests
npm run test 
# build the project
npm run build
# start on production (requires a build)
npm run start:local
```
## Docker
``` bash
docker-compose up app
```
