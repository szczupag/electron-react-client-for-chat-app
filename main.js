'use strict';

const constants = require('./src/constants');

// Import parts of electron to use
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: constants.WINDOW_WIDTH, height: constants.WINDOW_HEIGHT, show: false, icon: path.join(__dirname, '/src/assets/img/hmmm.png')
  });

  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:4000',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL( indexPath );

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    // if ( dev ) {
      // mainWindow.webContents.openDevTools();
    // }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  // }
  app.quit();
  process.exit();

});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

var net = require('net');
var HOST = constants.HOST;
var PORT = constants.PORT;
var client = new net.Socket(); 

var opts;
var player = require('play-sound')(opts={});
// var loginMusic = player.play('./src/assets/menu.m4a',function(err){
//   if (err && !err.killed) throw err
// });

client.on('data', function(data) {
  console.log('[DATA FROM SERVER]' + data);
  var strData = data+'';
  var messageType = strData.split(";");
  switch (messageType[0]){
      case constants.NEW_USER_CODE:
          mainWindow.send(constants.NEW_USER,data);
          player.play('./src/assets/online.m4a', function(err){
            if (err) throw err
          })
          break;
      case constants.USER_LEFT_CODE:
          mainWindow.send(constants.USER_LEFT, data);
          player.play('./src/assets/online.m4a', function(err){
            if (err) throw err
          })
          break;
      case constants.MESSAGE_RECEIVED_CODE:
          mainWindow.send(constants.MESSAGE_RECEIVED,data);
          console.log('[MESSAGE RECEIVED]',data+'');
          player.play('./src/assets/gg.m4a', function(err){
            if (err) throw err
          })
          break;
      case constants.USERS_LIST_CODE:
          mainWindow.send(constants.USERS_LIST,data);
          break;
      case constants.SERVER_DISCONNECTED_CODE:
          mainWindow.send(constants.SERVER_DISCONNECTED);
          console.log('[SERVER DISCONNECTED]');
          break;
      default:
        console.log("Message from server undefined");
        break;
  }
});

ipcMain.on(constants.CONNECT,(event,arg)=>{
  var con = client.connect(arg.port, arg.host, function() {
    mainWindow.send(constants.SERVER_CONNECTED);
    console.log('[CONNECTED TO]' + arg.host + ':' + arg.port);
  });
  con.on('error', function(){
    mainWindow.send(constants.SERVER_CONNECTION_FAILURE);
  });
})

ipcMain.on(constants.SUBMIT_USERNAME,(event,arg)=>{
  client.write(arg);
  // loginMusic.kill();
})

ipcMain.on(constants.WRITE_MESSAGE,(event,arg)=>{
  client.write(arg);
  console.log(arg+'');
})

process.on('uncaughtException', function (error) {
  console.log("[ERROR]",error)
})
