var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',
  BOOKING_EVENT : 'change_BOOKING',
  BOOKING_TICKET_EVENT :'change_BT',
  ActionTypes: keyMirror({
    ADD_TASK: null,
    CLEAR_TASK: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
