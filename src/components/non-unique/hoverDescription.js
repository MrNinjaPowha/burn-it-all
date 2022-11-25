import React from 'react';

export default class HoverDescription extends React.Component {
  render() {
    return (
      <div
        className="absolute rounded border border-opacity-75 bg-black bg-opacity-75 px-2 py-1 text-sm text-white"
        style={{
          left: this.props.left || 'auto',
          right: this.props.right || 'auto',
          top: this.props.top || 'auto',
          bottom: this.props.bottom || 'auto',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
