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
      .sort((a, b) => a.cost - b.cost)
      .map((upgrade) => (
        <li key={upgrade.name}>
          <Upgrade
            data={upgrade}
            onPurchase={this.props.onPurchase}
            canAfford={this.props.currentEmissions >= upgrade.cost}
            lang={this.props.lang}
          />
        </li>
      ));

    // If the list is not focused show only one row to not fill too much space
    if (!this.state.focused) upgradesHTML.splice(5);

    return (
      <ul
        id="upgrade-list"
        className="grid grid-cols-5 p-1"
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
