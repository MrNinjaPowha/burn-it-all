import React from 'react';
import './App.css';
import EmissionsCounter from './components/emissionsCounter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEmissions: 0,
    };

    this.mainClick = this.mainClick.bind(this);
  }

  mainClick() {
    this.setState({
      currentEmissions: this.state.currentEmissions + 1,
    });
  }

  render() {
    return (
      <div className="h-screen w-screen">
        <div className="w-full py-2 px-4 shadow">
          <h1 className="text-5xl">Burn It All</h1>
        </div>
        <div className="flex h-full">
          <div className="relative flex w-1/5 flex-col items-center p-8">
            <EmissionsCounter emissions={this.state.currentEmissions} />
            <button onClick={this.mainClick}>BURN FUEL!</button>
          </div>
          <div className="flex-1 shadow-inner"></div>
          <div className="w-1/4"></div>
        </div>
      </div>
    );
  }
}
