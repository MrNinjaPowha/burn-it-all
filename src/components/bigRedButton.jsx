import React from 'react';
import buttonTexture from '../images/big-red-button.svg';
import buttonPressedTexture from '../images/big-red-button-pressed.svg';

export default class BigRedButton extends React.Component {
  render() {
    return (
      <button className="relative h-48 w-48 rounded-full" onClick={this.props.onClick}>
        <img
          className="absolute top-0 z-10 rounded-full transition-opacity duration-75 active:opacity-0"
          src={buttonTexture}
          alt="Burn fuel"
        />
        <img className="absolute top-0 rounded-full" src={buttonPressedTexture} alt="Burn fuel" />
      </button>
    );
  }
}
