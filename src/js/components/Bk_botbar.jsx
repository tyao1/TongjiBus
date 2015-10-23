var React = require('react');
var BookingStore = require('../stores/BookingStore');
var BookingAction = require('../actions/BookingAction');


var Bk_botbar= React.createClass({
  getInitialState: function() {
    return BookingStore.getCurrentPage();
  },

  _onChange:function(){
    this.setState(BookingStore.getCurrentPage());
  },
  componentDidMount: function() {
    BookingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BookingStore.removeChangeListener(this._onChange);
  },
  handlerIsActive:function(index){
    var orig='tab'+index;
    if(index===this.state.currentpage)
      return orig+' active';
    else
      return orig;
  },
  _onClick:function(index) {
    return    function (e) {
      BookingAction.changeView(index);
    }
  },
  render: function() {

    return (
      <ul id="switches">
        <li className={this.handlerIsActive(0)} onClick={this._onClick(0)}>抢票</li>
        <li className={this.handlerIsActive(1)} onClick={this._onClick(1)}>凭证</li>
        <li className={this.handlerIsActive(2)} onClick={this._onClick(2)}>历史</li>
        <li className={this.handlerIsActive(3)} onClick={this._onClick(3)}>信息</li>
      </ul>
    );
  }
});

module.exports = Bk_botbar;
