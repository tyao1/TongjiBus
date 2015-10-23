var React = require('react');
var BookingAction = require('../actions/BookingAction');
var BookingStore = require('../stores/BookingStore');
var BTStore = require('../stores/BookingTickets');
var NaviLink = require('../components/NaviLink.jsx');
var UrlConstants = require('../constants/UrlConstants');
var Modal = require('../components/Modal.jsx');


function resultToView(result,dis){
  var results=result.split('#');
  var img;
  var str;
  switch(results[0])
  {
    case '0':
      switch(results[1])
      {
        case '0':
          str='没有空座位';
          break;
        case '1':
          str='已经有本线路上的票了，无需再抢票';
          break;
        case '2':
          str='已经有本线路上的票了，无需再抢票';
          break;
        case '3':
          str='抢票机会使用完毕，还能再抢回程票';
          break;
        case '4':
          str='没有抢票机会了';
          break;
        default:
          str='迷之原因';
          break;
      }
          img='images/face3.png';
          break;
    case '1':
          str='抢票成功';
          img='images/face1.png';
        break;
    case '2':
          img='images/face1.png';
          str='抢回程票成功';
          break;
    default:
      img='images/face3.png';
      str='网络错误';
          break;
  }
  return (<div><img src={img}/><h2>{str}</h2></div>);
}


var Bk_RouteDetail = React.createClass({
  getInitialState: function() {
    return BookingStore.getRouteDetail();
  },

  _onChange: function() {
    this.setState(BookingStore.getRouteDetail());
  },
  _onBTChange:function(){
    this.setState(BTStore.getAll());
  },

  componentDidMount: function() {

    BookingStore.addChangeListener(this._onChange);
    BTStore.addChangeListener(this._onBTChange);
  },

  componentWillUnmount: function() {
    BookingStore.removeChangeListener(this._onChange);
    BTStore.removeChangeListener(this._onBTChange);
  },
  handleDetailClick:function(route)
  {
    var _this=this;
    return function() {
      BookingAction.initBookTicket();
      _this.setState({
        isOpen: true,
        route
      })
    }
  }
  ,
  okAction:function(){
    if(!this.state.isBooking)
    {
      BookingAction.bookTicket({
        username:this.state.username,
        bus_id:this.state.route.bus_id
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
      /*
       {
       isLoading:_isLoadingGetRoute,
       routeDetailData:_routeDetailData
       }
       //[{"bus_id":"1_1","time":"6:45","line":"中环直达","rest":40}]

       */

  render: function() {
    var output;

    if(this.state.isLoading)
      output = <div className="tempHolder face"><img src="images/face2.png"/><div>载入中...</div></div>;
    else if(this.state.routeDetailData.length===0) {
      output= <div className="tempHolder face">
        <img src="images/face2.png"/>
        <div>暂无车票</div></div>;
    }
    else
    {

      output=(
        <ul className="detailList">
        {
          this.state.routeDetailData.map((route,i)=> {
            var rest
            if (route.rest >= 5)
              rest = <div className="rest ade">余票充足</div>
            else if (route.rest < 5 && route.rest > 0)
              rest = <div className="rest limit">余票紧张</div>
            else
              rest = <div className="rest no">无票</div>

            return <li onClick={this.handleDetailClick(route)} key={i}>
              <span className="time">{route.time}</span>
              <div  className = "words" >
                <div className="line">{route.line}</div>
              {rest}
              </div>
            </li>
          })
        }
        </ul>
      );
    }
    var inmodal;
    if(this.state.route)
    {
      if(!this.state.isBooking)
      {
        inmodal=
          <div>
            <h2>确定要预定{this.state.route.time}{this.state.route.line}的车票？</h2>
            <p className="minor">座位有限，车票预定后，如行程有变动，请在当天22点前退票</p></div>;

      }
      else if(this.state.isBooking===1)
      {
         inmodal= <h2>正在预定{this.state.route.time}{this.state.route.line}的车票</h2>
      }
      else if(this.state.isBooking===2)
      {

        //handle result
        inmodal=resultToView(this.state.result,this)
      }
    }
    return (
      <div>
      {output}
        <Modal isOpen={this.state.isOpen} onCancel={this.closeModal} okText={this.state.isBooking===1?'订票中':'确定'}
          isCancel={!this.state.isBooking}
          onOk={this.okAction}
        >
        {inmodal}
        </Modal>

      </div>
    );
  }
});

module.exports = Bk_RouteDetail;
