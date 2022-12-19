function formatNumber(number, removeTrailing = true) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e6, symbol: ' Million' },
    { value: 1e9, symbol: ' Billion' },
    { value: 1e12, symbol: ' Trillion' },
    { value: 1e15, symbol: ' Quadrillion' },
    { value: 1e18, symbol: ' Quintillion' },
    { value: 1e21, symbol: ' Sextillion' },
  ];

  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item =
    lookup
      .slice()
      .reverse()
      .find((item) => {
        return number >= item.value;
      }) || lookup[0];

  if (number < 1000) {
    // Round numbers smaller than 1,000 to one decimal point
    number = Math.round((number + Number.EPSILON) * 10) / 10;
  } else {
    number = Math.round(number);
  }

  if (number < lookup[1].value) {
    return number.toLocaleString('en-US');
  }

  let formattedString = (number / item.value).toFixed(3);
  if (removeTrailing) formattedString = formattedString.replace(regex, '$1');

  return formattedString + item.symbol;
}

export default formatNumber;
