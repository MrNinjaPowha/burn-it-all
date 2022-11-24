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
            <button
              className="flex max-h-min w-full items-center justify-between gap-2 rounded bg-gray-200 p-2"
              onClick={() => this.props.onPurchase(key)}
            >
              <div className="flex items-center gap-2">
                <img
                  className="aspect-square w-16 overflow-hidden"
                  src={`${process.env.PUBLIC_URL}/images/buildings/${values.image}`}
                  alt={key}
                />
                <div className="flex flex-col items-start">
                  <h4 className="text-2xl">{this.props.lang[key] || key}</h4>
                  <span>{formatNumber(currentCost(values.cost, values.count))}</span>
                </div>
              </div>
              <span className="text-3xl">{values.count}</span>
            </button>
          </li>
        );
      }
    }

    return <ul className="mt-2 flex flex-col gap-2">{buildings}</ul>;
  }
}
