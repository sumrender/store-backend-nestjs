## Description

Ecommerce backend using [Nest](https://github.com/nestjs/nest) framework.

If you like this project, and are in need of a software engineer, hit me up at sumrenders@gmail.com

## Important Note

`Resolve all comments before production`
`Remove all console logs that are not needed`

## env variables

```
PORT=4000
DB_URL='mongodb://127.0.0.1:27017/ecom'
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION='6000000s'
FAST2SMS_AUTH='your auth key'
RAZORPAY_KEY='razorpay key'
RAZORPAY_SECRET='razorpay secret'

```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
