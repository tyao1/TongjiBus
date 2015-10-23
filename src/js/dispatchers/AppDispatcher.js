var Dispatcher = require('flux').Dispatcher;
var ActionSources = require('../constants/ActionSourceConstants');
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: ActionSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: ActionSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleRouteAction: function(action) {
    var payload = {
      source: ActionSources.ROUTE_ACTION,
      action: action
    };
    this.dispatch(payload);
  }


});

module.exports = AppDispatcher;
