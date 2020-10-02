export const formatNumber = (nStr) => {
  nStr += '';
  var x = nStr.split('.'); // [100] [32]
  var x1 = x[0]; // 100
  var x2 = x.length > 1 ? '.' + x[1] : '.00'; // > 1 .32
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, `${1},${2}`);
  }
  return x1 + x2;
};
