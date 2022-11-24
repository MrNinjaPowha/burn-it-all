import React from 'react';
import currentCost from '../js/calculators';
import formatNumber from '../js/formatters';

export default class BuildingStore extends React.Component {
  render() {
    let buildings = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (this.props.totalEmissions >= values.cost / 2) {
        buildings.push(
          <li key={key}>
            <Building
              data={{ name: key, ...values }}
              lang={this.props.lang}
              onPurchase={this.props.onPurchase}
            />
          </li>
        );
      }
    }

    return <ul className="mt-2 flex flex-col gap-2">{buildings}</ul>;
  }
}

class Building extends React.Component {
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
      <div
        className="absolute rounded border border-opacity-75 bg-black bg-opacity-75 px-2 py-1 text-sm text-white"
        style={{ left: document.getElementById('upgrade-list').getBoundingClientRect().left }}
      >
        <p className="text-lg">{this.props.lang[this.props.data.name] || this.props.data.name}</p>
        <p>
          Cost: {formatNumber(currentCost(this.props.data.cost, this.props.data.count))} kgCO
          <sub>2</sub>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          className="flex max-h-min w-full items-center justify-between gap-2 rounded bg-gray-200 p-2"
          onClick={() => this.props.onPurchase(this.props.data.name)}
          onMouseEnter={this.onFocusIn}
          onMouseLeave={this.onFocusOut}
          onFocus={this.onFocusIn}
          onBlur={this.onFocusOut}
        >
          <div className="flex items-center gap-2">
            <img
              className="aspect-square w-16 overflow-hidden"
              src={`${process.env.PUBLIC_URL}/images/buildings/${this.props.data.image}`}
              alt={this.props.data.name}
            />
            <div className="flex flex-col items-start">
              <h4 className="text-2xl">
                {this.props.lang[this.props.data.name] || this.props.data.name}
              </h4>
              <span>{formatNumber(currentCost(this.props.data.cost, this.props.data.count))}</span>
            </div>
          </div>
          <span className="text-3xl">{this.props.data.count}</span>
        </button>
        {this.state.focused ? this.getDescription() : <></>}
      </div>
    );
  }
}
