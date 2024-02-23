import {
  require_react
} from "./chunk-HAZNF34R.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/usehooks-ts/dist/esm/useBoolean/useBoolean.js
var import_react = __toESM(require_react());
function useBoolean(defaultValue) {
  const [value, setValue] = (0, import_react.useState)(!!defaultValue);
  const setTrue = (0, import_react.useCallback)(() => setValue(true), []);
  const setFalse = (0, import_react.useCallback)(() => setValue(false), []);
  const toggle = (0, import_react.useCallback)(() => setValue((x) => !x), []);
  return { value, setValue, setTrue, setFalse, toggle };
}

// node_modules/usehooks-ts/dist/esm/useClickAnyWhere/useClickAnyWhere.js
function useClickAnyWhere(handler) {
  useEventListener("click", (event) => {
    handler(event);
  });
}

// node_modules/usehooks-ts/dist/esm/useCopyToClipboard/useCopyToClipboard.js
var import_react2 = __toESM(require_react());
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = (0, import_react2.useState)(null);
  const copy = (text) => __awaiter(this, void 0, void 0, function* () {
    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.clipboard)) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      yield navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  });
  return [copiedText, copy];
}

// node_modules/usehooks-ts/dist/esm/useCountdown/useCountdown.js
var import_react3 = __toESM(require_react());
function useCountdown(countdownOption) {
  let isDeprecated = false;
  let countStart, intervalMs, isIncrement, countStop;
  if ("seconds" in countdownOption) {
    console.warn("[useCountdown:DEPRECATED] new interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3.");
    isDeprecated = true;
    countStart = countdownOption.seconds;
    intervalMs = countdownOption.interval;
    isIncrement = countdownOption.isIncrement;
  } else {
    ;
    ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);
  }
  intervalMs = intervalMs !== null && intervalMs !== void 0 ? intervalMs : 1e3;
  isIncrement = isIncrement !== null && isIncrement !== void 0 ? isIncrement : false;
  countStop = countStop !== null && countStop !== void 0 ? countStop : 0;
  const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);
  const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false);
  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };
  const countdownCallback = (0, import_react3.useCallback)(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }
    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);
  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);
  return isDeprecated ? [
    count,
    {
      start: startCountdown,
      stop: stopCountdown,
      reset: resetCountdown
    }
  ] : [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown
    }
  ];
}

// node_modules/usehooks-ts/dist/esm/useCounter/useCounter.js
var import_react4 = __toESM(require_react());
function useCounter(initialValue) {
  const [count, setCount] = (0, import_react4.useState)(initialValue || 0);
  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue || 0);
  return {
    count,
    increment,
    decrement,
    reset,
    setCount
  };
}

// node_modules/usehooks-ts/dist/esm/useDarkMode/useDarkMode.js
var COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
function useDarkMode(defaultValue) {
  var _a;
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage("usehooks-ts-dark-mode", (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : isDarkOS) !== null && _a !== void 0 ? _a : false);
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
  }, [isDarkOS]);
  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false)
  };
}

// node_modules/usehooks-ts/dist/esm/useDebounce/useDebounce.js
var import_react5 = __toESM(require_react());
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = (0, import_react5.useState)(value);
  (0, import_react5.useEffect)(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

// node_modules/usehooks-ts/dist/esm/useDocumentTitle/useDocumentTitle.js
function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
}

// node_modules/usehooks-ts/dist/esm/useEffectOnce/useEffectOnce.js
var import_react6 = __toESM(require_react());
function useEffectOnce(effect) {
  (0, import_react6.useEffect)(effect, []);
}

// node_modules/usehooks-ts/dist/esm/useElementSize/useElementSize.js
var import_react7 = __toESM(require_react());
function useElementSize() {
  const [ref, setRef] = (0, import_react7.useState)(null);
  const [size, setSize] = (0, import_react7.useState)({
    width: 0,
    height: 0
  });
  const handleSize = (0, import_react7.useCallback)(() => {
    setSize({
      width: (ref === null || ref === void 0 ? void 0 : ref.offsetWidth) || 0,
      height: (ref === null || ref === void 0 ? void 0 : ref.offsetHeight) || 0
    });
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);
  useEventListener("resize", handleSize);
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);
  return [setRef, size];
}

// node_modules/usehooks-ts/dist/esm/useEventCallback/useEventCallback.js
var import_react8 = __toESM(require_react());
function useEventCallback(fn) {
  const ref = (0, import_react8.useRef)(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);
  return (0, import_react8.useCallback)((...args) => ref.current(...args), [ref]);
}

