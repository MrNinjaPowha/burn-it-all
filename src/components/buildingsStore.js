import React from 'react';

export default class BuildingStore extends React.Component {
  render() {
    let buildings = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (this.props.totalEmissions >= values.cost / 2) {
        buildings.push(
          <li key={key}>
            <button
              className="flex w-full items-center justify-between gap-2 rounded bg-gray-200 p-2"
              onClick={() => this.props.onPurchase(key)}
            >
              <div className="flex gap-2">
                <img
                  className="aspect-square h-6 w-6 overflow-hidden"
                  src={`${process.env.PUBLIC_URL}/images/buildings/${values.image}`}
                  alt={key}
                />
                <div>
                  <h4 className="text-xl">{this.props.lang[key] || key}</h4>
                  <span>{values.cost}</span>
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
