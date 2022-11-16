export default class ProductionHandler {
  multipliers = {
    all: 0,
    clicker: 1,
    buildings: 1,
  };

  getProduction(type) {
    return this.multipliers.all * this.multipliers[type];
  }

  newUpgrade(upgrade) {
    if (upgrade.effects[0].type === 'start') this.multipliers.all = 100;

    upgrade.effects.forEach((effect) => {
      if (this.multipliers.hasOwnProperty(effect.type))
        this.multipliers[effect.type] *= effect.value;
    });
  }
}