// node_modules/usehooks-ts/dist/esm/useEventListener/useEventListener.js
var import_react9 = __toESM(require_react());
function useEventListener(eventName, handler, element, options) {
  const savedHandler = (0, import_react9.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  (0, import_react9.useEffect)(() => {
    var _a;
    const targetElement = (_a = element === null || element === void 0 ? void 0 : element.current) !== null && _a !== void 0 ? _a : window;
    if (!(targetElement && targetElement.addEventListener))
      return;
    const listener = (event) => savedHandler.current(event);
    targetElement.addEventListener(eventName, listener, options);
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

// node_modules/usehooks-ts/dist/esm/useFetch/useFetch.js
var import_react10 = __toESM(require_react());
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function useFetch(url, options) {
  const cache = (0, import_react10.useRef)({});
  const cancelRequest = (0, import_react10.useRef)(false);
  const initialState = {
    error: void 0,
    data: void 0
  };
  const fetchReducer = (state2, action) => {
    switch (action.type) {
      case "loading":
        return Object.assign({}, initialState);
      case "fetched":
        return Object.assign(Object.assign({}, initialState), { data: action.payload });
      case "error":
        return Object.assign(Object.assign({}, initialState), { error: action.payload });
      default:
        return state2;
    }
  };
  const [state, dispatch] = (0, import_react10.useReducer)(fetchReducer, initialState);
  (0, import_react10.useEffect)(() => {
    if (!url)
      return;
    cancelRequest.current = false;
    const fetchData = () => __awaiter2(this, void 0, void 0, function* () {
      dispatch({ type: "loading" });
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }
      try {
        const response = yield fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = yield response.json();
        cache.current[url] = data;
        if (cancelRequest.current)
          return;
        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current)
          return;
        dispatch({ type: "error", payload: error });
      }
    });
    void fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);
  return state;
}

// node_modules/usehooks-ts/dist/esm/useHover/useHover.js
var import_react11 = __toESM(require_react());
function useHover(elementRef) {
  const [value, setValue] = (0, import_react11.useState)(false);
  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);
  useEventListener("mouseenter", handleMouseEnter, elementRef);
  useEventListener("mouseleave", handleMouseLeave, elementRef);
  return value;
}

// node_modules/usehooks-ts/dist/esm/useImageOnLoad/useImageOnLoad.js
var import_react12 = __toESM(require_react());
function useImageOnLoad() {
  const [isLoaded, setIsLoaded] = (0, import_react12.useState)(false);
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };
  const css = {
    thumbnail: {
      visibility: isLoaded ? "hidden" : "visible",
      filter: "blur(8px)",
      transition: "visibility 0ms ease-out 500ms"
    },
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 500ms ease-in 0ms"
    }
  };
  return { handleImageOnLoad, css };
}

// node_modules/usehooks-ts/dist/esm/useIntersectionObserver/useIntersectionObserver.js
var import_react13 = __toESM(require_react());
function useIntersectionObserver(elementRef, { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }) {
  const [entry, setEntry] = (0, import_react13.useState)();
  const frozen = (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && freezeOnceVisible;
  const updateEntry = ([entry2]) => {
    setEntry(entry2);
  };
  (0, import_react13.useEffect)(() => {
    const node = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || frozen || !node)
      return;
    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef === null || elementRef === void 0 ? void 0 : elementRef.current, JSON.stringify(threshold), root, rootMargin, frozen]);
  return entry;
}

