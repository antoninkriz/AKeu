import React, {useEffect} from "react";
import {animated, useSpring} from "react-spring";

import './Triangles.scss'

const springsConfig = {
  parallax: {mass: 10, tension: 550, friction: 150},
}

const toPercentMove = (n, p, w) => (((n - (w / 2)) / 100) * (p * 100));

const transitions = {
  triangle: {
    back: {
      transform: (x, y) => `translate(${-toPercentMove(x, 0.075, window.innerWidth)}px,${-toPercentMove(y, 0.075, window.innerHeight)}px)`
    },
    front: {
      transform: (x, y) => `translate(${toPercentMove(x, 0.05, window.innerWidth)}px,${toPercentMove(y, 0.05, window.innerHeight)}px)`
    },
  },
}

const calcCursorCenterPos = (x, y) => [x - (window.innerWidth / 2), y - (window.innerHeight / 2)]

const Triangles = () => {
  const [parallaxProps, parallaxSet] = useSpring(() => ({
    xy: [0, 0],
    config: springsConfig.parallax
  }));

  useEffect(() => {
    const parallaxUpdate = ({clientX: x, clientY: y}) => parallaxSet({xy: calcCursorCenterPos(x, y)});
    window.addEventListener('mousemove', parallaxUpdate);

    return () => {
      window.removeEventListener('mousemove', parallaxUpdate);
    };
  }, [parallaxSet]);

  return (
    <div className="parallax" onMouseMove={({clientX: x, clientY: y}) => parallaxSet({xy: calcCursorCenterPos(x, y)})}>
      <animated.div className="parallax__triangle parallax__triangle--back" style={{
        transform: parallaxProps.xy.interpolate(transitions.triangle.back.transform),
      }}/>
      <animated.div className="parallax__triangle parallax__triangle--front" style={{
        transform: parallaxProps.xy.interpolate(transitions.triangle.front.transform),
      }}/>
    </div>
  );
}

export default Triangles;
