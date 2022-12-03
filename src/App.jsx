import React from 'react';
import './App.css';
import BigRedButton from './components/bigRedButton';
import BuildingsDisplay from './components/buildingsDisplay';
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
    ...building,
    count: 0,
  };
});

export default class App extends React.Component {
  productionHandler = new ProductionHandler(buildingsData);
  lastUpdate = Date.now();

  constructor(props) {
    super(props);
    this.state = {
      currentEmissions: 10000000000,
      totalEmissions: 10000000000,
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
    if (this.state.currentEmissions >= upgrade.cost) {
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
        unlocks: [...state.unlocks, building],
        currentEmissions: state.currentEmissions - cost,
      }));
    }
  }

  render() {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <div className="w-full py-2 px-4 shadow">
          <h1 className="text-5xl">Burn It All</h1>
        </div>
        <div className="flex h-full w-full grid-cols-5">
          <div className="flex h-full w-1/5 min-w-max flex-col items-center p-8">
            <EmissionsCounter
              emissions={this.state.currentEmissions}
              production={this.productionHandler.getBuildingsProduction(this.state.buildings, 1000)}
              lang={this.state.lang}
            />
            <BigRedButton
              onClick={() => this.addEmissions(this.productionHandler.getClickerProduction())}
            />
          </div>
          <div className="bg-warning-pattern min-w-4" />
          <div className="min-w-0 flex-grow overflow-hidden overflow-y-auto after:block">
            <BuildingsDisplay
              buildings={this.state.buildings}
              upgrades={this.state.upgrades}
              lang={this.state.lang}
            />
            <div>{Array(2).fill(<br />)}</div>
          </div>
          <div className="bg-warning-pattern min-w-4" />
          <div className="w-1/4 min-w-[25%] overflow-y-auto p-2 after:block after:h-44">
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
