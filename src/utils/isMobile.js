const MIN_DESKTOP_WIDTH = 769;

/**
 * Check if user's device's width is smaller than minimum desktop width
 * @return {boolean} True when mobile, false otherwise
 */
export default () => (window?.innerWidth ?? 0) < MIN_DESKTOP_WIDTH;
