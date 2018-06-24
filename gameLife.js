'use strict';

//用户信息表
var UserInfoContent = function(user){
    var from = Blockchain.transaction.from;
    if (user) {
        var obj = JSON.parse(user);
        this.u_address = from;
        if(obj.nickname && typeof(obj.nickname) != "undefined")
        {
          this.nickname = obj.nickname;
        }else{
          this.nickname = "";
        }

        if(obj.sex && typeof(obj.sex) != "undefined"){
          this.sex = obj.sex;
        }else{
          this.sex = 0;
        }

        if(obj.email && typeof(obj.email) != "undefined"){
          this.email = obj.email;
        }else{
          this.email = "";
        }

        if(obj.phone && typeof(obj.phone) != "undefined"){
          this.phone = obj.phone;
        }else{

          this.phone = "";
        }
        
        if(obj.wechatId && typeof(obj.wechatId) != "undefined"){
          this.wechatId = obj.wechatId;
        }else{
          this.wechatId = "";
        }

        if(obj.avatar && typeof(obj.avatar) != "undefined"){
          this.avatar = obj.avatar; 
        }else{
          this.avatar = "";
        }

        if(obj.desc && typeof(obj.desc) != "undefined"){
          this.desc = obj.desc;
        }else{
          this.desc = "";
        }
        
        if(obj.createdate && typeof(obj.createdate) != "undefined"){
          this.createdate = obj.createdate;
        }else{
          this.createdate = Date.parse(new Date());
        }

        if(obj.logindate && typeof(obj.logindate) != "undefined"){
          this.logindate = obj.logindate;
        }else{
          this.logindate = Date.parse(new Date());
        }

        if(obj.gamelist && typeof(obj.gamelist) != "undefined"){
          this.gamelist = obj.gamelist;
        }else{
          this.gamelist = [];
        }

        if(obj.friendlist && typeof(obj.friendlist) != "undefined"){
          this.friendlist = obj.friendlist;
        }else{
          this.friendlist = [];
        }

        if(obj.momentlist && typeof(obj.momentlist) != "undefined"){
          this.momentlist = obj.momentlist;
        }else{
          this.momentlist = [];
        }

        if(obj.type && typeof(obj.type) != "undefined"){
          this.type = obj.type;
        }else{
          this.type = 0;
        }


      } else {
        this.u_address = from;
        this.nickname = "";
        this.sex = 0;
        this.email = "";
        this.phone = "";
        this.wechatId = "";
        this.avatar = "";
        this.desc = "";
        this.createdate = Date.parse(new Date());
        this.logindate = Date.parse(new Date());
        this.gamelist = [];
        this.friendlist = [];
        this.momentlist = [];
        this.type = 0;
      }
};

UserInfoContent.prototype = {
    toString: function () {
      return JSON.stringify(this);
    }
};

//游戏信息表
var GameInfoContent = function(game){

    if (game) {
        var o = JSON.parse(game);
        if(o.g_address && typeof(o.g_address) != "undefined"){
          this.g_address = o.g_address;
        }else{
          this.g_address = "";
        }

        if(o.u_address && typeof(o.u_address) != "undefined"){
          this.u_address = o.u_address;
        }else{
          this.u_address = "";
        }

        if(o.g_name && typeof(o.g_name) != "undefined"){
          this.g_name = o.g_name;
        }else{
          this.g_name = "";
        }

        if(o.g_imgurl_mini && typeof(o.g_imgurl_mini) != "undefined"){
          this.g_imgurl_mini = o.g_imgurl_mini;
        }else{
          this.g_imgurl_mini = "";
        }

        if(o.g_imgurl_bg && typeof(o.g_imgurl_bg) != "undefined"){
          this.g_imgurl_bg = o.g_imgurl_bg;
        }else{
          this.g_imgurl_bg = "";
        }

        if(o.g_imgurl_exlist && typeof(o.g_imgurl_exlist) != "undefined"){
          this.g_imgurl_exlist = o.g_imgurl_exlist;
        }else{
          this.g_imgurl_exlist = [];
        }

        if(o.websiteurl && typeof(o.websiteurl) != "undefined"){
          this.websiteurl = o.websiteurl;
        }else{
          this.websiteurl = "";
        }

        if(o.starturl && typeof(o.starturl) != "undefined"){
          this.starturl = o.starturl;
        }else{
          this.starturl = "";
        }

        if(o.desc && typeof(o.desc) != "undefined"){
          this.desc = o.desc;
        }else{
          this.desc = "";
        }

        if(o.createdate && typeof(o.createdate) != "undefined"){
          this.createdate = o.createdate;
        }else{
          this.createdate = Date.parse(new Date());
        }

        if(o.commentlist && typeof(o.commentlist) != "undefined"){
          this.commentlist = o.commentlist;
        }else{
          this.commentlist = [];
        }

        if(o.grade && typeof(o.grade) != "undefined"){
          this.grade = o.grade;
        }else{
          this.grade = 0;
        }

      } else {
        this.g_address = "";
        this.g_name = "";
        this.g_imgurl_mini = "";
        this.g_imgurl_bg = "";
        this.g_imgurl_exlist = [];
        this.websiteurl = "";
        this.starturl = "";
        this.desc = "";
        this.createdate = 0;
        this.commentlist = [];
        this.grade = 0;
      }
};