// node_modules/usehooks-ts/dist/esm/useInterval/useInterval.js
var import_react14 = __toESM(require_react());
function useInterval(callback, delay) {
  const savedCallback = (0, import_react14.useRef)(callback);
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  (0, import_react14.useEffect)(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// node_modules/usehooks-ts/dist/esm/useIsClient/useIsClient.js
var import_react15 = __toESM(require_react());
function useIsClient() {
  const [isClient, setClient] = (0, import_react15.useState)(false);
  (0, import_react15.useEffect)(() => {
    setClient(true);
  }, []);
  return isClient;
}

// node_modules/usehooks-ts/dist/esm/useIsFirstRender/useIsFirstRender.js
var import_react16 = __toESM(require_react());
function useIsFirstRender() {
  const isFirst = (0, import_react16.useRef)(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}

// node_modules/usehooks-ts/dist/esm/useIsMounted/useIsMounted.js
var import_react17 = __toESM(require_react());
function useIsMounted() {
  const isMounted = (0, import_react17.useRef)(false);
  (0, import_react17.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (0, import_react17.useCallback)(() => isMounted.current, []);
}

// node_modules/usehooks-ts/dist/esm/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js
var import_react18 = __toESM(require_react());
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react18.useLayoutEffect : import_react18.useEffect;

// node_modules/usehooks-ts/dist/esm/useLocalStorage/useLocalStorage.js
var import_react19 = __toESM(require_react());
function useLocalStorage(key, initialValue) {
  const readValue = (0, import_react19.useCallback)(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? parseJSON(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = (0, import_react19.useState)(readValue);
  const setValue = useEventCallback((value) => {
    if (typeof window === "undefined") {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });
  (0, import_react19.useEffect)(() => {
    setStoredValue(readValue());
  }, []);
  const handleStorageChange = (0, import_react19.useCallback)((event) => {
    if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
      return;
    }
    setStoredValue(readValue());
  }, [key, readValue]);
  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);
  return [storedValue, setValue];
}
function parseJSON(value) {
  try {
    return value === "undefined" ? void 0 : JSON.parse(value !== null && value !== void 0 ? value : "");
  } catch (_a) {
    console.log("parsing error on", { value });
    return void 0;
  }
}

// node_modules/usehooks-ts/dist/esm/useLockedBody/useLockedBody.js
var import_react20 = __toESM(require_react());
function useLockedBody(initialLocked = false, rootId = "___gatsby") {
  const [locked, setLocked] = (0, import_react20.useState)(initialLocked);
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    const root = document.getElementById(rootId);
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);
  (0, import_react20.useEffect)(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [initialLocked]);
  return [locked, setLocked];
}

// node_modules/usehooks-ts/dist/esm/useMap/useMap.js
var import_react21 = __toESM(require_react());
function useMap(initialState = /* @__PURE__ */ new Map()) {
  const [map, setMap] = (0, import_react21.useState)(new Map(initialState));
  const actions = {
    set: (0, import_react21.useCallback)((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
    }, []),
    setAll: (0, import_react21.useCallback)((entries) => {
      setMap(() => new Map(entries));
    }, []),
    remove: (0, import_react21.useCallback)((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),
    reset: (0, import_react21.useCallback)(() => {
      setMap(() => /* @__PURE__ */ new Map());
    }, [])
  };
  return [map, actions];
}

// node_modules/usehooks-ts/dist/esm/useMediaQuery/useMediaQuery.js
var import_react22 = __toESM(require_react());
function useMediaQuery(query) {
  const getMatches = (query2) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query2).matches;
    }
    return false;
  };
  const [matches, setMatches] = (0, import_react22.useState)(getMatches(query));
  function handleChange() {
    setMatches(getMatches(query));
  }
  (0, import_react22.useEffect)(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);
  return matches;
}

// node_modules/usehooks-ts/dist/esm/useOnClickOutside/useOnClickOutside.js
function useOnClickOutside(ref, handler, mouseEvent = "mousedown") {
  useEventListener(mouseEvent, (event) => {
    const el = ref === null || ref === void 0 ? void 0 : ref.current;
    if (!el || el.contains(event.target)) {
      return;
    }
    handler(event);
  });
}

// node_modules/usehooks-ts/dist/esm/useReadLocalStorage/useReadLocalStorage.js
var import_react23 = __toESM(require_react());
function useReadLocalStorage(key) {
  const readValue = (0, import_react23.useCallback)(() => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key]);
  const [storedValue, setStoredValue] = (0, import_react23.useState)(readValue);
  (0, import_react23.useEffect)(() => {
    setStoredValue(readValue());
  }, []);
  const handleStorageChange = (0, import_react23.useCallback)((event) => {
    if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
      return;
    }
    setStoredValue(readValue());
  }, [key, readValue]);
  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);
  return storedValue;
}

// node_modules/usehooks-ts/dist/esm/useScreen/useScreen.js
var import_react24 = __toESM(require_react());
function useScreen() {
  const getScreen = () => {
    if (typeof window !== "undefined" && window.screen) {
      return window.screen;
    }
    return void 0;
  };
  const [screen, setScreen] = (0, import_react24.useState)(getScreen());
  function handleSize() {
    setScreen(getScreen());
  }
  useEventListener("resize", handleSize);
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);
  return screen;
}

