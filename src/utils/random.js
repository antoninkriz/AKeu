/**
 * Random gaussian function based on https://stackoverflow.com/a/49434653/3161322
 */
export const randomGaussian = () => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randomGaussian(); // resample between 0 and 1
  return num;
}

export const randomInverseGaussian = () => {
  let n = randomGaussian() - .5;
  return n < 0 ? 1 - n : n;
}