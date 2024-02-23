import {
  require_jsx_runtime
} from "./chunk-2BVVOUCG.js";
import {
  require_react
} from "./chunk-HAZNF34R.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/react-hotkeys-hook/dist/react-hotkeys-hook.esm.js
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var reservedModifierKeywords = ["shift", "alt", "meta", "mod", "ctrl"];
var mappedKeys = {
  esc: "escape",
  "return": "enter",
  ".": "period",
  ",": "comma",
  "-": "slash",
  " ": "space",
  "`": "backquote",
  "#": "backslash",
  "+": "bracketright",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  AltLeft: "alt",
  AltRight: "alt",
  MetaLeft: "meta",
  MetaRight: "meta",
  OSLeft: "meta",
  OSRight: "meta",
  ControlLeft: "ctrl",
  ControlRight: "ctrl"
};
function mapKey(key) {
  return (mappedKeys[key] || key).trim().toLowerCase().replace(/key|digit|numpad|arrow/, "");
}
function isHotkeyModifier(key) {
  return reservedModifierKeywords.includes(key);
}
function parseKeysHookInput(keys, splitKey) {
  if (splitKey === void 0) {
    splitKey = ",";
  }
  return keys.split(splitKey);
}
function parseHotkey(hotkey, combinationKey, description) {
  if (combinationKey === void 0) {
    combinationKey = "+";
  }
  var keys = hotkey.toLocaleLowerCase().split(combinationKey).map(function(k) {
    return mapKey(k);
  });
  var modifiers = {
    alt: keys.includes("alt"),
    ctrl: keys.includes("ctrl") || keys.includes("control"),
    shift: keys.includes("shift"),
    meta: keys.includes("meta"),
    mod: keys.includes("mod")
  };
  var singleCharKeys = keys.filter(function(k) {
    return !reservedModifierKeywords.includes(k);
  });
  return _extends({}, modifiers, {
    keys: singleCharKeys,
    description
  });
}
(function() {
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", function(e) {
      if (e.key === void 0) {
        return;
      }
      pushToCurrentlyPressedKeys([mapKey(e.key), mapKey(e.code)]);
    });
    document.addEventListener("keyup", function(e) {
      if (e.key === void 0) {
        return;
      }
      removeFromCurrentlyPressedKeys([mapKey(e.key), mapKey(e.code)]);
    });
  }
  if (typeof window !== "undefined") {
    window.addEventListener("blur", function() {
      currentlyPressedKeys.clear();
    });
  }
})();
var currentlyPressedKeys = /* @__PURE__ */ new Set();
function isReadonlyArray(value) {
  return Array.isArray(value);
}
function isHotkeyPressed(key, splitKey) {
  if (splitKey === void 0) {
    splitKey = ",";
  }
  var hotkeyArray = isReadonlyArray(key) ? key : key.split(splitKey);
  return hotkeyArray.every(function(hotkey) {
    return currentlyPressedKeys.has(hotkey.trim().toLowerCase());
  });
}
function pushToCurrentlyPressedKeys(key) {
  var hotkeyArray = Array.isArray(key) ? key : [key];
  if (currentlyPressedKeys.has("meta")) {
    currentlyPressedKeys.forEach(function(key2) {
      return !isHotkeyModifier(key2) && currentlyPressedKeys["delete"](key2.toLowerCase());
    });
  }
  hotkeyArray.forEach(function(hotkey) {
    return currentlyPressedKeys.add(hotkey.toLowerCase());
  });
}
function removeFromCurrentlyPressedKeys(key) {
  var hotkeyArray = Array.isArray(key) ? key : [key];
  if (key === "meta") {
    currentlyPressedKeys.clear();
  } else {
    hotkeyArray.forEach(function(hotkey) {
      return currentlyPressedKeys["delete"](hotkey.toLowerCase());
    });
  }
}
function maybePreventDefault(e, hotkey, preventDefault) {
  if (typeof preventDefault === "function" && preventDefault(e, hotkey) || preventDefault === true) {
    e.preventDefault();
  }
}
function isHotkeyEnabled(e, hotkey, enabled) {
  if (typeof enabled === "function") {
    return enabled(e, hotkey);
  }
  return enabled === true || enabled === void 0;
}
function isKeyboardEventTriggeredByInput(ev) {
  return isHotkeyEnabledOnTag(ev, ["input", "textarea", "select"]);
}
function isHotkeyEnabledOnTag(_ref, enabledOnTags) {
  var target = _ref.target;
  if (enabledOnTags === void 0) {
    enabledOnTags = false;
  }
  var targetTagName = target && target.tagName;
  if (isReadonlyArray(enabledOnTags)) {
    return Boolean(targetTagName && enabledOnTags && enabledOnTags.some(function(tag) {
      return tag.toLowerCase() === targetTagName.toLowerCase();
    }));
  }
  return Boolean(targetTagName && enabledOnTags && enabledOnTags === true);
}
function isScopeActive(activeScopes, scopes) {
  if (activeScopes.length === 0 && scopes) {
    console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>');
    return true;
  }
  if (!scopes) {
    return true;
  }
  return activeScopes.some(function(scope) {
    return scopes.includes(scope);
  }) || activeScopes.includes("*");
}
var isHotkeyMatchingKeyboardEvent = function isHotkeyMatchingKeyboardEvent2(e, hotkey, ignoreModifiers) {
  if (ignoreModifiers === void 0) {
    ignoreModifiers = false;
  }
  var alt = hotkey.alt, meta = hotkey.meta, mod = hotkey.mod, shift = hotkey.shift, ctrl = hotkey.ctrl, keys = hotkey.keys;
  var pressedKeyUppercase = e.key, code = e.code, ctrlKey = e.ctrlKey, metaKey = e.metaKey, shiftKey = e.shiftKey, altKey = e.altKey;
  var keyCode = mapKey(code);
  var pressedKey = pressedKeyUppercase.toLowerCase();
  if (!ignoreModifiers) {
    if (alt === !altKey && pressedKey !== "alt") {
      return false;
    }
    if (shift === !shiftKey && pressedKey !== "shift") {
      return false;
    }
    if (mod) {
      if (!metaKey && !ctrlKey) {
        return false;
      }
    } else {
      if (meta === !metaKey && pressedKey !== "meta" && pressedKey !== "os") {
        return false;
      }
      if (ctrl === !ctrlKey && pressedKey !== "ctrl" && pressedKey !== "control") {
        return false;
      }
    }
  }
  if (keys && keys.length === 1 && (keys.includes(pressedKey) || keys.includes(keyCode))) {
    return true;
  } else if (keys) {
    return isHotkeyPressed(keys);
  } else if (!keys) {
    return true;
  }
  return false;
};
var BoundHotkeysProxyProvider = (0, import_react.createContext)(void 0);
var useBoundHotkeysProxy = function useBoundHotkeysProxy2() {
  return (0, import_react.useContext)(BoundHotkeysProxyProvider);
};
function BoundHotkeysProxyProviderProvider(_ref) {
  var addHotkey = _ref.addHotkey, removeHotkey = _ref.removeHotkey, children = _ref.children;
  return (0, import_jsx_runtime.jsx)(BoundHotkeysProxyProvider.Provider, {
    value: {
      addHotkey,
      removeHotkey
    },
    children
  });
}
function deepEqual(x, y) {
  return x && y && typeof x === "object" && typeof y === "object" ? Object.keys(x).length === Object.keys(y).length && //@ts-ignore
  Object.keys(x).reduce(function(isEqual, key) {
    return isEqual && deepEqual(x[key], y[key]);
  }, true) : x === y;
}
var HotkeysContext = (0, import_react.createContext)({
  hotkeys: [],
  enabledScopes: [],
  toggleScope: function toggleScope() {
  },
  enableScope: function enableScope() {
  },
  disableScope: function disableScope() {
  }
});
var useHotkeysContext = function useHotkeysContext2() {
  return (0, import_react.useContext)(HotkeysContext);
};
var HotkeysProvider = function HotkeysProvider2(_ref) {
  var _ref$initiallyActiveS = _ref.initiallyActiveScopes, initiallyActiveScopes = _ref$initiallyActiveS === void 0 ? ["*"] : _ref$initiallyActiveS, children = _ref.children;
  var _useState = (0, import_react.useState)((initiallyActiveScopes == null ? void 0 : initiallyActiveScopes.length) > 0 ? initiallyActiveScopes : ["*"]), internalActiveScopes = _useState[0], setInternalActiveScopes = _useState[1];
  var _useState2 = (0, import_react.useState)([]), boundHotkeys = _useState2[0], setBoundHotkeys = _useState2[1];
  var enableScope2 = (0, import_react.useCallback)(function(scope) {
    setInternalActiveScopes(function(prev) {
      if (prev.includes("*")) {
        return [scope];
      }
      return Array.from(new Set([].concat(prev, [scope])));
    });
  }, []);
  var disableScope2 = (0, import_react.useCallback)(function(scope) {
    setInternalActiveScopes(function(prev) {
      if (prev.filter(function(s) {
        return s !== scope;
      }).length === 0) {
        return ["*"];
      } else {
        return prev.filter(function(s) {
          return s !== scope;
        });
      }
    });
  }, []);
  var toggleScope2 = (0, import_react.useCallback)(function(scope) {
    setInternalActiveScopes(function(prev) {
      if (prev.includes(scope)) {
        if (prev.filter(function(s) {
          return s !== scope;
        }).length === 0) {
          return ["*"];
        } else {
          return prev.filter(function(s) {
            return s !== scope;
          });
        }
      } else {
        if (prev.includes("*")) {
          return [scope];
        }
        return Array.from(new Set([].concat(prev, [scope])));
      }
    });
  }, []);
  var addBoundHotkey = (0, import_react.useCallback)(function(hotkey) {
    setBoundHotkeys(function(prev) {
      return [].concat(prev, [hotkey]);
    });
  }, []);
  var removeBoundHotkey = (0, import_react.useCallback)(function(hotkey) {
    setBoundHotkeys(function(prev) {
      return prev.filter(function(h) {
        return !deepEqual(h, hotkey);
      });
    });
  }, []);
  return (0, import_jsx_runtime.jsx)(HotkeysContext.Provider, {
    value: {
      enabledScopes: internalActiveScopes,
      hotkeys: boundHotkeys,
      enableScope: enableScope2,
      disableScope: disableScope2,
      toggleScope: toggleScope2
    },
    children: (0, import_jsx_runtime.jsx)(BoundHotkeysProxyProviderProvider, {
      addHotkey: addBoundHotkey,
      removeHotkey: removeBoundHotkey,
      children
    })
  });
};
function useDeepEqualMemo(value) {
  var ref = (0, import_react.useRef)(void 0);
  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
var stopPropagation = function stopPropagation2(e) {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};
var useSafeLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useHotkeys(keys, callback, options, dependencies) {
  var ref = (0, import_react.useRef)(null);
  var hasTriggeredRef = (0, import_react.useRef)(false);
  var _options = !(options instanceof Array) ? options : !(dependencies instanceof Array) ? dependencies : void 0;
  var _keys = isReadonlyArray(keys) ? keys.join(_options == null ? void 0 : _options.splitKey) : keys;
  var _deps = options instanceof Array ? options : dependencies instanceof Array ? dependencies : void 0;
  var memoisedCB = (0, import_react.useCallback)(callback, _deps != null ? _deps : []);
  var cbRef = (0, import_react.useRef)(memoisedCB);
  if (_deps) {
    cbRef.current = memoisedCB;
  } else {
    cbRef.current = callback;
  }
  var memoisedOptions = useDeepEqualMemo(_options);
  var _useHotkeysContext = useHotkeysContext(), enabledScopes = _useHotkeysContext.enabledScopes;
  var proxy = useBoundHotkeysProxy();
  useSafeLayoutEffect(function() {
    if ((memoisedOptions == null ? void 0 : memoisedOptions.enabled) === false || !isScopeActive(enabledScopes, memoisedOptions == null ? void 0 : memoisedOptions.scopes)) {
      return;
    }
    var listener = function listener2(e, isKeyUp) {
      var _e$target;
      if (isKeyUp === void 0) {
        isKeyUp = false;
      }
      if (isKeyboardEventTriggeredByInput(e) && !isHotkeyEnabledOnTag(e, memoisedOptions == null ? void 0 : memoisedOptions.enableOnFormTags)) {
        return;
      }
      if (memoisedOptions != null && memoisedOptions.ignoreEventWhen != null && memoisedOptions.ignoreEventWhen(e)) {
        return;
      }
      if (ref.current !== null && document.activeElement !== ref.current && !ref.current.contains(document.activeElement)) {
        stopPropagation(e);
        return;
      }
      if ((_e$target = e.target) != null && _e$target.isContentEditable && !(memoisedOptions != null && memoisedOptions.enableOnContentEditable)) {
        return;
      }
      parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
        var _hotkey$keys;
        var hotkey = parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey);
        if (isHotkeyMatchingKeyboardEvent(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.ignoreModifiers) || (_hotkey$keys = hotkey.keys) != null && _hotkey$keys.includes("*")) {
          if (isKeyUp && hasTriggeredRef.current) {
            return;
          }
          maybePreventDefault(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.preventDefault);
          if (!isHotkeyEnabled(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.enabled)) {
            stopPropagation(e);
            return;
          }
          cbRef.current(e, hotkey);
          if (!isKeyUp) {
            hasTriggeredRef.current = true;
          }
        }
      });
    };
    var handleKeyDown = function handleKeyDown2(event) {
      if (event.key === void 0) {
        return;
      }
      pushToCurrentlyPressedKeys(mapKey(event.code));
      if ((memoisedOptions == null ? void 0 : memoisedOptions.keydown) === void 0 && (memoisedOptions == null ? void 0 : memoisedOptions.keyup) !== true || memoisedOptions != null && memoisedOptions.keydown) {
        listener(event);
      }
    };
    var handleKeyUp = function handleKeyUp2(event) {
      if (event.key === void 0) {
        return;
      }
      removeFromCurrentlyPressedKeys(mapKey(event.code));
      hasTriggeredRef.current = false;
      if (memoisedOptions != null && memoisedOptions.keyup) {
        listener(event, true);
      }
    };
    var domNode = ref.current || (_options == null ? void 0 : _options.document) || document;
    domNode.addEventListener("keyup", handleKeyUp);
    domNode.addEventListener("keydown", handleKeyDown);
    if (proxy) {
      parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
        return proxy.addHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey, memoisedOptions == null ? void 0 : memoisedOptions.description));
      });
    }
    return function() {
      domNode.removeEventListener("keyup", handleKeyUp);
      domNode.removeEventListener("keydown", handleKeyDown);
      if (proxy) {
        parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
          return proxy.removeHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey, memoisedOptions == null ? void 0 : memoisedOptions.description));
        });
      }
    };
  }, [_keys, memoisedOptions, enabledScopes]);
  return ref;
}
function useRecordHotkeys() {
  var _useState = (0, import_react.useState)(/* @__PURE__ */ new Set()), keys = _useState[0], setKeys = _useState[1];
  var _useState2 = (0, import_react.useState)(false), isRecording = _useState2[0], setIsRecording = _useState2[1];
  var handler = (0, import_react.useCallback)(function(event) {
    if (event.key === void 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setKeys(function(prev) {
      var newKeys = new Set(prev);
      newKeys.add(mapKey(event.code));
      return newKeys;
    });
  }, []);
  var stop = (0, import_react.useCallback)(function() {
    if (typeof document !== "undefined") {
      document.removeEventListener("keydown", handler);
      setIsRecording(false);
    }
  }, [handler]);
  var start = (0, import_react.useCallback)(function() {
    setKeys(/* @__PURE__ */ new Set());
    if (typeof document !== "undefined") {
      stop();
      document.addEventListener("keydown", handler);
      setIsRecording(true);
    }
  }, [handler, stop]);
  return [keys, {
    start,
    stop,
    isRecording
  }];
}
export {
  HotkeysProvider,
  isHotkeyPressed,
  useHotkeys,
  useHotkeysContext,
  useRecordHotkeys
};
//# sourceMappingURL=react-hotkeys-hook.js.map
