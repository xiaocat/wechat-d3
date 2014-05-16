var util = require('util');
var needle = require('needle');

var domain = 'http://d3.xiaoweb.net';

exports.text = function(message, req, res, next){
  var ctx = message.Content;
  var server_name = ctx.split('#').length == 3 ? 'us' : 'tw';
  var lag = ctx.split('#')[0] + '-' + ctx.split('#')[1];

  // console.log(lag);

  // var lag = 'Xiao-1116';
  var profession = {
    'wizard': '魔法师',
    'crusader': '圣教军',
    'witch-doctor': '巫医',
    'demon-hunter': '猎魔人',
    'barbarian': '野蛮人',
    'monk': '武僧'
  }

  get_tag(lag, function(resp){
    // console.log(util.inspect(resp, {colors: true}));

    if(resp){
      var result = [];
      result.push({
        title: resp.battleTag + '(巅峰等级：' + resp.paragonLevel + '，专家巅峰等级：' + resp.paragonLevelHardcore + ')',
        description: '巅峰等级：' + resp.paragonLevel + '，专家巅峰等级：' + resp.paragonLevelHardcore,
        picurl: domain + '/images/d3/title.jpg'
      });

      resp.heroes.forEach(function(i){
        result.push({
          title: i.name + '(职业：' + profession[i.class] + '，' + (i.hardcore ? '专家模式：' : '') + i.level + '级)',
          description: (i.hardcore ? '专家模式：' : '') + i.level + '级',
          picurl: domain + '/images/d3/' + i.class + i.gender + '.jpg',
          url: domain + '/d3/hero?lag=' + encodeURIComponent(resp.battleTag.replace('#', '_')) + '&id=' + i.id + '&server=' + server_name
        });
      }); 

      if(result.length >= 10) result = result.splice(0, 10);

      res.reply(result);
    }else{
      res.reply('您输入的battleTag未找到对应账号信息！\n\n请重新输入正确的battleTag，例：Xiao#1116，美服账号输入：Xiao#1116#us。');
    }


  });

  function get_tag(lag, callback){
    needle.get('http://' + server_name + '.battle.net/api/d3/profile/' + lag + '/index', {'json': true}, function(err, resp){
      if(err) throw err;
      if(resp.body && resp.body.code == 'NOTFOUND'){
        callback(null);
        return;
      }

      callback(resp.body);

    });
  }

};

exports.location = function(message, req, res, next){
  res.reply('开发中...');
};

exports.image = function(message, req, res, next){
  res.reply('开发中...');
};

exports.voice = function(message, req, res, next){
  res.reply('开发中...');
};

exports.link = function(message, req, res, next){
  res.reply('开发中...');
};

exports.event = function(message, req, res, next){
  if(message.event == 'subscribe'){
  }else{
  }

  res.reply('请输入battleTag查询角色信息，例：Xiao#1116，美服账号输入：Xiao#1116#us。')    
};
