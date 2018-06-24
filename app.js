// txhash； 346fdcf4c1cd2ee8d0d26d3514652b44609b1f5a5486844006283699fcb8c08a
// n1ibjQU2Z9RbB578tFkRe1ZkUw6Hg3Av9As
// txhash: cec39a6270922c6e9e4d77752ed7de9eb9c7d5d0e251beb352fbfbfcd92b7ef5
// n1ypd7qGoqsmxeNsnj6r736TmpJQUxbLWa6
/**
* 从所有城市列表中获取北京信息
* 结果格式
* {
*     keyword: 'beijing',
*     name: '北京',
*     citycode: '131'
* }
*/
'use strict';
var _g        = {};
_g.contract   = {};
_g.state      = {};
_g.wallet     = {};
_g.transaction= {};
_g.comments = [];

// state
_g.state.isDebugging= false;        // use to sign now is main/test
_g.state.citycode   = 0;
_g.state.subwayname = '';
// contract
_g.contract.mainnetUrl = 'https://mainnet.nebulas.io';
_g.contract.testnetUrl = 'https://testnet.nebulas.io';
//_g.contract.address = _g.state.isDebugging? 'n1hTwLNGJxvgwGoSY9aenvcgNoyMgP9R96H': 'n1hTwLNGJxvgwGoSY9aenvcgNoyMgP9R96H'; 
_g.contract.address = _g.state.isDebugging? 'n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc': 'n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc'; 
// wallet
_g.wallet.address     = '';   // address read from wallet/walletExtension  
_g.wallet.balance     = -1;   // balance read from wallet/walletExtension
_g.wallet.type        = 87;   // 0-illegality, 87-user wallet, 88-contract wallet
_g.wallet.plugInExist = false;// if walletExtension exist
// transaction


var nebulas = require('nebulas');
var Account = nebulas.Account;
var Neb = new nebulas.Neb();
Neb.setRequest(new nebulas.HttpRequest(_g.state.isDebugging? _g.contract.testnetUrl: _g.contract.mainnetUrl));
var NebPay = require('nebpay');
var nebPay = new NebPay();

function compareGoodCount (obj1, obj2) {
  var val1 = obj1.goodcount;
  var val2 = obj2.goodcount;
  if (val1 < val2) {
    return 1;
  } else if (val1 < val2) {
    return -1;
  } else {
    return 0
  }
}

// 3 2 1 0
function getCityData() {
  if (Neb.api) {

    Neb.api.call({
      from: _g.wallet.address? _g.wallet.address: _g.contract.address,
      to:   _g.contract.address,
      value: 0,
      contract: {
        function: 'getUserInfo',
        args: ""
      },
      gasPrice: 1000000,
      gasLimit: 2000000
    }).then(function (data) {
      console.log('data', data);
      _g.comments = JSON.parse(data.result);
      console.log('_g.comments：', _g.comments);
      return _g.comments;
    });
  }
}

function getGameInfoList() {
  if (Neb.api) {

    Neb.api.call({
      from: _g.wallet.address? _g.wallet.address: _g.contract.address,
      to:   _g.contract.address,
      value: 0,
      contract: {
        function: 'getGameInfoList',
        args: "[50,0]"
      },
      gasPrice: 1000000,
      gasLimit: 2000000
    }).then(function (data) {
      console.log('data', data);
      _g.comments = JSON.parse(data.result);
      console.log('_g.comments：', _g.comments);
      return _g.comments;
    });
  }
}

function getGameInfo() {
  if (Neb.api) {

    Neb.api.call({
      from: _g.wallet.address? _g.wallet.address: _g.contract.address,
      to:   _g.contract.address,
      value: 0,
      contract: {
        function: 'getGameInfo',
        args: "[\"n1kgQeum3BTLJAsqn78DHDQAdyWSd1dBXWA\"]"
      },
      gasPrice: 1000000,
      gasLimit: 2000000
    }).then(function (data) {
      console.log('data', data);
      _g.comments = JSON.parse(data.result);
      console.log('_g.comments：', _g.comments);
      return _g.comments;
    });
  }
}

function submitComment () {
  console.log(document.getElementById('mycomment').value);
  var comment = document.getElementById('mycomment').value + '';
  submitMethod('0', 'save', JSON.stringify([_g.state.citycode, _g.state.subwayname, comment]), 'subway comment');
}

function submitEvaluate () {
  var user = {};
  user.nickname = "wang";
  user.sex = 1;
  console.log(JSON.stringify([user]));
  submitMethod('0', 'createUser', JSON.stringify([user]), 'comment evaluate');
}

