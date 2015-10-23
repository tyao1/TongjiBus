var React = require('react');
var BookingStore = require('../stores/BookingStore');
var Bk_Info = React.createClass({
  getInitialState: function() {
    return BookingStore.getUserName();
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="innerPage">
        <h3 className="divide">您好，{this.state.name} {this.state.id}</h3>
        <p>
          <b>系统说明:</b><br/>
          1.本系统须经同济大学邮箱实名认证<br/>
          2.座位预定时间为乘车前一天6:00-24:00<br/>
          3.退票时间为乘车前一天22:00前<br/>
          4.每位同学每天只能预定来回两张车票<br/>
          5.乘车需要出示手机凭证与同济大学校园卡一张<br/>
          6.乘车时需要支付车费
        </p>
      </div>
    );
  }
});

module.exports = Bk_Info;
