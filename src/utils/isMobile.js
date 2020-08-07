const MIN_DESKTOP_WIDTH = 769;

export default () => (window?.innerWidth ?? 0) < MIN_DESKTOP_WIDTH;
