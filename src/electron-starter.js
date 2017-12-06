const electron = require('electron')
const { OAuth2Provider } = require('electron-oauth-helper')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1900,
    height: 1080,
    webPreferences: {
      experimentalFeatures: true,
      session: true,
    },
  })
  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  // mainWindow.setMenu(null)

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
const config = {
  client_id: 'f880e12697f24d8690fe20f1f04fc98b',
  client_secret: 'e827af8d991c475ba80d481b8534078c',
  redirect_uri: 'http://localhost:3000',
  authorize_url: 'https://accounts.spotify.com/authorize',
  response_type: 'token',
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
app.on('ready', () => {
  createWindow()

  const provider = new OAuth2Provider(config)
  provider
    .perform()
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
