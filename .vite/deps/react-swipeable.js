import {
  require_react
} from "./chunk-HAZNF34R.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/react-swipeable/es/index.js
var React = __toESM(require_react());
var LEFT = "Left";
var RIGHT = "Right";
var UP = "Up";
var DOWN = "Down";
var defaultProps = {
  delta: 10,
  preventScrollOnSwipe: false,
  rotationAngle: 0,
  trackMouse: false,
  trackTouch: true,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true }
};
var initialState = {
  first: true,
  initial: [0, 0],
  start: 0,
  swiping: false,
  xy: [0, 0]
};
var mouseMove = "mousemove";
var mouseUp = "mouseup";
var touchEnd = "touchend";
var touchMove = "touchmove";
var touchStart = "touchstart";
function getDirection(absX, absY, deltaX, deltaY) {
  if (absX > absY) {
    if (deltaX > 0) {
      return RIGHT;
    }
    return LEFT;
  } else if (deltaY > 0) {
    return DOWN;
  }
  return UP;
}
function rotateXYByAngle(pos, angle) {
  if (angle === 0)
    return pos;
  const angleInRadians = Math.PI / 180 * angle;
  const x = pos[0] * Math.cos(angleInRadians) + pos[1] * Math.sin(angleInRadians);
  const y = pos[1] * Math.cos(angleInRadians) - pos[0] * Math.sin(angleInRadians);
  return [x, y];
}
function getHandlers(set, handlerProps) {
  const onStart = (event) => {
    const isTouch = "touches" in event;
    if (isTouch && event.touches.length > 1)
      return;
    set((state, props) => {
      if (props.trackMouse && !isTouch) {
        document.addEventListener(mouseMove, onMove);
        document.addEventListener(mouseUp, onUp);
      }
      const { clientX, clientY } = isTouch ? event.touches[0] : event;
      const xy = rotateXYByAngle([clientX, clientY], props.rotationAngle);
      props.onTouchStartOrOnMouseDown && props.onTouchStartOrOnMouseDown({ event });
      return Object.assign(Object.assign(Object.assign({}, state), initialState), { initial: xy.slice(), xy, start: event.timeStamp || 0 });
    });
  };
  const onMove = (event) => {
    set((state, props) => {
      const isTouch = "touches" in event;
      if (isTouch && event.touches.length > 1) {
        return state;
      }
      if (event.timeStamp - state.start > props.swipeDuration) {
        return state.swiping ? Object.assign(Object.assign({}, state), { swiping: false }) : state;
      }
      const { clientX, clientY } = isTouch ? event.touches[0] : event;
      const [x, y] = rotateXYByAngle([clientX, clientY], props.rotationAngle);
      const deltaX = x - state.xy[0];
      const deltaY = y - state.xy[1];
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const time = (event.timeStamp || 0) - state.start;
      const velocity = Math.sqrt(absX * absX + absY * absY) / (time || 1);
      const vxvy = [deltaX / (time || 1), deltaY / (time || 1)];
      const dir = getDirection(absX, absY, deltaX, deltaY);
      const delta = typeof props.delta === "number" ? props.delta : props.delta[dir.toLowerCase()] || defaultProps.delta;
      if (absX < delta && absY < delta && !state.swiping)
        return state;
      const eventData = {
        absX,
        absY,
        deltaX,
        deltaY,
        dir,
        event,
        first: state.first,
        initial: state.initial,
        velocity,
        vxvy
      };
      eventData.first && props.onSwipeStart && props.onSwipeStart(eventData);
      props.onSwiping && props.onSwiping(eventData);
      let cancelablePageSwipe = false;
      if (props.onSwiping || props.onSwiped || props[`onSwiped${dir}`]) {
        cancelablePageSwipe = true;
      }
      if (cancelablePageSwipe && props.preventScrollOnSwipe && props.trackTouch && event.cancelable) {
        event.preventDefault();
      }
      return Object.assign(Object.assign({}, state), {
        // first is now always false
        first: false,
        eventData,
        swiping: true
      });
    });
  };
  const onEnd = (event) => {
    set((state, props) => {
      let eventData;
      if (state.swiping && state.eventData) {
        if (event.timeStamp - state.start < props.swipeDuration) {
          eventData = Object.assign(Object.assign({}, state.eventData), { event });
          props.onSwiped && props.onSwiped(eventData);
          const onSwipedDir = props[`onSwiped${eventData.dir}`];
          onSwipedDir && onSwipedDir(eventData);
        }
      } else {
        props.onTap && props.onTap({ event });
      }
      props.onTouchEndOrOnMouseUp && props.onTouchEndOrOnMouseUp({ event });
      return Object.assign(Object.assign(Object.assign({}, state), initialState), { eventData });
    });
  };
  const cleanUpMouse = () => {
    document.removeEventListener(mouseMove, onMove);
    document.removeEventListener(mouseUp, onUp);
  };
  const onUp = (e) => {
    cleanUpMouse();
    onEnd(e);
  };
  const attachTouch = (el, props) => {
    let cleanup = () => {
    };
    if (el && el.addEventListener) {
      const baseOptions = Object.assign(Object.assign({}, defaultProps.touchEventOptions), props.touchEventOptions);
      const tls = [
        [touchStart, onStart, baseOptions],
        // preventScrollOnSwipe option supersedes touchEventOptions.passive
        [
          touchMove,
          onMove,
          Object.assign(Object.assign({}, baseOptions), props.preventScrollOnSwipe ? { passive: false } : {})
        ],
        [touchEnd, onEnd, baseOptions]
      ];
      tls.forEach(([e, h, o]) => el.addEventListener(e, h, o));
      cleanup = () => tls.forEach(([e, h]) => el.removeEventListener(e, h));
    }
    return cleanup;
  };
  const onRef = (el) => {
    if (el === null)
      return;
    set((state, props) => {
      if (state.el === el)
        return state;
      const addState = {};
      if (state.el && state.el !== el && state.cleanUpTouch) {
        state.cleanUpTouch();
        addState.cleanUpTouch = void 0;
      }
      if (props.trackTouch && el) {
        addState.cleanUpTouch = attachTouch(el, props);
      }
      return Object.assign(Object.assign(Object.assign({}, state), { el }), addState);
    });
  };
  const output = {
    ref: onRef
  };
  if (handlerProps.trackMouse) {
    output.onMouseDown = onStart;
  }
  return [output, attachTouch];
}
function updateTransientState(state, props, previousProps, attachTouch) {
  if (!props.trackTouch || !state.el) {
    if (state.cleanUpTouch) {
      state.cleanUpTouch();
    }
    return Object.assign(Object.assign({}, state), { cleanUpTouch: void 0 });
  }
  if (!state.cleanUpTouch) {
    return Object.assign(Object.assign({}, state), { cleanUpTouch: attachTouch(state.el, props) });
  }
  if (props.preventScrollOnSwipe !== previousProps.preventScrollOnSwipe || props.touchEventOptions.passive !== previousProps.touchEventOptions.passive) {
    state.cleanUpTouch();
    return Object.assign(Object.assign({}, state), { cleanUpTouch: attachTouch(state.el, props) });
  }
  return state;
}
function useSwipeable(options) {
  const { trackMouse } = options;
  const transientState = React.useRef(Object.assign({}, initialState));
  const transientProps = React.useRef(Object.assign({}, defaultProps));
  const previousProps = React.useRef(Object.assign({}, transientProps.current));
  previousProps.current = Object.assign({}, transientProps.current);
  transientProps.current = Object.assign(Object.assign({}, defaultProps), options);
  let defaultKey;
  for (defaultKey in defaultProps) {
    if (transientProps.current[defaultKey] === void 0) {
      transientProps.current[defaultKey] = defaultProps[defaultKey];
    }
  }
  const [handlers, attachTouch] = React.useMemo(() => getHandlers((stateSetter) => transientState.current = stateSetter(transientState.current, transientProps.current), { trackMouse }), [trackMouse]);
  transientState.current = updateTransientState(transientState.current, transientProps.current, previousProps.current, attachTouch);
  return handlers;
}
export {
  DOWN,
  LEFT,
  RIGHT,
  UP,
  useSwipeable
};
//# sourceMappingURL=react-swipeable.js.map
