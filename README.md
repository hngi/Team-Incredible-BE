# Team-Incredible-BE 

![Node.js CI](https://github.com/hngi/Team-Incredible-BE/workflows/Node.js%20CI/badge.svg?branch=develop)

-   [:notebook_with_decorative_cover: Overview](#notebook_with_decorative_cover-overview)
-   [:gear: Installation and running server (Development)](#gear-installation-and-running-server)
-   [:cloud: API](#cloud-api)
-   [:eight_spoked_asterisk: Docker(Production)](#eight_spoked_asterisk-docker)

## :notebook_with_decorative_cover: Overview
This is a the microdev.api website designed by Team-Incredibles

## :gear: Installation and running server
* Clone the repo to your local machine using your _terminal_ or _command prompt_, and afterwards, navigate into the root folder  
```shell script
$ cd Team-Incredible-BE
```

* Install necessary dependencies for the project to run successfully
```shell script
$ yarn install
```

* After installing, you can now start the server
```shell script
$ yarn start
Listening on port 3000
```

point your browser to ```localhost:3000```

## :cloud: API
Two API's were consumed for the development of this project
* Login API
* Registration API  

To see the test written for these api, run this command in your command line
```shell script
yarn test
```
The test is targeted at the _./test/unit/**_ folder

Test written  

**Login**  

```
 POST api/v1/login
    Signing in with a verified email and password
      ✓ should respond 200
    Signing in with an uverified email and password
      ✓ should respond with 404
``` 

**Signup**

```
Signup Fields Tests
    ✓ it should get the first name
    ✓ it should get the last name
    ✓ it should get the phone number format 1
    ✓ it should get the phone number format 2
    ✓ it should get a valid email
    ✓ password should be 8 chars or more and must contain
      at least 1 lowercase, uppercase, numeric and special characters
    ✓ it should confirm password

  Test the signup page
    Test to check if password mactch
      ✓ should return false if password and confirmpassword don't match
      ✓ should return true if password and confirmpassword don't match
    Test to check the length of string
      ✓ should return false if length of string less than 5
      ✓ should return true if length of string greater than 5
    email should be a valid email
      ✓ should return false if email is invalid
      ✓ should return true if email is valid

POST /api/v1/registration
    ✓ should verify if all fields are entered correctly
    ✓ verify if it sends an error message if first name field is 
      not filled and entered
    ✓ verify if it sends an error message if first name field  
      contains only strings
    ✓ verify if it sends an error message if last name field 
      is not filled and entered
    ✓ verify if it sends an error message if last name field 
      contains only strings
    ✓ verify if it sends an error message if email field is
      not filled and entered
    ✓ verify if it sends an error message if email field is not
      in the right format
    ✓ verify if it sends an error message if phone field
      contains a string
    ✓ verify if it sends an error message if password field is empty
    ✓ verify if it sends an error message if password field does 
      not math confirm password field
    ✓ verify if it sends an error message if password field is weak
    ✓ verify if it sends an error message if all fields are empty
```



```
27 passing ✓
 0 failing x
``` 

##  :eight_spoked_asterisk: Docker
