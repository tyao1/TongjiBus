var React = require('react');
var BookingAction = require('../actions/BookingAction');
var BookingStore = require('../stores/BookingStore');
var NaviStore = require('../stores/NaviStore');
var BTStore = require('../stores/BookingTickets');
var NaviLink = require('../components/NaviLink.jsx');
var UrlConstants = require('../constants/UrlConstants');
var Modal = require('../components/Modal.jsx');
var assign =require('object-assign');

var Bk_Detail = React.createClass({
  getInitialState: function() {
    return assign(BookingStore.getPureName(),NaviStore.getNaviState());
  },

  componentDidMount: function() {
  },

  render: function() {

    var route=this.state.route;
    return (
      <div id="detaiTicket">
        <div className="route">
          <span className="start">{route.start}</span>
          <span className="to">→</span>
          <span className="end">{route.end}</span>
          <div className="line">{route.line}</div>
        </div>
        <div className="card">
          <div className="ticket_time">{route.ticket_time}</div>
          <div className="serial">流水号：{route.series_number}</div>
          <div className="user">
            <div className="username">{this.state.name}</div>
            <div className="userid">{route.username}</div>
          </div>
        </div>
        <img src="./images/loader.gif"/>
      </div>
    );
  }
});

module.exports = Bk_Detail;