function updateUser () {
  var user = {};
  user.nickname = "wang1";
  user.sex = 1;
  user.phone = "15918790458";
  console.log(JSON.stringify([user]));
  submitMethod('0', 'updateUser', JSON.stringify([user]), 'comment evaluate');
}

function createGame () {
  var game = {};
  game.g_name = "NBA2K";
  game.g_address = "n1kgQeum4TTLJAsqn7U8HDQAdyWSd1dBXWA";
  game.g_imgurl_mini = "http://172.16.52.19:8080/ipfs/QmQn1KvhEocHjFTpzQw6WaTXRE8P3puJ8etvj2kA4BdfU8"
  console.log(JSON.stringify([game]));
  submitMethod('0', 'createGame', JSON.stringify([game]), 'comment evaluate');
}

function addMomentInfo () {
  var game = {};
  game.g_name = "game1";
  game.g_address = "";
  console.log(JSON.stringify([game]));
  submitMethod('0', 'addMomentInfo', JSON.stringify([game]), 'comment evaluate');
}

function addFriendforUser () {

  submitMethod('0', 'addFriendforUser', JSON.stringify(["n1Q6DPSbLjGVArrJGwrVFfQoXbbEwc7u4Fu"]), 'comment evaluate');
}

function login () {

  submitMethod('0', 'getUserInfo', JSON.stringify([]), 'comment evaluate');
}

function updateToDev () {

  submitMethod('0', 'updateToDev', JSON.stringify([]), 'comment evaluate');
}

function addGameforUser () {

  submitMethod('0', 'addGameforUser', JSON.stringify(["n1kgQeum4TTLJAsqn7U8HD7YdyWSd1dBXWA"]), 'comment evaluate');
}


