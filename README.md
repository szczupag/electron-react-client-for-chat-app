# Minimal Electron + React chat app client
Computer Networks project

In collaboration with [moscicky](https://github.com/moscicky/)

Server for our chat app is [here](https://github.com/moscicky/computer-networks-gg)

## Technologies
Server: C/C++ with API BSD Sockets

Client: Electron with React

### To get started:
* Get source code `git clone https://github.com/szczupag/electron-react-client-for-chat-app`
* Run `npm install`
* Run `npm run dev` to start webpack-dev-server. Electron will launch automatically after compilation.

### Server:
* `git clone https://github.com/moscicky/computer-networks-gg`
* `cd gg-server`
* `g++ -pthread main.cpp -o server -std=c++11 -Wall`
* `./server [host] [port]`

#### You can test client without our server:
* Run `nc -l [port] [host]`

## Communication protocol:
* `200;username` `NEW_USER`
* `300;username` `USER_LEFT`
* `400;message` `MESSAGE_RECEIVED`
* `500;username1;username2...` `USERS_LIST`
* `600;` `SERVER_DISCONNECTED`
