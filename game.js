'use strict';

//成就信息表
var AchievementDataContent = function(data){

    if (data) {
        var o = JSON.parse(data);
        this.ach_id = o.ach_id;
        this.ach_code = o.ach_code;
        this.type = o.type;
        this.name = o.name;
        this.desc = o.desc;
        this.a_imgurl = o.a_imgurl;
        this.point = o.point;
      } else {
        this.ach_id = 0;
        this.ach_code = "";
        this.type = 0;
        this.name = "";
        this.desc = "";
        this.a_imgurl = "";
        this.point = 0;
      }

};

AchievementDataContent.prototype = {
    toString: function () {
      return JSON.stringify(this);
    }
};

//用户获得成就信息表
var AchiUserContent = function(data){

    if (data) {
        var o = JSON.parse(data);
        this.achiDatalist = o.achiDatalist;
    }else{
        this.achiDatalist = [];

    }
};

AchiUserContent.prototype = {
    toString: function () {
      return JSON.stringify(this);
    }
};

var AchievementContract = function(){
  
    LocalContractStorage.defineMapProperty(this, "achiInfo", {
      parse: function (text) {
        return new AchievementDataContent(text);
      },
      stringify: function (o) {
        return JSON.stringify(o);
      }
    });
    LocalContractStorage.defineProperty(this, "achiSize");
    LocalContractStorage.defineMapProperty(this, "arrayachiMap");
  
    LocalContractStorage.defineMapProperty(this, "achiUserInfo", {
      parse: function (text) {
        return new AchiUserContent(text);
      },
      stringify: function (o) {
        return JSON.stringify(o);
      }
    });

    LocalContractStorage.defineMapProperty(this, "arrayachiUserMap");
    LocalContractStorage.defineProperty(this, "achiUserSize");

    LocalContractStorage.defineProperty(this, 'ownerAddress');
  
};

AchievementContract.prototype = {
    init: function () {
        this.achiSize = 0;
        this.achiUserSize = 0;
        this.ownerAddress = Blockchain.transaction.from;
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
    _checkOwner: function(){

        return this.ownerAddress === Blockchain.transaction.from;
    },
    checkContract: function(){
        if(!this._checkOwner()){
            return this.errorMsg("合约不合法，或者没有权限");
        }else{
            return this.successMsg("验证通过");
        }
    },
    addAchievement: function(achilist){
        if(!this._checkOwner()){
            return this.errorMsg("没有权限");
        }else{
    
            if(achilist){
                var index = this.achiSize;
                var achi_len = achilist.length;
                for(var i=0;i<achi_len;i++){
                    this.achiInfo.set(this.achiSize, achilist[i]);
                    this.achiSize+=1;
                }
                
            }else{
                return this.errorMsg("成就信息不能为空");
            }
        }
    },
    uploadAchievementforUser: function(achiU){
        var from = Blockchain.transaction.from;
        var achiUser = this.achiUserInfo.get(from);
        var index = this.achiUserSize;
        if(achiUser){

            if(achiUser.achiDatalist){
                achiUser.achiDatalist.push(achiU);
            }else{
                achiUser.achiDatalist = []
                achiUser.achiDatalist.push(achiU);
            }
            this.achiUserInfo.set(from, achiUser);
        }else{
            achiUser = {}
            achiUser.achiDatalist = [];
            achiUser.achiDatalist.push(achiU);
            this.arrayachiUserMap.set(index, from);
            this.achiUserInfo.set(from, achiUser);
            this.achiUserSize +=1;
        }
        return this.successMsg("添加成就点成功");

    },

    getAchiList: function(limit,offset){
        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>this.achiSize){
            throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > this.achiSize){
            number = this.achiSize;
        }
        var result  = {data:[],count:this.achiSize};
        for(var i=offset;i<number;i++){
            var object = this.achiInfo.get(i);
            result.data.push(object);
        }
        return result;
    }
}

module.exports = AchievementContract;