// node_modules/usehooks-ts/dist/esm/useScript/useScript.js
var import_react25 = __toESM(require_react());
var cachedScriptStatuses = {};
function getScriptNode(src) {
  const node = document.querySelector(`script[src="${src}"]`);
  const status = node === null || node === void 0 ? void 0 : node.getAttribute("data-status");
  return {
    node,
    status
  };
}
function useScript(src, options) {
  const [status, setStatus] = (0, import_react25.useState)(() => {
    var _a;
    if (!src || (options === null || options === void 0 ? void 0 : options.shouldPreventLoad)) {
      return "idle";
    }
    if (typeof window === "undefined") {
      return "loading";
    }
    return (_a = cachedScriptStatuses[src]) !== null && _a !== void 0 ? _a : "loading";
  });
  (0, import_react25.useEffect)(() => {
    var _a, _b;
    if (!src || (options === null || options === void 0 ? void 0 : options.shouldPreventLoad)) {
      return;
    }
    const cachedScriptStatus = cachedScriptStatuses[src];
    if (cachedScriptStatus === "ready" || cachedScriptStatus === "error") {
      setStatus(cachedScriptStatus);
      return;
    }
    const script = getScriptNode(src);
    let scriptNode = script.node;
    if (!scriptNode) {
      scriptNode = document.createElement("script");
      scriptNode.src = src;
      scriptNode.async = true;
      scriptNode.setAttribute("data-status", "loading");
      document.body.appendChild(scriptNode);
      const setAttributeFromEvent = (event) => {
        const scriptStatus = event.type === "load" ? "ready" : "error";
        scriptNode === null || scriptNode === void 0 ? void 0 : scriptNode.setAttribute("data-status", scriptStatus);
      };
      scriptNode.addEventListener("load", setAttributeFromEvent);
      scriptNode.addEventListener("error", setAttributeFromEvent);
    } else {
      setStatus((_b = (_a = script.status) !== null && _a !== void 0 ? _a : cachedScriptStatus) !== null && _b !== void 0 ? _b : "loading");
    }
    const setStateFromEvent = (event) => {
      const newStatus = event.type === "load" ? "ready" : "error";
      setStatus(newStatus);
      cachedScriptStatuses[src] = newStatus;
    };
    scriptNode.addEventListener("load", setStateFromEvent);
    scriptNode.addEventListener("error", setStateFromEvent);
    return () => {
      if (scriptNode) {
        scriptNode.removeEventListener("load", setStateFromEvent);
        scriptNode.removeEventListener("error", setStateFromEvent);
      }
      if (scriptNode && (options === null || options === void 0 ? void 0 : options.removeOnUnmount)) {
        scriptNode.remove();
      }
    };
  }, [src, options === null || options === void 0 ? void 0 : options.shouldPreventLoad, options === null || options === void 0 ? void 0 : options.removeOnUnmount]);
  return status;
}

// node_modules/usehooks-ts/dist/esm/useSessionStorage/useSessionStorage.js
var import_react26 = __toESM(require_react());
function useSessionStorage(key, initialValue) {
  const readValue = (0, import_react26.useCallback)(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? parseJSON2(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = (0, import_react26.useState)(readValue);
  const setValue = useEventCallback((value) => {
    if (typeof window == "undefined") {
      console.warn(`Tried setting sessionStorage key “${key}” even though environment is not a client`);
    }
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event("session-storage"));
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error);
    }
  });
  (0, import_react26.useEffect)(() => {
    setStoredValue(readValue());
  }, []);
  const handleStorageChange = (0, import_react26.useCallback)((event) => {
    if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
      return;
    }
    setStoredValue(readValue());
  }, [key, readValue]);
  useEventListener("storage", handleStorageChange);
  useEventListener("session-storage", handleStorageChange);
  return [storedValue, setValue];
}
function parseJSON2(value) {
  try {
    return value === "undefined" ? void 0 : JSON.parse(value !== null && value !== void 0 ? value : "");
  } catch (_a) {
    console.log("parsing error on", { value });
    return void 0;
  }
}

// node_modules/usehooks-ts/dist/esm/useSsr/useSsr.js
function useSsr() {
  const isDOM = typeof window !== "undefined" && window.document && window.document.documentElement;
  return {
    isBrowser: isDOM,
    isServer: !isDOM
  };
}

