var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var ActionConstants = require('../constants/ActionSourceConstants');
var BookingConstants = require('../constants/BookingConstants');
var assign = require('object-assign');

//FOR TEST!!!
//var _loggedin = true;
var _loggedin = false;

var _currentpage = 0;
var _errorMsg = null;

/*
  isAdmin:,
  name:,
  routelist:[{
    end:"xxx",
    route id:3,
    start:"xxxx",
    weekend:"1"
  },
  ...]
*/
var _busesdata;

function handleLoginSuccess(data){
  if(data==0){
    _errorMsg = '登陆失败，请检查用户名或密码'
  }
  else
  {
    var obj =JSON.parse(data);
    if(obj!=null)
    {
      _errorMsg=null;
      _busesdata=obj;
      _loggedin=true;
    }
  }
}

function handleLoginFailure(){
  _errorMsg='哇哦，网络错误了';
}

function handleSaveCredential(credential){
  _username=credential.username;
  setTimeout(function(){
    localStorage.setItem("username", credential.username);
    localStorage.setItem("password", credential.password);
  },0);
}

function handleCurrentPage(index){
  _currentpage=index;
  BookingStore.emitChange();
}

//userid
var _username=localStorage.getItem("username");

//routedetail
var _isLoadingGetRoute=false;
var _routeDetailData;

//my tickets
var _needReloadMy=true;
var _isLoadingMyTickets=false;
var _myTicketsData;

//history tickets
var _needReloadHistory=true;
var _isLoadingHistoryTickets=false;
var _historyTicketsData;



var BookingStore = assign({},EventEmitter.prototype, {

  getCredential:function(){
    var username =   _username;
    var password =   localStorage.getItem("password");
    return{
      username:username,
      password:password
    }

  },

  getUserName:function(){
    return{
      name:_busesdata.name,
      id:_username
    }
  },
  getPureName:function(){
    return {name:_busesdata.name}
  },
  getLoginAll: function() {
    return{
      isLogin:false,
      errorMsg:_errorMsg
    }
  },
  getLoginAndPage: function(){
    return {
      loggedin:_loggedin,
      currentpage:_currentpage
    }
  },

  getBusedDate:function(){
    return {busesdata:_busesdata};
  },

  getCurrentPage:function() {
    return {currentpage: _currentpage};
  },

  getRouteDetail:function(){
    return{
      isLoading:_isLoadingGetRoute,
      routeDetailData:_routeDetailData,
      username:_username
    }
  },
  getMyData:function(){
    return{
      isLoading:_isLoadingMyTickets,
      ticketsdata:_myTicketsData,
      needReload:_needReloadMy,
      username:_username
    }
  },

  getHistoryData:function(){
    return{
      isLoading:_isLoadingHistoryTickets,
      ticketsdata:_historyTicketsData,
      needReload:_needReloadHistory,
      username:_username
    }
  },
  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.BOOKING_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.BOOKING_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.BOOKING_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(payload.source){
      //server action
      case ActionConstants.SERVER_ACTION:
            switch(action.type){
              case BookingConstants.LOGIN_SUCCESS:
                handleLoginSuccess(action.text);
                BookingStore.emitChange();
                break;
              case BookingConstants.LOGIN_FAILURE:
                handleLoginFailure();
                BookingStore.emitChange();
                break;
              case BookingConstants.GETROUTE_START:
                _isLoadingGetRoute=true;
                _routeDetailData=null;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETROUTE_FAILURE:
                _isLoadingGetRoute=false;
                _routeDetailData=null;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETROUTE_SUCCESS:
                _isLoadingGetRoute=false;
                _routeDetailData=action.data;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETMYTICKETS_START:
                _isLoadingMyTickets=true;
                _myTicketsData=null;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETMYTICKETS_SUCCESS:
                _isLoadingMyTickets=false;
                _myTicketsData=action.data;
                //do not needto load my
                _needReloadMy=false;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETMYTICKETS_FAILURE:
                _isLoadingMyTickets=false;
                _myTicketsData=null;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETHISTORYTICKETS_START:
                _isLoadingHistoryTickets=true;
                _historyTicketsData=null;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETHISTORYTICKETS_SUCCESS:
                _isLoadingHistoryTickets=false;
                _historyTicketsData=action.data;
                //do not needto load history
                _needReloadHistory=false;
                BookingStore.emitChange();
                break;
              case BookingConstants.GETHISTORYTICKETS_FAILURE:
                _isLoadingHistoryTickets=false;
                _historyTicketsDataT=null;
                BookingStore.emitChange();
                break;
            }
            break;

      case ActionConstants.VIEW_ACTION:
            switch(action.type){
              case BookingConstants.SAVECREDENTIAL:
                //save username and password
                handleSaveCredential(action.credential);
                break;
              case BookingConstants.CHANGE_VIEW:
                handleCurrentPage(action.index);
                break;

            }

            break;

    }
  })

});

module.exports = BookingStore;
