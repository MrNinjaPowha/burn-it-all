import React from 'react';
import formatNumber from '../js/formatters';

export default class EmissionsCounter extends React.Component {
  render() {
    return (
      <>
        <span className="text-3xl">
          {formatNumber(Math.floor(this.props.emissions))} kgCO<sub>2</sub>
        </span>
        <span>
          {formatNumber(this.props.production)} kgCO<sub>2</sub>/s
        </span>
        <div className="h-0 text-3xl opacity-0">
          {/* Sets the max width for the parent */}
          100.000 Quadrillion kgCO<sub>2</sub>/s
        </div>
      </>
    );
  }
}
