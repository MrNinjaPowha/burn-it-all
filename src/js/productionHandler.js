export default class ProductionHandler {
  multipliers = {
    all: 0,
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
        this.multipliers.all *
        this.multipliers.buildings *
        (deltaTime / 1000);
    }

    return production;
  }

  getClickerProduction() {
    return this.multipliers.all * this.multipliers.clicker;
  }

  newUpgrade(upgrade) {
    upgrade.effects.forEach((effect) => {
      // Special upgrades
      if (effect.type === 'start') {
        this.multipliers.all = 1;
      }

      // Any other upgrades
      else if (this.multipliers.hasOwnProperty(effect.type)) {
        this.multipliers[effect.type] *= effect.value;
      }
    });
  }
}
