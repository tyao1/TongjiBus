var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var NaviConstants = require('../constants/NaviConstants');
var ActionSources = require('../constants/ActionSourceConstants');
var UrlConstants = require('../constants/UrlConstants');

var BookingStore = require('../stores/BookingStore');

//navigation status
var _navigation =[{
  title:'同济公交时刻表',
  href:'/'
}];

//status functions

// conf:{}
function pushNavi(conf){
  _navigation.push(conf);
    NaviStore.emitChange();

}
function popNavi(conf){
  _navigation.pop();
    NaviStore.emitChange();

}
var NaviStore = assign({},EventEmitter.prototype, {

  getAll: ()=>assign({canGoBack:NaviStore.isBackable()},_navigation[_navigation.length-1]) ,
  //return navigation state
  getNaviState: ()=>_navigation[_navigation.length-1],

  isBackable:()=>_navigation.length>1,



  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    if(payload.source==ActionSources.ROUTE_ACTION)
    {
      switch(action.type){
        case NaviConstants.PUSH_STATE:
            pushNavi(action.conf);
            break;
        case NaviConstants.POP_STATE:
              popNavi();
              break;
      }
    }

  })

});

module.exports = NaviStore;
