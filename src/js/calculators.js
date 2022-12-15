function currentBuildingCost(cost, count) {
  return Math.round(cost * Math.pow(2, 0.25 * count));
}

function getTotalBuildingCost(building, isSelling, isMultiple) {
  let totalCost = 0;
  let amount = 1;

  if (isMultiple && isSelling) {
    amount = -Math.min(building.count, 10); // Sell 10 or max if there are less than 10 buildings
    for (let i = 0; i > amount; i--) {
      totalCost -= currentBuildingCost(building.cost, building.count + i - 1) / 2;
    }
  } else if (isMultiple) {
    amount = 10;
    for (let i = 0; i < amount; i++) {
      totalCost += currentBuildingCost(building.cost, building.count + i);
    }
  } else if (isSelling) {
    amount = -Math.min(building.count, 1); // Sell 1 or 0 if none have been bought
    if (amount) totalCost = -currentBuildingCost(building.cost, building.count - 1) / 2;
  } else {
    totalCost = currentBuildingCost(building.cost, building.count);
  }

  return [Math.round(totalCost), amount];
}

export { currentBuildingCost as currentCost, getTotalBuildingCost };
