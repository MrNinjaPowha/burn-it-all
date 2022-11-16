import React from 'react';
import Upgrade from './upgrade';
const upgradesData = require('../data/upgrades.json');

export default class UpgradeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    this.onFocusIn = this.onFocusIn.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
  }

  onFocusIn() {
    this.setState(() => ({
      focused: true,
    }));
  }

  onFocusOut() {
    this.setState(() => ({
      focused: false,
    }));
  }

  render() {
    let upgradesHTML = upgradesData
      .filter(
        (upgrade) =>
          !this.props.upgrades.includes(upgrade.name) &&
          upgrade.requirements.every((requirement) => this.props.unlocks.includes(requirement)) &&
          this.props.totalEmissions >= upgrade.cost / 2
      )
      .map((upgrade) => (
        <li key={upgrade.name}>
          <Upgrade data={upgrade} onPurchase={this.props.onPurchase} />
        </li>
      ));

    if (!this.state.focused) upgradesHTML.splice(0, upgradesHTML.length - 5);

    return (
      <ul
        className="grid grid-cols-5 gap-1 p-1"
        onMouseEnter={this.onFocusIn}
        onMouseLeave={this.onFocusOut}
        onFocus={this.onFocusIn}
        onBlur={this.onFocusOut}
      >
        {upgradesHTML}
      </ul>
    );
  }
}
