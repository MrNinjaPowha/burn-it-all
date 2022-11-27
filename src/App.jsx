import React from 'react';
import './App.css';
import BigRedButton from './components/bigRedButton';
import BuildingStore from './components/buildingsStore';
import EmissionsCounter from './components/emissionsCounter';
import UpgradeList from './components/upgradeList';
import currentCost from './js/calculators';
import ProductionHandler from './js/productionHandler';
const buildingsJson = require('./data/buildings.json');
const lang_en_US = require('./lang/en_US.json');

let buildingsData = {};
buildingsJson.forEach((building) => {
  buildingsData[building.name] = {
    cost: building.cost,
    production: building.production,
    count: 0,
  };
});

export default class App extends React.Component {
  productionHandler = new ProductionHandler(buildingsData);
  lastUpdate = Date.now();

  constructor(props) {
    super(props);
    this.state = {
      currentEmissions: 0,
      totalEmissions: 0,
      unlocks: [],
      upgrades: [],
      buildings: buildingsData,
      lang: lang_en_US,
    };

    this.addEmissions = this.addEmissions.bind(this);
    this.gainPassiveEmissions = this.gainPassiveEmissions.bind(this);
    this.getSingleBuildingProduction = this.getSingleBuildingProduction.bind(this);
    this.onUpgradePurchase = this.onUpgradePurchase.bind(this);
    this.onBuildingPurchase = this.onBuildingPurchase.bind(this);
  }

  componentDidMount() {
    this.update = setInterval(() => this.gainPassiveEmissions(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  addEmissions(amount) {
    this.setState((state) => ({
      currentEmissions: state.currentEmissions + amount,
      totalEmissions: state.totalEmissions + amount,
    }));
  }

  gainPassiveEmissions() {
    const now = Date.now();
    const deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;

    const production = this.productionHandler.getBuildingsProduction(
      this.state.buildings,
      deltaTime
    );

    this.addEmissions(production);
  }

  getSingleBuildingProduction(buildingData) {
    let building = {};
    building[buildingData.name] = buildingData;

    return this.productionHandler.getBuildingsProduction(building, 1000);
  }

  onUpgradePurchase(upgrade) {
    if (this.state.totalEmissions >= upgrade.cost) {
      this.productionHandler.newUpgrade(upgrade);

      this.setState((state) => ({
        upgrades: [...state.upgrades, upgrade.name],
        unlocks: [...state.unlocks, upgrade.name],
        currentEmissions: state.currentEmissions - upgrade.cost,
      }));
    }
  }

  onBuildingPurchase(building) {
    const cost = currentCost(
      this.state.buildings[building].cost,
      this.state.buildings[building].count
    );
    if (this.state.currentEmissions >= cost) {
      let newBuildings = this.state.buildings;
      newBuildings[building].count += 1;

      this.setState((state) => ({
        buildings: newBuildings,
        currentEmissions: state.currentEmissions - cost,
      }));
    }
  }

  render() {
    return (
      <div className="h-full w-full">
        <div className="w-full py-2 px-4 shadow">
          <h1 className="text-5xl">Burn It All</h1>
        </div>
        <div className="flex h-full">
          <div className="flex w-1/5 min-w-max flex-col items-center p-8">
            <EmissionsCounter
              emissions={this.state.currentEmissions}
              production={this.productionHandler.getBuildingsProduction(this.state.buildings, 1000)}
              lang={this.state.lang}
            />
            <BigRedButton
              onClick={() => this.addEmissions(this.productionHandler.getClickerProduction())}
            />
          </div>
          <div className="flex-1 shadow-inner"></div>
          <div className="flex w-1/4 min-w-min flex-col overflow-auto p-2">
            <h2 className="font-header text-center text-3xl">Shop!</h2>
            <h3 className="pt-2 text-2xl">Upgrades</h3>
            <UpgradeList
              upgrades={this.state.upgrades}
              unlocks={this.state.unlocks}
              totalEmissions={this.state.totalEmissions}
              onPurchase={this.onUpgradePurchase}
              lang={this.state.lang}
            />
            <h3 className="pt-2 text-2xl">Buildings</h3>
            <BuildingStore
              buildings={this.state.buildings}
              getProduction={this.getSingleBuildingProduction}
              totalEmissions={this.state.totalEmissions}
              onPurchase={this.onBuildingPurchase}
              lang={this.state.lang.buildings}
            />
          </div>
        </div>
      </div>
    );
  }
}
