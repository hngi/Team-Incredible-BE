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

##### Test written  :bulb:

**Login**  :key:

```
    Test the login page
        Test to cheeck if email and password exists
            Signing in with a verified email and password
                ✓ should respond 200
            Signing in with an unerified email and password
            ✓ should respond with 404
``` 

**Signup** :door:

```
  Test the signup page
    Test to check if all fields
      ✓ should verify if all fields are entered correctly
      ✓ verify if it sends an error message if 
        all fields are empty

    Test to check if password mactch
      ✓ should return false if password and 
        confirmpassword don't match
      ✓ should return true if password and 
        confirmpassword don't match
      
    Test to check if password fiels is not empty
      ✓ verify if it sends an error message if 
        password field is empty

    Test to check if email is a valid email
      ✓ should return false if email is invalid
      ✓ should return true if email is valid'

    Test to check if email field is not empty
      ✓ verify if it sends an error message if email field is
        not filled and entered
    
    Test to check if email is not in right format
      ✓ verify if it sends an error message if email field is not
        in the right format
```



##  :eight_spoked_asterisk: Docker
