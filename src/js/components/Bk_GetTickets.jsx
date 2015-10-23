var React = require('react');
var BookingStore = require('../stores/BookingStore');
var NaviAction = require('../actions/NaviAction');
var UrlConstants= require('../constants/UrlConstants');


var Bk_GetTickets = React.createClass({
  getInitialState: function() {
    return BookingStore.getBusedDate();
  },

  componentDidMount: function() {

  },


  gotoDetailTickets:function(daroute){

    return function(){
      NaviAction.pushState({
        title:'抢票：'+daroute.start+'至'+daroute.end,
        href:UrlConstants.BookingGet,
        routeid:daroute.route_id
      });
    };

  },

  render: function() {
    var routeList=[];
    if(this.state.busesdata)
    routeList = this.state.busesdata.routelist
    return (
      <div>
        <ul className="routelist">
          {
            routeList.map((route,i)=>
              <li key={i} onClick={this.gotoDetailTickets(route)}>
                <span className="start">{route.start}</span>
                <span className="to">→</span>
                <span className="end">{route.end}</span>
              </li>
            )
          }
        </ul>



      </div>
    );

  }
});

module.exports = Bk_GetTickets;
