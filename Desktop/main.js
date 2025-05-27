const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const packageJson = require('./package.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, 'icons', 'hashnow-64.png'),
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadFile('index.html');

  // --- Start of Help Menu Addition ---
  const menuTemplate = [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About HashNow',
          click() {
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'About HashNow',
              message: 'HashNow Desktop',
              detail: `Version: ${app.getVersion()}\nAuthor: ${packageJson.author || 'Avijit Roy'}\nCopyright © 2025 ${packageJson.author || 'Avijit Roy'}\n\nBuilt with Electron v${process.versions.electron}\nNode.js v${process.versions.node}`
            });
          }
        },
        {
          label: 'Visit Project Website',
          click() {
            shell.openExternal('https://github.com/arkabyo/HashNow/');
          }
        },
        { type: 'separator' },
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://avijitroy.com');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});