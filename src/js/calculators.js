function currentCost(cost, count) {
  return Math.round(cost * Math.pow(2, 0.25 * count));
}

export default currentCost;
