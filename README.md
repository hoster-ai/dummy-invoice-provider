  <div style="font-size:25px;text-align:center">PRODUCT SERVICE PROVIDER BOILERPLATE</div>
  <hr>
  
## Installation

```bash
$ npm install
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

# Supported HTTP calls
| Method | Endpoint |
| ------- | ------- |
| GET | [url](http://localhost:3000)/info |
| POST | [url](http://localhost:3000)/invoice |

## .env required
 ```
 #General
 SERVICE_PROVIDER_TOKEN=test
 SERVICE_PROVIDER_API_URL='http://localhost:3000/service-providers/'

 ```

## Authentication
 Provider's token as bearer in headers

 *example*
 ```
 Authorization: Bearer test
 ```

 

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dummy Responses

- OrderId number 
  - if number < 100 - result success true
  - if number between 100-500 result success false
  - If number >500 result success with invoice_pdf url

## Includes

- Swagger (OpenAPI)
- Passport (Authentication)
- Class Validator (Validation)

