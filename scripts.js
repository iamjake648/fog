var command = require('child_process').spawn('bash');
const storage = require('electron-json-storage');
var Cryptr = require('cryptr');

command.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

command.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});

function createNewWallet(walletName, password){
  command.stdin.write('./simplewallet --generate-new-wallet ' + walletName + ' --password ' + password + '\n');
  command.stdin.write('0\n');
  sessionStorage.setItem('walletName', walletName);
  sessionStorage.setItem('walletPassword', password);
}

function parseConsoleOutput(data){
  if (data.indexOf('Generated new wallet:') != -1){
    var walletKey = data.substring(data.indexOf('Generated new wallet:') + 22, data.indexOf('View key:')-1);
    sessionStorage.setItem("walletAddress", walletKey);
  }
  if (data.indexOf('PLEASE NOTE: the following 25 words')){

  }
}

function saveNewWallet(walletName, password, address, viewkey){
  var wallets = [];
  var walletObject = new Object();
  cryptr = new Cryptr(password);
  walletObject.name = walletName;
  walletObject.password = cryptr.encrypt(password);
  walletObject.address = address;
  walletObject.viewKey = viewKey;

  storage.get('wallets', function(error, data)){
    if (data != null){
      wallets = data;
    }
    wallets.push(walletObject);
    storage.set('wallets', wallets, function (error){
      if (error) throw error;
    });
  }
}

$(document).ready(function(){
  $("#createNewWallet").click(function(){
    console.log('here');
    var walletName = $("#newWalletName").val();
    var password = $("#newWalletPassword").val();
    createNewWallet(walletName, password);
  });
});
