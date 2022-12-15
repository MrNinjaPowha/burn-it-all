import React from 'react';
import formatNumber from '../js/formatters';
import HoverDescription from './hoverDescription';

export default class Upgrade extends React.Component {
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

  getDescription() {
    const effectsDescription = this.props.data.effects.map((effect) => {
      let valueString = '';

      if (effect.value < 2) {
        // If value is lower than 2 it will be shown as a percantage increase
        valueString = `${(effect.value - 1).toFixed(2) * 100}%`;
      } else {
        valueString = `${effect.value}x`;
      }

      return this.props.lang.upgradeDescriptions.hasOwnProperty(effect.type) ? (
        <p
          key={effect.type}
          dangerouslySetInnerHTML={{
            __html: this.props.lang.upgradeDescriptions[effect.type].replace('#val', valueString),
          }}
        />
      ) : (
        <p key={effect.type}>???</p>
      );
    });

    return (
      <HoverDescription
        left={
          /* Left side of the whole grid which would break with position:relative */
          document.getElementById('upgrade-list').getBoundingClientRect().left
        }
        top={
          /* The bottom of this upgrade button since position:relative cannot be used */
          document.getElementById(this.props.data.name).getBoundingClientRect().bottom
        }
      >
        <p className="text-lg">
          {this.props.lang.upgrades[this.props.data.name] || this.props.data.name}
        </p>
        <p>
          Cost: {formatNumber(this.props.data.cost)} kgCO<sub>2</sub>
        </p>
        <br />
        {effectsDescription}
      </HoverDescription>
    );
  }

  render() {
    return (
      <div id={this.props.data.name}>
        <button
          className="upgrade aspect-square w-full"
          onClick={() => this.props.onPurchase(this.props.data)}
          onMouseEnter={this.onFocusIn}
          onMouseLeave={this.onFocusOut}
          onFocus={this.onFocusIn}
          onBlur={this.onFocusOut}
          data-can-afford={this.props.canAfford}
        >
          <img
            style={{}}
            src={`${process.env.PUBLIC_URL}/images/upgrades/${this.props.data.image}`}
            alt={this.props.data.name}
          />
        </button>
        {this.state.focused ? this.getDescription() : null}
      </div>
    );
  }
}
