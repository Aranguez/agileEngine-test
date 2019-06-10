import React, { Component } from 'react';

class SynonymButton extends Component {

  constructor(props) {
    super(props);
    this.insertHTML = (e) => {
      e.preventDefault();
      this.props.insertHTML(this.props.synonym.word);
    };
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.insertHTML }>
          {this.props.synonym.word}
      </button>
    )
  }
}

export default SynonymButton;