function submitMethod (value, callFunc, callArgs, goodsName) {
  var listenCount = 0;
  var hashCount   = 0;
  var to = _g.contract.address;
  var options = {
    goods : { name: goodsName },
    callback: _g.state.isDebugging? NebPay.config.testnetUrl: NebPay.config.mainnetUrl
  };
  var serialNum = nebPay.call(to, value, callFunc, callArgs, options);
  console.log('serialNum:', serialNum);
  var intervalQuery = setInterval(function() {
    nebPay.queryPayInfo(serialNum, options)
      .then(function (dataStr) {
        if (listenCount < 8) {
          var data = JSON.parse(dataStr);
          console.log('data:', data);
          if (data.code === 0) {    // data.code为0即serialNum已确认，可以换hash继续查或者继续等待data.data.status为1
            if (data.data.status === 1) {
              getCityData(_g.state.citycode);
              clearInterval(intervalQuery);
            } else {
              console.log('get transaction txhash， wait for writing to NEBULAS by txhash.');
              // TODO: SHOW ('提交成功，正在写入星云链.')
              // TODO: 隐藏评论框 after 2s
              if (callFunc === 'save') {
                document.getElementById('commentNow').innerHTML = '提交成功，正在写入星云链.';
              } else {
                document.getElementById('commentNow').innerHTML = '投票成功，正在写入星云链.';
              }
              setTimeout(function () {
                clearInterval(intervalQuery);
                console.log('data.data:', data.data);
                hashListener(data.data.hash);
                subway.closeInfoWindow();
              }, 2000);
            }
          } else {
            console.log("data.msg.indexOf('does not exist')", data.msg.indexOf('does not exist'));
            console.log('listenCount:', listenCount);
            if (_g.transaction.isReject) {
              alert('提交请求已取消');
              _g.transaction.isReject = false;
              setTimeout(function () {
                clearInterval(intervalQuery);
              }, 5000);
            }
            if (data.msg.indexOf('does not exist') !== -1 && listenCount>4) {
              console.log('can\'t recognize state of transaction, so go to guide page.');
              setTimeout(function () {
                clearInterval(intervalQuery);
              }, 5000);
            }
          }
          listenCount++;
        } else {
          console.log('网络连接超时, 五秒后自动刷新网页');
          clearInterval(intervalQuery);
          setTimeout(function () {
            window.location.reload(); 
          }, 5000);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, 10000); 
  var hashListener = function (txhash) {
    if (hashCount < 8) {
      Neb.api.getTransactionReceipt({
        hash: txhash
      }).then (function (response) { // status: 2(pending) 1(success)
        console.log('response:', response); 
        if (response.status === 1) {
          console.log('write to NEBULAS success!');
          if (callFunc === 'save') {
            alert('评论写入星云链成功!');
          }
          getCityData(_g.state.citycode);
        } else {
          hashCount++;
          setTimeout(() => {
            hashListener(txhash);
          }, 5000);
        }
      });
    } else {
      console.log('write to NEBULAS timeout');
      // alert('星云链查询超时');
    }
  }
}

function detectWallet () {
  _g.wallet.plugInExist = typeof(webExtensionWallet) !== 'undefined'? true: false;
  if (!_g.wallet.plugInExist) {
    console.error('wallet no exist');
  }  _g.wallet.plugInExist = typeof(webExtensionWallet) !== 'undefined'? true: false;
}


// start
detectWallet();
window.postMessage({
  'target': 'contentscript',
  'data': {},
  'method': 'getAccount'
}, '*');
window.addEventListener('message', function (e) {
  console.log('e:', e);
  if (e.data) {
    if (e.data.data && e.data.data.account) {
      _g.wallet.address = e.data.data.account;
      console.log('_g.wallet.address:', _g.wallet.address);
    } else if (e.data.src === 'content' && e.data.resp === 'Error: Transaction rejected by user') {
      var key = e.data.serialNumber;
      var resp= e.data.resp;  // "Error: Transaction rejected by user"
      _g.transaction.isReject = true;
      setTimeout(function () {
        _g.transaction.isReject = false;
      }, 20000);
    } else {
      // ???
    }
  }
});


// var subwayCityName = '广州';
var code = window.location.search.substr(1).replace('code=', '');
console.log('code:', code);
var list = BMapSub.SubwayCitiesList;
console.log('list:', list);
var subwaycity = null;
for (var i = 0; i < list.length; i++) {
  if (list[i].citycode === code) {
    subwaycity = list[i];
    document.title = '星云地铁站评论-' + subwaycity.name;
    document.getElementById('header-title').innerText = '星云地铁站评论-' + subwaycity.name;
    _g.state.citycode = subwaycity.citycode;
    setTimeout(() => {
      getCityData(subwaycity.citycode);
    }, 1000);
    break;
  }
}
// get subway data & init subwayMap
var subway = new BMapSub.Subway('container', subwaycity.citycode);
var zoomControl = new BMapSub.ZoomControl({
  anchor: BMAPSUB_ANCHOR_BOTTOM_RIGHT,
  offset: new BMapSub.Size(10, 100)
});
subway.addControl(zoomControl);
subway.setZoom(0.5);

subway.addEventListener('tap', function (e) {
  _g.state.subwayname = e.station.name;
  var dataOfThisSubway = '';
  if (_g.comments.length > 0) {
    // sort
    _g.comments.sort(compareGoodCount);
    // add to HTML
    for (var i=0; i<_g.comments.length; i++) {
      // console.log(_g.comments[i]);
      if (_g.comments[i].subwayname === _g.state.subwayname) {
        dataOfThisSubway += '<p class="commentItem"><span>' + _g.comments[i].comment + '</span>'
                            + '<a href="javascript:void(0)" onclick="submitEvaluate(\''+ _g.comments[i].key +'\', true)">点赞('
                            + _g.comments[i].goodcount + ')</a>&nbsp;&nbsp;'
                            + '<a href="javascript:void(0)" onclick="submitEvaluate(\''+ _g.comments[i].key +'\', false)">差评('
                            + _g.comments[i].badcount + ')</a>'
                            + '</p>';
      }
    }
  }
  dataOfThisSubway = dataOfThisSubway? dataOfThisSubway: '暂无评论记录，快来成为第一位评论者吧~'
  var windowStr = 
    '<div id="bd-subwayInfo">'
    + '<div id="bd-subwayTitle">'
    + e.station.name
    + '</div>'
    + '<div id="subwayContent">'
    + '<div id="simpleComment">'
    + dataOfThisSubway
    + '</div>'
    + '</div>'
    + '<div id="commentNow">'
    + '<input type="text" id="mycomment"/>'
    + '<button type="button" id="btn_submit" onclick="submitComment()">提交</button>'
    + '</div>'
    + '</div>';
  var infowindow = new BMapSub.InfoWindow(windowStr);
  subway.openInfoWindow(infowindow, e.station.name);
  subway.setCenter(e.station.name);
  subway.setZoom(0.8);
});
subway.addEventListener('subwayloaded', function () {
    console.log('地铁图加载完成');
});

// document.getElementById('container').addEventListener("touchmove", function (e) {
//   console.log("touchmove:", e);
//   e.preventDefault();
// }, true);
// document.getElementById('container').addEventListener("touchend", function (e) {
//   console.log("touchend:", e);

//   console.log('e.target.nodeName.toUpperCase:', e.target.nodeName.toUpperCase());
//   console.log('e.target.className.toUpperCase:', e.target.className.toUpperCase());
//   if (e.target) {
//     if (e.target.className.toUpperCase() === 'COMMENTITEM' || e.path[1].className.toUpperCase() === 'COMMENTITEM') {
//       console.log('enter');
//       // e.target.preventDefault();
//       // return true;
//     }
//   }
// }, true);