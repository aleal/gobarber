# gobarber

## Backend

### Setup and run

```shell
cd backend
yarn
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
```

### Routes

| Path          | Method | Description                               | Body JSON fields                                                                  | Authentication Required |
| ------------- | :----: | ----------------------------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| /sessions     |  POST  | Creates a new session (generates a token) | email: string, password: string                                                   | No                      |
| /users        |  POST  | Creates a new user                        | name: string, email: string, password: string, provider: boolean                                     | No                      |
| /users        |  PUT   | Updates an user                           | name: string, email: string, [password: string], [provider:boolean]                                   | yes                     |
