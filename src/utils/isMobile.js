const MIN_DESKTOP_WIDTH = 769;

/**
 * Check if user's device's width is smaller than minimum desktop width
 * @return {boolean} True when mobile, false otherwise
 */
export const isMobile = () => (window?.innerWidth ?? 0) < MIN_DESKTOP_WIDTH;

/**
 * Fuckwits at Safari somehow managed to fuck up the hexagon image so I have to check for it now...
 * @returns {boolean} True when the browser is Safari, false otherwise
 */
export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

