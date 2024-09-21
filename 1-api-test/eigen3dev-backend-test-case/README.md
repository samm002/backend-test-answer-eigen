# Backend Test Case by eigen3dev - Eigen Dev (API TEST)

## Description

Created with Nest Js + Postgresql + Prisma

<br>

# Configuration

## Create .env file from .env-example

```bash
$ rename .env-example become .env
```

## Run Development Database (Postgresql)

```bash
$ docker compose up -d eigen3dev-dev-db
```

## Package Installation & Setup prisma migration

```bash
# install project packages
$ npm install

# deploy prisma migration & generate (development)
$ npm run prisma-dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test (Not implemented)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Main endpoint
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/books` | Shows all existing books and quantities (Books that are being borrowed are not counted) |
| `GET` | `/members` | Shows all existing members + The number of books being borrowed by each member |

## Additional endpoint
| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `members/{memberCode}/borrow/{bookCode}` | Member with `memberCode` borrow book with `bookCode` |
| `POST` | `members/{memberCode}/return/{bookCode}` | Member with `memberCode` return book with `bookCode` |
| `GET` | `/books/{bookCode}` | Show book by code |
| `POST` | `/books` | Create new book |
| `PATCH` | `/books/{bookCode}` | Update existing book by code |
| `POST` | `/books/{bookCode}` | Delete existing book by code |
| `GET` | `/members/{memberCode}` | Show member by code |
| `POST` | `/members` | Create new member |
| `PATCH` | `/members/{memberCode}` | Update existing member by code |
| `POST` | `/members/{memberCode}` | Delete existing member by code |
| `GET` | `/borrows/{memberCode}/{bookCode}` | Show all borrow history based on `memberCode` and `bookCode` |

# Instruction

## Entities

- Member
- Book

## Use Case

- Members can borrow books with conditions
  - [x] Members may not borrow more than 2 books
  - [x] Borrowed books are not borrowed by other members
  - [x] Member is currently not being penalized
- Member returns the book with conditions
  - [x] The returned book is a book that the member has borrowed
  - [x] If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
- Check the book
  - [x] Shows all existing books and quantities
  - [x] Books that are being borrowed are not counted
- Member check
  - [x] Shows all existing members
  - [x] The number of books being borrowed by each member

## Mock Data

- Books

```tsx
[
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];
```

- Members

```tsx
[
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
  },
];
```

## Requirements

- [x] it should be use any framework, but prefered [NestJS](https://nestjs.com/) Framework Or [ExpressJS](https://expressjs.com/) -> NestJs
- [x] it should be use Swagger as API Documentation -> navigate to /api
- [x] it should be use Database (SQL/NoSQL) -> Postgresql
- [x] it should be open sourced on your github repo

## Extras

- [x] Implement [DDD Pattern](<[https://khalilstemmler.com/articles/categories/domain-driven-design/](https://khalilstemmler.com/articles/categories/domain-driven-design/)>)
- [ ] Implement Unit Testing

## Notes

- Feel free to add some structure or plugins
