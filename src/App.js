import React from 'react';
import './App.css';
import EmissionsCounter from './components/emissionsCounter';
import UpgradeList from './components/upgradeList';
import ProductionHandler from './js/productionHandler';

export default class App extends React.Component {
  productionHandler = new ProductionHandler();

  constructor(props) {
    super(props);
    this.state = {
      currentEmissions: 0,
      totalEmissions: 0,
      unlocks: [],
      upgrades: [],
    };

    this.onClickerClick = this.onClickerClick.bind(this);
    this.onPurchase = this.onPurchase.bind(this);
  }

  onClickerClick() {
    const production = this.productionHandler.getProduction('clicker');
    this.setState((state) => ({
      currentEmissions: state.currentEmissions + production,
      totalEmissions: state.totalEmissions + production,
    }));
  }

  onPurchase(upgrade) {
    this.productionHandler.newUpgrade(upgrade);
    this.state.upgrades.push(upgrade.name);
    this.state.unlocks.push(upgrade.name);

    this.setState(this.state);
  }

  render() {
    return (
      <div className="h-full w-full">
        <div className="w-full py-2 px-4 shadow">
          <h1 className="text-5xl">Burn It All</h1>
        </div>
        <div className="flex h-full">
          <div className="flex w-1/5 min-w-max flex-col items-center p-8">
            <EmissionsCounter emissions={this.state.currentEmissions} />
            <button onClick={this.onClickerClick}>BURN FUEL!</button>
          </div>
          <div className="flex-1 shadow-inner"></div>
          <div className="flex w-1/4 min-w-min flex-col overflow-auto p-2">
            <h2 className="font-header text-center text-3xl">Shop!</h2>
            <h3 className="pt-2">Upgrades</h3>
            <UpgradeList
              upgrades={this.state.upgrades}
              unlocks={this.state.unlocks}
              totalEmissions={this.state.totalEmissions}
              onPurchase={this.onPurchase}
            />
            <h3 className="pt-2">Buildings</h3>
          </div>
        </div>
      </div>
    );
  }
}
