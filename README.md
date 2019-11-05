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

| Path                                      | Method | Description                                       | Body JSON fields                                                     | Authentication Required |
| ----------------------------------------- | :----: | ------------------------------------------------- | -------------------------------------------------------------------- | ----------------------- |
| /sessions                                 |  POST  | Creates a new session (generates a token)         | email: string, password: string                                      | No                      |
| /users                                    |  POST  | Creates a new user                                | name: string, email: string, password: string, provider: boolean     | No                      |
| /users                                    |  PUT   | Updates an user                                   | name: string, email: string, [password: string], [provider: boolean] | yes                     |
| /providers                                |  GET   | Gets all providers users                          | N/A                                                                  | yes                     |
| /providers/:id/available?date=<unix_date> |  GET   | Gets all schedule of the provider at the date     | N/A                                                                  | yes                     |
| /files                                    |  POST  | Uploads a file                                    | file: file                                                           | yes                     |
| /appointments[?page=<integer>]            |  GET   | Gets all appointments of the logged user          | N/A                                                                  | yes                     |
| /appointments                             |  POST  | Creates an appointment                            | provider_id: integer, date: date                                     | yes                     |
| /appointments/:id                         | DELETE | Cancels an appointment                            | N/A                                                                  | yes                     |
| /schedules?date=<date>                    |  GET   | Gets all schedules of the logged provider by date | N/A                                                                  | yes                     |
| /notifications                            |  GET   | Gets all notifications of the logged provider     | N/A                                                                  | yes                     |
| /notifications/:id                        |  PUT   | Marks provider notification as read by id         | N/A                                                                  | yes                     |
