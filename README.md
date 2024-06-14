# Node - Typescript - Express & MongoDB API Tutorial

This is a simple API tutorial project that uses Node.js, Express, MongoDB and Typescript. It includes CRUD operations for items.

## Run Locally

Clone the project

```bash
  git clone https://github.com/eyupucmaz/tutorial-api.git
```

Go to the project directory

```bash
  cd tutorial-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

#### Get all items

```http
  GET /items/all
```

#### Get item

```http
  GET /item/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create item

```http
  POST /item
```

| Body | Type     | Description                                  |
| :-------- | :------- | :-------------------------------------- |
| `title`   | `string` | **Required**. Name of item |
| `content`      | `string` | **Required**. Description of item |
| `author` | `string` | **Required**. Author of item |

#### Delete item

```http
  DELETE /item?id={id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |


# Live Demo

The project is deployed on render.com. You can access it via the following link: [Tutorial API](https://node-ts-tutorial-api.onrender.com/)


## Authors

- [@eyupucmaz](https://www.github.com/eyupucmaz)