var express = require('express');
var router = express.Router();

var needle = require('needle');

/* GET users listing. */
router.get('/hero', function(req, res, next) {
  // console.log(req.query.lag);
  var lag = decodeURIComponent(req.query.lag).replace('_', '-');
  var server_name = req.query.server || 'tw';
  // var lag = 'Xiao-1116';
  var id = req.query.id;

  if(lag && id){
    get_hero(id, lag, function(id, data){
      // console.log(data);
      res.render('./hero', {j :data, server_name: server_name});
    });
  }else{
    res.send('抱歉未找到对应角色信息！');
  }

  function get_hero(id, lag, callback){
    needle.get('http://' + server_name + '.battle.net/api/d3/profile/' + lag + '/hero/' + id, {'json': true}, function(err, resp){
      if(err) throw err;
      callback(id, resp.body);
    });
  }
});

router.get('/item', function(req, res){
  var server_name = req.query.server_name || 'tw';
  needle.get('http://' + server_name + '.battle.net/api/d3/data/' + req.query.data, {'json': true}, function(err, resp){
    if(err) throw err;
    res.json(resp.body);
  });
});

module.exports = router;