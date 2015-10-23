var React = require('react');

var BookingAction = require('../actions/BookingAction');

var BookingStore = require('../stores/BookingStore');

var Bkbar = require('../components/Bk_botbar.jsx');
var BkMyTickets = require('../components/Bk_MyTickets.jsx');
var BkGetTickets = require('../components/Bk_GetTickets.jsx');
var BkHistory = require('../components/Bk_History.jsx');
var BkInfo = require('../components/Bk_Info.jsx');


var Booking = React.createClass({
  getInitialState: function() {
    return BookingStore.getCurrentPage();
  },

  _onChange: function() {
    this.setState(BookingStore.getCurrentPage());
  },

  componentDidMount: function() {
    BookingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BookingStore.removeChangeListener(this._onChange);
  },
  handlerIsActive:function(index){
    if(index===this.state.currentpage)
      return 'active';
    else
      return null;
  },
  changeCurPage:function(index=0){
    BookingAction.changeView(index);
    this.state.currentpage=1;
  },
  render: function() {
      var inner;
      switch(this.state.currentpage){
        case 0 :
          inner= <BkGetTickets/>;
          break;
        case 1 :
          inner= <BkMyTickets/>;
          break;
        case 2 :
          inner= <BkHistory/>;
          break;
        case 3 :
          inner= <BkInfo/>;
          break;
        default:
          inner= <BkGetTickets/>;
          break;
      };



    return (
      <div>
          {inner}
        <Bkbar/>
      </div>
    );
  }
});

module.exports = Booking;
