# gobarber

## Backend

### Setup and run

```shell
cd backend
yarn
yarn sequelize db:migrate
yarn dev
```

### Routes

| Path                           | Method | Description                               | Body JSON fields                                                     | Authentication Required |
| ------------------------------ | :----: | ----------------------------------------- | -------------------------------------------------------------------- | ----------------------- |
| /sessions                      |  POST  | Creates a new session (generates a token) | email: string, password: string                                      | No                      |
| /users                         |  POST  | Creates a new user                        | name: string, email: string, password: string, provider: boolean     | No                      |
| /users                         |  PUT   | Updates an user                           | name: string, email: string, [password: string], [provider: boolean] | yes                     |
| /providers                     |  GET   | Gets all providers users                  | N/A                                                                  | yes                     |
| /files                         |  POST  | Uploads a file                            | file: file                                                           | yes                     |
| /appointments[?page=<integer>] |  GET   | Gets all user's appointments              | N/A                                                                  | yes                     |
| /appointments                  |  POST  | Creates an appointment                    | provider_id: integer, date: date                                     | yes                     |
