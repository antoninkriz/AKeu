export default () => ((window?.innerHeight ?? 0) > (window?.innerWidth ?? 0)) ? 'vh' : 'vw';