// node_modules/usehooks-ts/dist/esm/useStep/useStep.js
var import_react27 = __toESM(require_react());
function useStep(maxStep) {
  const [currentStep, setCurrentStep] = (0, import_react27.useState)(1);
  const canGoToNextStep = (0, import_react27.useMemo)(() => currentStep + 1 <= maxStep, [currentStep, maxStep]);
  const canGoToPrevStep = (0, import_react27.useMemo)(() => currentStep - 1 >= 1, [currentStep]);
  const setStep = (0, import_react27.useCallback)((step) => {
    const newStep = step instanceof Function ? step(currentStep) : step;
    if (newStep >= 1 && newStep <= maxStep) {
      setCurrentStep(newStep);
      return;
    }
    throw new Error("Step not valid");
  }, [maxStep, currentStep]);
  const goToNextStep = (0, import_react27.useCallback)(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep]);
  const goToPrevStep = (0, import_react27.useCallback)(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPrevStep]);
  const reset = (0, import_react27.useCallback)(() => {
    setCurrentStep(1);
  }, []);
  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset
    }
  ];
}

// node_modules/usehooks-ts/dist/esm/useTernaryDarkMode/useTernaryDarkMode.js
var import_react28 = __toESM(require_react());
var COLOR_SCHEME_QUERY2 = "(prefers-color-scheme: dark)";
function useTernaryDarkMode() {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY2);
  const [ternaryDarkMode, setTernaryDarkMode] = useLocalStorage("usehooks-ts-ternary-dark-mode", "system");
  const [isDarkMode, setDarkMode] = (0, import_react28.useState)(isDarkOS);
  useUpdateEffect(() => {
    if (ternaryDarkMode === "system") {
      setDarkMode(isDarkOS);
    }
  }, [isDarkOS]);
  (0, import_react28.useEffect)(() => {
    switch (ternaryDarkMode) {
      case "light":
        setDarkMode(false);
        break;
      case "system":
        setDarkMode(isDarkOS);
        break;
      case "dark":
        setDarkMode(true);
        break;
    }
  }, [ternaryDarkMode, isDarkOS]);
  function toggleTernaryDarkMode() {
    const toggleDict = {
      light: "system",
      system: "dark",
      dark: "light"
    };
    setTernaryDarkMode((prevMode) => toggleDict[prevMode]);
  }
  return {
    isDarkMode,
    ternaryDarkMode,
    setTernaryDarkMode,
    toggleTernaryDarkMode
  };
}

// node_modules/usehooks-ts/dist/esm/useTimeout/useTimeout.js
var import_react29 = __toESM(require_react());
function useTimeout(callback, delay) {
  const savedCallback = (0, import_react29.useRef)(callback);
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  (0, import_react29.useEffect)(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}

// node_modules/usehooks-ts/dist/esm/useToggle/useToggle.js
var import_react30 = __toESM(require_react());
function useToggle(defaultValue) {
  const [value, setValue] = (0, import_react30.useState)(!!defaultValue);
  const toggle = (0, import_react30.useCallback)(() => setValue((x) => !x), []);
  return [value, toggle, setValue];
}

// node_modules/usehooks-ts/dist/esm/useUpdateEffect/useUpdateEffect.js
var import_react31 = __toESM(require_react());
function useUpdateEffect(effect, deps) {
  const isFirst = useIsFirstRender();
  (0, import_react31.useEffect)(() => {
    if (!isFirst) {
      return effect();
    }
  }, deps);
}

// node_modules/usehooks-ts/dist/esm/useWindowSize/useWindowSize.js
var import_react32 = __toESM(require_react());
function useWindowSize() {
  const [windowSize, setWindowSize] = (0, import_react32.useState)({
    width: 0,
    height: 0
  });
  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  useEventListener("resize", handleSize);
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);
  return windowSize;
}
export {
  useBoolean,
  useClickAnyWhere,
  useCopyToClipboard,
  useCountdown,
  useCounter,
  useDarkMode,
  useDebounce,
  useDocumentTitle,
  useEffectOnce,
  useElementSize,
  useEventCallback,
  useEventListener,
  useFetch,
  useHover,
  useImageOnLoad,
  useIntersectionObserver,
  useInterval,
  useIsClient,
  useIsFirstRender,
  useIsMounted,
  useIsomorphicLayoutEffect,
  useLocalStorage,
  useLockedBody,
  useMap,
  useMediaQuery,
  useOnClickOutside,
  useReadLocalStorage,
  useScreen,
  useScript,
  useSessionStorage,
  useSsr,
  useStep,
  useTernaryDarkMode,
  useTimeout,
  useToggle,
  useUpdateEffect,
  useWindowSize
};
//# sourceMappingURL=usehooks-ts.js.map
