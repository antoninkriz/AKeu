const classNames = (obj) => Object.keys(obj).map(k => !!obj[k] ? k : '').filter(c => c !== '').join(' ');

export default classNames;
