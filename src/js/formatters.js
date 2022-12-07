function formatNumber(number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e6, symbol: ' Million' },
    { value: 1e9, symbol: ' Billion' },
    { value: 1e12, symbol: ' Trillion' },
    { value: 1e15, symbol: ' Quadrillion' },
    { value: 1e18, symbol: ' Quintillion' },
    { value: 1e18, symbol: ' Sextillion' },
  ];

  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item =
    lookup
      .slice()
      .reverse()
      .find((item) => {
        return number >= item.value;
      }) || lookup[0];

  if (number < 1000) {
    number = Math.round((number + Number.EPSILON) * 10) / 10;
  } else {
    number = Math.round(number);
  }

  return (number / item.value).toFixed(3).replace(regex, '$1') + item.symbol;
}

export default formatNumber;
