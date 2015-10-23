var React = require('react');

var Modal = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    isCancel :React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func,
    onOk: React.PropTypes.func,
    okText: React.PropTypes.string,
    cancelText: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      isOpen: false,
      isCancel:true,
      okText:'确定',
      cancelText:'取消'
    };
  },


  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    var modalclass='modal'+ (this.props.isOpen?' active':'');
    var cancelbutton;
    if(this.props.isCancel)cancelbutton=<button className="button realround" onClick={this.props.onCancel}>{this.props.cancelText}</button>;
    return (
      <div className={modalclass}>
        <div className="inner">
          {this.props.children}
          <div className="controls">
            <button className="button realround ok" onClick={this.props.onOk}>{this.props.okText}</button>
            {cancelbutton}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
