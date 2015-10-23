var React = require('react');
var BookingAction = require('../actions/BookingAction');
var BookingStore = require('../stores/BookingStore');
var Modal = require('../components/Modal.jsx');
var BTStore = require('../stores/BookingTickets');
var NaviAction = require('../actions/NaviAction');
var UrlConstants= require('../constants/UrlConstants');

function resultToView(result){
//0表示退票失败，1表示退票成功，2表示不是退票的时间（不是订票当天22点前）
  var str;
  var img='images/face3.png';
  switch(result){
    case '0':
          str='退票失败';
          break;
    case '1':
          str='退票成功！';
          img='images/face1.png'
          break;
    case '2':
          str='不在退票时间（当天22点前）内';
          break;
    default:
          str=='网络错误';
          break;
  }
  return (<div><img src={img}/><h2>{str}</h2></div>);
}


var Bk_MyTickets = React.createClass({
  getInitialState: function () {
    return BookingStore.getMyData();
  },

  _onChange: function () {
    this.setState(BookingStore.getMyData());
  },
  _onBTChange:function(){
    this.setState(BTStore.getAll());
  },
  componentDidMount: function () {
    BookingStore.addChangeListener(this._onChange);
    BTStore.addChangeListener(this._onBTChange);
    //init data
    if (this.state.needReload) {
      BookingAction.loadMyList(this.state.username);
    }
  },

  componentWillUnmount: function () {
    BookingStore.removeChangeListener(this._onChange);
    BTStore.removeChangeListener(this._onBTChange);
  },
  /*
   0: Object
   bus_id: "1_4"
   end: "嘉定校区"
   get_ticket_time: "2014-03-26 23:00:14.0"
   id: 4644
   line: "中环直达"
   route_id: 1
   series_number: "20140326230014144644"
   start: "四平校区"
   ticket_time: "2014-03-27 10:00"
   username: "1252394"

   */
  handleReturnClick:function(route){
    var _this=this;
    return function(e){
      //no pro
      e.stopPropagation();
      BookingAction.initBookTicket();
      _this.setState({
        isOpen: true,
        route
      })
    }
  },
  okAction:function(){
    if(!this.state.isBooking)
    {
      BookingAction.returnTicket({
        ticket_id:this.state.route.id,
        bus_id:this.state.route.bus_id,
        username:this.state.route.username
      });
    }
    else if(this.state.isBooking===2)
    {
      this.setState({
        isOpen:false
      });
    }
  },
  closeModal:function(){
    this.setState({
      isOpen:false
    });
  },

  gotoDetailTickets:function(daroute){
    return function(){
      NaviAction.pushState({
        title:'车票凭证',
        href:UrlConstants.BookingDetail,
        route:daroute
      });
    };
  },

  render: function () {
    var output;
    var inmodal;
    if (this.state.isLoading || this.state.ticketsdata == undefined)
      output = <div className="tempHolder face"><img src="images/face2.png"/><div>载入中...</div></div>;
    else if (this.state.ticketsdata.length === 0) {
      output = <div className="tempHolder face">
        <img src="images/face2.png"/>
        <div>暂无车票</div></div>;
    }
    else {
      output = (
        <ul className="historyList">
      {this.state.ticketsdata.map((route,i)=>
          <li key={i} className="clearfix" onClick={this.gotoDetailTickets(route)}>
            <div className="detail">
            <div className="time">{route.ticket_time}</div>
            <span className="start">{route.start}</span>
            <span className="to">→</span>
            <span className="end">{route.end}</span>
            </div>
            <div className="button" onClick={this.handleReturnClick(route)}>退票</div>
          </li>
      )}
        </ul>);
    }

    if(this.state.route)
    {
      if(!this.state.isBooking)
      {
        inmodal=
          <div>
            <h2>确定要退还{this.state.route.time}{this.state.route.start}到{this.state.route.end}的车票？</h2>
            <p className="minor">座位有限，如不出行，请及时退票</p></div>;

      }
      else if(this.state.isBooking===1)
      {
        inmodal= <h2>正在退还{this.state.route.time}{this.state.route.start}到{this.state.route.end}的车票</h2>
      }
      else if(this.state.isBooking===2)
      {
        //handle result
        inmodal=resultToView(this.state.result)
      }
    }

    return (
      <div>
      {output}
        <Modal isOpen={this.state.isOpen} onCancel={this.closeModal} okText={this.state.isBooking===1?'退票中':'确定'}
          isCancel={!this.state.isBooking}
          onOk={this.okAction}
        >
        {inmodal}
        </Modal>
      </div>
    );
  }
});

module.exports = Bk_MyTickets;
