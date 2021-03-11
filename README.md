# PokeAPI

REST Api created for fetching data from `https://pokeapi.co/`.


## How It Works
During the registration process the app draws one pokemon from `https://pokeapi.co/` and assigns to your account. You can get information about your pokemon using `pokemon/me` endpoint: 
- id
- name
- weight

You can also get information about any pokemon using endpoint `pokemon/:id`

## Technologies
  - Node.js + Express + TypeScript 
  - MongoDB 
  - Redis (session storage)
  - Docker
  - PM2

## Prerequisites
- `docker` and `docker-compose`

## Setup
1. Download repository
2. Provide `.env` file for `api` based on `.env.api.example` file
3. Provide `.env` file for `docker` based on `.env.docker.example` file
5. Run `npm run up` from main directory
7. To stop app run `npm run down` from main directory

*Notice that, `.env.api.example` and `.env.docker.example` contains a valid configuration, so you can just simply rename these files to `.env` and everything will work.*

## API

Method    | URI                         | Middleware        | Description
:-------- | :----------------           | :---------        | :---------
GET       | /                           | -                 | home
POST      | /user/register              | guest             | registration
POST      | /user/login                 | guest             | login
POST      | /user/logout                | auth              | logout
GET       | /pokemon/me                 | auth              | fetching information about your pokemon
GET       | /pokemon/{id}               | auth              | fetching information about the pokemon


## Predefined user
You can use the predefined user to test this application.
  - `email` : test@pokeapi.com
  - `password` : Test123$

## Postman
Using `Postman` for sending requests is highly recommended. You can find the postman config file in the `postman` directory.

## CURL
Detailed request config when using curl:

#### HOME
```sh
curl localhost:3000/
```

```sh
curl localhost:3000/ --cookie \
'sid=...'
```

#### REGISTER
```sh
curl -v -X POST localhost:3000/user/register -H 'Content-Type: application/json' -d \
'{"name":"test", "email":"lucas@test.com","password":"Password123","passwordConfirmation":"Password123"}'
```

#### LOGIN
```sh
curl -v -X POST localhost:3000/user/login -H 'Content-Type: application/json' -d \
'{"email":"lucas@test.com","password":"Password123"}'
```

#### LOGOUT
```sh
curl -X POST localhost:3000/user/logout --cookie \
'sid=...'
```
#### POKEMON
```sh
curl localhost:3000/pokemon/me --cookie \
'sid=...'
```

```sh
curl localhost:3000/pokemon/{id} --cookie \
'sid=...'
```

## INCOMING DATA FORMAT

#### POKEMON
```js
id: number
name: string
weight: number
```


## Security
Passwords are hashed with bcryptjs (12 char salt)