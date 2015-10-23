var React = require('react');
var NaviAction = require('../actions/NaviAction');
var NaviLink = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  _onClick:function(e){
    e.preventDefault();
    e.stopPropagation();
    NaviAction.pushState({
      href: this.props.href,
      title : this.props.title
    })

  },

  render: function() {
    return (
      <a {...this.props} href={this.props.href} onClick={this._onClick} >{this.props.title}</a>
    );
  }
});

module.exports = NaviLink;
