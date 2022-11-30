import React from 'react';

export default class BuildingsDisplay extends React.Component {
  render() {
    let frames = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (values.count) {
        frames.push(
          <li key={key}>
            <DisplayFrame
              name={key}
              data={values}
              upgrades={this.props.upgrades}
              lang={this.props.lang}
            />
          </li>
        );
      }
    }

    return frames.length ? <ul className="flex flex-col">{frames}</ul> : null;
  }
}

class DisplayFrame extends React.Component {
  rowsPerSize = {
    small: 4,
    medium: 3,
    large: 2,
  };

  renderRow(currentRow) {
    let images = [];

    for (
      let i = currentRow;
      i < this.props.data.count;
      i += this.rowsPerSize[this.props.data.size]
    ) {
      images.push(
        <li>
          <img
            className="object-contain"
            key={`img${i}`}
            src={`${process.env.PUBLIC_URL}/images/buildings/${this.props.data.image}`}
            alt={this.props.name}
          />
        </li>
      );
    }

    return (
      <ul className="flex gap-1" key={`row${currentRow}`}>
        {images}
      </ul>
    );
  }

  render() {
    let rows = [];

    for (let i = 0; i < this.rowsPerSize[this.props.data.size]; i++) {
      rows.push(<li>{this.renderRow(i)}</li>);
    }

    return (
      <>
        <ul
          className={`display-bg-${this.props.data.background} flex h-24 flex-col justify-evenly gap-1`}
        >
          {rows}
        </ul>
        <div className="bg-warning-pattern-horizontal h-4 w-full" />
      </>
    );
  }
}
