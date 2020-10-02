export const formatNumber = (nStr) => {
  nStr += '';
  // var x = nStr.split('.'); // [10] [100] [32]
  // var decimals = x[x.length - 1].length < 0 ? '00' : x[x.length - 1].substring(1,2);
  // var x1 = x[0]; // 100
  // var x2 = x.length > 1 ? '.' + x[1] : ''; // > 1 .32
  // var rgx = /(\d+)(\d{3})/;
  // while (rgx.test(x1)) {
  //   x1 = x1.replace(rgx, `${1},${2}`);
  // }
  // return x1 + x2;
  // if (x.length > 1) {
  //   // let decimals = x[x.length - 1];
  //   // console.log(decimals);
  //   // if (decimals) {
  //   //   decimals =
  //   //     x[x.length - 1].length < 0 ? '00' : x[x.length - 1].substring(1, 2);
  //   //   return parseFloat(nStr).toLocaleString('en') + '.' + decimals;
  //   // }
  // } else {
  return parseFloat(nStr).toLocaleString('en') + '.00';
  // }
};
