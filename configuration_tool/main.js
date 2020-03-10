// const { spawn } = require('child_process');
// const path = require('path');
// const child_process = require('child_process');
const { app, BrowserWindow, electron } = require('electron');
const { ipcMain } = require('electron');
const { PythonShell } = require('python-shell');

var pyShellOptions = 
{
  mode: 'text',
  pythonPath: 'python',
  scriptPath: '../core/tools/python/scripts/',
  pythonOptions: ['-u']
}



// Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
// chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.

function createWindow () {
  // Creazione della finestra del browser.
  let win = new BrowserWindow({
    width: 1300,
    height: 920,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
  })
  // and load the index.html of the app.
  win.loadFile('./dist/index.html')
  win.webContents.openDevTools()

  // Apre il Pannello degli Strumenti di Sviluppo.
  //win.webContents.openDevTools()

  // Emesso quando la finestra viene chiusa.
  win.on('closed', () => {
    // Eliminiamo il riferimento dell'oggetto window;  solitamente si tiene traccia delle finestre
    // in array se l'applicazione supporta più finestre, questo è il momento in cui 
    // si dovrebbe eliminare l'elemento corrispondente.
    win = null
  })
  win.removeMenu()
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on('ready', createWindow)

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on('window-all-closed', () => {
  // Su macOS è comune che l'applicazione e la barra menù 
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (win === null) {
    createWindow()
  }
})




/**
 * Chiamata dal processo di rendering, carica i Fuse bit nel microcontrollore
 */
ipcMain.on('burn-fuses', (event, arg) => {
  console.log(arg);
  PythonShell.run('hello.py', pyShellOptions, (err, results) => {
    if (err) throw err;
    console.log('results: %j', results);
  })
});