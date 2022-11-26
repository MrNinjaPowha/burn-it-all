import React from 'react';
import currentCost from '../js/calculators';
import formatNumber from '../js/formatters';
import HoverDescription from './hoverDescription';

export default class BuildingStore extends React.Component {
  render() {
    let buildings = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (this.props.totalEmissions >= values.cost / 2) {
        buildings.push(
          <li key={key}>
            <Building
              data={{ name: key, ...values }}
              getProduction={this.props.getProduction}
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

    this.textName = this.props.lang[this.props.data.name] || this.props.data.name;

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
      <HoverDescription>
        <p className="text-lg">{this.textName}</p>
        <p>
          Cost: {formatNumber(currentCost(this.props.data.cost, this.props.data.count))} kgCO
          <sub>2</sub>
        </p>
        {this.props.data.count > 0 ? (
          <>
            <br />
            <p>
              Each {this.textName} produces{' '}
              {formatNumber(
                this.props.getProduction(this.props.data, 1000) / this.props.data.count
              )}{' '}
              kgCO
              <sub>2</sub>/s
            </p>
            <p>
              All {this.props.data.count} {this.textName}s produce{' '}
              {formatNumber(this.props.getProduction(this.props.data, 1000))} kgCO
              <sub>2</sub>/s
            </p>
          </>
        ) : null}
      </HoverDescription>
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
        {this.state.focused ? this.getDescription() : null}
      </div>
    );
  }
}
