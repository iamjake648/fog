var command = require('child_process').spawn('bash');

command.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

command.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});

function createNewWallet(walletName, password){
  child = spawn ('./simplewallet', ['--generate-new-wallet', walletName, '--password', password]);
  child.stdin.write("0\n");
  child.stdin.write("help\n");
  child.stdout.on('data', (data) => {
    var text = `${data}`;
    console.log(text);
    //console.log(`stdout: ${data}`);
  });
}

function commandTest(){
    console.log('Sending stdin to terminal');
    command.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
    command.stdin.write('uptime\n');
    console.log('Ending terminal session');
    //command.stdin.end();

}

function parseWalletAddress(){

}

function parseWalletWords(){

}

$(document).ready(function(){
  $("#createNewWallet").click(function(){
    var walletName = $("#walletName").val();
    var password = $("#password").val();
    createNewWallet(walletName, password);
  });
});
