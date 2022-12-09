function currentCost(cost, count) {
  return Math.round(cost * Math.pow(2, 0.25 * count));
}

function getTotalCost(building, isSelling, isMultiple) {
  let totalCost = 0;
  let amount = 1;

  if (isMultiple && isSelling) {
    amount = -Math.min(building.count, 10);
    for (let i = 0; i > amount; i--) {
      totalCost -= currentCost(building.cost, building.count + i - 1) / 2;
    }
  } else if (isMultiple) {
    amount = 10;
    for (let i = 0; i < amount; i++) {
      totalCost += currentCost(building.cost, building.count + i);
    }
  } else if (isSelling) {
    amount = -Math.min(building.count, 1);
    if (amount) totalCost = -currentCost(building.cost, building.count - 1) / 2;
  } else {
    totalCost = currentCost(building.cost, building.count);
  }

  return [Math.round(totalCost), amount];
}

export { currentCost, getTotalCost };
