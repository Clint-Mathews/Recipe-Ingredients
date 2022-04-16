### Recipe-Ingredients
Recipe-Ingredients is website to view recipe and ingredients, which also provides a simple interface input the data via login

## TO RUN APP

 ```sh
 To run the application : netlify dev
 ```
 Require .env file with following details:
 - ASTRA_DB_TOKEN : Require to be created once Db is created from DataStax Astra
 - ASTRA_GRAPHQL_ENDPOINT : Since I'm using graphql API calls and functions are already created for each functions folder
 - REACT_APP_USERNAME: Can specify for local, for my running app it is `user`
 - REACT_APP_PASSWORD: Can specify for local, for my running app it is `pass`
## Technical Dependencies:

- React Js
- - Redux toolkit for state management
- - Redux persist to retain states
- - Material UI as UI framework
- DataStax Astra account and database
- - Using GraphQL API provided by DataStax Astra
- Netlify account to deploy the app

