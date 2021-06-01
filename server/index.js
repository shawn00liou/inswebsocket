//導入WebSocket模組
var WebSocket = require('ws');
var getWinningNumber = require('./.mock/getWinningNumber.json')
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
wss.on('connection', (ws) => {
  const clients = wss.clients;
  let count = 0;
  clients.forEach(client => {
    count++;
  })
  console.log('Connected!',count);
  //當偵測收到訊息時，執行動作
  ws.isAlive = true;
  ws.onmessage = (message) => {
    const res = JSON.parse(message.data);
    if(res && res[0] && res[0][0]) {
      const req = res[0][0];
      console.log(req.url);
      console.log(req.data);
      if(req.url.indexOf('API/Home/GetServerDateTime')!==-1){

      }else if(req.url.indexOf('API/Home/Get')!==-1){
        ws.homeGet = true;
        ws.send(JSON.stringify({
          type:'GetWinningNumber',
          data: getWinningNumber
        }));
      }else if(req.url.indexOf('AddManyBetsAsync')!==-1){
        ws.AddManyBetsAsync = true;
        ws.send(JSON.stringify({
          type:'GetBetDoneReload',
          data: {}
        }));
      }
    } else {
      console.log('Receieve:' + message);
    }
  };

  ws.on('close', () => {
    console.log('Close connected')
  })

  // setInterval(function () {
  //     ws.send(JSON.stringify({
  //       type:'GetWinningNumber',
  //       data: getWinningNumber
  //     }));
  // }, 1000);


  // setInterval(function () {
  //   if(ws.homeGet){
  //     ws.homeGet = false;
  //     ws.send(JSON.stringify({
  //       type:'GetWinningNumber',
  //       data: require('./.mock/getWinningNumber.json')
  //     }));
  //  }

  //   if(ws.AddManyBetsAsync){
  //     ws.AddManyBetsAsync = false;
  //     ws.send(JSON.stringify({
  //       type:'GetBetDoneReload',
  //       data: {}
  //     }));
  //  }
  // }, 1000);
});


const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
      // ws.ping(() => { ping(ws) });
  })
}, 1000)
