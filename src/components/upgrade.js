import React from 'react';

export default class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.img = require('../images/placeholder.png');
  }

  render() {
    return (
      <button
        className="upgrade aspect-square w-full"
        onClick={() => this.props.onPurchase(this.props.data)}
      >
        <img src={this.img} alt={this.props.data.name} />
      </button>
    );
  }
}
