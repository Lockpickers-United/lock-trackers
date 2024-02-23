import {
  Drawer_default,
  getAnchor,
  isHorizontal
} from "./chunk-BDVDKVCM.js";
import {
  NoSsr
} from "./chunk-ZRXWE4O6.js";
import {
  getTransitionProps
} from "./chunk-J6RQQO32.js";
import {
  useTheme
} from "./chunk-LDJGHHXU.js";
import {
  require_react_dom
} from "./chunk-4ZSTBHIF.js";
import {
  init_ownerDocument,
  init_ownerWindow,
  ownerDocument_default,
  ownerWindow_default
} from "./chunk-6PVKZL4A.js";
import {
  init_useEnhancedEffect,
  useEnhancedEffect_default
} from "./chunk-XO7UAKXT.js";
import {
  init_useEventCallback,
  useEventCallback_default
} from "./chunk-GSXBM53B.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-NCCGJ2AA.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-SAXTCRWB.js";
import {
  init_styled,
  rootShouldForwardProp,
  styled_default
} from "./chunk-M2QJNYU2.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  elementTypeAcceptingRef_default,
  init_clsx,
  init_esm,
  init_esm2,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_prop_types,
  useThemeProps
} from "./chunk-6SRP4SCQ.js";
import {
  require_jsx_runtime
} from "./chunk-2BVVOUCG.js";
import {
  require_react
} from "./chunk-HAZNF34R.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
init_extends();
init_objectWithoutPropertiesLoose();
var React2 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var import_prop_types2 = __toESM(require_prop_types());
init_esm();
init_esm2();
init_useForkRef();
init_ownerDocument();
init_ownerWindow();
init_useEventCallback();
init_useEnhancedEffect();

// node_modules/@mui/material/SwipeableDrawer/SwipeArea.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_styled();
init_capitalize();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["anchor", "classes", "className", "width", "style"];
var SwipeAreaRoot = styled_default("div", {
  shouldForwardProp: rootShouldForwardProp
})(({
  theme,
  ownerState
}) => _extends({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1
}, ownerState.anchor === "left" && {
  right: "auto"
}, ownerState.anchor === "right" && {
  left: "auto",
  right: 0
}, ownerState.anchor === "top" && {
  bottom: "auto",
  right: 0
}, ownerState.anchor === "bottom" && {
  top: "auto",
  bottom: 0,
  right: 0
}));
var SwipeArea = React.forwardRef(function SwipeArea2(props, ref) {
  const {
    anchor,
    classes = {},
    className,
    width,
    style
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
  return (0, import_jsx_runtime.jsx)(SwipeAreaRoot, _extends({
    className: clsx_default("PrivateSwipeArea-root", classes.root, classes[`anchor${capitalize_default(anchor)}`], className),
    ref,
    style: _extends({
      [isHorizontal(anchor) ? "width" : "height"]: width
    }, style),
    ownerState
  }, other));
});
true ? SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: import_prop_types.default.oneOf(["left", "top", "right", "bottom"]).isRequired,
  /**
   * @ignore
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The width of the left most (or right most) area in `px` where the
   * drawer can be swiped open from.
   */
  width: import_prop_types.default.number.isRequired
} : void 0;
var SwipeArea_default = SwipeArea;

// node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["BackdropProps"];
var _excluded22 = ["anchor", "disableBackdropTransition", "disableDiscovery", "disableSwipeToOpen", "hideBackdrop", "hysteresis", "allowSwipeInChildren", "minFlingVelocity", "ModalProps", "onClose", "onOpen", "open", "PaperProps", "SwipeAreaProps", "swipeAreaWidth", "transitionDuration", "variant"];
var UNCERTAINTY_THRESHOLD = 3;
var DRAG_STARTED_SIGNAL = 20;
var claimedSwipeInstance = null;
function calculateCurrentX(anchor, touches, doc) {
  return anchor === "right" ? doc.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}
