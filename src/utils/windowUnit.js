/**
 * Returns 'vh' when window height is greater than width, 'vw' otherwise
 * @return {string} 'vh' or 'vw' unit
 */
export default () => ((window?.innerHeight ?? 0) > (window?.innerWidth ?? 0)) ? 'vh' : 'vw';
