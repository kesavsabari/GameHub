# GameHub Store

GameHub Store is a simple full-stack web application for browsing games, adding new games, putting games into a cart, and placing a basic order.

I made this as a student project, so the code is kept simple and easy to follow.

## What the project can do

- show games from the database
- search games by name
- add a new game
- add games to cart
- buy games from the cart
- show purchased games on the orders page

## Tools used

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- MongoDB
- Mongoose

## Project folders

```text
GameHubStore/
├── models/
├── public/
├── routes/
├── package.json
├── requirements.txt
├── README.md
├── seed.js
└── server.js
```

## Before you run it

Make sure you already have these installed:

- Node.js
- npm
- MongoDB Community Server

The app connects to this local MongoDB database:

```text
mongodb://127.0.0.1:27017/gamehubstore
```

## How to run the project

1. Clone or download this repository.
2. Open the project folder in a terminal.
3. Install the packages:

```bash
npm install
```

4. Start MongoDB on your computer.
5. Run the seed file so some sample games are added:

```bash
npm run seed
```

6. Start the server:

```bash
npm start
```

7. Open the project in your browser:

```text
http://localhost:3000
```

## API routes

- `GET /games`
- `POST /games`
- `GET /orders`
- `POST /orders`

## Important notes

- There is no login or signup in this project.
- Payment is only a simple dummy flow.
- Orders are stored in MongoDB.
- Cart data is stored in browser local storage.

## Author

Kesav
