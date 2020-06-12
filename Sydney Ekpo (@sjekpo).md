

#### Here's what I did:

* cloned both master and develop branches of the repo to server.

```
    git clone https://github.com/hngi/Team-Incredible-BE.git

```
```
    git clone -b 'develop' https://github.com/hngi/Team-Incredible-BE.git
    
```

* made `run_docker.sh` executable (in the working directory) using:
```
    chmod +x run_docker.sh
```

* added/edited my ports on `run_docker.sh` & `config.js` and exposed same in `Dockerfile` and 
  - executed script `run_docker.sh` to build image and start app
```
   nano run_docker.sh
   nano config.js
   nano Dockerfile
   ./run_docker.sh
 
 ```

* Setup the nginx config to proxy off to  [microapi.dev](https://microapi.dev/) 
  - and [test.microapi.dev](https://test.microapi.dev/)respectively, like so:

```ruby

server {
    if ($host = microapi.dev) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    listen [::]:80;

        location ~* /\.(?:css|js|map|jpe?g|gif|ico|png)$ { }
        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
                proxy_pass http://localhost:8333;
        }
   
    server_name microapi.dev www.microapi.dev;
    return 404;
}

```
* Ran certbox to install ssl cert and redirect HTTP to HTTPS

```
     sudo certbot --nginx -d microapi.dev -d test.microapi.dev
   
```

* Made the nodejs process run continuously(12hours) using crontab so it doesn't stop when user logs off the server.
```
* */2 * * * docker run -p 3000:3000 teamincredible

* */2 * * * docker run -p 6000:6000 test_incredible
```

- Setup autodeploy of both repos using local script to git pull, delete old docker image and build fresh one, 
  - in tandem with a thirdparty provider: [hookdoo.com] (https://hookdoo.com) for the webhook.

```ruby

  #!/bin/sh
  cd `workingDirectory`
  git pull origin master
  docker rmi `dockerimage` -f 
  ./run_docker.sh

```





