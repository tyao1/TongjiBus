var React = require('react');
var request = require('superagent');

var Bk_FindPassword = React.createClass({
  getInitialState: function() {
    return {username:'',password:'',phone:''};
  },

  componentDidMount: function() {
  },
  handleUsernameChange : function(e){
    this.setState({username:e.target.value.substring(0,7)});
  },

  handleCheckCredential: function(e){
    var username=this.state.username;
    if(username.length===0)
    {
      this.setState({errorMsg:'请输入用户名'})
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
      request.get('http://jiading.tongji.edu.cn:8080/TJbus/FindpwdServlet')
        .query({
          username:ctx.state.username
        })
        .end(function(res){
          ctx.setState({isRegistering:false})

          if(res.ok)
          {
            var val = res.text;
            if(val ==0)
            {
              ctx.setState({errorMsg:'该用户名不存在，找回密码失败'});
            }
            else if(val==1)
            {
              ctx.setState({errorMsg:'该用户还未注册，请先注册~'});
            }
            else if(val==2)
            {
              ctx.setState({errorMsg:'该用户需要激活，请到邮箱进行激活~'});
            }
            else if(val==3)
            {
              ctx.setState({errorMsg:'密码找回邮件已经发送到邮箱~'});
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
          <button onClick={this.handleReg} className={this.state.isRegistering?"logining":null}>{this.state.isRegistering?'找回密码中……':'找回密码'}</button>

        </div>
      </div>
    );
  }
});

module.exports = Bk_FindPassword;
