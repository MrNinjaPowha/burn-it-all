export default class ProductionHandler {
  multipliers = {
    fuel: 0,
    clicker: 1,
    buildings: 1,
  };

  getProduction(type) {
    return this.multipliers.fuel * this.multipliers[type];
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
