const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
let mainWindow;

function getResPath(resType, resName) {
    return `file://${__dirname}/UI/${resType}/${resName}`
}

function getFramePath(resName) {
    let locale = app.getLocale();
    let supportedLanguage = ['ko'];
    if (!supportedLanguage.includes(locale)) locale = 'ko';
    return `file://${__dirname}/UI/frame/frame.html?locale=${locale}&resName=${resName}.html`;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 860,
        height: 600,
        'minWidth': 350,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    mainWindow.loadURL(getFramePath());
    mainWindow.setMenu(null);
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});