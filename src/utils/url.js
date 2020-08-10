import foldToAscii from "./foldToAscii";

/**
 * Transforms a string to URL friendly alternative
 * @param {string} str String to be transformed
 * @param {number} maxLength Maximum result length
 * @return {string|null} URL friendly string
 */
export const toUrlFriendly = (str, maxLength = str.length) => {
  if (!str)
    return null;

  const fold = foldToAscii(str, maxLength);
  const replaceWhitespace = fold.replace(/[\s-]+/g, '-');
  return replaceWhitespace.toLowerCase();
}