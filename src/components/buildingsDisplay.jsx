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
              count={values.count}
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
  render() {
    return (
      <>
        <div className="">{this.props.name}</div>
        <div className="bg-warning-pattern-horizontal h-4 w-full" />
      </>
    );
  }
}
