import React from 'react';
import { getTotalBuildingCost } from '../js/calculators';
import formatNumber from '../js/formatters';
import HoverDescription from './hoverDescription';

export default class BuildingStore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shiftKey: false,
      ctrlKey: false,
    };

    window.onkeydown = (e) => this.updateKeys(e);
    window.onkeyup = (e) => this.updateKeys(e);
    // Prevents it from getting locked to true after tabbing out unless you keep the mouse completly still
    window.onmousemove = (e) => this.updateKeys(e);
  }

  updateKeys(event) {
    if (event.shiftKey !== this.state.shiftKey || event.ctrlKey !== this.state.ctrlKey) {
      this.setState({
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
      });
    }
  }

  render() {
    let buildings = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (this.props.totalEmissions >= values.cost / 2 - 10) {
        const [totalCost, amount] = getTotalBuildingCost(
          values,
          this.state.shiftKey,
          this.state.ctrlKey
        );

        buildings.push(
          <li key={key}>
            <Building
              data={{ name: key, ...values }}
              canAfford={
                this.props.currentEmissions >= totalCost &&
                !(this.state.shiftKey && values.count < 1)
              }
              amountToPurchase={amount}
              keysDown={this.state}
              totalCost={totalCost}
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
          {(this.props.keysDown.shiftKey ? `Sell` : `Buy`) +
            ` ${Math.abs(this.props.amountToPurchase)} for: ` +
            formatNumber(Math.abs(this.props.totalCost))}{' '}
          kgCO
          <sub>2</sub>
        </p>
        <br />
        <p>
          Each {this.textName} produces{' '}
          {formatNumber(this.props.getProduction({ ...this.props.data, count: 1 }, 1000))} kgCO
          <sub>2</sub>/s
        </p>
        <p>
          All {this.props.data.count} {this.textName}s produce{' '}
          {formatNumber(this.props.getProduction(this.props.data, 1000))} kgCO
          <sub>2</sub>/s
        </p>
      </HoverDescription>
    );
  }

  render() {
    return (
      <div className="relative">
        <button
          className="flex max-h-min w-full items-center justify-between gap-2 rounded bg-gray-200 p-2 shadow transition duration-150 ease-in-out hover:scale-[98%] hover:bg-gray-300 hover:shadow-lg focus-visible:scale-[98%] focus-visible:bg-gray-300 focus-visible:shadow-lg active:bg-gray-400 active:shadow-lg"
          onClick={(event) => this.props.onPurchase(event, this.props.data.name)}
          onMouseEnter={this.onFocusIn}
          onMouseLeave={this.onFocusOut}
          onFocus={this.onFocusIn}
          onBlur={this.onFocusOut}
          data-can-afford={this.props.canAfford}
        >
          <div className="flex items-center gap-2">
            <img
              className="aspect-square w-16"
              src={`${process.env.PUBLIC_URL}/images/buildings/${this.props.data.image}`}
              alt={this.props.data.name}
            />
            <div className="flex flex-col items-start">
              <h4 className="text-2xl">
                {this.props.lang[this.props.data.name] || this.props.data.name}
              </h4>
              <span
                className="data-[is-selling=true]:text-red-700"
                data-is-selling={this.props.keysDown.shiftKey}
              >
                {formatNumber(Math.abs(this.props.totalCost))}
              </span>
            </div>
          </div>
          <span className="text-3xl">{this.props.data.count}</span>
        </button>
        {this.state.focused ? this.getDescription() : null}
      </div>
    );
  }
}
