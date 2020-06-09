# Team-Incredible-BE

This is the Backend Task

## Getting Started


After cloning the repo and cd to the root directory

```
$ yarn install
```

#### Node server
```
$ yarn start
Listening on [::]:3000
```

point your brower to `localhost:3000`

### Curl the Login API
make sure you cd in the root dir to locate testLogin.json file

Test the create api
```
curl -X POST -H "Content-Type: application/json" -d @testLogin.json http://localhost:6000/api/v1/login/

{"message":"Success","Token":"deb49c38-484b-4a96-a4ea-21c1eab20a2d","found":true}
```

### Postman Test Result (LOGIN)
![login result](https://res.cloudinary.com/olanetsoft/image/upload/v1591710366/postmanimage.png)

##TODO check for registration route
