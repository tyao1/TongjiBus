var React = require('react');
var BookingAction = require('../actions/BookingAction');
var BookingStore = require('../stores/BookingStore');


var Bk_History = React.createClass({
  getInitialState: function() {
    return BookingStore.getHistoryData();
  },

  _onChange: function() {
    this.setState(BookingStore.getHistoryData());
  },

  componentDidMount: function() {
    BookingStore.addChangeListener(this._onChange);
    //init data
    if(this.state.needReload)
    {
      BookingAction.loadHistoryList(this.state.username);
    }
  },

  componentWillUnmount: function() {
    BookingStore.removeChangeListener(this._onChange);
  },
  /*
   0: Objectbus_id: "1_4"
   end: "嘉定校区"
   get_ticket_time: "2014-03-26 23:00:14.0"
   id: 4644line: "中环直达"
   route_id: 1
   series_number: "20140326230014144644"
   start: "四平校区"
   ticket_time: "2014-03-27 10:00"
   username: "1252394"

   */
  render: function() {
    var output;
    if(this.state.isLoading||this.state.ticketsdata==undefined)
      output = <div className="tempHolder face"><img src="images/face2.png"/><div>载入中...</div></div>;
    else if(this.state.ticketsdata.length===0) {
      output= <div className="tempHolder face">
        <img src="images/face2.png"/>
        <div>还没订过票</div></div>;
    }
    else
    {
      output=(
        <ul className="historyList">
      {this.state.ticketsdata.map((route,i)=>
          <li key={i}>
            <div className="time">{route.ticket_time}</div>
            <span className="start">{route.start}</span>
            <span className="to">→</span>
            <span className="end">{route.end}</span>
          </li>
      )}
        </ul>);
    }
    return (
      output
    );
  }
});

module.exports = Bk_History;
