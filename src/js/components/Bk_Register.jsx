//NOT SO FLUX...
var React = require('react');
var request = require('superagent');

var Bk_Register = React.createClass({
  getInitialState: function() {
    return {username:'',password:''};
  },

  componentDidMount: function() {
  },
  handleUsernameChange : function(e){
    this.setState({username:e.target.value.substring(0,7)});
  },
  handlePasswordChange : function(e){
    this.setState({password:e.target.value});
  },
  handlePhoneChange : function(e){
    this.setState({phone:e.target.value});
  },


  handleCheckCredential: function(e){
    var username=this.state.username;
    var password = this.state.password;
    var phone = this.state.phone;
    if(username.length===0)
    {
      this.setState({errorMsg:'请输入用户名'})
    }
    else if(password.length===0)
    {
      this.setState({errorMsg:'请输入密码'})
    }
    else if(phone.length===0)
    {
      this.setState({errorMsg:'请输入手机号'})
    }
    else
    {
      this.setState({errorMsg:null});
      return true;
    }
    return false
  },
  handleReg:function(){
    if(this.handleCheckCredential()&&!this.state.isRegistering)
    {

      this.setState({isRegistering:true});
      //no flux data flow here

      var ctx=this;
      request.get('http://jiading.tongji.edu.cn:8080/TJbus/RegisterServlet')
        .query({
          username:ctx.state.username,
          password:ctx.state.password,
          phone:ctx.state.phone
        })
        .end(function(res){
          ctx.setState({isRegistering:false})

          if(res.ok)
          {
            var val = res.text;
            if(val ==0)
            {
              ctx.setState({errorMsg:'该用户名不存在'});
            }
            else if(val==1)
            {
              ctx.setState({errorMsg:'该用户已经激活，请直接登陆~'});
            }
            else if(val==2)
            {
              ctx.setState({errorMsg:'用户需要激活，请到邮箱进行激活~'});
            }
            else
            {
              ctx.setState({errorMsg:'未知错误'});
            }
          }
          else
          {
            ctx.setState({errorMsg:'网络错误'});
          }
        });

    }
  },
  render: function() {
    return (
      <div className="innerPage">
        <div className="login">
          <h3 calssName="errorMsg">{this.state.errorMsg}</h3>
          <input type="text" value={this.state.username} placeholder="用户名" onChange={this.handleUsernameChange} />
          <input type="password" value={this.state.password} placeholder="密码" onChange={this.handlePasswordChange}/>
          <input type="text" value={this.state.phone} placeholder="手机号" onChange={this.handlePhoneChange}/>

          <button onClick={this.handleReg} className={this.state.isRegistering?"logining":null}>{this.state.isRegistering?'注册中……':'注册'}</button>

        </div>
      </div>
    );
  }
});

module.exports = Bk_Register;
