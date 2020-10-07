export function formatNumber(nStr) {
  const p = parseFloat(nStr).toLocaleString('en');
  const x = p.split('.');
  let f = '';
  if (x.length > 1) {
    f = x[0] + '.' + x[1].substr(0, 2);
  } else {
    f = parseFloat(nStr).toLocaleString('en') + '.00';
  }
  return f;
}

export function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}

export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function sumBy(arr = [], param) {
  if (typeof param === 'string') {
    return arr.reduce((a, b) => {
      return a + b[param];
    }, 0);
  } else if (typeof param === 'function') {
    return arr.reduce((a = 0, b) => {
      return a + param(b);
    }, 0);
  }
}
