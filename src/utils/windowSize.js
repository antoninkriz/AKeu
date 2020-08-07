import {useLayoutEffect, useState} from "react";

/**
 * Hook to get the window size and / or rerender component on window resize
 */
export default () => {
  const [, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
};