GameInfoContent.prototype = {
    toString: function () {
      return JSON.stringify(this);
    }
};

//活动信息表
var ActivityContent = function(activity){
  if(activity){
    var o = JSON.parse(activity);
    this.start_date = o.start_date;
    this.end_date = o.end_date;
    this.ranking = o.ranking;
    this.desc = o.desc;
    this.money = o.money;
  }else{
    this.start_date = 0;
    this.end_date = 0;
    this.ranking = 0;
    this.desc = "";
    this.money = 0;
  }
};

ActivityContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};





var GameLifeContract = function(){
  
  LocalContractStorage.defineMapProperty(this, "userInfo", {
    parse: function (text) {
      return new UserInfoContent(text);
    },
    stringify: function (o) {
      return JSON.stringify(o);
    }
  });
  LocalContractStorage.defineMapProperty(this, "arrayUserMap");
  LocalContractStorage.defineProperty(this, "userSize");

  LocalContractStorage.defineMapProperty(this, "gameInfo", {
    parse: function (text) {
      return new GameInfoContent(text);
    },
    stringify: function (o) {
      return JSON.stringify(o);
    }
  });
  LocalContractStorage.defineMapProperty(this, "arrayGameMap");
  LocalContractStorage.defineProperty(this, "gameSize");

};

