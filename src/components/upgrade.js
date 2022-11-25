import React from 'react';
import HoverDescription from './non-unique/hoverDescription';

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
    return (
      <HoverDescription left={document.getElementById('upgrade-list').getBoundingClientRect().left}>
        <p className="text-lg">
          {this.props.lang.upgrades[this.props.data.name] || this.props.data.name}
        </p>
        <p>
          Cost: {this.props.data.cost} kgCO<sub>2</sub>
        </p>
        <br />
        {this.props.data.effects.map((effect) =>
          this.props.lang.upgradeDescriptions.hasOwnProperty(effect.type) ? (
            <p
              key={effect.type}
              dangerouslySetInnerHTML={{
                __html: this.props.lang.upgradeDescriptions[effect.type].replace(
                  '#val',
                  effect.value
                ),
              }}
            />
          ) : (
            <p key={effect.type}>???</p>
          )
        )}
      </HoverDescription>
    );
  }

  render() {
    return (
      <div>
        <button
          className="upgrade aspect-square w-full"
          onClick={() => this.props.onPurchase(this.props.data)}
          onMouseEnter={this.onFocusIn}
          onMouseLeave={this.onFocusOut}
          onFocus={this.onFocusIn}
          onBlur={this.onFocusOut}
        >
          <img
            className="overflow-hidden"
            src={`${process.env.PUBLIC_URL}/images/upgrades/${this.props.data.image}`}
            alt={this.props.data.name}
          />
        </button>
        {this.state.focused ? this.getDescription() : null}
      </div>
    );
  }
}
