var command = require('child_process').spawn('bash');
const storage = require('electron-json-storage');
var Cryptr = require('cryptr');

command.stdout.on('data', function (data) {
    parseConsoleOutput(data);
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
  console.log("\n-----------------------------------------------------\n" + data);
  var dataAsString = data.toString();
  if (dataAsString.indexOf('Generated new wallet:') != -1){
    var walletKey = dataAsString.substring(dataAsString.indexOf('Generated new wallet:') + 22, dataAsString.indexOf('View key:')-1);
    sessionStorage.setItem("walletAddress", walletKey);
  }
  if (dataAsString.indexOf('PLEASE NOTE: the following 25 words') != -1){
    var limitedString = dataAsString.substring(dataAsString.indexOf('PLEASE NOTE: the following 25 words'), dataAsString.length);
    var paragraphs = dataAsString.split("\n");
    var wordsStartIndex = 0;
    for (i = 0; i < paragraphs.length; i++){
      if (paragraphs[i].indexOf('PLEASE NOTE: the following 25 words') != -1){
        wordsStartIndex = i + 2;
      }
    }
    var walletWords = paragraphs[wordsStartIndex] + paragraphs[wordsStartIndex + 1] + paragraphs[wordsStartIndex + 2];
    showWarningMessage('Write down your wallet words, they will not appear agagin!', walletWords, 'I have written them down.');
  }
}

function showWarningMessage(title,text,confirmText){
  swal({
    title: title,
    text: text,
    type: "warning",
    confirmButtonText: confirmText,
    confirmButtonColor: "#DD6B55",
    closeOnConfirm: true },
    function(){
      //Go to homepage
    });
}

function saveNewWallet(walletName, password, address, viewkey){
  var wallets = [];
  var walletObject = new Object();
  cryptr = new Cryptr(password);
  walletObject.name = walletName;
  walletObject.password = cryptr.encrypt(password);
  walletObject.address = address;
  walletObject.viewKey = viewKey;

  storage.get('wallets', function(error, data){
    if (data != null){
      wallets = data;
    }
    wallets.push(walletObject);
    storage.set('wallets', wallets, function (error){
      if (error) throw error;
    });
  });
}

$(document).ready(function(){
  $("#createNewWallet").click(function(){
    console.log('here');
    var walletName = $("#newWalletName").val();
    var password = $("#newWalletPassword").val();
    createNewWallet(walletName, password);
  });
});
