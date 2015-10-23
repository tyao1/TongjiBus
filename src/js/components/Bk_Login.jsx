var React = require('react');
var BookingAction = require('../actions/BookingAction');
var BookingStore = require('../stores/BookingStore');
var NaviLink = require('../components/NaviLink.jsx');
var UrlConstants = require('../constants/UrlConstants');


// return 0:not 1:is weekend
function isWeekend(){
  var date = new Date().getDay();
  if(date==5||date==6)
  {
    return 1;
  }
  else return 0;
}

var Bk_Login = React.createClass({

  getInitialState: function() {
    return BookingStore.getCredential();
  },

  handleUsernameChange : function(e){
    this.setState({username:e.target.value.substring(0,7)});
  },
  handlePasswordChange : function(e){
    this.setState({password:e.target.value});
  },


  _onChange: function() {
    this.setState(BookingStore.getLoginAll());
  },

  componentDidMount: function() {
    BookingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BookingStore.removeChangeListener(this._onChange);
  },


  handleCheckCredential: function(e){
    var username=this.state.username;
    var password = this.state.password;
    if(username.length===0)
    {
      this.setState({errorMsg:'请输入用户名'})
    }
    else if(password.length===0)
    {
      this.setState({errorMsg:'请输入密码'})
    }
    else
    {
      this.setState({errorMsg:null});
    }
  },
  handleLogin:function(){
    this.handleCheckCredential();
    if(this.state.username.length>0&&this.state.password.length>0&&!this.state.isLogin) {
      this.setState({isLogin:true});
      BookingAction.login({
        username: this.state.username,
        password: this.state.password,
        weekend:isWeekend()
      });
    }
  },
  render: function() {
    return (
        <div className="innerPage" key="bklogin">
        <div className="login">
          <h3 calssName="errorMsg">{this.state.errorMsg}</h3>
          <input type="text" value={this.state.username} placeholder="用户名" onChange={this.handleUsernameChange} />
          <input type="password" value={this.state.password} placeholder="密码" onChange={this.handlePasswordChange} onBlur={this.handleCheckCredential}/>
          <button onClick={this.handleLogin} className={this.state.isLogin?"logining":null}>{this.state.isLogin?'登入中……':'登入'}</button>
          <div className="minorLinks">

            <NaviLink href={UrlConstants.BookingReg} title='注册帐号' className="pure"></NaviLink>
            <NaviLink href={UrlConstants.BookingFPW} title='找回密码' className="pure"></NaviLink>

          </div>
          <div className="tjbg">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Bk_Login;
