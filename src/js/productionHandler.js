export default class ProductionHandler {
  multipliers = {
    fuel: 0,
    clicker: 1,
    buildings: 1,
  };

  constructor(buildingsData) {
    for (const building in buildingsData) {
      // Initializes multipliers for all building types
      this.multipliers[building] = 1;
    }
  }

  getBuildingsProduction(buildings, deltaTime) {
    /* Loops through all buildings and returns the total production */
    let production = 0;
    for (const [key, values] of Object.entries(buildings)) {
      production +=
        values.count *
        values.production *
        this.multipliers[key] *
        this.multipliers.fuel *
        this.multipliers.buildings *
        (deltaTime / 1000);
    }

    return production;
  }

  getClickerProduction() {
    return this.multipliers.fuel * this.multipliers.clicker;
  }

  newUpgrade(upgrade) {
    upgrade.effects.forEach((effect) => {
      if (effect.type === 'start') this.multipliers.fuel = 1;
      if (effect.type === 'fuel') this.multipliers.fuel = effect.value;
      else if (this.multipliers.hasOwnProperty(effect.type))
        this.multipliers[effect.type] *= effect.value;
    });
  }
}
