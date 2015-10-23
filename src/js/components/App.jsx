var React = require('react');

var NaviStore = require('../stores/NaviStore');
var BookingStore = require('../stores/BookingStore');
var ActionCreator = require('../actions/BookingAction');
//constants
var UrlConstants = require('../constants/UrlConstants.js');

//react views
var Home = require('../components/Home.jsx');
var Booking = require('../components/Booking.jsx');
var BkLogin = require('../components/Bk_Login.jsx');
var NaviAction = require('../actions/NaviAction');
var BkReg = require('../components/Bk_Register.jsx');
var BkFPW = require('../components/Bk_FindPassword.jsx');
var BkRoutDetail = require('../components/Bk_RouteDetail.jsx');
var BkDetail = require('../components/Bk_Detail.jsx');
var assign = require('object-assign');

var App = React.createClass({

  getInitialState: function() {
    return assign(BookingStore.getLoginAndPage(),NaviStore.getAll());
  },

  _onChange: function() {
    this.setState(NaviStore.getAll());
  },
  //get login status
  _onBookingChange:function(){
    this.setState(BookingStore.getLoginAndPage());
  },
  componentDidMount: function() {
    NaviStore.addChangeListener(this._onChange);
    BookingStore.addChangeListener(this._onBookingChange);
  },

  componentWillUnmount: function() {
    NaviStore.removeChangeListener(this._onChange);
    BookingStore.removeChangeListener(this._onBookingChange);
  },

  handleGoBackClick:function(e){
    NaviAction.popState();
  },

  render: function() {
    var realpage;
    var backbutton;
    if(this.state.canGoBack) {
      backbutton = <button id="goback" onClick={this.handleGoBackClick}>{'<'}</button>;
    }
    switch(this.state.href){
            case null,UrlConstants.Home:
              realpage = <Home/>;
              break;
            case UrlConstants.Booking:
              if(this.state.loggedin){
               realpage= <Booking/>;
              }
              else {//not logged in
                realpage =  <BkLogin/>;
              }

              break;

            case UrlConstants.BookingGet:
              realpage=<BkRoutDetail/>;
              break;
            case UrlConstants.BookingDetail:
              realpage=<BkDetail/>;
              break;
            case UrlConstants.BookingReg:
              realpage=<BkReg/>;
              break;
            case UrlConstants.BookingFPW:
              realpage=<BkFPW/>;
              break;
            default:
              realpage=<div className="tempHolder"><span>载入中...</span></div>;
              break;
    }
    return (
      <div id="wrapper">
        <header id="AppTitle">
          {backbutton}
          <span className={this.state.title.length>9?'long':null}>{this.state.title}</span>
        </header>
        {realpage}
      </div>
    );
  }

});

module.exports = App;
