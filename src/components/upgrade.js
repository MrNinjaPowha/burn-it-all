import React from 'react';
const types = require('../data/upgradeTypes.json');

export default class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    this.desc = props.data.effects.map((effect) => types[effect.type].desc);

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
      <div
        className="absolute rounded border border-opacity-75 bg-black bg-opacity-75 px-2 py-1 text-sm text-white"
        style={{ left: document.getElementById('upgrade-list').getBoundingClientRect().left }}
      >
        <p>
          Cost: {this.props.data.cost} kgCO<sub>2</sub>
        </p>
        <br />
        {this.props.data.effects.map((effect) => (
          <p
            key={effect.type}
            dangerouslySetInnerHTML={{
              __html: types[effect.type].desc.replace('#val', effect.value),
            }}
          />
        ))}
      </div>
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
            src={`${process.env.PUBLIC_URL}/images/upgrades/${this.props.data.image}`}
            alt={this.props.data.name}
          />
        </button>
        {this.state.focused ? this.getDescription() : <></>}
      </div>
    );
  }
}