function calculateCurrentY(anchor, touches, containerWindow) {
  return anchor === "bottom" ? containerWindow.innerHeight - touches[0].clientY : touches[0].clientY;
}
function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}
function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(Math.max(open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate, 0), maxTranslate);
}
function getDomTreeShapes(element, rootNode) {
  const domTreeShapes = [];
  while (element && element !== rootNode.parentElement) {
    const style = ownerWindow_default(rootNode).getComputedStyle(element);
    if (
      // Ignore the scroll children if the element is absolute positioned.
      style.getPropertyValue("position") === "absolute" || // Ignore the scroll children if the element has an overflowX hidden
      style.getPropertyValue("overflow-x") === "hidden"
    ) {
    } else if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth || element.clientHeight > 0 && element.scrollHeight > element.clientHeight) {
      domTreeShapes.push(element);
    }
    element = element.parentElement;
  }
  return domTreeShapes;
}
function computeHasNativeHandler({
  domTreeShapes,
  start,
  current,
  anchor
}) {
  const axisProperties = {
    scrollPosition: {
      x: "scrollLeft",
      y: "scrollTop"
    },
    scrollLength: {
      x: "scrollWidth",
      y: "scrollHeight"
    },
    clientLength: {
      x: "clientWidth",
      y: "clientHeight"
    }
  };
  return domTreeShapes.some((shape) => {
    let goingForward = current >= start;
    if (anchor === "top" || anchor === "left") {
      goingForward = !goingForward;
    }
    const axis = anchor === "left" || anchor === "right" ? "x" : "y";
    const scrollPosition = Math.round(shape[axisProperties.scrollPosition[axis]]);
    const areNotAtStart = scrollPosition > 0;
    const areNotAtEnd = scrollPosition + shape[axisProperties.clientLength[axis]] < shape[axisProperties.scrollLength[axis]];
    if (goingForward && areNotAtEnd || !goingForward && areNotAtStart) {
      return true;
    }
    return false;
  });
}
var iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
var SwipeableDrawer = React2.forwardRef(function SwipeableDrawer2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiSwipeableDrawer",
    props: inProps
  });
  const theme = useTheme();
  const transitionDurationDefault = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    anchor = "left",
    disableBackdropTransition = false,
    disableDiscovery = false,
    disableSwipeToOpen = iOS,
    hideBackdrop,
    hysteresis = 0.52,
    allowSwipeInChildren = false,
    minFlingVelocity = 450,
    ModalProps: {
      BackdropProps
    } = {},
    onClose,
    onOpen,
    open = false,
    PaperProps = {},
    SwipeAreaProps,
    swipeAreaWidth = 20,
    transitionDuration = transitionDurationDefault,
    variant = "temporary"
    // Mobile first.
  } = props, ModalPropsProp = _objectWithoutPropertiesLoose(props.ModalProps, _excluded2), other = _objectWithoutPropertiesLoose(props, _excluded22);
  const [maybeSwiping, setMaybeSwiping] = React2.useState(false);
  const swipeInstance = React2.useRef({
    isSwiping: null
  });
  const swipeAreaRef = React2.useRef();
  const backdropRef = React2.useRef();
  const paperRef = React2.useRef();
  const handleRef = useForkRef_default(PaperProps.ref, paperRef);
  const touchDetected = React2.useRef(false);
  const calculatedDurationRef = React2.useRef();
  useEnhancedEffect_default(() => {
    calculatedDurationRef.current = null;
  }, [open]);
  const setPosition = React2.useCallback((translate, options = {}) => {
    const {
      mode = null,
      changeTransition = true
    } = options;
    const anchorRtl = getAnchor(theme, anchor);
    const rtlTranslateMultiplier = ["right", "bottom"].indexOf(anchorRtl) !== -1 ? 1 : -1;
    const horizontalSwipe = isHorizontal(anchor);
    const transform = horizontalSwipe ? `translate(${rtlTranslateMultiplier * translate}px, 0)` : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    const drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    let transition = "";
    if (mode) {
      transition = theme.transitions.create("all", getTransitionProps({
        easing: void 0,
        style: void 0,
        timeout: transitionDuration
      }, {
        mode
      }));
    }
    if (changeTransition) {
      drawerStyle.webkitTransition = transition;
      drawerStyle.transition = transition;
    }
    if (!disableBackdropTransition && !hideBackdrop) {
      const backdropStyle = backdropRef.current.style;
      backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);
      if (changeTransition) {
        backdropStyle.webkitTransition = transition;
        backdropStyle.transition = transition;
      }
    }
  }, [anchor, disableBackdropTransition, hideBackdrop, theme, transitionDuration]);
  const handleBodyTouchEnd = useEventCallback_default((nativeEvent) => {
    if (!touchDetected.current) {
      return;
    }
    claimedSwipeInstance = null;
    touchDetected.current = false;
    ReactDOM.flushSync(() => {
      setMaybeSwiping(false);
    });
    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }
    swipeInstance.current.isSwiping = null;
    const anchorRtl = getAnchor(theme, anchor);
    const horizontal = isHorizontal(anchor);
    let current;
    if (horizontal) {
      current = calculateCurrentX(anchorRtl, nativeEvent.changedTouches, ownerDocument_default(nativeEvent.currentTarget));
    } else {
      current = calculateCurrentY(anchorRtl, nativeEvent.changedTouches, ownerWindow_default(nativeEvent.currentTarget));
    }
    const startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    const maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    const currentTranslate = getTranslate(current, startLocation, open, maxTranslate);
    const translateRatio = currentTranslate / maxTranslate;
    if (Math.abs(swipeInstance.current.velocity) > minFlingVelocity) {
      calculatedDurationRef.current = Math.abs((maxTranslate - currentTranslate) / swipeInstance.current.velocity) * 1e3;
    }
    if (open) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose();
      } else {
        setPosition(0, {
          mode: "exit"
        });
      }
      return;
    }
    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: "enter"
      });
    }
  });
  const startMaybeSwiping = (force = false) => {
    if (!maybeSwiping) {
      if (force || !(disableDiscovery && allowSwipeInChildren)) {
        ReactDOM.flushSync(() => {
          setMaybeSwiping(true);
        });
      }
      const horizontalSwipe = isHorizontal(anchor);
      if (!open && paperRef.current) {
        setPosition(getMaxTranslate(horizontalSwipe, paperRef.current) + (disableDiscovery ? 15 : -DRAG_STARTED_SIGNAL), {
          changeTransition: false
        });
      }
      swipeInstance.current.velocity = 0;
      swipeInstance.current.lastTime = null;
      swipeInstance.current.lastTranslate = null;
      swipeInstance.current.paperHit = false;
      touchDetected.current = true;
    }
  };
  const handleBodyTouchMove = useEventCallback_default((nativeEvent) => {
    if (!paperRef.current || !touchDetected.current) {
      return;
    }
    if (claimedSwipeInstance !== null && claimedSwipeInstance !== swipeInstance.current) {
      return;
    }
    startMaybeSwiping(true);
    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);
    const currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, ownerDocument_default(nativeEvent.currentTarget));
    const currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, ownerWindow_default(nativeEvent.currentTarget));
    if (open && paperRef.current.contains(nativeEvent.target) && claimedSwipeInstance === null) {
      const domTreeShapes = getDomTreeShapes(nativeEvent.target, paperRef.current);
      const hasNativeHandler = computeHasNativeHandler({
        domTreeShapes,
        start: horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY,
        current: horizontalSwipe ? currentX : currentY,
        anchor
      });
      if (hasNativeHandler) {
        claimedSwipeInstance = true;
        return;
      }
      claimedSwipeInstance = swipeInstance.current;
    }
    if (swipeInstance.current.isSwiping == null) {
      const dx = Math.abs(currentX - swipeInstance.current.startX);
      const dy = Math.abs(currentY - swipeInstance.current.startY);
      const definitelySwiping = horizontalSwipe ? dx > dy && dx > UNCERTAINTY_THRESHOLD : dy > dx && dy > UNCERTAINTY_THRESHOLD;
      if (definitelySwiping && nativeEvent.cancelable) {
        nativeEvent.preventDefault();
      }
      if (definitelySwiping === true || (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)) {
        swipeInstance.current.isSwiping = definitelySwiping;
        if (!definitelySwiping) {
          handleBodyTouchEnd(nativeEvent);
          return;
        }
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
        if (!disableDiscovery && !open) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= DRAG_STARTED_SIGNAL;
          } else {
            swipeInstance.current.startY -= DRAG_STARTED_SIGNAL;
          }
        }
      }
    }
    if (!swipeInstance.current.isSwiping) {
      return;
    }
    const maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    let startLocation = horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY;
    if (open && !swipeInstance.current.paperHit) {
      startLocation = Math.min(startLocation, maxTranslate);
    }
    const translate = getTranslate(horizontalSwipe ? currentX : currentY, startLocation, open, maxTranslate);
    if (open) {
      if (!swipeInstance.current.paperHit) {
        const paperHit = horizontalSwipe ? currentX < maxTranslate : currentY < maxTranslate;
        if (paperHit) {
          swipeInstance.current.paperHit = true;
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;
        } else {
          return;
        }
      } else if (translate === 0) {
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
      }
    }
    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }
    const velocity = (translate - swipeInstance.current.lastTranslate) / (performance.now() - swipeInstance.current.lastTime) * 1e3;
    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;
    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now();
    if (nativeEvent.cancelable) {
      nativeEvent.preventDefault();
    }
    setPosition(translate);
  });
  const handleBodyTouchStart = useEventCallback_default((nativeEvent) => {
    if (nativeEvent.defaultPrevented) {
      return;
    }
    if (nativeEvent.defaultMuiPrevented) {
      return;
    }
    if (open && (hideBackdrop || !backdropRef.current.contains(nativeEvent.target)) && !paperRef.current.contains(nativeEvent.target)) {
      return;
    }
    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);
    const currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, ownerDocument_default(nativeEvent.currentTarget));
    const currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, ownerWindow_default(nativeEvent.currentTarget));
    if (!open) {
      var _paperRef$current;
      if (disableSwipeToOpen || !(nativeEvent.target === swipeAreaRef.current || (_paperRef$current = paperRef.current) != null && _paperRef$current.contains(nativeEvent.target) && (typeof allowSwipeInChildren === "function" ? allowSwipeInChildren(nativeEvent, swipeAreaRef.current, paperRef.current) : allowSwipeInChildren))) {
        return;
      }
      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }
    nativeEvent.defaultMuiPrevented = true;
    claimedSwipeInstance = null;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;
    startMaybeSwiping();
  });
  React2.useEffect(() => {
    if (variant === "temporary") {
      const doc = ownerDocument_default(paperRef.current);
      doc.addEventListener("touchstart", handleBodyTouchStart);
      doc.addEventListener("touchmove", handleBodyTouchMove, {
        passive: !open
      });
      doc.addEventListener("touchend", handleBodyTouchEnd);
      return () => {
        doc.removeEventListener("touchstart", handleBodyTouchStart);
        doc.removeEventListener("touchmove", handleBodyTouchMove, {
          passive: !open
        });
        doc.removeEventListener("touchend", handleBodyTouchEnd);
      };
    }
    return void 0;
  }, [variant, open, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);
  React2.useEffect(() => () => {
    if (claimedSwipeInstance === swipeInstance.current) {
      claimedSwipeInstance = null;
    }
  }, []);
  React2.useEffect(() => {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);
  return (0, import_jsx_runtime3.jsxs)(React2.Fragment, {
    children: [(0, import_jsx_runtime2.jsx)(Drawer_default, _extends({
      open: variant === "temporary" && maybeSwiping ? true : open,
      variant,
      ModalProps: _extends({
        BackdropProps: _extends({}, BackdropProps, {
          ref: backdropRef
        })
      }, variant === "temporary" && {
        keepMounted: true
      }, ModalPropsProp),
      hideBackdrop,
      PaperProps: _extends({}, PaperProps, {
        style: _extends({
          pointerEvents: variant === "temporary" && !open && !allowSwipeInChildren ? "none" : ""
        }, PaperProps.style),
        ref: handleRef
      }),
      anchor,
      transitionDuration: calculatedDurationRef.current || transitionDuration,
      onClose,
      ref
    }, other)), !disableSwipeToOpen && variant === "temporary" && (0, import_jsx_runtime2.jsx)(NoSsr, {
      children: (0, import_jsx_runtime2.jsx)(SwipeArea_default, _extends({
        anchor,
        ref: swipeAreaRef,
        width: swipeAreaWidth
      }, SwipeAreaProps))
    })]
  });
});
true ? SwipeableDrawer.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If set to true, the swipe event will open the drawer even if the user begins the swipe on one of the drawer's children.
   * This can be useful in scenarios where the drawer is partially visible.
   * You can customize it further with a callback that determines which children the user can drag over to open the drawer
   * (for example, to ignore other elements that handle touch move events, like sliders).
   *
   * @param {TouchEvent} event The 'touchstart' event
   * @param {HTMLDivElement} swipeArea The swipe area element
   * @param {HTMLDivElement} paper The drawer's paper element
   *
   * @default false
   */
  allowSwipeInChildren: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.bool]),
  /**
   * @ignore
   */
  anchor: import_prop_types2.default.oneOf(["bottom", "left", "right", "top"]),
  /**
   * The content of the component.
   */
  children: import_prop_types2.default.node,
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   * @default false
   */
  disableBackdropTransition: import_prop_types2.default.bool,
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   * @default false
   */
  disableDiscovery: import_prop_types2.default.bool,
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   * @default typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
   */
  disableSwipeToOpen: import_prop_types2.default.bool,
  /**
   * @ignore
   */
  hideBackdrop: import_prop_types2.default.bool,
  /**
   * Affects how far the drawer must be opened/closed to change its state.
   * Specified as percent (0-1) of the width of the drawer
   * @default 0.52
   */
  hysteresis: import_prop_types2.default.number,
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   * @default 450
   */
  minFlingVelocity: import_prop_types2.default.number,
  /**
   * @ignore
   */
  ModalProps: import_prop_types2.default.shape({
    BackdropProps: import_prop_types2.default.shape({
      component: elementTypeAcceptingRef_default
    })
  }),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onClose: import_prop_types2.default.func.isRequired,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onOpen: import_prop_types2.default.func.isRequired,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: import_prop_types2.default.bool,
  /**
   * @ignore
   */
  PaperProps: import_prop_types2.default.shape({
    component: elementTypeAcceptingRef_default,
    style: import_prop_types2.default.object
  }),
  /**
   * The element is used to intercept the touch events on the edge.
   */
  SwipeAreaProps: import_prop_types2.default.object,
  /**
   * The width of the left most (or right most) area in `px` that
   * the drawer can be swiped open from.
   * @default 20
   */
  swipeAreaWidth: import_prop_types2.default.number,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.shape({
    appear: import_prop_types2.default.number,
    enter: import_prop_types2.default.number,
    exit: import_prop_types2.default.number
  })]),
  /**
   * @ignore
   */
  variant: import_prop_types2.default.oneOf(["permanent", "persistent", "temporary"])
} : void 0;
var SwipeableDrawer_default = SwipeableDrawer;

export {
  SwipeableDrawer_default
};
//# sourceMappingURL=chunk-DF2RRHK4.js.map
