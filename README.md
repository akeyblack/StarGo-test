# Test task
dotenv included on purpose, it's responsible for database configuration in docker-compose and application
<br/><br/>

# Installation


install depedencies

```bash
$ npm install
```

<br/>

## Tests


unit tests

```bash
$ npm run test
```

e2e tests

```bash
$ npm run test:e2e
```
<br/>

## Running the app


run database with

```bash
$ docker-compose up -d
```
or in any other way

<br/>

run applications with
```bash
$ npm start
```
<br/>

## Endpoints

```bash
 /notes/id (GET)
```
```bash
 /notes/my (GET)      /notes/my?completed=(true|false) - filtration
```
```bash
 /notes (POST)
```
```bash
 /notes/id (PATCH)
```
```bash
 /notes/id/mark-as-completed (PATCH)
```
```bash
 /notes/id (DELETE)
```

## Other Info

Implemented protected API <br/>
For user authentification use header "User-Id" with any string id
