//導入WebSocket模組
var WebSocket = require('ws');

//引用Server類
var WebSocketServer = WebSocket.Server;

const ping = (ws) => {
  // do some
  // console.dir(ws, {depth: null, colors: true})
}

//建立實體(實例化)
var wss = new WebSocketServer({
  port: 5001,
});

//當偵聽到連結建立時，執行動作
wss.on('connection', function(ws) {
  console.log('Connected!');

  //當偵測收到訊息時，執行動作
  ws.on('message', function(message) {
    console.log('Receieve:' + message);
  });

  setTimeout(function () {
    ws.send(JSON.stringify({
      type:'GetWinningNumber',
      data: require('./.mock/getWinningNumber.json')
    }));
  }, 1000);

});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
      // ws.ping(() => { ping(ws) });
  })
}, 1000)