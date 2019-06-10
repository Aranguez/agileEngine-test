import React, { Component } from 'react';

class StyleButton extends Component {

  constructor(props) {
    super(props);
    this.execCmd = (e) => {
      e.preventDefault();
      this.props.execCmd(this.props.action.type, false, this.props.action.value);
    };
  }

  render() {
    return (
      this.props.action.type !== 'forecolor' ?
        <button
          className="format-action"
          type="button"
          onClick={this.execCmd}>
            {this.props.action.label}
        </button>
        :
        <button
          className="format-action-color"
          type="button"
          onClick={this.execCmd}
          style={{backgroundColor: this.props.action.value}}>
        </button>
    );
  }
};

export default StyleButton;