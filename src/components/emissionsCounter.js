import React from 'react';
import formatNumber from '../js/formatters';

export default class EmissionsCounter extends React.Component {
  render() {
    return (
      <span className="text-3xl">
        {formatNumber(Math.floor(this.props.emissions))} kgCO<sub>2</sub>
      </span>
    );
  }
}
