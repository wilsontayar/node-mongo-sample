# node-mongo-sample
Just dockerized node app using mongodb as another linked container

# usage

first build your container
```bash
docker build -t you/node-mongo-sample .
```
then, download mongodb and use the name "mongo" in it to make things (even more) easier
```bash
docker run mongo --name mongo
```
call this app's container linking the "mongo" container's ip to the name "mongo" on your app's network mapping
```bash
docker run -d -p 3000:<your_open_port> --name node-mongo-sample --link mongo:mongo you/node-mongo-sample
```
