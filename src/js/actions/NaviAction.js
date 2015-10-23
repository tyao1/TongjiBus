var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var UrlConstants= require('../constants/UrlConstants');
var BookingConstants = require('../constants/BookingConstants');

var NaviConstants = require('../constants/NaviConstants');
var request = require('superagent');

function handlePushState(conf){
  if(conf.href===UrlConstants.BookingGet)
  {//get ticket information
    AppDispatcher.handleServerAction({
      type:BookingConstants.GETROUTE_START
    });
    request.get('http://jiading.tongji.edu.cn:8080/TJbus/GetBusServlet')
      .query({
        route_id:conf.routeid,
        admin:0,
        time:Date.now()
      })
      .end(function(res){
        if(res.ok)
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETROUTE_SUCCESS,
            data:JSON.parse(res.text)
          });
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETROUTE_FAILURE
          });
        }

      });
  }
}

module.exports = {

  pushState: function(conf) {
    AppDispatcher.handleRouteAction({
      type: NaviConstants.PUSH_STATE,
      conf: conf
    });
    handlePushState(conf);
  },
  popState: function() {
    AppDispatcher.handleRouteAction({
      type: NaviConstants.POP_STATE
    });
  }



};
