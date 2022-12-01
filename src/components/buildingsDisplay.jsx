import React from 'react';

export default class BuildingsDisplay extends React.Component {
  render() {
    let frames = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (values.count) {
        frames.push(
          <li key={key} className="h-32">
            <DisplayCanvas id={key} data={values} />
            <div className="bg-warning-pattern-horizontal h-4" />
          </li>
        );
      }
    }

    return frames.length ? <ul className="flex flex-col">{frames}</ul> : null;
  }
}

class DisplayCanvas extends React.Component {
  render() {
    return <canvas id={this.props.id} />;
  }
}
