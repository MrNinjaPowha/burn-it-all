import React from 'react';
import buttonTexture from '../images/big-red-button.svg';
import buttonPressedTexture from '../images/big-red-button-pressed.svg';

export default class BigRedButton extends React.Component {
  render() {
    return (
      <div className="relative h-48 w-48" onClick={this.props.onClick}>
        <img
          className="absolute top-0 cursor-pointer rounded-full transition-opacity duration-100 active:opacity-0"
          src={buttonTexture}
          alt="Burn fuel"
        />
        <img
          className="absolute top-0 -z-10 cursor-pointer rounded-full"
          src={buttonPressedTexture}
          alt="Burn fuel"
        />
      </div>
    );
  }
}
