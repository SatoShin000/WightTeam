//--------------------------------------
// モジュール読み込み
//--------------------------------------
const port = 3000;							//自分のポート番号に変更
const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
let express = require('express');

//--------------------------------------
// Webサーバ
//--------------------------------------
/**
 * ベースとなるHTMLを返却
 */
app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/wight.html');
});

app.use('/Res', express.static(__dirname + '/Res'));

http.listen(port, ()=>{
	console.log(`listening on *:${port}`);
});

//--------------------------------------
// Socket.io
//--------------------------------------
let playernum = 0;
io.on('connection', (socket)=>{
console.log('a user connected');

  //emitで送る
	//onはイベントを受けと取る
  socket.on('join',function(req){
    socket.join(req);
		if(playernum ==2){
		playernum = 0;
		}
		playernum++;
		socket.emit('playerNums', playernum);
		console.log('join'+playernum);
  });

	//socket.on('gamedate',function(req){
    //socket.emit('senddate', req);
		//console.log('senddate');
  //});
});

//--------------------------------------
// 共通関数
//--------------------------------------
function makeResponse(res, status, value=[]){
	let now = new Date();

	res.header('Content-type', 'application/json');
	res.send(JSON.stringify(
		{
			  'head':{'status':status, 'time':now.getTime()}
			, 'body': value
		}
	));
}
