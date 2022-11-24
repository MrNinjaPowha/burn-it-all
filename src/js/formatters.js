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

  if (number < lookup[0].value) return `${number}`;

  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return number >= item.value;
    });

  console.log(number / item.value);

  return (number / item.value).toFixed(3).replace(regex, '$1') + item.symbol;
}

export default formatNumber;
