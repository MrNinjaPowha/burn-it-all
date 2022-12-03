import React from 'react';

export default class BuildingsDisplay extends React.Component {
  render() {
    let frames = [];

    for (const [key, values] of Object.entries(this.props.buildings)) {
      if (values.count) {
        frames.push(
          <li key={key}>
            <DisplayCanvas name={key} data={values} />
            <div className="bg-warning-pattern-horizontal h-4" />
          </li>
        );
      }
    }

    return frames.length ? <ul className="flex flex-col">{frames}</ul> : null;
  }
}

class DisplayCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.frame = null;
    this.imageRefs = [];

    this.setFrame = (element) => (this.frame = element);
  }

  renderImages() {
    let images = [];

    for (let i = 0; i < this.props.data.count; i++) {
      const style = {
        position: 'absolute',
        height: `${100 * this.props.data.display.size}%`,
        width: 'auto',
        bottom: `${100 - 100 * this.props.data.display.rows[i % 3] + 5 * Math.random()}%`,
        left: `${Math.floor(i / 3) * 30 + 5 * Math.random()}px`,
        zIndex: i % 3,
      };

      if (this.imageRefs[i]) {
        // Prevents rerandomization of image positions
        style.left = this.imageRefs[i].style.left;
        style.bottom = this.imageRefs[i].style.bottom;
      }

      images.push(
        <img
          style={style}
          key={i}
          ref={(ref) => (this.imageRefs[i] = ref)}
          src={`${process.env.PUBLIC_URL}/images/buildings/${this.props.data.image}`}
          alt={this.props.name}
        />
      );
    }

    return images;
  }

  render() {
    return (
      <div className="relative h-28 w-full overflow-hidden" ref={this.setFrame}>
        {this.renderImages()}
      </div>
    );
  }
}
