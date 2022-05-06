### Recipe-Ingredients
Recipe-Ingredients is website to view recipe and ingredients, which also provides a simple interface input the data via login

Webiste link : https://recipe-ingredient.netlify.app/recipes<br>
Credentials for login to admin panel to add recipes : 
- Username : user
- Password : pass

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
- - Using centralized validation via validation form service and reducer hook
- DataStax Astra account and database
- - Using GraphQL API provided by DataStax Astra
- Netlify account to deploy the app

## ToDo:

- Update reused code to common components
- UI updates
- Validation updates as image only accepts some types.
