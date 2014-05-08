var util = require('util');
var needle = require('needle');

var domain = 'http://localhost:3000'

exports.text = function(message, req, res, next){
  console.log(message);

  var lag = 'Xiao-1116';

  get_tag(lag, function(resp){
    console.log(util.inspect(resp, {colors: true}));

    var title = {
      title: resp.battleTag,
      description: '巅峰等级：' + resp.paragonLevel + '，专家巅峰等级：' + resp.paragonLevelHardcore,
      picurl: domain + '/images/d3/title.jpg',
      url: ''
    }
    var result = [];
    result.push(title);
    resp.heroes.forEach(function(i){
      result.push({
        title: i.name,
        description: (i.hardcore ? '专家模式：' : '') + i.level + '级',
        picurl: domain + '/images/d3/' + i.class + i.gender + '.jpg',
        url: domain + '/d3/hero?lag=' + resp.battleTag + '&id=' + i.id 
      });
    });
    res.reply(result);

  });

  function get_tag(lag, callback){
    needle.get('http://tw.battle.net/api/d3/profile/' + lag + '/index', {'json': true}, function(err, resp){
      if(err) throw err;
      if(resp.body && resp.body.code == 'NOTFOUND'){
        callback(null);
        return;
      }
      // console.log(util.inspect(resp, {colors: true}));
      // resp.body.heroesData = {};
      // var num = 0;

      callback(resp.body);

      // resp.body.heroes.forEach(function(i){
      //   get_hero(i.id, lag, function(id, data){
      //     resp.body.heroesData[id] = data;
      //     if(++num == resp.body.heroes.length) callback(resp.body);
      //   });
      // });
    });
  }

  function get_hero(id, lag, callback){
    needle.get('http://tw.battle.net/api/d3/profile/' + lag + '/hero/' + id, {'json': true}, function(err, resp){
      if(err) throw err;
      callback(id, resp.body);
    });
  }
};

exports.location = function(message, req, res, next){
  res.reply('测试中。。。');
};

exports.image = function(message, req, res, next){
  res.reply('测试中。。。');
};

exports.voice = function(message, req, res, next){
  res.reply('测试中。。。');
};

exports.link = function(message, req, res, next){
  res.reply('测试中。。。');
};

exports.event = function(message, req, res, next){
  res.reply('测试中。。。');
};
