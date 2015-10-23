var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var ActionConstants = require('../constants/ActionSourceConstants');
var BookingConstants = require('../constants/BookingConstants');
var assign = require('object-assign');

var _isBooking=0;//0-no 1-ongoing -2finished
var _result;

var BookingTickets = assign(EventEmitter.prototype, {

  init:function(){
    _isBooking=0;
    _result=null;
  },

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return{
      isBooking:_isBooking,
      result: _result
    }
  },


  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.BOOKING_TICKET_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.BOOKING_TICKET_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.BOOKING_TICKET_EVENT);
  },



  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(payload.source) {
      //server action
      case ActionConstants.SERVER_ACTION:
        switch (action.type) {
          case BookingConstants.BOOK_TICKET_START:
            _isBooking=1;
            BookingTickets.emitChange();
            break;
          case BookingConstants.BOOK_TICKET_FAILURE:
            _isBooking=2;
            _result=4;//net work error
            BookingTickets.emitChange();
            break;
          case BookingConstants.BOOK_TICKET_SUCCESS:
            _isBooking=2;
            _result=action.data;
            BookingTickets.emitChange();
            break;
        }
            break;
      case ActionConstants.VIEW_ACTION:
            if(action.type===BookingConstants.BOOK_TICKET_INIT)
            {
              BookingTickets.init();
              BookingTickets.emitChange();
            }
    }

  })

});

module.exports = BookingTickets;