GameLifeContract.prototype = {
  init: function () {
      this.userSize = 0;
      this.gameSize = 0;
  },

  successMsg: function(d){
    var success = {};
    success.status = true;
    success.data = d;
    return success;
  },
  
  errorMsg: function(e){
    var error = {}
    error.status = false;
    error.msg = e;
    return error;
  },

  compare: function (obj1, obj2) {
      var val1 = obj1.date;
      var val2 = obj2.date;
      if (val1 < val2) {
          return -1;
      } else if (val1 > val2) {
          return 1;
      } else {
          return 0;
      }            
  },

  createUser: function(user){
    var from = Blockchain.transaction.from;
    var isUser = this.userInfo.get(from);
    if(isUser){
      return this.errorMsg("用户已经存在");
    }
    var index = this.userSize;
    this.arrayUserMap.set(index, from);
    this.userInfo.set(from, user);
    this.userSize +=1;
    return this.successMsg("用户创建成功");
  },

  updateUser: function(user){
    var from = Blockchain.transaction.from;
    var isUser = this.userInfo.get(from);
    if(!isUser){
      return this.errorMsg("用户不存在");
    }
      if(user.nickname && typeof(user.nickname) != "undefined")
      {
        isUser.nickname = user.nickname;
      }

      if(user.sex && typeof(user.sex) != "undefined"){
        isUser.sex = user.sex;
      }

      if(user.email && typeof(user.email) != "undefined"){
        isUser.email = user.email;
      }

      if(user.phone && typeof(user.phone) != "undefined"){
        isUser.phone = user.phone;
      }
          
      if(user.wechatId && typeof(user.wechatId) != "undefined"){
        isUser.wechatId = user.wechatId;
      }

      if(user.avatar && typeof(user.avatar) != "undefined"){
        isUser.avatar = user.avatar; 
      }

      if(user.desc && typeof(user.desc) != "undefined"){
        isUser.desc = user.desc;
      }
      
      this.userInfo.set(from, isUser);

      return this.successMsg(isUser);
   
  },

  addFriendforUser: function(u_address){
    var from = Blockchain.transaction.from;
    var isUser = this.userInfo.get(from);
    if(!isUser){
      return this.errorMsg("用户不存在");
    }
    var friend = this.userInfo.get(u_address);
    if(!friend){
      return this.errorMsg("您想添加的用户不存在");
    }
    var friendlist = isUser.friendlist;
    if(friendlist.length > 0){
      var isExit = false;
      friendlist.forEach(function checkGame(f){
        if(f.u_address == u_address){
          isExit = true;
        }
      })
      if(isExit){
        return this.errorMsg("游戏已经被添加");
      }
    }
    var userInfomini = {};
    userInfomini.u_address = u_address;
    userInfomini.nickname = friend.nickname;
    userInfomini.desc = friend.desc;
    userInfomini.createdate = friend.createdate;
    isUser.friendlist.push(userInfomini);
    this.userInfo.set(from, isUser);
    return this.successMsg("游戏添加成功");
  },

  addMomentInfo: function(moment){
    var from = Blockchain.transaction.from;
    var isUser = this.userInfo.get(from);
    if(!isUser){
      return this.errorMsg("用户不存在");
    }

    var momentmini = {};
    momentmini.desc = moment.desc;
    momentmini.m_imgurllist = moment.m_imgurllist;
    momentmini.date = Date.parse(new Date());
    momentmini.nickname = isUser.nickname;
    momentmini.avatar = isUser.avatar;
    isUser.momentlist.push(gameInfomini);
    this.userInfo.set(from, isUser);
    return this.successMsg("信息发布成功");

  },

  updateToDev: function(){
    var from = Blockchain.transaction.from;
    var isUser = this.userInfo.get(from);
    if(!isUser){
      return this.errorMsg("用户不存在");
    }

    if(isUser.type == 1){
      return this.errorMsg("您已经是游戏开发者");
    }

    isUser.type = 1;
    this.userInfo.set(from, isUser);
    return this.successMsg("更新为开发者成功");
  },

  getMomentList: function(u_address){
    var isUser = this.userInfo.get(u_address);
    if(!isUser){
      return this.errorMsg("用户不存在");
    }

    var friendlist = isUser.friendlist;
    var friend_len = friendlist.length;
    var momentlist = [];
    for(var i=0; i<friend_len; i++){
     var friend = this.userInfo.get(friendlist[i].u_address);
     momentlist.push.apply(momentlist,friend.friendlist);
    }
    return this.successMsg(momentlist.sort(this.compare));
  },

  createGame: function(game){
    var from = Blockchain.transaction.from;
    var user = this.userInfo.get(from);
    if(!user){
      return this.errorMsg("用户不存在");
    }
    if(user.type == 0){
      return this.errorMsg("您不是开发者，没有权限创建游戏");
    }

    var index = this.gameSize;
    this.arrayGameMap.set(index, game.g_address);
    this.gameInfo.set(game.g_address, game);
    this.gameSize +=1;
    var gameInfomini = {};
    gameInfomini.g_address = game.g_address;
    gameInfomini.g_name = game.g_name;
    gameInfomini.g_imgurl_mini = game.g_imgurl_mini;
    gameInfomini.add_date = Date.parse(new Date());
    gameInfomini.isHold = true;
    user.gamelist.push(gameInfomini);
    this.userInfo.set(from, user);
  },

  getGameInfoList: function(limit, offset){
    limit = parseInt(limit);
    offset = parseInt(offset);
    if(offset>this.gameSize){
        throw new Error("offset is not valid");
    }
    var number = offset+limit;
    if(number > this.gameSize){
        number = this.gameSize;
    }
    var result  = {data:[],count:this.gameSize};
    for(var i=offset;i<number;i++){
        var key = this.arrayGameMap.get(i);
        var object = this.gameInfo.get(key);
        result.data.push(object);
    }
    return result;
  },

  getUserInfo: function(){
    var from = Blockchain.transaction.from;
    var getUser = this.userInfo.get(from);
    if(!getUser){
      getUser = new UserInfoContent(getUser);
      this.userInfo.set(from, getUser);
      return this.successMsg(getUser);
    }else{
      getUser.logindate = Date.parse(new Date());
      this.userInfo.set(from, getUser);
      return this.successMsg(getUser);
    }

  },

  getUserInfoByAddress: function(address){
    var getUser = this.userInfo.get(address);
      return this.successMsg(getUser);
  },

  getGameInfo: function(g_address){
    var getGame = this.gameInfo.get(g_address);
    if(!getGame){
      return this.errorMsg("游戏不存在");
    }else{
      return this.successMsg(getGame);
    }
  },

  addGameforUser: function(g_address){
    var from = Blockchain.transaction.from;
    var user = this.userInfo.get(from);
    if(!user){
      return this.errorMsg("用户不存在");
    }

    var game = this.gameInfo.get(g_address);
    if(!game){
      return this.errorMsg("游戏不存在");
    }

    var gamelist = user.gamelist;
    if(gamelist.length > 0){
      var isExit = false;
      gamelist.forEach(function checkGame(g){
        if(g.g_address == g_address){
          isExit = true;
        }
      })
      if(isExit){
        return this.errorMsg("游戏已经被添加");
      }
    }

    var gameInfomini = {};
    gameInfomini.g_address = g_address;
    gameInfomini.g_name = game.g_name;
    gameInfomini.g_imgurl_mini = game.g_imgurl_mini;
    gameInfomini.add_date = Date.parse(new Date());
    gameInfomini.isHold = false;
    user.gamelist.push(gameInfomini);
    this.userInfo.set(from, user);
    return this.successMsg("游戏添加成功");
    
  }


}

module.exports = GameLifeContract;
