import {
  require_react_dom
} from "./chunk-4ZSTBHIF.js";
import {
  require_prop_types
} from "./chunk-NV2AUDXZ.js";
import {
  require_jsx_runtime
} from "./chunk-2BVVOUCG.js";
import {
  require_react
} from "./chunk-HAZNF34R.js";
import {
  __commonJS,
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e11) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e11) {
        }
        try {
          return func + "";
        } catch (e11) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map5, key) {
      var data = map5.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs2 = data.__data__;
        if (!Map2 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
          pairs2.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs2);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e11) {
      }
    }();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_assignMergeValue.js
var require_assignMergeValue = __commonJS({
  "node_modules/lodash/_assignMergeValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignMergeValue;
  }
});

// node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// node_modules/lodash/_cloneBuffer.js
var require_cloneBuffer = __commonJS({
  "node_modules/lodash/_cloneBuffer.js"(exports, module) {
    var root = require_root();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_cloneArrayBuffer.js
var require_cloneArrayBuffer = __commonJS({
  "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
    var Uint8Array = require_Uint8Array();
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    module.exports = cloneArrayBuffer;
  }
});

// node_modules/lodash/_cloneTypedArray.js
var require_cloneTypedArray = __commonJS({
  "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    module.exports = cloneTypedArray;
  }
});

// node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "node_modules/lodash/_copyArray.js"(exports, module) {
    function copyArray(source, array2) {
      var index2 = -1, length = source.length;
      array2 || (array2 = Array(length));
      while (++index2 < length) {
        array2[index2] = source[index2];
      }
      return array2;
    }
    module.exports = copyArray;
  }
});

// node_modules/lodash/_baseCreate.js
var require_baseCreate = __commonJS({
  "node_modules/lodash/_baseCreate.js"(exports, module) {
    var isObject = require_isObject();
    var objectCreate = Object.create;
    var baseCreate = /* @__PURE__ */ function() {
      function object() {
      }
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    }();
    module.exports = baseCreate;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  "node_modules/lodash/_getPrototype.js"(exports, module) {
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_initCloneObject.js
var require_initCloneObject = __commonJS({
  "node_modules/lodash/_initCloneObject.js"(exports, module) {
    var baseCreate = require_baseCreate();
    var getPrototype = require_getPrototype();
    var isPrototype = require_isPrototype();
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    module.exports = initCloneObject;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/isArrayLikeObject.js
var require_isArrayLikeObject = __commonJS({
  "node_modules/lodash/isArrayLikeObject.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    var isObjectLike = require_isObjectLike();
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    module.exports = isArrayLikeObject;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/isPlainObject.js
var require_isPlainObject = __commonJS({
  "node_modules/lodash/isPlainObject.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var getPrototype = require_getPrototype();
    var isObjectLike = require_isObjectLike();
    var objectTag = "[object Object]";
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e11) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_safeGet.js
var require_safeGet = __commonJS({
  "node_modules/lodash/_safeGet.js"(exports, module) {
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    module.exports = safeGet;
  }
});

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "node_modules/lodash/_copyObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index2 = -1, length = props.length;
      while (++index2 < length) {
        var key = props[index2];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n7, iteratee) {
      var index2 = -1, result = Array(n7);
      while (++index2 < n7) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_nativeKeysIn.js
var require_nativeKeysIn = __commonJS({
  "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = nativeKeysIn;
  }
});

// node_modules/lodash/_baseKeysIn.js
var require_baseKeysIn = __commonJS({
  "node_modules/lodash/_baseKeysIn.js"(exports, module) {
    var isObject = require_isObject();
    var isPrototype = require_isPrototype();
    var nativeKeysIn = require_nativeKeysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeysIn;
  }
});

// node_modules/lodash/keysIn.js
var require_keysIn = __commonJS({
  "node_modules/lodash/keysIn.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeysIn = require_baseKeysIn();
    var isArrayLike = require_isArrayLike();
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module.exports = keysIn;
  }
});

// node_modules/lodash/toPlainObject.js
var require_toPlainObject = __commonJS({
  "node_modules/lodash/toPlainObject.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    module.exports = toPlainObject;
  }
});

// node_modules/lodash/_baseMergeDeep.js
var require_baseMergeDeep = __commonJS({
  "node_modules/lodash/_baseMergeDeep.js"(exports, module) {
    var assignMergeValue = require_assignMergeValue();
    var cloneBuffer = require_cloneBuffer();
    var cloneTypedArray = require_cloneTypedArray();
    var copyArray = require_copyArray();
    var initCloneObject = require_initCloneObject();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLikeObject = require_isArrayLikeObject();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var isPlainObject = require_isPlainObject();
    var isTypedArray = require_isTypedArray();
    var safeGet = require_safeGet();
    var toPlainObject = require_toPlainObject();
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    module.exports = baseMergeDeep;
  }
});

// node_modules/lodash/_baseMerge.js
var require_baseMerge = __commonJS({
  "node_modules/lodash/_baseMerge.js"(exports, module) {
    var Stack = require_Stack();
    var assignMergeValue = require_assignMergeValue();
    var baseFor = require_baseFor();
    var baseMergeDeep = require_baseMergeDeep();
    var isObject = require_isObject();
    var keysIn = require_keysIn();
    var safeGet = require_safeGet();
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    module.exports = baseMerge;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    function identity6(value) {
      return value;
    }
    module.exports = identity6;
  }
});

// node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "node_modules/lodash/_apply.js"(exports, module) {
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "node_modules/lodash/_overRest.js"(exports, module) {
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start2, transform) {
      start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
      return function() {
        var args = arguments, index2 = -1, length = nativeMax(args.length - start2, 0), array2 = Array(length);
        while (++index2 < length) {
          array2[index2] = args[start2 + index2];
        }
        index2 = -1;
        var otherArgs = Array(start2 + 1);
        while (++index2 < start2) {
          otherArgs[index2] = args[index2];
        }
        otherArgs[start2] = transform(array2);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// node_modules/lodash/constant.js
var require_constant = __commonJS({
  "node_modules/lodash/constant.js"(exports, module) {
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "node_modules/lodash/_baseSetToString.js"(exports, module) {
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity6 = require_identity();
    var baseSetToString = !defineProperty ? identity6 : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "node_modules/lodash/_shortOut.js"(exports, module) {
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count2 = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count2 >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count2 = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "node_modules/lodash/_setToString.js"(exports, module) {
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// node_modules/lodash/_baseRest.js
var require_baseRest = __commonJS({
  "node_modules/lodash/_baseRest.js"(exports, module) {
    var identity6 = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start2) {
      return setToString(overRest(func, start2, identity6), func + "");
    }
    module.exports = baseRest;
  }
});

// node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index2, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index2;
      if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
        return eq(object[index2], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

// node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  "node_modules/lodash/_createAssigner.js"(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index2 < length) {
          var source = sources[index2];
          if (source) {
            assigner(object, source, index2, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});

// node_modules/lodash/merge.js
var require_merge = __commonJS({
  "node_modules/lodash/merge.js"(exports, module) {
    var baseMerge = require_baseMerge();
    var createAssigner = require_createAssigner();
    var merge2 = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge2;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number3, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number3 || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array2, iteratee) {
      var index2 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array2[index2], index2, array2);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path2) {
      path2 = castPath(path2, object);
      var index2 = 0, length = path2.length;
      while (object != null && index2 < length) {
        object = object[toKey(path2[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path2, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path2);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "node_modules/lodash/_baseSet.js"(exports, module) {
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path2, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path2 = castPath(path2, object);
      var index2 = -1, length = path2.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index2 < length) {
        var key = toKey(path2[index2]), newValue = value;
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          return object;
        }
        if (index2 != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path2[index2 + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  }
});

// node_modules/lodash/set.js
var require_set = __commonJS({
  "node_modules/lodash/set.js"(exports, module) {
    var baseSet = require_baseSet();
    function set2(object, path2, value) {
      return object == null ? object : baseSet(object, path2, value);
    }
    module.exports = set2;
  }
});

// node_modules/lodash/isString.js
var require_isString = __commonJS({
  "node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString;
  }
});

// node_modules/lodash/last.js
var require_last = __commonJS({
  "node_modules/lodash/last.js"(exports, module) {
    function last(array2) {
      var length = array2 == null ? 0 : array2.length;
      return length ? array2[length - 1] : void 0;
    }
    module.exports = last;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "node_modules/lodash/_baseFindIndex.js"(exports, module) {
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length = array2.length, index2 = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index2-- : ++index2 < length) {
        if (predicate(array2[index2], index2, array2)) {
          return index2;
        }
      }
      return -1;
    }
    module.exports = baseFindIndex;
  }
});

// node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "node_modules/lodash/_baseIsNaN.js"(exports, module) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module.exports = baseIsNaN;
  }
});

// node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "node_modules/lodash/_strictIndexOf.js"(exports, module) {
    function strictIndexOf(array2, value, fromIndex) {
      var index2 = fromIndex - 1, length = array2.length;
      while (++index2 < length) {
        if (array2[index2] === value) {
          return index2;
        }
      }
      return -1;
    }
    module.exports = strictIndexOf;
  }
});

// node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "node_modules/lodash/_baseIndexOf.js"(exports, module) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array2, value, fromIndex) {
      return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
    }
    module.exports = baseIndexOf;
  }
});

// node_modules/lodash/_arrayIncludes.js
var require_arrayIncludes = __commonJS({
  "node_modules/lodash/_arrayIncludes.js"(exports, module) {
    var baseIndexOf = require_baseIndexOf();
    function arrayIncludes(array2, value) {
      var length = array2 == null ? 0 : array2.length;
      return !!length && baseIndexOf(array2, value, 0) > -1;
    }
    module.exports = arrayIncludes;
  }
});

// node_modules/lodash/_arrayIncludesWith.js
var require_arrayIncludesWith = __commonJS({
  "node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
    function arrayIncludesWith(array2, value, comparator) {
      var index2 = -1, length = array2 == null ? 0 : array2.length;
      while (++index2 < length) {
        if (comparator(value, array2[index2])) {
          return true;
        }
      }
      return false;
    }
    module.exports = arrayIncludesWith;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// node_modules/lodash/_baseDifference.js
var require_baseDifference = __commonJS({
  "node_modules/lodash/_baseDifference.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var arrayMap = require_arrayMap();
    var baseUnary = require_baseUnary();
    var cacheHas = require_cacheHas();
    var LARGE_ARRAY_SIZE = 200;
    function baseDifference(array2, values, iteratee, comparator) {
      var index2 = -1, includes = arrayIncludes, isCommon = true, length = array2.length, result = [], valuesLength = values.length;
      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
        while (++index2 < length) {
          var value = array2[index2], computed = iteratee == null ? value : iteratee(value);
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
      return result;
    }
    module.exports = baseDifference;
  }
});

// node_modules/lodash/without.js
var require_without = __commonJS({
  "node_modules/lodash/without.js"(exports, module) {
    var baseDifference = require_baseDifference();
    var baseRest = require_baseRest();
    var isArrayLikeObject = require_isArrayLikeObject();
    var without = baseRest(function(array2, values) {
      return isArrayLikeObject(array2) ? baseDifference(array2, values) : [];
    });
    module.exports = without;
  }
});

// node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  "node_modules/lodash/_basePickBy.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSet = require_baseSet();
    var castPath = require_castPath();
    function basePickBy(object, paths, predicate) {
      var index2 = -1, length = paths.length, result = {};
      while (++index2 < length) {
        var path2 = paths[index2], value = baseGet(object, path2);
        if (predicate(value, path2)) {
          baseSet(result, castPath(path2, object), value);
        }
      }
      return result;
    }
    module.exports = basePickBy;
  }
});

// node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path2, hasFunc) {
      path2 = castPath(path2, object);
      var index2 = -1, length = path2.length, result = false;
      while (++index2 < length) {
        var key = toKey(path2[index2]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index2 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path2) {
      return object != null && hasPath(object, path2, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  "node_modules/lodash/_basePick.js"(exports, module) {
    var basePickBy = require_basePickBy();
    var hasIn = require_hasIn();
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path2) {
        return hasIn(object, path2);
      });
    }
    module.exports = basePick;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array2, values) {
      var index2 = -1, length = values.length, offset = array2.length;
      while (++index2 < length) {
        array2[offset + index2] = values[index2];
      }
      return array2;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/lodash/_isFlattenable.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/lodash/_baseFlatten.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array2, depth, predicate, isStrict, result) {
      var index2 = -1, length = array2.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index2 < length) {
        var value = array2[index2];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "node_modules/lodash/flatten.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    function flatten(array2) {
      var length = array2 == null ? 0 : array2.length;
      return length ? baseFlatten(array2, 1) : [];
    }
    module.exports = flatten;
  }
});

// node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "node_modules/lodash/_flatRest.js"(exports, module) {
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

// node_modules/lodash/pick.js
var require_pick = __commonJS({
  "node_modules/lodash/pick.js"(exports, module) {
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array2, predicate) {
      var index2 = -1, length = array2 == null ? 0 : array2.length;
      while (++index2 < length) {
        if (predicate(array2[index2], index2, array2)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array2, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array2.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array2);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array2;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array2, other);
      stack.set(other, array2);
      while (++index2 < arrLength) {
        var arrValue = array2[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array2, stack) : customizer(arrValue, othValue, index2, array2, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array2);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map5) {
      var index2 = -1, result = Array(map5.size);
      map5.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set2) {
      var index2 = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array2, predicate) {
      var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array2[index2];
        if (predicate(value, index2, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView2 = getNative(root, "DataView");
    module.exports = DataView2;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    var DataView2 = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// node_modules/lodash/isEqual.js
var require_isEqual = __commonJS({
  "node_modules/lodash/isEqual.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    function isEqual2(value, other) {
      return baseIsEqual(value, other);
    }
    module.exports = isEqual2;
  }
});

// node_modules/lodash/noop.js
var require_noop = __commonJS({
  "node_modules/lodash/noop.js"(exports, module) {
    function noop2() {
    }
    module.exports = noop2;
  }
});

// node_modules/lodash/_createSet.js
var require_createSet = __commonJS({
  "node_modules/lodash/_createSet.js"(exports, module) {
    var Set2 = require_Set();
    var noop2 = require_noop();
    var setToArray = require_setToArray();
    var INFINITY = 1 / 0;
    var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values) {
      return new Set2(values);
    };
    module.exports = createSet;
  }
});

// node_modules/lodash/_baseUniq.js
var require_baseUniq = __commonJS({
  "node_modules/lodash/_baseUniq.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var cacheHas = require_cacheHas();
    var createSet = require_createSet();
    var setToArray = require_setToArray();
    var LARGE_ARRAY_SIZE = 200;
    function baseUniq(array2, iteratee, comparator) {
      var index2 = -1, includes = arrayIncludes, length = array2.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set2 = iteratee ? null : createSet(array2);
        if (set2) {
          return setToArray(set2);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer:
        while (++index2 < length) {
          var value = array2[index2], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    module.exports = baseUniq;
  }
});

// node_modules/lodash/uniq.js
var require_uniq = __commonJS({
  "node_modules/lodash/uniq.js"(exports, module) {
    var baseUniq = require_baseUniq();
    function uniq(array2) {
      return array2 && array2.length ? baseUniq(array2) : [];
    }
    module.exports = uniq;
  }
});

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index2 = matchData.length, length = index2, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index2--) {
        var data = matchData[index2];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index2 < length) {
        data = matchData[index2];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path2, srcValue) {
      if (isKey(path2) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path2), srcValue);
      }
      return function(object) {
        var objValue = get(object, path2);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path2) {
      return function(object) {
        return baseGet(object, path2);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path2) {
      return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
    }
    module.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity6 = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity6;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// node_modules/lodash/uniqBy.js
var require_uniqBy = __commonJS({
  "node_modules/lodash/uniqBy.js"(exports, module) {
    var baseIteratee = require_baseIteratee();
    var baseUniq = require_baseUniq();
    function uniqBy(array2, iteratee) {
      return array2 && array2.length ? baseUniq(array2, baseIteratee(iteratee, 2)) : [];
    }
    module.exports = uniqBy;
  }
});

// node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index2-- : ++index2 < length) {
          if (iteratee(iterable[index2], index2, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index2 = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index2] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

// node_modules/lodash/_baseSortBy.js
var require_baseSortBy = __commonJS({
  "node_modules/lodash/_baseSortBy.js"(exports, module) {
    function baseSortBy(array2, comparer) {
      var length = array2.length;
      array2.sort(comparer);
      while (length--) {
        array2[length] = array2[length].value;
      }
      return array2;
    }
    module.exports = baseSortBy;
  }
});

// node_modules/lodash/_compareAscending.js
var require_compareAscending = __commonJS({
  "node_modules/lodash/_compareAscending.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
          return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    module.exports = compareAscending;
  }
});

// node_modules/lodash/_compareMultiple.js
var require_compareMultiple = __commonJS({
  "node_modules/lodash/_compareMultiple.js"(exports, module) {
    var compareAscending = require_compareAscending();
    function compareMultiple(object, other, orders) {
      var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
      while (++index2 < length) {
        var result = compareAscending(objCriteria[index2], othCriteria[index2]);
        if (result) {
          if (index2 >= ordersLength) {
            return result;
          }
          var order = orders[index2];
          return result * (order == "desc" ? -1 : 1);
        }
      }
      return object.index - other.index;
    }
    module.exports = compareMultiple;
  }
});

// node_modules/lodash/_baseOrderBy.js
var require_baseOrderBy = __commonJS({
  "node_modules/lodash/_baseOrderBy.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseGet = require_baseGet();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var baseSortBy = require_baseSortBy();
    var baseUnary = require_baseUnary();
    var compareMultiple = require_compareMultiple();
    var identity6 = require_identity();
    var isArray = require_isArray();
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            };
          }
          return iteratee;
        });
      } else {
        iteratees = [identity6];
      }
      var index2 = -1;
      iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
      var result = baseMap(collection, function(value, key, collection2) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { "criteria": criteria, "index": ++index2, "value": value };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    module.exports = baseOrderBy;
  }
});

// node_modules/lodash/sortBy.js
var require_sortBy = __commonJS({
  "node_modules/lodash/sortBy.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    var baseOrderBy = require_baseOrderBy();
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });
    module.exports = sortBy;
  }
});

// node_modules/lodash/_baseIsDate.js
var require_baseIsDate = __commonJS({
  "node_modules/lodash/_baseIsDate.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var dateTag = "[object Date]";
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }
    module.exports = baseIsDate;
  }
});

// node_modules/lodash/isDate.js
var require_isDate = __commonJS({
  "node_modules/lodash/isDate.js"(exports, module) {
    var baseIsDate = require_baseIsDate();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsDate = nodeUtil && nodeUtil.isDate;
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
    module.exports = isDate;
  }
});

// node_modules/@nivo/line/dist/nivo-line.es.js
var import_react21 = __toESM(require_react());

// node_modules/@nivo/core/dist/nivo-core.es.js
var import_react16 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@nivo/tooltip/dist/nivo-tooltip.es.js
var import_react15 = __toESM(require_react());

// node_modules/@react-spring/shared/dist/react-spring_shared.modern.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react8 = __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var globals_exports = {};
__export(globals_exports, {
  assign: () => assign,
  colors: () => colors,
  createStringInterpolator: () => createStringInterpolator,
  skipAnimation: () => skipAnimation,
  to: () => to,
  willAdvance: () => willAdvance
});
var updateQueue = makeQueue();
var raf = (fn2) => schedule(fn2, updateQueue);
var writeQueue = makeQueue();
raf.write = (fn2) => schedule(fn2, writeQueue);
var onStartQueue = makeQueue();
raf.onStart = (fn2) => schedule(fn2, onStartQueue);
var onFrameQueue = makeQueue();
raf.onFrame = (fn2) => schedule(fn2, onFrameQueue);
var onFinishQueue = makeQueue();
raf.onFinish = (fn2) => schedule(fn2, onFinishQueue);
var timeouts = [];
raf.setTimeout = (handler, ms) => {
  const time2 = raf.now() + ms;
  const cancel = () => {
    const i6 = timeouts.findIndex((t10) => t10.cancel == cancel);
    if (~i6)
      timeouts.splice(i6, 1);
    pendingCount -= ~i6 ? 1 : 0;
  };
  const timeout = { time: time2, handler, cancel };
  timeouts.splice(findTimeout(time2), 0, timeout);
  pendingCount += 1;
  start();
  return timeout;
};
var findTimeout = (time2) => ~(~timeouts.findIndex((t10) => t10.time > time2) || ~timeouts.length);
raf.cancel = (fn2) => {
  onStartQueue.delete(fn2);
  onFrameQueue.delete(fn2);
  onFinishQueue.delete(fn2);
  updateQueue.delete(fn2);
  writeQueue.delete(fn2);
};
raf.sync = (fn2) => {
  sync = true;
  raf.batchedUpdates(fn2);
  sync = false;
};
raf.throttle = (fn2) => {
  let lastArgs;
  function queuedFn() {
    try {
      fn2(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }
  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }
  throttled.handler = fn2;
  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };
  return throttled;
};
var nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {
  }
);
raf.use = (impl) => nativeRaf = impl;
raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;
raf.batchedUpdates = (fn2) => fn2();
raf.catch = console.error;
raf.frameLoop = "always";
raf.advance = () => {
  if (raf.frameLoop !== "demand") {
    console.warn(
      "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"
    );
  } else {
    update();
  }
};
var ts = -1;
var pendingCount = 0;
var sync = false;
function schedule(fn2, queue) {
  if (sync) {
    queue.delete(fn2);
    fn2(0);
  } else {
    queue.add(fn2);
    start();
  }
}
function start() {
  if (ts < 0) {
    ts = 0;
    if (raf.frameLoop !== "demand") {
      nativeRaf(loop);
    }
  }
}
function stop() {
  ts = -1;
}
function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}
function update() {
  const prevTs = ts;
  ts = raf.now();
  const count2 = findTimeout(ts);
  if (count2) {
    eachSafely(timeouts.splice(0, count2), (t10) => t10.handler());
    pendingCount -= count2;
  }
  if (!pendingCount) {
    stop();
    return;
  }
  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}
function makeQueue() {
  let next = /* @__PURE__ */ new Set();
  let current = next;
  return {
    add(fn2) {
      pendingCount += current == next && !next.has(fn2) ? 1 : 0;
      next.add(fn2);
    },
    delete(fn2) {
      pendingCount -= current == next && next.has(fn2) ? 1 : 0;
      return next.delete(fn2);
    },
    flush(arg) {
      if (current.size) {
        next = /* @__PURE__ */ new Set();
        pendingCount -= current.size;
        eachSafely(current, (fn2) => fn2(arg) && next.add(fn2));
        pendingCount += next.size;
        current = next;
      }
    }
  };
}
function eachSafely(values, each2) {
  values.forEach((value) => {
    try {
      each2(value);
    } catch (e11) {
      raf.catch(e11);
    }
  });
}
function noop() {
}
var defineHidden = (obj, key, value) => Object.defineProperty(obj, key, { value, writable: true, configurable: true });
var is = {
  arr: Array.isArray,
  obj: (a6) => !!a6 && a6.constructor.name === "Object",
  fun: (a6) => typeof a6 === "function",
  str: (a6) => typeof a6 === "string",
  num: (a6) => typeof a6 === "number",
  und: (a6) => a6 === void 0
};
function isEqual(a6, b5) {
  if (is.arr(a6)) {
    if (!is.arr(b5) || a6.length !== b5.length)
      return false;
    for (let i6 = 0; i6 < a6.length; i6++) {
      if (a6[i6] !== b5[i6])
        return false;
    }
    return true;
  }
  return a6 === b5;
}
var each = (obj, fn2) => obj.forEach(fn2);
function eachProp(obj, fn2, ctx2) {
  if (is.arr(obj)) {
    for (let i6 = 0; i6 < obj.length; i6++) {
      fn2.call(ctx2, obj[i6], `${i6}`);
    }
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn2.call(ctx2, obj[key], key);
    }
  }
}
var toArray = (a6) => is.und(a6) ? [] : is.arr(a6) ? a6 : [a6];
function flush(queue, iterator) {
  if (queue.size) {
    const items = Array.from(queue);
    queue.clear();
    each(items, iterator);
  }
}
var flushCalls = (queue, ...args) => flush(queue, (fn2) => fn2(...args));
var isSSR = () => typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var createStringInterpolator;
var to;
var colors = null;
var skipAnimation = false;
var willAdvance = noop;
var assign = (globals) => {
  if (globals.to)
    to = globals.to;
  if (globals.now)
    raf.now = globals.now;
  if (globals.colors !== void 0)
    colors = globals.colors;
  if (globals.skipAnimation != null)
    skipAnimation = globals.skipAnimation;
  if (globals.createStringInterpolator)
    createStringInterpolator = globals.createStringInterpolator;
  if (globals.requestAnimationFrame)
    raf.use(globals.requestAnimationFrame);
  if (globals.batchedUpdates)
    raf.batchedUpdates = globals.batchedUpdates;
  if (globals.willAdvance)
    willAdvance = globals.willAdvance;
  if (globals.frameLoop)
    raf.frameLoop = globals.frameLoop;
};
var startQueue = /* @__PURE__ */ new Set();
var currentFrame = [];
var prevFrame = [];
var priority = 0;
var frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },
  /** Advance the given animation on every frame until idle. */
  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },
  /** Advance all animations by the given time. */
  advance,
  /** Call this when an animation's priority changes. */
  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);
      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },
  /**
   * Clear all animations. For testing purposes.
   *
   * ☠️ Never call this from within the frameloop.
   */
  clear() {
    currentFrame = [];
    startQueue.clear();
  }
};
function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}
function startSafely(animation) {
  if (!currentFrame.includes(animation))
    startUnsafely(animation);
}
function startUnsafely(animation) {
  currentFrame.splice(
    findIndex(currentFrame, (other) => other.priority > animation.priority),
    0,
    animation
  );
}
function advance(dt2) {
  const nextFrame = prevFrame;
  for (let i6 = 0; i6 < currentFrame.length; i6++) {
    const animation = currentFrame[i6];
    priority = animation.priority;
    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt2);
      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }
  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}
function findIndex(arr, test) {
  const index2 = arr.findIndex(test);
  return index2 < 0 ? arr.length : index2;
}
var clamp = (min3, max3, v6) => Math.min(Math.max(v6, min3), max3);
var colors2 = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...parts) {
  return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
var rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla = new RegExp(
  "hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)
);
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;
function normalizeColor(color4) {
  let match;
  if (typeof color4 === "number") {
    return color4 >>> 0 === color4 && color4 >= 0 && color4 <= 4294967295 ? color4 : null;
  }
  if (match = hex6.exec(color4))
    return parseInt(match[1] + "ff", 16) >>> 0;
  if (colors && colors[color4] !== void 0) {
    return colors[color4];
  }
  if (match = rgb.exec(color4)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    255) >>> // a
    0;
  }
  if (match = rgba.exec(color4)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }
  if (match = hex3.exec(color4)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      "ff",
      // a
      16
    ) >>> 0;
  }
  if (match = hex8.exec(color4))
    return parseInt(match[1], 16) >>> 0;
  if (match = hex4.exec(color4)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      match[4] + match[4],
      // a
      16
    ) >>> 0;
  }
  if (match = hsl.exec(color4)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | 255) >>> // a
    0;
  }
  if (match = hsla.exec(color4)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | parse1(match[4])) >>> // a
    0;
  }
  return null;
}
function hue2rgb(p5, q, t10) {
  if (t10 < 0)
    t10 += 1;
  if (t10 > 1)
    t10 -= 1;
  if (t10 < 1 / 6)
    return p5 + (q - p5) * 6 * t10;
  if (t10 < 1 / 2)
    return q;
  if (t10 < 2 / 3)
    return p5 + (q - p5) * (2 / 3 - t10) * 6;
  return p5;
}
function hslToRgb(h3, s5, l4) {
  const q = l4 < 0.5 ? l4 * (1 + s5) : l4 + s5 - l4 * s5;
  const p5 = 2 * l4 - q;
  const r7 = hue2rgb(p5, q, h3 + 1 / 3);
  const g5 = hue2rgb(p5, q, h3);
  const b5 = hue2rgb(p5, q, h3 - 1 / 3);
  return Math.round(r7 * 255) << 24 | Math.round(g5 * 255) << 16 | Math.round(b5 * 255) << 8;
}
function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0)
    return 0;
  if (int > 255)
    return 255;
  return int;
}
function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}
function parse1(str) {
  const num = parseFloat(str);
  if (num < 0)
    return 0;
  if (num > 1)
    return 255;
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0)
    return 0;
  if (int > 100)
    return 1;
  return int / 100;
}
function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null)
    return input;
  int32Color = int32Color || 0;
  const r7 = (int32Color & 4278190080) >>> 24;
  const g5 = (int32Color & 16711680) >>> 16;
  const b5 = (int32Color & 65280) >>> 8;
  const a6 = (int32Color & 255) / 255;
  return `rgba(${r7}, ${g5}, ${b5}, ${a6})`;
}
var createInterpolator = (range, output, extrapolate) => {
  if (is.fun(range)) {
    return range;
  }
  if (is.arr(range)) {
    return createInterpolator({
      range,
      output,
      extrapolate
    });
  }
  if (is.str(range.output[0])) {
    return createStringInterpolator(range);
  }
  const config2 = range;
  const outputRange = config2.output;
  const inputRange = config2.range || [0, 1];
  const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || "extend";
  const extrapolateRight = config2.extrapolateRight || config2.extrapolate || "extend";
  const easing = config2.easing || ((t10) => t10);
  return (input) => {
    const range2 = findRange(input, inputRange);
    return interpolate(
      input,
      inputRange[range2],
      inputRange[range2 + 1],
      outputRange[range2],
      outputRange[range2 + 1],
      easing,
      extrapolateLeft,
      extrapolateRight,
      config2.map
    );
  };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map5) {
  let result = map5 ? map5(input) : input;
  if (result < inputMin) {
    if (extrapolateLeft === "identity")
      return result;
    else if (extrapolateLeft === "clamp")
      result = inputMin;
  }
  if (result > inputMax) {
    if (extrapolateRight === "identity")
      return result;
    else if (extrapolateRight === "clamp")
      result = inputMax;
  }
  if (outputMin === outputMax)
    return outputMin;
  if (inputMin === inputMax)
    return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity)
    result = -result;
  else if (inputMax === Infinity)
    result = result - inputMin;
  else
    result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity)
    result = -result;
  else if (outputMax === Infinity)
    result = result + outputMin;
  else
    result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  for (var i6 = 1; i6 < inputRange.length - 1; ++i6)
    if (inputRange[i6] >= input)
      break;
  return i6 - 1;
}
var steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = 2 * Math.PI / 3;
var c5 = 2 * Math.PI / 4.5;
var bounceOut = (x6) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x6 < 1 / d1) {
    return n1 * x6 * x6;
  } else if (x6 < 2 / d1) {
    return n1 * (x6 -= 1.5 / d1) * x6 + 0.75;
  } else if (x6 < 2.5 / d1) {
    return n1 * (x6 -= 2.25 / d1) * x6 + 0.9375;
  } else {
    return n1 * (x6 -= 2.625 / d1) * x6 + 0.984375;
  }
};
var easings = {
  linear: (x6) => x6,
  easeInQuad: (x6) => x6 * x6,
  easeOutQuad: (x6) => 1 - (1 - x6) * (1 - x6),
  easeInOutQuad: (x6) => x6 < 0.5 ? 2 * x6 * x6 : 1 - Math.pow(-2 * x6 + 2, 2) / 2,
  easeInCubic: (x6) => x6 * x6 * x6,
  easeOutCubic: (x6) => 1 - Math.pow(1 - x6, 3),
  easeInOutCubic: (x6) => x6 < 0.5 ? 4 * x6 * x6 * x6 : 1 - Math.pow(-2 * x6 + 2, 3) / 2,
  easeInQuart: (x6) => x6 * x6 * x6 * x6,
  easeOutQuart: (x6) => 1 - Math.pow(1 - x6, 4),
  easeInOutQuart: (x6) => x6 < 0.5 ? 8 * x6 * x6 * x6 * x6 : 1 - Math.pow(-2 * x6 + 2, 4) / 2,
  easeInQuint: (x6) => x6 * x6 * x6 * x6 * x6,
  easeOutQuint: (x6) => 1 - Math.pow(1 - x6, 5),
  easeInOutQuint: (x6) => x6 < 0.5 ? 16 * x6 * x6 * x6 * x6 * x6 : 1 - Math.pow(-2 * x6 + 2, 5) / 2,
  easeInSine: (x6) => 1 - Math.cos(x6 * Math.PI / 2),
  easeOutSine: (x6) => Math.sin(x6 * Math.PI / 2),
  easeInOutSine: (x6) => -(Math.cos(Math.PI * x6) - 1) / 2,
  easeInExpo: (x6) => x6 === 0 ? 0 : Math.pow(2, 10 * x6 - 10),
  easeOutExpo: (x6) => x6 === 1 ? 1 : 1 - Math.pow(2, -10 * x6),
  easeInOutExpo: (x6) => x6 === 0 ? 0 : x6 === 1 ? 1 : x6 < 0.5 ? Math.pow(2, 20 * x6 - 10) / 2 : (2 - Math.pow(2, -20 * x6 + 10)) / 2,
  easeInCirc: (x6) => 1 - Math.sqrt(1 - Math.pow(x6, 2)),
  easeOutCirc: (x6) => Math.sqrt(1 - Math.pow(x6 - 1, 2)),
  easeInOutCirc: (x6) => x6 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x6, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x6 + 2, 2)) + 1) / 2,
  easeInBack: (x6) => c3 * x6 * x6 * x6 - c1 * x6 * x6,
  easeOutBack: (x6) => 1 + c3 * Math.pow(x6 - 1, 3) + c1 * Math.pow(x6 - 1, 2),
  easeInOutBack: (x6) => x6 < 0.5 ? Math.pow(2 * x6, 2) * ((c2 + 1) * 2 * x6 - c2) / 2 : (Math.pow(2 * x6 - 2, 2) * ((c2 + 1) * (x6 * 2 - 2) + c2) + 2) / 2,
  easeInElastic: (x6) => x6 === 0 ? 0 : x6 === 1 ? 1 : -Math.pow(2, 10 * x6 - 10) * Math.sin((x6 * 10 - 10.75) * c4),
  easeOutElastic: (x6) => x6 === 0 ? 0 : x6 === 1 ? 1 : Math.pow(2, -10 * x6) * Math.sin((x6 * 10 - 0.75) * c4) + 1,
  easeInOutElastic: (x6) => x6 === 0 ? 0 : x6 === 1 ? 1 : x6 < 0.5 ? -(Math.pow(2, 20 * x6 - 10) * Math.sin((20 * x6 - 11.125) * c5)) / 2 : Math.pow(2, -20 * x6 + 10) * Math.sin((20 * x6 - 11.125) * c5) / 2 + 1,
  easeInBounce: (x6) => 1 - bounceOut(1 - x6),
  easeOutBounce: bounceOut,
  easeInOutBounce: (x6) => x6 < 0.5 ? (1 - bounceOut(1 - 2 * x6)) / 2 : (1 + bounceOut(2 * x6 - 1)) / 2,
  steps
};
var $get = Symbol.for("FluidValue.get");
var $observers = Symbol.for("FluidValue.observers");
var hasFluidValue = (arg) => Boolean(arg && arg[$get]);
var getFluidValue = (arg) => arg && arg[$get] ? arg[$get]() : arg;
var getFluidObservers = (target) => target[$observers] || null;
function callFluidObserver(observer2, event) {
  if (observer2.eventObserved) {
    observer2.eventObserved(event);
  } else {
    observer2(event);
  }
}
function callFluidObservers(target, event) {
  const observers = target[$observers];
  if (observers) {
    observers.forEach((observer2) => {
      callFluidObserver(observer2, event);
    });
  }
}
var FluidValue = class {
  constructor(get) {
    if (!get && !(get = this.get)) {
      throw Error("Unknown getter");
    }
    setFluidGetter(this, get);
  }
};
var setFluidGetter = (target, get) => setHidden(target, $get, get);
function addFluidObserver(target, observer2) {
  if (target[$get]) {
    let observers = target[$observers];
    if (!observers) {
      setHidden(target, $observers, observers = /* @__PURE__ */ new Set());
    }
    if (!observers.has(observer2)) {
      observers.add(observer2);
      if (target.observerAdded) {
        target.observerAdded(observers.size, observer2);
      }
    }
  }
  return observer2;
}
function removeFluidObserver(target, observer2) {
  const observers = target[$observers];
  if (observers && observers.has(observer2)) {
    const count2 = observers.size - 1;
    if (count2) {
      observers.delete(observer2);
    } else {
      target[$observers] = null;
    }
    if (target.observerRemoved) {
      target.observerRemoved(count2, observer2);
    }
  }
}
var setHidden = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
var unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
var variableToRgba = (input) => {
  const [token, fallback] = parseCSSVariable(input);
  if (!token || isSSR()) {
    return input;
  }
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
  if (value) {
    return value.trim();
  } else if (fallback && fallback.startsWith("--")) {
    const value2 = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
    if (value2) {
      return value2;
    } else {
      return input;
    }
  } else if (fallback && cssVariableRegex.test(fallback)) {
    return variableToRgba(fallback);
  } else if (fallback) {
    return fallback;
  }
  return input;
};
var parseCSSVariable = (current) => {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
};
var namedColorRegex;
var rgbaRound = (_2, p1, p22, p32, p42) => `rgba(${Math.round(p1)}, ${Math.round(p22)}, ${Math.round(p32)}, ${p42})`;
var createStringInterpolator2 = (config2) => {
  if (!namedColorRegex)
    namedColorRegex = colors ? (
      // match color names, ignore partial matches
      new RegExp(`(${Object.keys(colors).join("|")})(?!\\w)`, "g")
    ) : (
      // never match
      /^\b$/
    );
  const output = config2.output.map((value) => {
    return getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba);
  });
  const keyframes = output.map((value) => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map(
    (_2, i6) => keyframes.map((values) => {
      if (!(i6 in values)) {
        throw Error('The arity of each "output" value must be equal');
      }
      return values[i6];
    })
  );
  const interpolators = outputRanges.map(
    (output2) => createInterpolator({ ...config2, output: output2 })
  );
  return (input) => {
    var _a;
    const missingUnit = !unitRegex.test(output[0]) && ((_a = output.find((value) => unitRegex.test(value))) == null ? void 0 : _a.replace(numberRegex, ""));
    let i6 = 0;
    return output[0].replace(
      numberRegex,
      () => `${interpolators[i6++](input)}${missingUnit || ""}`
    ).replace(rgbaRegex, rgbaRound);
  };
};
var prefix = "react-spring: ";
var once = (fn2) => {
  const func = fn2;
  let called = false;
  if (typeof func != "function") {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }
  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
var warnInterpolate = once(console.warn);
function deprecateInterpolate() {
  warnInterpolate(
    `${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`
  );
}
var warnDirectCall = once(console.warn);
function deprecateDirectCall() {
  warnDirectCall(
    `${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`
  );
}
function isAnimatedString(value) {
  return is.str(value) && (value[0] == "#" || /\d/.test(value) || // Do not identify a CSS variable as an AnimatedString if its SSR
  !isSSR() && cssVariableRegex.test(value) || value in (colors || {}));
}
var useIsomorphicLayoutEffect = isSSR() ? import_react4.useEffect : import_react4.useLayoutEffect;
var useIsMounted = () => {
  const isMounted = (0, import_react3.useRef)(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
function useForceUpdate() {
  const update22 = (0, import_react2.useState)()[1];
  const isMounted = useIsMounted();
  return () => {
    if (isMounted.current) {
      update22(Math.random());
    }
  };
}
function useMemoOne(getResult, inputs) {
  const [initial] = (0, import_react5.useState)(
    () => ({
      inputs,
      result: getResult()
    })
  );
  const committed = (0, import_react5.useRef)();
  const prevCache = committed.current;
  let cache = prevCache;
  if (cache) {
    const useCache = Boolean(
      inputs && cache.inputs && areInputsEqual(inputs, cache.inputs)
    );
    if (!useCache) {
      cache = {
        inputs,
        result: getResult()
      };
    }
  } else {
    cache = initial;
  }
  (0, import_react5.useEffect)(() => {
    committed.current = cache;
    if (prevCache == initial) {
      initial.inputs = initial.result = void 0;
    }
  }, [cache]);
  return cache.result;
}
function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }
  for (let i6 = 0; i6 < next.length; i6++) {
    if (next[i6] !== prev[i6]) {
      return false;
    }
  }
  return true;
}
var useOnce = (effect) => (0, import_react6.useEffect)(effect, emptyDeps);
var emptyDeps = [];
function usePrev(value) {
  const prevRef = (0, import_react7.useRef)();
  (0, import_react7.useEffect)(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

// node_modules/@react-spring/core/dist/react-spring_core.modern.mjs
var import_react10 = __toESM(require_react(), 1);

// node_modules/@react-spring/animated/dist/react-spring_animated.modern.mjs
var React = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var $node = Symbol.for("Animated:node");
var isAnimated = (value) => !!value && value[$node] === value;
var getAnimated = (owner) => owner && owner[$node];
var setAnimated = (owner, node) => defineHidden(owner, $node, node);
var getPayload = (owner) => owner && owner[$node] && owner[$node].getPayload();
var Animated = class {
  constructor() {
    setAnimated(this, this);
  }
  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }
};
var AnimatedValue = class extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.durationProgress = 0;
    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }
  /** @internal */
  static create(value) {
    return new AnimatedValue(value);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;
      if (step) {
        value = Math.round(value / step) * step;
        if (this.done) {
          this.lastPosition = value;
        }
      }
    }
    if (this._value === value) {
      return false;
    }
    this._value = value;
    return true;
  }
  reset() {
    const { done } = this;
    this.done = false;
    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done)
        this.lastVelocity = null;
      this.v0 = null;
    }
  }
};
var AnimatedString = class extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = createInterpolator({
      output: [value, value]
    });
  }
  /** @internal */
  static create(value) {
    return new AnimatedString(value);
  }
  getValue() {
    const value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }
  setValue(value) {
    if (is.str(value)) {
      if (value == this._string) {
        return false;
      }
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }
    return true;
  }
  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }
    this._value = 0;
    super.reset();
  }
};
var TreeContext = { dependencies: null };
var AnimatedObject = class extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }
  getValue(animated2) {
    const values = {};
    eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated2);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated2) {
        values[key] = source;
      }
    });
    return values;
  }
  /** Replace the raw object data */
  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }
  reset() {
    if (this.payload) {
      each(this.payload, (node) => node.reset());
    }
  }
  /** Create a payload set. */
  _makePayload(source) {
    if (source) {
      const payload = /* @__PURE__ */ new Set();
      eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  /** Add to a payload set. */
  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }
    const payload = getPayload(source);
    if (payload) {
      each(payload, (node) => this.add(node));
    }
  }
};
var AnimatedArray = class extends AnimatedObject {
  constructor(source) {
    super(source);
  }
  /** @internal */
  static create(source) {
    return new AnimatedArray(source);
  }
  getValue() {
    return this.source.map((node) => node.getValue());
  }
  setValue(source) {
    const payload = this.getPayload();
    if (source.length == payload.length) {
      return payload.map((node, i6) => node.setValue(source[i6])).some(Boolean);
    }
    super.setValue(source.map(makeAnimated));
    return true;
  }
};
function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}
function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
}
var withAnimated = (Component, host2) => {
  const hasInstance = (
    // Function components must use "forwardRef" to avoid being
    // re-rendered on every animation frame.
    !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent
  );
  return (0, import_react9.forwardRef)((givenProps, givenRef) => {
    const instanceRef = (0, import_react9.useRef)(null);
    const ref = hasInstance && // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, import_react9.useCallback)(
      (value) => {
        instanceRef.current = updateRef(givenRef, value);
      },
      [givenRef]
    );
    const [props, deps] = getAnimatedState(givenProps, host2);
    const forceUpdate = useForceUpdate();
    const callback = () => {
      const instance = instanceRef.current;
      if (hasInstance && !instance) {
        return;
      }
      const didUpdate = instance ? host2.applyAnimatedValues(instance, props.getValue(true)) : false;
      if (didUpdate === false) {
        forceUpdate();
      }
    };
    const observer = new PropsObserver(callback, deps);
    const observerRef = (0, import_react9.useRef)();
    useIsomorphicLayoutEffect(() => {
      observerRef.current = observer;
      each(deps, (dep) => addFluidObserver(dep, observer));
      return () => {
        if (observerRef.current) {
          each(
            observerRef.current.deps,
            (dep) => removeFluidObserver(dep, observerRef.current)
          );
          raf.cancel(observerRef.current.update);
        }
      };
    });
    (0, import_react9.useEffect)(callback, []);
    useOnce(() => () => {
      const observer2 = observerRef.current;
      each(observer2.deps, (dep) => removeFluidObserver(dep, observer2));
    });
    const usedProps = host2.getComponentProps(props.getValue());
    return React.createElement(Component, { ...usedProps, ref });
  });
};
var PropsObserver = class {
  constructor(update3, deps) {
    this.update = update3;
    this.deps = deps;
  }
  eventObserved(event) {
    if (event.type == "change") {
      raf.write(this.update);
    }
  }
};
function getAnimatedState(props, host2) {
  const dependencies = /* @__PURE__ */ new Set();
  TreeContext.dependencies = dependencies;
  if (props.style)
    props = {
      ...props,
      style: host2.createAnimatedStyle(props.style)
    };
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}
function updateRef(ref, value) {
  if (ref) {
    if (is.fun(ref))
      ref(value);
    else
      ref.current = value;
  }
  return value;
}
var cacheKey = Symbol.for("AnimatedComponent");
var createHost = (components, {
  applyAnimatedValues: applyAnimatedValues2 = () => false,
  createAnimatedStyle = (style) => new AnimatedObject(style),
  getComponentProps = (props) => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues: applyAnimatedValues2,
    createAnimatedStyle,
    getComponentProps
  };
  const animated2 = (Component) => {
    const displayName = getDisplayName(Component) || "Anonymous";
    if (is.str(Component)) {
      Component = animated2[Component] || (animated2[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }
    Component.displayName = `Animated(${displayName})`;
    return Component;
  };
  eachProp(components, (Component, key) => {
    if (is.arr(components)) {
      key = getDisplayName(Component);
    }
    animated2[key] = animated2(Component);
  });
  return {
    animated: animated2
  };
};
var getDisplayName = (arg) => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;

// node_modules/@react-spring/core/dist/react-spring_core.modern.mjs
var React2 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
var import_react12 = __toESM(require_react(), 1);
var React22 = __toESM(require_react(), 1);
var import_react13 = __toESM(require_react(), 1);
var import_react14 = __toESM(require_react(), 1);
function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}
var matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
var resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;
var getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;
var noopTransform = (value) => value;
var getDefaultProps = (props, transform = noopTransform) => {
  let keys = DEFAULT_PROPS;
  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }
  const defaults2 = {};
  for (const key of keys) {
    const value = transform(props[key], key);
    if (!is.und(value)) {
      defaults2[key] = value;
    }
  }
  return defaults2;
};
var DEFAULT_PROPS = [
  "config",
  "onProps",
  "onStart",
  "onChange",
  "onPause",
  "onResume",
  "onRest"
];
var RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  // Transition props
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  // Internal props
  keys: 1,
  callId: 1,
  parentId: 1
};
function getForwardProps(props) {
  const forward = {};
  let count2 = 0;
  eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count2++;
    }
  });
  if (count2) {
    return forward;
  }
}
function inferTo(props) {
  const to22 = getForwardProps(props);
  if (to22) {
    const out = { to: to22 };
    eachProp(props, (val, key) => key in to22 || (out[key] = val));
    return out;
  }
  return { ...props };
}
function computeGoal(value) {
  value = getFluidValue(value);
  return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals_exports.createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}
function hasProps(props) {
  for (const _2 in props)
    return true;
  return false;
}
function isAsyncTo(to22) {
  return is.fun(to22) || is.arr(to22) && is.obj(to22[0]);
}
function detachRefs(ctrl, ref) {
  var _a;
  (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
  ref == null ? void 0 : ref.delete(ctrl);
}
function replaceRef(ctrl, ref) {
  var _a;
  if (ref && ctrl.ref !== ref) {
    (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
    ref.add(ctrl);
    ctrl.ref = ref;
  }
}
var config = {
  default: { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
};
var defaults = {
  ...config.default,
  mass: 1,
  damping: 1,
  easing: easings.linear,
  clamp: false
};
var AnimationConfig = class {
  constructor() {
    this.velocity = 0;
    Object.assign(this, defaults);
  }
};
function mergeConfig(config2, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = { ...defaultConfig };
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = { ...defaultConfig, ...newConfig };
  }
  sanitizeConfig(config2, newConfig);
  Object.assign(config2, newConfig);
  for (const key in defaults) {
    if (config2[key] == null) {
      config2[key] = defaults[key];
    }
  }
  let { frequency, damping } = config2;
  const { mass } = config2;
  if (!is.und(frequency)) {
    if (frequency < 0.01)
      frequency = 0.01;
    if (damping < 0)
      damping = 0;
    config2.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config2.friction = 4 * Math.PI * damping * mass / frequency;
  }
  return config2;
}
function sanitizeConfig(config2, props) {
  if (!is.und(props.decay)) {
    config2.duration = void 0;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config2.duration = void 0;
      config2.decay = void 0;
    }
    if (isTensionConfig) {
      config2.frequency = void 0;
    }
  }
}
var emptyArray = [];
var Animation = class {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.config = new AnimationConfig();
    this.immediate = false;
  }
};
function scheduleProps(callId, { key, props, defaultProps, state, actions }) {
  return new Promise((resolve, reject) => {
    let delay;
    let timeout;
    let cancel = matchProp(props.cancel ?? (defaultProps == null ? void 0 : defaultProps.cancel), key);
    if (cancel) {
      onStart();
    } else {
      if (!is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }
      let pause = defaultProps == null ? void 0 : defaultProps.pause;
      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }
      delay = callProp(props.delay || 0, key);
      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }
    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }
    function onResume() {
      if (delay > 0 && !globals_exports.skipAnimation) {
        state.delayed = true;
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }
    function onStart() {
      if (state.delayed) {
        state.delayed = false;
      }
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);
      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }
      try {
        actions.start({ ...props, callId, cancel }, resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}
var getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some((result) => result.cancelled) ? getCancelledResult(target.get()) : results.every((result) => result.noop) ? getNoopResult(target.get()) : getFinishedResult(
  target.get(),
  results.every((result) => result.finished)
);
var getNoopResult = (value) => ({
  value,
  noop: true,
  finished: true,
  cancelled: false
});
var getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled
});
var getCancelledResult = (value) => ({
  value,
  cancelled: true,
  finished: false
});
function runAsync(to22, props, state, target) {
  const { callId, parentId, onRest } = props;
  const { asyncTo: prevTo, promise: prevPromise } = state;
  if (!parentId && to22 === prevTo && !props.reset) {
    return prevPromise;
  }
  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to22;
    const defaultProps = getDefaultProps(
      props,
      (value, key) => (
        // The `onRest` prop is only called when the `runAsync` promise is resolved.
        key === "onRest" ? void 0 : value
      )
    );
    let preventBail;
    let bail;
    const bailPromise = new Promise(
      (resolve, reject) => (preventBail = resolve, bail = reject)
    );
    const bailIfEnded = (bailSignal) => {
      const bailResult = (
        // The `cancel` prop or `stop` method was used.
        callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
        callId !== state.asyncId && getFinishedResult(target, false)
      );
      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };
    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAnimationSignal();
      return (async () => {
        if (globals_exports.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }
        bailIfEnded(bailSignal);
        const props2 = is.obj(arg1) ? { ...arg1 } : { ...arg2, to: arg1 };
        props2.parentId = callId;
        eachProp(defaultProps, (value, key) => {
          if (is.und(props2[key])) {
            props2[key] = value;
          }
        });
        const result2 = await target.start(props2);
        bailIfEnded(bailSignal);
        if (state.paused) {
          await new Promise((resume) => {
            state.resumeQueue.add(resume);
          });
        }
        return result2;
      })();
    };
    let result;
    if (globals_exports.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }
    try {
      let animating;
      if (is.arr(to22)) {
        animating = (async (queue) => {
          for (const props2 of queue) {
            await animate(props2);
          }
        })(to22);
      } else {
        animating = Promise.resolve(to22(animate, target.stop.bind(target)));
      }
      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAnimationSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : void 0;
        state.promise = parentId ? prevPromise : void 0;
      }
    }
    if (is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }
    return result;
  })();
}
function stopAsync(state, cancelId) {
  flush(state.timeouts, (t10) => t10.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = void 0;
  if (cancelId)
    state.cancelId = cancelId;
}
var BailSignal = class extends Error {
  constructor() {
    super(
      "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."
    );
  }
};
var SkipAnimationSignal = class extends Error {
  constructor() {
    super("SkipAnimationSignal");
  }
};
var isFrameValue = (value) => value instanceof FrameValue;
var nextId = 1;
var FrameValue = class extends FluidValue {
  constructor() {
    super(...arguments);
    this.id = nextId++;
    this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(priority2) {
    if (this._priority != priority2) {
      this._priority = priority2;
      this._onPriorityChange(priority2);
    }
  }
  /** Get the current value */
  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }
  /** Create a spring that maps our value to another value */
  to(...args) {
    return globals_exports.to(this, args);
  }
  /** @deprecated Use the `to` method instead. */
  interpolate(...args) {
    deprecateInterpolate();
    return globals_exports.to(this, args);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(count2) {
    if (count2 == 1)
      this._attach();
  }
  observerRemoved(count2) {
    if (count2 == 0)
      this._detach();
  }
  /** Called when the first child is added. */
  _attach() {
  }
  /** Called when the last child is removed. */
  _detach() {
  }
  /** Tell our children about our new value */
  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: "change",
      parent: this,
      value,
      idle
    });
  }
  /** Tell our children about our new priority */
  _onPriorityChange(priority2) {
    if (!this.idle) {
      frameLoop.sort(this);
    }
    callFluidObservers(this, {
      type: "priority",
      parent: this,
      priority: priority2
    });
  }
};
var $P = Symbol.for("SpringPhase");
var HAS_ANIMATED = 1;
var IS_ANIMATING = 2;
var IS_PAUSED = 4;
var hasAnimated = (target) => (target[$P] & HAS_ANIMATED) > 0;
var isAnimating = (target) => (target[$P] & IS_ANIMATING) > 0;
var isPaused = (target) => (target[$P] & IS_PAUSED) > 0;
var setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
var setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;
var SpringValue = class extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.animation = new Animation();
    this.defaultProps = {};
    this._state = {
      paused: false,
      delayed: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._pendingCalls = /* @__PURE__ */ new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;
    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1) ? { ...arg1 } : { ...arg2, from: arg1 };
      if (is.und(props.default)) {
        props.default = true;
      }
      this.start(props);
    }
  }
  /** Equals true when not advancing on each frame. */
  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }
  get goal() {
    return getFluidValue(this.animation.to);
  }
  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node2) => node2.lastVelocity || 0);
  }
  /**
   * When true, this value has been animated at least once.
   */
  get hasAnimated() {
    return hasAnimated(this);
  }
  /**
   * When true, this value has an unfinished animation,
   * which is either active or paused.
   */
  get isAnimating() {
    return isAnimating(this);
  }
  /**
   * When true, all current and future animations are paused.
   */
  get isPaused() {
    return isPaused(this);
  }
  /**
   *
   *
   */
  get isDelayed() {
    return this._state.delayed;
  }
  /** Advance the current animation by a number of milliseconds */
  advance(dt2) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let { toValues } = anim;
    const { config: config2 } = anim;
    const payload = getPayload(anim.to);
    if (!payload && hasFluidValue(anim.to)) {
      toValues = toArray(getFluidValue(anim.to));
    }
    anim.values.forEach((node2, i6) => {
      if (node2.done)
        return;
      const to22 = (
        // Animated strings always go from 0 to 1.
        node2.constructor == AnimatedString ? 1 : payload ? payload[i6].lastPosition : toValues[i6]
      );
      let finished = anim.immediate;
      let position = to22;
      if (!finished) {
        position = node2.lastPosition;
        if (config2.tension <= 0) {
          node2.done = true;
          return;
        }
        let elapsed = node2.elapsedTime += dt2;
        const from = anim.fromValues[i6];
        const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config2.velocity) ? config2.velocity[i6] : config2.velocity;
        let velocity;
        const precision = config2.precision || (from == to22 ? 5e-3 : Math.min(1, Math.abs(to22 - from) * 1e-3));
        if (!is.und(config2.duration)) {
          let p5 = 1;
          if (config2.duration > 0) {
            if (this._memoizedDuration !== config2.duration) {
              this._memoizedDuration = config2.duration;
              if (node2.durationProgress > 0) {
                node2.elapsedTime = config2.duration * node2.durationProgress;
                elapsed = node2.elapsedTime += dt2;
              }
            }
            p5 = (config2.progress || 0) + elapsed / this._memoizedDuration;
            p5 = p5 > 1 ? 1 : p5 < 0 ? 0 : p5;
            node2.durationProgress = p5;
          }
          position = from + config2.easing(p5) * (to22 - from);
          velocity = (position - node2.lastPosition) / dt2;
          finished = p5 == 1;
        } else if (config2.decay) {
          const decay = config2.decay === true ? 0.998 : config2.decay;
          const e11 = Math.exp(-(1 - decay) * elapsed);
          position = from + v0 / (1 - decay) * (1 - e11);
          finished = Math.abs(node2.lastPosition - position) <= precision;
          velocity = v0 * e11;
        } else {
          velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
          const restVelocity = config2.restVelocity || precision / 10;
          const bounceFactor = config2.clamp ? 0 : config2.bounce;
          const canBounce = !is.und(bounceFactor);
          const isGrowing = from == to22 ? node2.v0 > 0 : from < to22;
          let isMoving;
          let isBouncing = false;
          const step = 1;
          const numSteps = Math.ceil(dt2 / step);
          for (let n7 = 0; n7 < numSteps; ++n7) {
            isMoving = Math.abs(velocity) > restVelocity;
            if (!isMoving) {
              finished = Math.abs(to22 - position) <= precision;
              if (finished) {
                break;
              }
            }
            if (canBounce) {
              isBouncing = position == to22 || position > to22 == isGrowing;
              if (isBouncing) {
                velocity = -velocity * bounceFactor;
                position = to22;
              }
            }
            const springForce = -config2.tension * 1e-6 * (position - to22);
            const dampingForce = -config2.friction * 1e-3 * velocity;
            const acceleration = (springForce + dampingForce) / config2.mass;
            velocity = velocity + acceleration * step;
            position = position + velocity * step;
          }
        }
        node2.lastVelocity = velocity;
        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }
      if (payload && !payload[i6].done) {
        finished = false;
      }
      if (finished) {
        node2.done = true;
      } else {
        idle = false;
      }
      if (node2.setValue(position, config2.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);
    const currVal = node.getValue();
    if (idle) {
      const finalVal = getFluidValue(anim.to);
      if ((currVal !== finalVal || changed) && !config2.decay) {
        node.setValue(finalVal);
        this._onChange(finalVal);
      } else if (changed && config2.decay) {
        this._onChange(currVal);
      }
      this._stop();
    } else if (changed) {
      this._onChange(currVal);
    }
  }
  /** Set the current value, while stopping the current animation */
  set(value) {
    raf.batchedUpdates(() => {
      this._stop();
      this._focus(value);
      this._set(value);
    });
    return this;
  }
  /**
   * Freeze the active animation in time, as well as any updates merged
   * before `resume` is called.
   */
  pause() {
    this._update({ pause: true });
  }
  /** Resume the animation if paused. */
  resume() {
    this._update({ pause: false });
  }
  /** Skip to the end of the current animation. */
  finish() {
    if (isAnimating(this)) {
      const { to: to22, config: config2 } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();
        if (!config2.decay) {
          this._set(to22, false);
        }
        this._stop();
      });
    }
    return this;
  }
  /** Push props into the pending queue. */
  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  start(to22, arg2) {
    let queue;
    if (!is.und(to22)) {
      queue = [is.obj(to22) ? to22 : { ...arg2, to: to22 }];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }
    return Promise.all(
      queue.map((props) => {
        const up = this._update(props);
        return up;
      })
    ).then((results) => getCombinedResult(this, results));
  }
  /**
   * Stop the current animation, and cancel any delayed updates.
   *
   * Pass `true` to call `onRest` with `cancelled: true`.
   */
  stop(cancel) {
    const { to: to22 } = this.animation;
    this._focus(this.get());
    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to22, cancel));
    return this;
  }
  /** Restart the animation. */
  reset() {
    this._update({ reset: true });
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._start();
    } else if (event.type == "priority") {
      this.priority = event.priority + 1;
    }
  }
  /**
   * Parse the `to` and `from` range from the given `props` object.
   *
   * This also ensures the initial value is available to animated components
   * during the render phase.
   */
  _prepareNode(props) {
    const key = this.key || "";
    let { to: to22, from } = props;
    to22 = is.obj(to22) ? to22[key] : to22;
    if (to22 == null || isAsyncTo(to22)) {
      to22 = void 0;
    }
    from = is.obj(from) ? from[key] : from;
    if (from == null) {
      from = void 0;
    }
    const range = { to: to22, from };
    if (!hasAnimated(this)) {
      if (props.reverse)
        [to22, from] = [from, to22];
      from = getFluidValue(from);
      if (!is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
        this._set(to22);
      }
    }
    return range;
  }
  /** Every update is processed by this method before merging. */
  _update({ ...props }, isLoop) {
    const { key, defaultProps } = this;
    if (props.default)
      Object.assign(
        defaultProps,
        getDefaultProps(
          props,
          (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value
        )
      );
    mergeActiveFn(this, props, "onProps");
    sendEvent(this, "onProps", props, this);
    const range = this._prepareNode(props);
    if (Object.isFrozen(this)) {
      throw Error(
        "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?"
      );
    }
    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(
              this,
              "onPause",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);
            if (isAnimating(this)) {
              this._resume();
            }
            flushCalls(state.resumeQueue);
            sendEvent(
              this,
              "onResume",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        start: this._merge.bind(this, range)
      }
    }).then((result) => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);
        if (nextProps) {
          return this._update(nextProps, true);
        }
      }
      return result;
    });
  }
  /** Merge props into the current animation */
  _merge(range, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }
    const hasToProp = !is.und(range.to);
    const hasFromProp = !is.und(range.from);
    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    const { key, defaultProps, animation: anim } = this;
    const { to: prevTo, from: prevFrom } = anim;
    let { to: to22 = prevTo, from = prevFrom } = range;
    if (hasFromProp && !hasToProp && (!props.default || is.und(to22))) {
      to22 = from;
    }
    if (props.reverse)
      [to22, from] = [from, to22];
    const hasFromChanged = !isEqual(from, prevFrom);
    if (hasFromChanged) {
      anim.from = from;
    }
    from = getFluidValue(from);
    const hasToChanged = !isEqual(to22, prevTo);
    if (hasToChanged) {
      this._focus(to22);
    }
    const hasAsyncTo = isAsyncTo(props.to);
    const { config: config2 } = anim;
    const { decay, velocity } = config2;
    if (hasToProp || hasFromProp) {
      config2.velocity = 0;
    }
    if (props.config && !hasAsyncTo) {
      mergeConfig(
        config2,
        callProp(props.config, key),
        // Avoid calling the same "config" prop twice.
        props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0
      );
    }
    let node = getAnimated(this);
    if (!node || is.und(to22)) {
      return resolve(getFinishedResult(this, true));
    }
    const reset = (
      // When `reset` is undefined, the `from` prop implies `reset: true`,
      // except for declarative updates. When `reset` is defined, there
      // must exist a value to animate from.
      is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key)
    );
    const value = reset ? from : this.get();
    const goal = computeGoal(to22);
    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));
    if (hasToChanged) {
      const nodeType = getAnimatedType(to22);
      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else
          throw Error(
            `Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`
          );
      }
    }
    const goalType = node.constructor;
    let started = hasFluidValue(to22);
    let finished = false;
    if (!started) {
      const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      }
      if (!isEqual(anim.immediate, immediate) && !immediate || !isEqual(config2.decay, decay) || !isEqual(config2.velocity, velocity)) {
        started = true;
      }
    }
    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
        this._stop(prevTo);
      }
    }
    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to22) ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }
      if (anim.immediate != immediate) {
        anim.immediate = immediate;
        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }
      if (started) {
        const { onRest } = anim;
        each(ACTIVE_EVENTS, (type) => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);
        this._pendingCalls.add(resolve);
        if (anim.changed)
          raf.batchedUpdates(() => {
            var _a;
            anim.changed = !reset;
            onRest == null ? void 0 : onRest(result, this);
            if (reset) {
              callProp(defaultProps.onRest, result);
            } else {
              (_a = anim.onStart) == null ? void 0 : _a.call(anim, result, this);
            }
          });
      }
    }
    if (reset) {
      this._set(value);
    }
    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
      this._start();
    } else if (isAnimating(this) && !hasToChanged) {
      this._pendingCalls.add(resolve);
    } else {
      resolve(getNoopResult(value));
    }
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */
  _focus(value) {
    const anim = this.animation;
    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }
      anim.to = value;
      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }
  _attach() {
    let priority2 = 0;
    const { to: to22 } = this.animation;
    if (hasFluidValue(to22)) {
      addFluidObserver(to22, this);
      if (isFrameValue(to22)) {
        priority2 = to22.priority + 1;
      }
    }
    this.priority = priority2;
  }
  _detach() {
    const { to: to22 } = this.animation;
    if (hasFluidValue(to22)) {
      removeFluidObserver(to22, this);
    }
  }
  /**
   * Update the current value from outside the frameloop,
   * and return the `Animated` node.
   */
  _set(arg, idle = true) {
    const value = getFluidValue(arg);
    if (!is.und(value)) {
      const oldNode = getAnimated(this);
      if (!oldNode || !isEqual(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);
        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }
        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }
    return getAnimated(this);
  }
  _onStart() {
    const anim = this.animation;
    if (!anim.changed) {
      anim.changed = true;
      sendEvent(
        this,
        "onStart",
        getFinishedResult(this, checkFinished(this, anim.to)),
        this
      );
    }
  }
  _onChange(value, idle) {
    if (!idle) {
      this._onStart();
      callProp(this.animation.onChange, value, this);
    }
    callProp(this.defaultProps.onChange, value, this);
    super._onChange(value, idle);
  }
  // This method resets the animation state (even if already animating) to
  // ensure the latest from/to range is used, and it also ensures this spring
  // is added to the frameloop.
  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));
    if (!anim.immediate) {
      anim.fromValues = anim.values.map((node) => node.lastPosition);
    }
    if (!isAnimating(this)) {
      setActiveBit(this, true);
      if (!isPaused(this)) {
        this._resume();
      }
    }
  }
  _resume() {
    if (globals_exports.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }
  /**
   * Exit the frameloop and notify `onRest` listeners.
   *
   * Always wrap `_stop` calls with `batchedUpdates`.
   */
  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      each(anim.values, (node) => {
        node.done = true;
      });
      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = void 0;
      }
      callFluidObservers(this, {
        type: "idle",
        parent: this
      });
      const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal ?? anim.to));
      flushCalls(this._pendingCalls, result);
      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, "onRest", result, this);
      }
    }
  }
};
function checkFinished(target, to22) {
  const goal = computeGoal(to22);
  const value = computeGoal(target.get());
  return isEqual(value, goal);
}
function createLoopUpdate(props, loop2 = props.loop, to22 = props.to) {
  const loopRet = callProp(loop2);
  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse2 = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate({
      ...props,
      loop: loop2,
      // Avoid updating default props when looping.
      default: false,
      // Never loop the `pause` prop.
      pause: void 0,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !reverse2 || isAsyncTo(to22) ? to22 : void 0,
      // Ignore the "from" prop except on reset.
      from: reset ? props.from : void 0,
      reset,
      // The "loop" prop can return a "useSpring" props object to
      // override any of the original props.
      ...overrides
    });
  }
}
function createUpdate(props) {
  const { to: to22, from } = props = inferTo(props);
  const keys = /* @__PURE__ */ new Set();
  if (is.obj(to22))
    findDefined(to22, keys);
  if (is.obj(from))
    findDefined(from, keys);
  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}
function declareUpdate(props) {
  const update22 = createUpdate(props);
  if (is.und(update22.default)) {
    update22.default = getDefaultProps(update22);
  }
  return update22;
}
function findDefined(values, keys) {
  eachProp(values, (value, key) => value != null && keys.add(key));
}
var ACTIVE_EVENTS = [
  "onStart",
  "onRest",
  "onChange",
  "onPause",
  "onResume"
];
function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}
function sendEvent(target, type, ...args) {
  var _a, _b, _c, _d;
  (_b = (_a = target.animation)[type]) == null ? void 0 : _b.call(_a, ...args);
  (_d = (_c = target.defaultProps)[type]) == null ? void 0 : _d.call(_c, ...args);
}
var BATCHED_EVENTS = ["onStart", "onChange", "onRest"];
var nextId2 = 1;
var Controller = class {
  constructor(props, flush3) {
    this.id = nextId2++;
    this.springs = {};
    this.queue = [];
    this._lastAsyncId = 0;
    this._active = /* @__PURE__ */ new Set();
    this._changed = /* @__PURE__ */ new Set();
    this._started = false;
    this._state = {
      paused: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    };
    this._onFrame = this._onFrame.bind(this);
    if (flush3) {
      this._flush = flush3;
    }
    if (props) {
      this.start({ default: true, ...props });
    }
  }
  /**
   * Equals `true` when no spring values are in the frameloop, and
   * no async animation is currently active.
   */
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((spring) => {
      return spring.idle && !spring.isDelayed && !spring.isPaused;
    });
  }
  get item() {
    return this._item;
  }
  set item(item) {
    this._item = item;
  }
  /** Get the current values of our springs */
  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }
  /** Set the current values without animating. */
  set(values) {
    for (const key in values) {
      const value = values[key];
      if (!is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }
  /** Push an update onto the queue of each value. */
  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }
    return this;
  }
  /**
   * Start the queued animations for every spring, and resolve the returned
   * promise once all queued animations have finished or been cancelled.
   *
   * When you pass a queue (instead of nothing), that queue is used instead of
   * the queued animations added with the `update` method, which are left alone.
   */
  start(props) {
    let { queue } = this;
    if (props) {
      queue = toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }
    if (this._flush) {
      return this._flush(this, queue);
    }
    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  /** @internal */
  stop(arg, keys) {
    if (arg !== !!arg) {
      keys = arg;
    }
    if (keys) {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each((spring) => spring.stop(!!arg));
    }
    return this;
  }
  /** Freeze the active animation in time */
  pause(keys) {
    if (is.und(keys)) {
      this.start({ pause: true });
    } else {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].pause());
    }
    return this;
  }
  /** Resume the animation if paused. */
  resume(keys) {
    if (is.und(keys)) {
      this.start({ pause: false });
    } else {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].resume());
    }
    return this;
  }
  /** Call a function once per spring value */
  each(iterator) {
    eachProp(this.springs, iterator);
  }
  /** @internal Called at the end of every animation frame */
  _onFrame() {
    const { onStart, onChange, onRest } = this._events;
    const active = this._active.size > 0;
    const changed = this._changed.size > 0;
    if (active && !this._started || changed && !this._started) {
      this._started = true;
      flush(onStart, ([onStart2, result]) => {
        result.value = this.get();
        onStart2(result, this, this._item);
      });
    }
    const idle = !active && this._started;
    const values = changed || idle && onRest.size ? this.get() : null;
    if (changed && onChange.size) {
      flush(onChange, ([onChange2, result]) => {
        result.value = values;
        onChange2(result, this, this._item);
      });
    }
    if (idle) {
      this._started = false;
      flush(onRest, ([onRest2, result]) => {
        result.value = values;
        onRest2(result, this, this._item);
      });
    }
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._changed.add(event.parent);
      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else
      return;
    raf.onFrame(this._onFrame);
  }
};
function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map((props) => flushUpdate(ctrl, props))).then(
    (results) => getCombinedResult(ctrl, results)
  );
}
async function flushUpdate(ctrl, props, isLoop) {
  const { keys, to: to22, from, loop: loop2, onRest, onResolve } = props;
  const defaults2 = is.obj(props.default) && props.default;
  if (loop2) {
    props.loop = false;
  }
  if (to22 === false)
    props.to = null;
  if (from === false)
    props.from = null;
  const asyncTo = is.arr(to22) || is.fun(to22) ? to22 : void 0;
  if (asyncTo) {
    props.to = void 0;
    props.onRest = void 0;
    if (defaults2) {
      defaults2.onRest = void 0;
    }
  } else {
    each(BATCHED_EVENTS, (key) => {
      const handler = props[key];
      if (is.fun(handler)) {
        const queue = ctrl["_events"][key];
        props[key] = ({ finished, cancelled }) => {
          const result2 = queue.get(handler);
          if (result2) {
            if (!finished)
              result2.finished = false;
            if (cancelled)
              result2.cancelled = true;
          } else {
            queue.set(handler, {
              value: null,
              finished: finished || false,
              cancelled: cancelled || false
            });
          }
        };
        if (defaults2) {
          defaults2[key] = props[key];
        }
      }
    });
  }
  const state = ctrl["_state"];
  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
    props.pause = true;
  }
  const promises = (keys || Object.keys(ctrl.springs)).map(
    (key) => ctrl.springs[key].start(props)
  );
  const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
  if (asyncTo || cancel && state.asyncId) {
    promises.push(
      scheduleProps(++ctrl["_lastAsyncId"], {
        props,
        state,
        actions: {
          pause: noop,
          resume: noop,
          start(props2, resolve) {
            if (cancel) {
              stopAsync(state, ctrl["_lastAsyncId"]);
              resolve(getCancelledResult(ctrl));
            } else {
              props2.onRest = onRest;
              resolve(
                runAsync(
                  asyncTo,
                  props2,
                  state,
                  ctrl
                )
              );
            }
          }
        }
      })
    );
  }
  if (state.paused) {
    await new Promise((resume) => {
      state.resumeQueue.add(resume);
    });
  }
  const result = getCombinedResult(ctrl, await Promise.all(promises));
  if (loop2 && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop2, to22);
    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }
  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }
  return result;
}
function getSprings(ctrl, props) {
  const springs = { ...ctrl.springs };
  if (props) {
    each(toArray(props), (props2) => {
      if (is.und(props2.keys)) {
        props2 = createUpdate(props2);
      }
      if (!is.obj(props2.to)) {
        props2 = { ...props2, to: void 0 };
      }
      prepareSprings(springs, props2, (key) => {
        return createSpring(key);
      });
    });
  }
  setSprings(ctrl, springs);
  return springs;
}
function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}
function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;
  if (observer) {
    addFluidObserver(spring, observer);
  }
  return spring;
}
function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, (key) => {
      const spring = springs[key] || (springs[key] = create(key));
      spring["_prepareNode"](props);
    });
  }
}
function prepareKeys(ctrl, queue) {
  each(queue, (props) => {
    prepareSprings(ctrl.springs, props, (key) => {
      return createSpring(key, ctrl);
    });
  });
}
var SpringContext = ({
  children,
  ...props
}) => {
  const inherited = (0, import_react11.useContext)(ctx);
  const pause = props.pause || !!inherited.pause, immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(() => ({ pause, immediate }), [pause, immediate]);
  const { Provider } = ctx;
  return React2.createElement(Provider, { value: props }, children);
};
var ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;
function makeContext(target, init) {
  Object.assign(target, React2.createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}
var SpringRef = () => {
  const current = [];
  const SpringRef2 = function(props) {
    deprecateDirectCall();
    const results = [];
    each(current, (ctrl, i6) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update22 = _getProps(props, ctrl, i6);
        if (update22) {
          results.push(ctrl.start(update22));
        }
      }
    });
    return results;
  };
  SpringRef2.current = current;
  SpringRef2.add = function(ctrl) {
    if (!current.includes(ctrl)) {
      current.push(ctrl);
    }
  };
  SpringRef2.delete = function(ctrl) {
    const i6 = current.indexOf(ctrl);
    if (~i6)
      current.splice(i6, 1);
  };
  SpringRef2.pause = function() {
    each(current, (ctrl) => ctrl.pause(...arguments));
    return this;
  };
  SpringRef2.resume = function() {
    each(current, (ctrl) => ctrl.resume(...arguments));
    return this;
  };
  SpringRef2.set = function(values) {
    each(current, (ctrl, i6) => {
      const update22 = is.fun(values) ? values(i6, ctrl) : values;
      if (update22) {
        ctrl.set(update22);
      }
    });
  };
  SpringRef2.start = function(props) {
    const results = [];
    each(current, (ctrl, i6) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update22 = this._getProps(props, ctrl, i6);
        if (update22) {
          results.push(ctrl.start(update22));
        }
      }
    });
    return results;
  };
  SpringRef2.stop = function() {
    each(current, (ctrl) => ctrl.stop(...arguments));
    return this;
  };
  SpringRef2.update = function(props) {
    each(current, (ctrl, i6) => ctrl.update(this._getProps(props, ctrl, i6)));
    return this;
  };
  const _getProps = function(arg, ctrl, index2) {
    return is.fun(arg) ? arg(index2, ctrl) : arg;
  };
  SpringRef2._getProps = _getProps;
  return SpringRef2;
};
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps)
    deps = [];
  const ref = (0, import_react10.useMemo)(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const layoutId = (0, import_react10.useRef)(0);
  const forceUpdate = useForceUpdate();
  const state = (0, import_react10.useMemo)(
    () => ({
      ctrls: [],
      queue: [],
      flush(ctrl, updates2) {
        const springs2 = getSprings(ctrl, updates2);
        const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key) => !ctrl.springs[key]);
        return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise((resolve) => {
          setSprings(ctrl, springs2);
          state.queue.push(() => {
            resolve(flushUpdateQueue(ctrl, updates2));
          });
          forceUpdate();
        });
      }
    }),
    []
  );
  const ctrls = (0, import_react10.useRef)([...state.ctrls]);
  const updates = [];
  const prevLength = usePrev(length) || 0;
  (0, import_react10.useMemo)(() => {
    each(ctrls.current.slice(length, prevLength), (ctrl) => {
      detachRefs(ctrl, ref);
      ctrl.stop(true);
    });
    ctrls.current.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  (0, import_react10.useMemo)(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  function declareUpdates(startIndex, endIndex) {
    for (let i6 = startIndex; i6 < endIndex; i6++) {
      const ctrl = ctrls.current[i6] || (ctrls.current[i6] = new Controller(null, state.flush));
      const update22 = propsFn ? propsFn(i6, ctrl) : props[i6];
      if (update22) {
        updates[i6] = declareUpdate(update22);
      }
    }
  }
  const springs = ctrls.current.map((ctrl, i6) => getSprings(ctrl, updates[i6]));
  const context = (0, import_react10.useContext)(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls.current;
    const { queue } = state;
    if (queue.length) {
      state.queue = [];
      each(queue, (cb) => cb());
    }
    each(ctrls.current, (ctrl, i6) => {
      ref == null ? void 0 : ref.add(ctrl);
      if (hasContext) {
        ctrl.start({ default: context });
      }
      const update22 = updates[i6];
      if (update22) {
        replaceRef(ctrl, update22.ref);
        if (ctrl.ref) {
          ctrl.queue.push(update22);
        } else {
          ctrl.start(update22);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, (ctrl) => ctrl.stop(true));
  });
  const values = springs.map((x6) => ({ ...x6 }));
  return ref ? [values, ref] : values;
}
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref] = useSprings(
    1,
    isFn ? props : [props],
    isFn ? deps || [] : deps
  );
  return isFn || arguments.length == 2 ? [values, ref] : values;
}
function useTransition(data, props, deps) {
  const propsFn = is.fun(props) && props;
  const {
    reset,
    sort: sort2,
    trail = 0,
    expires = true,
    exitBeforeEnter = false,
    onDestroyed,
    ref: propsRef,
    config: propsConfig
  } = propsFn ? propsFn() : props;
  const ref = (0, import_react13.useMemo)(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const items = toArray(data);
  const transitions = [];
  const usedTransitions = (0, import_react13.useRef)(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  useIsomorphicLayoutEffect(() => {
    usedTransitions.current = transitions;
  });
  useOnce(() => {
    each(transitions, (t10) => {
      ref == null ? void 0 : ref.add(t10.ctrl);
      t10.ctrl.ref = ref;
    });
    return () => {
      each(usedTransitions.current, (t10) => {
        if (t10.expired) {
          clearTimeout(t10.expirationId);
        }
        detachRefs(t10.ctrl, ref);
        t10.ctrl.stop(true);
      });
    };
  });
  const keys = getKeys(items, propsFn ? propsFn() : props, prevTransitions);
  const expired = reset && usedTransitions.current || [];
  useIsomorphicLayoutEffect(
    () => each(expired, ({ ctrl, item, key }) => {
      detachRefs(ctrl, ref);
      callProp(onDestroyed, item, key);
    })
  );
  const reused = [];
  if (prevTransitions)
    each(prevTransitions, (t10, i6) => {
      if (t10.expired) {
        clearTimeout(t10.expirationId);
        expired.push(t10);
      } else {
        i6 = reused[i6] = keys.indexOf(t10.key);
        if (~i6)
          transitions[i6] = t10;
      }
    });
  each(items, (item, i6) => {
    if (!transitions[i6]) {
      transitions[i6] = {
        key: keys[i6],
        item,
        phase: "mount",
        ctrl: new Controller()
      };
      transitions[i6].ctrl.item = item;
    }
  });
  if (reused.length) {
    let i6 = -1;
    const { leave } = propsFn ? propsFn() : props;
    each(reused, (keyIndex, prevIndex) => {
      const t10 = prevTransitions[prevIndex];
      if (~keyIndex) {
        i6 = transitions.indexOf(t10);
        transitions[i6] = { ...t10, item: items[keyIndex] };
      } else if (leave) {
        transitions.splice(++i6, 0, t10);
      }
    });
  }
  if (is.fun(sort2)) {
    transitions.sort((a6, b5) => sort2(a6.item, b5.item));
  }
  let delay = -trail;
  const forceUpdate = useForceUpdate();
  const defaultProps = getDefaultProps(props);
  const changes = /* @__PURE__ */ new Map();
  const exitingTransitions = (0, import_react13.useRef)(/* @__PURE__ */ new Map());
  const forceChange = (0, import_react13.useRef)(false);
  each(transitions, (t10, i6) => {
    const key = t10.key;
    const prevPhase = t10.phase;
    const p5 = propsFn ? propsFn() : props;
    let to22;
    let phase;
    const propsDelay = callProp(p5.delay || 0, key);
    if (prevPhase == "mount") {
      to22 = p5.enter;
      phase = "enter";
    } else {
      const isLeave = keys.indexOf(key) < 0;
      if (prevPhase != "leave") {
        if (isLeave) {
          to22 = p5.leave;
          phase = "leave";
        } else if (to22 = p5.update) {
          phase = "update";
        } else
          return;
      } else if (!isLeave) {
        to22 = p5.enter;
        phase = "enter";
      } else
        return;
    }
    to22 = callProp(to22, t10.item, i6);
    to22 = is.obj(to22) ? inferTo(to22) : { to: to22 };
    if (!to22.config) {
      const config2 = propsConfig || defaultProps.config;
      to22.config = callProp(config2, t10.item, i6, phase);
    }
    delay += trail;
    const payload = {
      ...defaultProps,
      // we need to add our props.delay value you here.
      delay: propsDelay + delay,
      ref: propsRef,
      immediate: p5.immediate,
      // This prevents implied resets.
      reset: false,
      // Merge any phase-specific props.
      ...to22
    };
    if (phase == "enter" && is.und(payload.from)) {
      const p22 = propsFn ? propsFn() : props;
      const from = is.und(p22.initial) || prevTransitions ? p22.from : p22.initial;
      payload.from = callProp(from, t10.item, i6);
    }
    const { onResolve } = payload;
    payload.onResolve = (result) => {
      callProp(onResolve, result);
      const transitions2 = usedTransitions.current;
      const t24 = transitions2.find((t34) => t34.key === key);
      if (!t24)
        return;
      if (result.cancelled && t24.phase != "update") {
        return;
      }
      if (t24.ctrl.idle) {
        const idle = transitions2.every((t34) => t34.ctrl.idle);
        if (t24.phase == "leave") {
          const expiry = callProp(expires, t24.item);
          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t24.expired = true;
            if (!idle && expiryMs > 0) {
              if (expiryMs <= 2147483647)
                t24.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        }
        if (idle && transitions2.some((t34) => t34.expired)) {
          exitingTransitions.current.delete(t24);
          if (exitBeforeEnter) {
            forceChange.current = true;
          }
          forceUpdate();
        }
      }
    };
    const springs = getSprings(t10.ctrl, payload);
    if (phase === "leave" && exitBeforeEnter) {
      exitingTransitions.current.set(t10, { phase, springs, payload });
    } else {
      changes.set(t10, { phase, springs, payload });
    }
  });
  const context = (0, import_react13.useContext)(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    if (hasContext) {
      each(transitions, (t10) => {
        t10.ctrl.start({ default: context });
      });
    }
  }, [context]);
  each(changes, (_2, t10) => {
    if (exitingTransitions.current.size) {
      const ind = transitions.findIndex((state) => state.key === t10.key);
      transitions.splice(ind, 1);
    }
  });
  useIsomorphicLayoutEffect(
    () => {
      each(
        exitingTransitions.current.size ? exitingTransitions.current : changes,
        ({ phase, payload }, t10) => {
          const { ctrl } = t10;
          t10.phase = phase;
          ref == null ? void 0 : ref.add(ctrl);
          if (hasContext && phase == "enter") {
            ctrl.start({ default: context });
          }
          if (payload) {
            replaceRef(ctrl, payload.ref);
            if ((ctrl.ref || ref) && !forceChange.current) {
              ctrl.update(payload);
            } else {
              ctrl.start(payload);
              if (forceChange.current) {
                forceChange.current = false;
              }
            }
          }
        }
      );
    },
    reset ? void 0 : deps
  );
  const renderTransitions = (render) => React22.createElement(React22.Fragment, null, transitions.map((t10, i6) => {
    const { springs } = changes.get(t10) || t10.ctrl;
    const elem = render({ ...springs }, t10.item, t10, i6);
    return elem && elem.type ? React22.createElement(
      elem.type,
      {
        ...elem.props,
        key: is.str(t10.key) || is.num(t10.key) ? t10.key : t10.ctrl.id,
        ref: elem.ref
      }
    ) : elem;
  }));
  return ref ? [renderTransitions, ref] : renderTransitions;
}
var nextKey = 1;
function getKeys(items, { key, keys = key }, prevTransitions) {
  if (keys === null) {
    const reused = /* @__PURE__ */ new Set();
    return items.map((item) => {
      const t10 = prevTransitions && prevTransitions.find(
        (t24) => t24.item === item && t24.phase !== "leave" && !reused.has(t24)
      );
      if (t10) {
        reused.add(t10);
        return t10.key;
      }
      return nextKey++;
    });
  }
  return is.und(keys) ? items : is.fun(keys) ? items.map(keys) : toArray(keys);
}
var Interpolation = class extends FrameValue {
  constructor(source, args) {
    super();
    this.source = source;
    this.idle = true;
    this._active = /* @__PURE__ */ new Set();
    this.calc = createInterpolator(...args);
    const value = this._get();
    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }
  advance(_dt) {
    const value = this._get();
    const oldValue = this.get();
    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);
      this._onChange(value, this.idle);
    }
    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }
  _get() {
    const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }
  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      each(getPayload(this), (node) => {
        node.done = false;
      });
      if (globals_exports.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }
  // Observe our sources only when we're observed.
  _attach() {
    let priority2 = 1;
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        addFluidObserver(source, this);
      }
      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }
        priority2 = Math.max(priority2, source.priority + 1);
      }
    });
    this.priority = priority2;
    this._start();
  }
  // Stop observing our sources once we have no observers.
  _detach() {
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });
    this._active.clear();
    becomeIdle(this);
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);
        this._start();
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else if (event.type == "priority") {
      this.priority = toArray(this.source).reduce(
        (highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1),
        0
      );
    }
  }
};
function isIdle(source) {
  return source.idle !== false;
}
function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}
function becomeIdle(self2) {
  if (!self2.idle) {
    self2.idle = true;
    each(getPayload(self2), (node) => {
      node.done = true;
    });
    callFluidObservers(self2, {
      type: "idle",
      parent: self2
    });
  }
}
var to2 = (source, ...args) => new Interpolation(source, args);
globals_exports.assign({
  createStringInterpolator: createStringInterpolator2,
  to: (source, args) => new Interpolation(source, args)
});
var update2 = frameLoop.advance;

// node_modules/@react-spring/web/dist/react-spring_web.modern.mjs
var import_react_dom = __toESM(require_react_dom(), 1);
var isCustomPropRE = /^--/;
function dangerousStyleValue(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n7) => "-" + n7.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);
      if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i6) => {
    instance.setAttribute(name, values[i6]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach((prefix2) => acc[prefixKey(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);
var domTransforms = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms = /^(translate)/;
var degTransforms = /^(rotate|skew)/;
var addUnit = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity = (value, id) => is.arr(value) ? value.every((v6) => isValueIdentity(v6, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle = class extends AnimatedObject {
  constructor({ x: x6, y: y4, z: z4, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x6 || y4 || z4) {
      inputs.push([x6 || 0, y4 || 0, z4 || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v6) => addUnit(v6, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y22, z22, deg]) => [
            `rotate3d(${x22},${y22},${z22},${addUnit(deg, unit2)})`,
            isValueIdentity(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v6) => addUnit(v6, unit2)).join(",")})`,
            isValueIdentity(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform = class extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity6 = true;
    each(this.inputs, (input, i6) => {
      const arg1 = getFluidValue(input[0]);
      const [t10, id] = this.transforms[i6](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t10;
      identity6 = identity6 && id;
    });
    return identity6 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count2) {
    if (count2 == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count2) {
    if (count2 == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: import_react_dom.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: (style) => new AnimatedStyle(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated = host.animated;

// node_modules/@nivo/tooltip/dist/nivo-tooltip.es.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
function v() {
  return v = Object.assign ? Object.assign.bind() : function(t10) {
    for (var i6 = 1; i6 < arguments.length; i6++) {
      var o5 = arguments[i6];
      for (var n7 in o5)
        Object.prototype.hasOwnProperty.call(o5, n7) && (t10[n7] = o5[n7]);
    }
    return t10;
  }, v.apply(this, arguments);
}
var x = { pointerEvents: "none", position: "absolute", zIndex: 10, top: 0, left: 0 };
var m = function(t10, i6) {
  return "translate(" + t10 + "px, " + i6 + "px)";
};
var b = (0, import_react15.memo)(function(t10) {
  var o5, n7 = t10.position, r7 = t10.anchor, e11 = t10.children, l4 = Et(), u3 = Zr(), p5 = u3.animate, f4 = u3.config, b5 = Gt(), g5 = b5[0], w4 = b5[1], T4 = (0, import_react15.useRef)(false), C8 = void 0, E5 = false, P4 = w4.width > 0 && w4.height > 0, j4 = Math.round(n7[0]), N3 = Math.round(n7[1]);
  P4 && ("top" === r7 ? (j4 -= w4.width / 2, N3 -= w4.height + 14) : "right" === r7 ? (j4 += 14, N3 -= w4.height / 2) : "bottom" === r7 ? (j4 -= w4.width / 2, N3 += 14) : "left" === r7 ? (j4 -= w4.width + 14, N3 -= w4.height / 2) : "center" === r7 && (j4 -= w4.width / 2, N3 -= w4.height / 2), C8 = { transform: m(j4, N3) }, T4.current || (E5 = true), T4.current = [j4, N3]);
  var O5 = useSpring({ to: C8, config: f4, immediate: !p5 || E5 }), V3 = v({}, x, l4.tooltip, { transform: null != (o5 = O5.transform) ? o5 : m(j4, N3) });
  return (0, import_jsx_runtime.jsx)(animated.div, { ref: g5, style: V3, children: e11 });
});
b.displayName = "TooltipWrapper";
var g = (0, import_react15.memo)(function(t10) {
  var i6 = t10.size, o5 = void 0 === i6 ? 12 : i6, n7 = t10.color, r7 = t10.style;
  return (0, import_jsx_runtime.jsx)("span", { style: v({ display: "block", width: o5, height: o5, background: n7 }, void 0 === r7 ? {} : r7) });
});
var w = (0, import_react15.memo)(function(t10) {
  var i6, o5 = t10.id, n7 = t10.value, r7 = t10.format, e11 = t10.enableChip, l4 = void 0 !== e11 && e11, a6 = t10.color, c11 = t10.renderContent, h3 = Et(), d3 = Dt(r7);
  if ("function" == typeof c11)
    i6 = c11();
  else {
    var f4 = n7;
    void 0 !== d3 && void 0 !== f4 && (f4 = d3(f4)), i6 = (0, import_jsx_runtime.jsxs)("div", { style: h3.tooltip.basic, children: [l4 && (0, import_jsx_runtime.jsx)(g, { color: a6, style: h3.tooltip.chip }), void 0 !== f4 ? (0, import_jsx_runtime.jsxs)("span", { children: [o5, ": ", (0, import_jsx_runtime.jsx)("strong", { children: "" + f4 })] }) : o5] });
  }
  return (0, import_jsx_runtime.jsx)("div", { style: h3.tooltip.container, children: i6 });
});
var T = { width: "100%", borderCollapse: "collapse" };
var C = (0, import_react15.memo)(function(t10) {
  var i6, o5 = t10.title, n7 = t10.rows, r7 = void 0 === n7 ? [] : n7, e11 = t10.renderContent, l4 = Et();
  return r7.length ? (i6 = "function" == typeof e11 ? e11() : (0, import_jsx_runtime.jsxs)("div", { children: [o5 && o5, (0, import_jsx_runtime.jsx)("table", { style: v({}, T, l4.tooltip.table), children: (0, import_jsx_runtime.jsx)("tbody", { children: r7.map(function(t11, i7) {
    return (0, import_jsx_runtime.jsx)("tr", { children: t11.map(function(t16, i8) {
      return (0, import_jsx_runtime.jsx)("td", { style: l4.tooltip.tableCell, children: t16 }, i8);
    }) }, i7);
  }) }) })] }), (0, import_jsx_runtime.jsx)("div", { style: l4.tooltip.container, children: i6 })) : null;
});
C.displayName = "TableTooltip";
var E = (0, import_react15.memo)(function(t10) {
  var i6 = t10.x0, n7 = t10.x1, r7 = t10.y0, e11 = t10.y1, l4 = Et(), d3 = Zr(), u3 = d3.animate, p5 = d3.config, f4 = (0, import_react15.useMemo)(function() {
    return v({}, l4.crosshair.line, { pointerEvents: "none" });
  }, [l4.crosshair.line]), x6 = useSpring({ x1: i6, x2: n7, y1: r7, y2: e11, config: p5, immediate: !u3 });
  return (0, import_jsx_runtime.jsx)(animated.line, v({}, x6, { fill: "none", style: f4 }));
});
E.displayName = "CrosshairLine";
var P = (0, import_react15.memo)(function(t10) {
  var i6, o5, n7 = t10.width, r7 = t10.height, e11 = t10.type, l4 = t10.x, a6 = t10.y;
  return "cross" === e11 ? (i6 = { x0: l4, x1: l4, y0: 0, y1: r7 }, o5 = { x0: 0, x1: n7, y0: a6, y1: a6 }) : "top-left" === e11 ? (i6 = { x0: l4, x1: l4, y0: 0, y1: a6 }, o5 = { x0: 0, x1: l4, y0: a6, y1: a6 }) : "top" === e11 ? i6 = { x0: l4, x1: l4, y0: 0, y1: a6 } : "top-right" === e11 ? (i6 = { x0: l4, x1: l4, y0: 0, y1: a6 }, o5 = { x0: l4, x1: n7, y0: a6, y1: a6 }) : "right" === e11 ? o5 = { x0: l4, x1: n7, y0: a6, y1: a6 } : "bottom-right" === e11 ? (i6 = { x0: l4, x1: l4, y0: a6, y1: r7 }, o5 = { x0: l4, x1: n7, y0: a6, y1: a6 }) : "bottom" === e11 ? i6 = { x0: l4, x1: l4, y0: a6, y1: r7 } : "bottom-left" === e11 ? (i6 = { x0: l4, x1: l4, y0: a6, y1: r7 }, o5 = { x0: 0, x1: l4, y0: a6, y1: a6 }) : "left" === e11 ? o5 = { x0: 0, x1: l4, y0: a6, y1: a6 } : "x" === e11 ? i6 = { x0: l4, x1: l4, y0: 0, y1: r7 } : "y" === e11 && (o5 = { x0: 0, x1: n7, y0: a6, y1: a6 }), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [i6 && (0, import_jsx_runtime.jsx)(E, { x0: i6.x0, x1: i6.x1, y0: i6.y0, y1: i6.y1 }), o5 && (0, import_jsx_runtime.jsx)(E, { x0: o5.x0, x1: o5.x1, y0: o5.y0, y1: o5.y1 })] });
});
P.displayName = "Crosshair";
var j = (0, import_react15.createContext)({ showTooltipAt: function() {
}, showTooltipFromEvent: function() {
}, hideTooltip: function() {
} });
var N = { isVisible: false, position: [null, null], content: null, anchor: null };
var O = (0, import_react15.createContext)(N);
var V = function(t10) {
  var i6 = (0, import_react15.useState)(N), n7 = i6[0], l4 = i6[1], a6 = (0, import_react15.useCallback)(function(t11, i7, o5) {
    var n8 = i7[0], r7 = i7[1];
    void 0 === o5 && (o5 = "top"), l4({ isVisible: true, position: [n8, r7], anchor: o5, content: t11 });
  }, [l4]), c11 = (0, import_react15.useCallback)(function(i7, o5, n8) {
    void 0 === n8 && (n8 = "top");
    var r7 = t10.current.getBoundingClientRect(), e11 = t10.current.offsetWidth, a7 = e11 === r7.width ? 1 : e11 / r7.width, c12 = (o5.clientX - r7.left) * a7, s6 = (o5.clientY - r7.top) * a7;
    "left" !== n8 && "right" !== n8 || (n8 = c12 < r7.width / 2 ? "right" : "left"), l4({ isVisible: true, position: [c12, s6], anchor: n8, content: i7 });
  }, [t10, l4]), s5 = (0, import_react15.useCallback)(function() {
    l4(N);
  }, [l4]);
  return { actions: (0, import_react15.useMemo)(function() {
    return { showTooltipAt: a6, showTooltipFromEvent: c11, hideTooltip: s5 };
  }, [a6, c11, s5]), state: n7 };
};
var k = function() {
  var t10 = (0, import_react15.useContext)(j);
  if (void 0 === t10)
    throw new Error("useTooltip must be used within a TooltipProvider");
  return t10;
};
var z = function() {
  var t10 = (0, import_react15.useContext)(O);
  if (void 0 === t10)
    throw new Error("useTooltipState must be used within a TooltipProvider");
  return t10;
};
var A = function(t10) {
  return t10.isVisible;
};
var F = function() {
  var t10 = z();
  return A(t10) ? (0, import_jsx_runtime.jsx)(b, { position: t10.position, anchor: t10.anchor, children: t10.content }) : null;
};
var M = function(t10) {
  var i6 = t10.container, o5 = t10.children, n7 = V(i6), r7 = n7.actions, e11 = n7.state;
  return (0, import_jsx_runtime.jsx)(j.Provider, { value: r7, children: (0, import_jsx_runtime.jsx)(O.Provider, { value: e11, children: o5 }) });
};

// node_modules/@nivo/core/dist/nivo-core.es.js
var import_merge2 = __toESM(require_merge());
var import_get = __toESM(require_get());
var import_set2 = __toESM(require_set());

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format3) {
  var m4, l4;
  format3 = (format3 + "").trim().toLowerCase();
  return (m4 = reHex.exec(format3)) ? (l4 = m4[1].length, m4 = parseInt(m4[1], 16), l4 === 6 ? rgbn(m4) : l4 === 3 ? new Rgb(m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, (m4 & 15) << 4 | m4 & 15, 1) : l4 === 8 ? rgba2(m4 >> 24 & 255, m4 >> 16 & 255, m4 >> 8 & 255, (m4 & 255) / 255) : l4 === 4 ? rgba2(m4 >> 12 & 15 | m4 >> 8 & 240, m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, ((m4 & 15) << 4 | m4 & 15) / 255) : null) : (m4 = reRgbInteger.exec(format3)) ? new Rgb(m4[1], m4[2], m4[3], 1) : (m4 = reRgbPercent.exec(format3)) ? new Rgb(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, 1) : (m4 = reRgbaInteger.exec(format3)) ? rgba2(m4[1], m4[2], m4[3], m4[4]) : (m4 = reRgbaPercent.exec(format3)) ? rgba2(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, m4[4]) : (m4 = reHslPercent.exec(format3)) ? hsla2(m4[1], m4[2] / 100, m4[3] / 100, 1) : (m4 = reHslaPercent.exec(format3)) ? hsla2(m4[1], m4[2] / 100, m4[3] / 100, m4[4]) : named.hasOwnProperty(format3) ? rgbn(named[format3]) : format3 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n7) {
  return new Rgb(n7 >> 16 & 255, n7 >> 8 & 255, n7 & 255, 1);
}
function rgba2(r7, g5, b5, a6) {
  if (a6 <= 0)
    r7 = g5 = b5 = NaN;
  return new Rgb(r7, g5, b5, a6);
}
function rgbConvert(o5) {
  if (!(o5 instanceof Color))
    o5 = color(o5);
  if (!o5)
    return new Rgb();
  o5 = o5.rgb();
  return new Rgb(o5.r, o5.g, o5.b, o5.opacity);
}
function rgb2(r7, g5, b5, opacity) {
  return arguments.length === 1 ? rgbConvert(r7) : new Rgb(r7, g5, b5, opacity == null ? 1 : opacity);
}
function Rgb(r7, g5, b5, opacity) {
  this.r = +r7;
  this.g = +g5;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default(Rgb, rgb2, extend(Color, {
  brighter(k6) {
    k6 = k6 == null ? brighter : Math.pow(brighter, k6);
    return new Rgb(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  darker(k6) {
    k6 = k6 == null ? darker : Math.pow(darker, k6);
    return new Rgb(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a6 = clampa(this.opacity);
  return `${a6 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a6 === 1 ? ")" : `, ${a6})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla2(h3, s5, l4, a6) {
  if (a6 <= 0)
    h3 = s5 = l4 = NaN;
  else if (l4 <= 0 || l4 >= 1)
    h3 = s5 = NaN;
  else if (s5 <= 0)
    h3 = NaN;
  return new Hsl(h3, s5, l4, a6);
}
function hslConvert(o5) {
  if (o5 instanceof Hsl)
    return new Hsl(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Color))
    o5 = color(o5);
  if (!o5)
    return new Hsl();
  if (o5 instanceof Hsl)
    return o5;
  o5 = o5.rgb();
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, min3 = Math.min(r7, g5, b5), max3 = Math.max(r7, g5, b5), h3 = NaN, s5 = max3 - min3, l4 = (max3 + min3) / 2;
  if (s5) {
    if (r7 === max3)
      h3 = (g5 - b5) / s5 + (g5 < b5) * 6;
    else if (g5 === max3)
      h3 = (b5 - r7) / s5 + 2;
    else
      h3 = (r7 - g5) / s5 + 4;
    s5 /= l4 < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h3 *= 60;
  } else {
    s5 = l4 > 0 && l4 < 1 ? 0 : h3;
  }
  return new Hsl(h3, s5, l4, o5.opacity);
}
function hsl2(h3, s5, l4, opacity) {
  return arguments.length === 1 ? hslConvert(h3) : new Hsl(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Hsl(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default(Hsl, hsl2, extend(Color, {
  brighter(k6) {
    k6 = k6 == null ? brighter : Math.pow(brighter, k6);
    return new Hsl(this.h, this.s, this.l * k6, this.opacity);
  },
  darker(k6) {
    k6 = k6 == null ? darker : Math.pow(darker, k6);
    return new Hsl(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb() {
    var h3 = this.h % 360 + (this.h < 0) * 360, s5 = isNaN(h3) || isNaN(this.s) ? 0 : this.s, l4 = this.l, m22 = l4 + (l4 < 0.5 ? l4 : 1 - l4) * s5, m1 = 2 * l4 - m22;
    return new Rgb(
      hsl2rgb(h3 >= 240 ? h3 - 240 : h3 + 120, m1, m22),
      hsl2rgb(h3, m1, m22),
      hsl2rgb(h3 < 120 ? h3 + 240 : h3 - 120, m1, m22),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a6 = clampa(this.opacity);
    return `${a6 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a6 === 1 ? ")" : `, ${a6})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h3, m1, m22) {
  return (h3 < 60 ? m1 + (m22 - m1) * h3 / 60 : h3 < 180 ? m22 : h3 < 240 ? m1 + (m22 - m1) * (240 - h3) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o5) {
  if (o5 instanceof Lab)
    return new Lab(o5.l, o5.a, o5.b, o5.opacity);
  if (o5 instanceof Hcl)
    return hcl2lab(o5);
  if (!(o5 instanceof Rgb))
    o5 = rgbConvert(o5);
  var r7 = rgb2lrgb(o5.r), g5 = rgb2lrgb(o5.g), b5 = rgb2lrgb(o5.b), y4 = xyz2lab((0.2225045 * r7 + 0.7168786 * g5 + 0.0606169 * b5) / Yn), x6, z4;
  if (r7 === g5 && g5 === b5)
    x6 = z4 = y4;
  else {
    x6 = xyz2lab((0.4360747 * r7 + 0.3850649 * g5 + 0.1430804 * b5) / Xn);
    z4 = xyz2lab((0.0139322 * r7 + 0.0971045 * g5 + 0.7141733 * b5) / Zn);
  }
  return new Lab(116 * y4 - 16, 500 * (x6 - y4), 200 * (y4 - z4), o5.opacity);
}
function lab(l4, a6, b5, opacity) {
  return arguments.length === 1 ? labConvert(l4) : new Lab(l4, a6, b5, opacity == null ? 1 : opacity);
}
function Lab(l4, a6, b5, opacity) {
  this.l = +l4;
  this.a = +a6;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k6) {
    return new Lab(this.l + K * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  darker(k6) {
    return new Lab(this.l - K * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  rgb() {
    var y4 = (this.l + 16) / 116, x6 = isNaN(this.a) ? y4 : y4 + this.a / 500, z4 = isNaN(this.b) ? y4 : y4 - this.b / 200;
    x6 = Xn * lab2xyz(x6);
    y4 = Yn * lab2xyz(y4);
    z4 = Zn * lab2xyz(z4);
    return new Rgb(
      lrgb2rgb(3.1338561 * x6 - 1.6168667 * y4 - 0.4906146 * z4),
      lrgb2rgb(-0.9787684 * x6 + 1.9161415 * y4 + 0.033454 * z4),
      lrgb2rgb(0.0719453 * x6 - 0.2289914 * y4 + 1.4052427 * z4),
      this.opacity
    );
  }
}));
function xyz2lab(t10) {
  return t10 > t3 ? Math.pow(t10, 1 / 3) : t10 / t2 + t0;
}
function lab2xyz(t10) {
  return t10 > t1 ? t10 * t10 * t10 : t2 * (t10 - t0);
}
function lrgb2rgb(x6) {
  return 255 * (x6 <= 31308e-7 ? 12.92 * x6 : 1.055 * Math.pow(x6, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x6) {
  return (x6 /= 255) <= 0.04045 ? x6 / 12.92 : Math.pow((x6 + 0.055) / 1.055, 2.4);
}
function hclConvert(o5) {
  if (o5 instanceof Hcl)
    return new Hcl(o5.h, o5.c, o5.l, o5.opacity);
  if (!(o5 instanceof Lab))
    o5 = labConvert(o5);
  if (o5.a === 0 && o5.b === 0)
    return new Hcl(NaN, 0 < o5.l && o5.l < 100 ? 0 : NaN, o5.l, o5.opacity);
  var h3 = Math.atan2(o5.b, o5.a) * degrees;
  return new Hcl(h3 < 0 ? h3 + 360 : h3, Math.sqrt(o5.a * o5.a + o5.b * o5.b), o5.l, o5.opacity);
}
function hcl(h3, c11, l4, opacity) {
  return arguments.length === 1 ? hclConvert(h3) : new Hcl(h3, c11, l4, opacity == null ? 1 : opacity);
}
function Hcl(h3, c11, l4, opacity) {
  this.h = +h3;
  this.c = +c11;
  this.l = +l4;
  this.opacity = +opacity;
}
function hcl2lab(o5) {
  if (isNaN(o5.h))
    return new Lab(o5.l, 0, 0, o5.opacity);
  var h3 = o5.h * radians;
  return new Lab(o5.l, Math.cos(h3) * o5.c, Math.sin(h3) * o5.c, o5.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k6) {
    return new Hcl(this.h, this.c, this.l + K * (k6 == null ? 1 : k6), this.opacity);
  },
  darker(k6) {
    return new Hcl(this.h, this.c, this.l - K * (k6 == null ? 1 : k6), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A2 = -0.14861;
var B = 1.78277;
var C2 = -0.29227;
var D = -0.90649;
var E2 = 1.97294;
var ED = E2 * D;
var EB = E2 * B;
var BC_DA = B * C2 - D * A2;
function cubehelixConvert(o5) {
  if (o5 instanceof Cubehelix)
    return new Cubehelix(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Rgb))
    o5 = rgbConvert(o5);
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, l4 = (BC_DA * b5 + ED * r7 - EB * g5) / (BC_DA + ED - EB), bl = b5 - l4, k6 = (E2 * (g5 - l4) - C2 * bl) / D, s5 = Math.sqrt(k6 * k6 + bl * bl) / (E2 * l4 * (1 - l4)), h3 = s5 ? Math.atan2(k6, bl) * degrees - 120 : NaN;
  return new Cubehelix(h3 < 0 ? h3 + 360 : h3, s5, l4, o5.opacity);
}
function cubehelix(h3, s5, l4, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h3) : new Cubehelix(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Cubehelix(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k6) {
    k6 = k6 == null ? brighter : Math.pow(brighter, k6);
    return new Cubehelix(this.h, this.s, this.l * k6, this.opacity);
  },
  darker(k6) {
    k6 = k6 == null ? darker : Math.pow(darker, k6);
    return new Cubehelix(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb() {
    var h3 = isNaN(this.h) ? 0 : (this.h + 120) * radians, l4 = +this.l, a6 = isNaN(this.s) ? 0 : this.s * l4 * (1 - l4), cosh4 = Math.cos(h3), sinh4 = Math.sin(h3);
    return new Rgb(
      255 * (l4 + a6 * (A2 * cosh4 + B * sinh4)),
      255 * (l4 + a6 * (C2 * cosh4 + D * sinh4)),
      255 * (l4 + a6 * (E2 * cosh4)),
      this.opacity
    );
  }
}));

// node_modules/@nivo/core/node_modules/d3-interpolate/src/basis.js
function basis(t16, v0, v1, v22, v32) {
  var t24 = t16 * t16, t34 = t24 * t16;
  return ((1 - 3 * t16 + 3 * t24 - t34) * v0 + (4 - 6 * t24 + 3 * t34) * v1 + (1 + 3 * t16 + 3 * t24 - 3 * t34) * v22 + t34 * v32) / 6;
}
function basis_default(values) {
  var n7 = values.length - 1;
  return function(t10) {
    var i6 = t10 <= 0 ? t10 = 0 : t10 >= 1 ? (t10 = 1, n7 - 1) : Math.floor(t10 * n7), v1 = values[i6], v22 = values[i6 + 1], v0 = i6 > 0 ? values[i6 - 1] : 2 * v1 - v22, v32 = i6 < n7 - 1 ? values[i6 + 2] : 2 * v22 - v1;
    return basis((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n7 = values.length;
  return function(t10) {
    var i6 = Math.floor(((t10 %= 1) < 0 ? ++t10 : t10) * n7), v0 = values[(i6 + n7 - 1) % n7], v1 = values[i6 % n7], v22 = values[(i6 + 1) % n7], v32 = values[(i6 + 2) % n7];
    return basis((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/constant.js
var constant_default = (x6) => () => x6;

// node_modules/@nivo/core/node_modules/d3-interpolate/src/color.js
function linear(a6, d3) {
  return function(t10) {
    return a6 + t10 * d3;
  };
}
function exponential(a6, b5, y4) {
  return a6 = Math.pow(a6, y4), b5 = Math.pow(b5, y4) - a6, y4 = 1 / y4, function(t10) {
    return Math.pow(a6 + t10 * b5, y4);
  };
}
function hue(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear(a6, d3 > 180 || d3 < -180 ? d3 - 360 * Math.round(d3 / 360) : d3) : constant_default(isNaN(a6) ? b5 : a6);
}
function gamma(y4) {
  return (y4 = +y4) === 1 ? nogamma : function(a6, b5) {
    return b5 - a6 ? exponential(a6, b5, y4) : constant_default(isNaN(a6) ? b5 : a6);
  };
}
function nogamma(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear(a6, d3) : constant_default(isNaN(a6) ? b5 : a6);
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y4) {
  var color4 = gamma(y4);
  function rgb5(start2, end) {
    var r7 = color4((start2 = rgb2(start2)).r, (end = rgb2(end)).r), g5 = color4(start2.g, end.g), b5 = color4(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t10) {
      start2.r = r7(t10);
      start2.g = g5(t10);
      start2.b = b5(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  }
  rgb5.gamma = rgbGamma;
  return rgb5;
}(1);
function rgbSpline(spline) {
  return function(colors3) {
    var n7 = colors3.length, r7 = new Array(n7), g5 = new Array(n7), b5 = new Array(n7), i6, color4;
    for (i6 = 0; i6 < n7; ++i6) {
      color4 = rgb2(colors3[i6]);
      r7[i6] = color4.r || 0;
      g5[i6] = color4.g || 0;
      b5[i6] = color4.b || 0;
    }
    r7 = spline(r7);
    g5 = spline(g5);
    b5 = spline(b5);
    color4.opacity = 1;
    return function(t10) {
      color4.r = r7(t10);
      color4.g = g5(t10);
      color4.b = b5(t10);
      return color4 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/@nivo/core/node_modules/d3-interpolate/src/number.js
function number_default(a6, b5) {
  return a6 = +a6, b5 = +b5, function(t10) {
    return a6 * (1 - t10) + b5 * t10;
  };
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b5) {
  return function() {
    return b5;
  };
}
function one(b5) {
  return function(t10) {
    return b5(t10) + "";
  };
}
function string_default(a6, b5) {
  var bi2 = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i6 = -1, s5 = [], q = [];
  a6 = a6 + "", b5 = b5 + "";
  while ((am = reA.exec(a6)) && (bm = reB.exec(b5))) {
    if ((bs = bm.index) > bi2) {
      bs = b5.slice(bi2, bs);
      if (s5[i6])
        s5[i6] += bs;
      else
        s5[++i6] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s5[i6])
        s5[i6] += bm;
      else
        s5[++i6] = bm;
    } else {
      s5[++i6] = null;
      q.push({ i: i6, x: number_default(am, bm) });
    }
    bi2 = reB.lastIndex;
  }
  if (bi2 < b5.length) {
    bs = b5.slice(bi2);
    if (s5[i6])
      s5[i6] += bs;
    else
      s5[++i6] = bs;
  }
  return s5.length < 2 ? q[0] ? one(q[0].x) : zero(b5) : (b5 = q.length, function(t10) {
    for (var i7 = 0, o5; i7 < b5; ++i7)
      s5[(o5 = q[i7]).i] = o5.x(t10);
    return s5.join("");
  });
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a6, b5, c11, d3, e11, f4) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a6 * a6 + b5 * b5))
    a6 /= scaleX, b5 /= scaleX;
  if (skewX = a6 * c11 + b5 * d3)
    c11 -= a6 * skewX, d3 -= b5 * skewX;
  if (scaleY = Math.sqrt(c11 * c11 + d3 * d3))
    c11 /= scaleY, d3 /= scaleY, skewX /= scaleY;
  if (a6 * d3 < b5 * c11)
    a6 = -a6, b5 = -b5, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e11,
    translateY: f4,
    rotate: Math.atan2(b5, a6) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m4 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m4.isIdentity ? identity : decompose_default(m4.a, m4.b, m4.c, m4.d, m4.e, m4.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/@nivo/core/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s5) {
    return s5.length ? s5.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i6 - 4, x: number_default(xa, xb) }, { i: i6 - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s5.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a6, b5, s5, q) {
    if (a6 !== b5) {
      if (a6 - b5 > 180)
        b5 += 360;
      else if (b5 - a6 > 180)
        a6 += 360;
      q.push({ i: s5.push(pop(s5) + "rotate(", null, degParen) - 2, x: number_default(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "rotate(" + b5 + degParen);
    }
  }
  function skewX(a6, b5, s5, q) {
    if (a6 !== b5) {
      q.push({ i: s5.push(pop(s5) + "skewX(", null, degParen) - 2, x: number_default(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "skewX(" + b5 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push(pop(s5) + "scale(", null, ",", null, ")");
      q.push({ i: i6 - 4, x: number_default(xa, xb) }, { i: i6 - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s5.push(pop(s5) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a6, b5) {
    var s5 = [], q = [];
    a6 = parse(a6), b5 = parse(b5);
    translate(a6.translateX, a6.translateY, b5.translateX, b5.translateY, s5, q);
    rotate(a6.rotate, b5.rotate, s5, q);
    skewX(a6.skewX, b5.skewX, s5, q);
    scale(a6.scaleX, a6.scaleY, b5.scaleX, b5.scaleY, s5, q);
    a6 = b5 = null;
    return function(t10) {
      var i6 = -1, n7 = q.length, o5;
      while (++i6 < n7)
        s5[(o5 = q[i6]).i] = o5.x(t10);
      return s5.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/@nivo/core/node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x6) {
  return ((x6 = Math.exp(x6)) + 1 / x6) / 2;
}
function sinh(x6) {
  return ((x6 = Math.exp(x6)) - 1 / x6) / 2;
}
function tanh(x6) {
  return ((x6 = Math.exp(2 * x6)) - 1) / (x6 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d22 = dx * dx + dy * dy, i6, S3;
    if (d22 < epsilon2) {
      S3 = Math.log(w1 / w0) / rho;
      i6 = function(t10) {
        return [
          ux0 + t10 * dx,
          uy0 + t10 * dy,
          w0 * Math.exp(rho * t10 * S3)
        ];
      };
    } else {
      var d1 = Math.sqrt(d22), b0 = (w1 * w1 - w0 * w0 + rho4 * d22) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d22) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S3 = (r1 - r0) / rho;
      i6 = function(t10) {
        var s5 = t10 * S3, coshr0 = cosh(r0), u3 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s5 + r0) - sinh(r0));
        return [
          ux0 + u3 * dx,
          uy0 + u3 * dy,
          w0 * coshr0 / cosh(rho * s5 + r0)
        ];
      };
    }
    i6.duration = S3 * 1e3 * rho / Math.SQRT2;
    return i6;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/@nivo/core/node_modules/d3-interpolate/src/hsl.js
function hsl3(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hsl2(start2)).h, (end = hsl2(end)).h), s5 = nogamma(start2.s, end.s), l4 = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.s = s5(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hsl_default = hsl3(hue);
var hslLong = hsl3(nogamma);

// node_modules/@nivo/core/node_modules/d3-interpolate/src/hcl.js
function hcl2(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hcl(start2)).h, (end = hcl(end)).h), c11 = nogamma(start2.c, end.c), l4 = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.c = c11(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/@nivo/core/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue4) {
  return function cubehelixGamma(y4) {
    y4 = +y4;
    function cubehelix7(start2, end) {
      var h3 = hue4((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s5 = nogamma(start2.s, end.s), l4 = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t10) {
        start2.h = h3(t10);
        start2.s = s5(t10);
        start2.l = l4(Math.pow(t10, y4));
        start2.opacity = opacity(t10);
        return start2 + "";
      };
    }
    cubehelix7.gamma = cubehelixGamma;
    return cubehelix7;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/@nivo/core/dist/nivo-core.es.js
var import_isString = __toESM(require_isString());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_last = __toESM(require_last());
var import_isArray = __toESM(require_isArray());

// node_modules/d3-array/src/ascending.js
function ascending_default(a6, b5) {
  return a6 < b5 ? -1 : a6 > b5 ? 1 : a6 >= b5 ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector_default(f4) {
  let delta = f4;
  let compare = f4;
  if (f4.length === 1) {
    delta = (d3, x6) => f4(d3) - x6;
    compare = ascendingComparator(f4);
  }
  function left(a6, x6, lo, hi2) {
    if (lo == null)
      lo = 0;
    if (hi2 == null)
      hi2 = a6.length;
    while (lo < hi2) {
      const mid = lo + hi2 >>> 1;
      if (compare(a6[mid], x6) < 0)
        lo = mid + 1;
      else
        hi2 = mid;
    }
    return lo;
  }
  function right(a6, x6, lo, hi2) {
    if (lo == null)
      lo = 0;
    if (hi2 == null)
      hi2 = a6.length;
    while (lo < hi2) {
      const mid = lo + hi2 >>> 1;
      if (compare(a6[mid], x6) > 0)
        hi2 = mid;
      else
        lo = mid + 1;
    }
    return lo;
  }
  function center(a6, x6, lo, hi2) {
    if (lo == null)
      lo = 0;
    if (hi2 == null)
      hi2 = a6.length;
    const i6 = left(a6, x6, lo, hi2 - 1);
    return i6 > lo && delta(a6[i6 - 1], x6) > -delta(a6[i6], x6) ? i6 - 1 : i6;
  }
  return { left, center, right };
}
function ascendingComparator(f4) {
  return (d3, x6) => ascending_default(f4(d3), x6);
}

// node_modules/d3-array/src/number.js
function number_default2(x6) {
  return x6 === null ? NaN : +x6;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default2).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start2, stop2, count2) {
  var reverse2, i6 = -1, n7, ticks, step;
  stop2 = +stop2, start2 = +start2, count2 = +count2;
  if (start2 === stop2 && count2 > 0)
    return [start2];
  if (reverse2 = stop2 < start2)
    n7 = start2, start2 = stop2, stop2 = n7;
  if ((step = tickIncrement(start2, stop2, count2)) === 0 || !isFinite(step))
    return [];
  if (step > 0) {
    let r0 = Math.round(start2 / step), r1 = Math.round(stop2 / step);
    if (r0 * step < start2)
      ++r0;
    if (r1 * step > stop2)
      --r1;
    ticks = new Array(n7 = r1 - r0 + 1);
    while (++i6 < n7)
      ticks[i6] = (r0 + i6) * step;
  } else {
    step = -step;
    let r0 = Math.round(start2 * step), r1 = Math.round(stop2 * step);
    if (r0 / step < start2)
      ++r0;
    if (r1 / step > stop2)
      --r1;
    ticks = new Array(n7 = r1 - r0 + 1);
    while (++i6 < n7)
      ticks[i6] = (r0 + i6) / step;
  }
  if (reverse2)
    ticks.reverse();
  return ticks;
}
function tickIncrement(start2, stop2, count2) {
  var step = (stop2 - start2) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start2, stop2, count2) {
  var step0 = Math.abs(stop2 - start2) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10)
    step1 *= 10;
  else if (error >= e5)
    step1 *= 5;
  else if (error >= e2)
    step1 *= 2;
  return stop2 < start2 ? -step1 : step1;
}

// node_modules/d3-array/src/range.js
function range_default(start2, stop2, step) {
  start2 = +start2, stop2 = +stop2, step = (n7 = arguments.length) < 2 ? (stop2 = start2, start2 = 0, 1) : n7 < 3 ? 1 : +step;
  var i6 = -1, n7 = Math.max(0, Math.ceil((stop2 - start2) / step)) | 0, range = new Array(n7);
  while (++i6 < n7) {
    range[i6] = start2 + i6 * step;
  }
  return range;
}

// node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array2, i0 = 0, i1 = array2.length) {
    let m4 = i1 - (i0 = +i0);
    while (m4) {
      const i6 = random() * m4-- | 0, t10 = array2[m4 + i0];
      array2[m4 + i0] = array2[i6 + i0];
      array2[i6 + i0] = t10;
    }
    return array2;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = /* @__PURE__ */ new Map(), domain = [], range = [], unknown = implicit;
  function scale(d3) {
    var key = d3 + "", i6 = index2.get(key);
    if (!i6) {
      if (unknown !== implicit)
        return unknown;
      index2.set(key, i6 = domain.push(d3));
    }
    return range[(i6 - 1) % range.length];
  }
  scale.domain = function(_2) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index2 = /* @__PURE__ */ new Map();
    for (const value of _2) {
      const key = value + "";
      if (index2.has(key))
        continue;
      index2.set(key, domain.push(value));
    }
    return scale;
  };
  scale.range = function(_2) {
    return arguments.length ? (range = Array.from(_2), scale) : range.slice();
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3-scale/src/band.js
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n7 = domain().length, reverse2 = r1 < r0, start2 = reverse2 ? r1 : r0, stop2 = reverse2 ? r0 : r1;
    step = (stop2 - start2) / Math.max(1, n7 - paddingInner + paddingOuter * 2);
    if (round)
      step = Math.floor(step);
    start2 += (stop2 - start2 - step * (n7 - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round)
      start2 = Math.round(start2), bandwidth = Math.round(bandwidth);
    var values = range_default(n7).map(function(i6) {
      return start2 + step * i6;
    });
    return ordinalRange(reverse2 ? values.reverse() : values);
  }
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.range = function(_2) {
    return arguments.length ? ([r0, r1] = _2, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_2) {
    return [r0, r1] = _2, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_2) {
    return arguments.length ? (round = !!_2, rescale()) : round;
  };
  scale.padding = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_2), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, _2), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_2) {
    return arguments.length ? (paddingOuter = +_2, rescale()) : paddingOuter;
  };
  scale.align = function(_2) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _2)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy3 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy3());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

// node_modules/d3-interpolate/node_modules/d3-color/src/define.js
function define_default2(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend2(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-interpolate/node_modules/d3-color/src/color.js
function Color2() {
}
var darker2 = 0.7;
var brighter2 = 1 / darker2;
var reI2 = "\\s*([+-]?\\d+)\\s*";
var reN2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex2 = /^#([0-9a-f]{3,8})$/;
var reRgbInteger2 = new RegExp("^rgb\\(" + [reI2, reI2, reI2] + "\\)$");
var reRgbPercent2 = new RegExp("^rgb\\(" + [reP2, reP2, reP2] + "\\)$");
var reRgbaInteger2 = new RegExp("^rgba\\(" + [reI2, reI2, reI2, reN2] + "\\)$");
var reRgbaPercent2 = new RegExp("^rgba\\(" + [reP2, reP2, reP2, reN2] + "\\)$");
var reHslPercent2 = new RegExp("^hsl\\(" + [reN2, reP2, reP2] + "\\)$");
var reHslaPercent2 = new RegExp("^hsla\\(" + [reN2, reP2, reP2, reN2] + "\\)$");
var named2 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default2(Color2, color2, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex2,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex2,
  formatHsl: color_formatHsl2,
  formatRgb: color_formatRgb2,
  toString: color_formatRgb2
});
function color_formatHex2() {
  return this.rgb().formatHex();
}
function color_formatHsl2() {
  return hslConvert2(this).formatHsl();
}
function color_formatRgb2() {
  return this.rgb().formatRgb();
}
function color2(format3) {
  var m4, l4;
  format3 = (format3 + "").trim().toLowerCase();
  return (m4 = reHex2.exec(format3)) ? (l4 = m4[1].length, m4 = parseInt(m4[1], 16), l4 === 6 ? rgbn2(m4) : l4 === 3 ? new Rgb2(m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, (m4 & 15) << 4 | m4 & 15, 1) : l4 === 8 ? rgba3(m4 >> 24 & 255, m4 >> 16 & 255, m4 >> 8 & 255, (m4 & 255) / 255) : l4 === 4 ? rgba3(m4 >> 12 & 15 | m4 >> 8 & 240, m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, ((m4 & 15) << 4 | m4 & 15) / 255) : null) : (m4 = reRgbInteger2.exec(format3)) ? new Rgb2(m4[1], m4[2], m4[3], 1) : (m4 = reRgbPercent2.exec(format3)) ? new Rgb2(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, 1) : (m4 = reRgbaInteger2.exec(format3)) ? rgba3(m4[1], m4[2], m4[3], m4[4]) : (m4 = reRgbaPercent2.exec(format3)) ? rgba3(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, m4[4]) : (m4 = reHslPercent2.exec(format3)) ? hsla3(m4[1], m4[2] / 100, m4[3] / 100, 1) : (m4 = reHslaPercent2.exec(format3)) ? hsla3(m4[1], m4[2] / 100, m4[3] / 100, m4[4]) : named2.hasOwnProperty(format3) ? rgbn2(named2[format3]) : format3 === "transparent" ? new Rgb2(NaN, NaN, NaN, 0) : null;
}
function rgbn2(n7) {
  return new Rgb2(n7 >> 16 & 255, n7 >> 8 & 255, n7 & 255, 1);
}
function rgba3(r7, g5, b5, a6) {
  if (a6 <= 0)
    r7 = g5 = b5 = NaN;
  return new Rgb2(r7, g5, b5, a6);
}
function rgbConvert2(o5) {
  if (!(o5 instanceof Color2))
    o5 = color2(o5);
  if (!o5)
    return new Rgb2();
  o5 = o5.rgb();
  return new Rgb2(o5.r, o5.g, o5.b, o5.opacity);
}
function rgb3(r7, g5, b5, opacity) {
  return arguments.length === 1 ? rgbConvert2(r7) : new Rgb2(r7, g5, b5, opacity == null ? 1 : opacity);
}
function Rgb2(r7, g5, b5, opacity) {
  this.r = +r7;
  this.g = +g5;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default2(Rgb2, rgb3, extend2(Color2, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter2 : Math.pow(brighter2, k6);
    return new Rgb2(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker2 : Math.pow(darker2, k6);
    return new Rgb2(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex2,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex2,
  formatRgb: rgb_formatRgb2,
  toString: rgb_formatRgb2
}));
function rgb_formatHex2() {
  return "#" + hex2(this.r) + hex2(this.g) + hex2(this.b);
}
function rgb_formatRgb2() {
  var a6 = this.opacity;
  a6 = isNaN(a6) ? 1 : Math.max(0, Math.min(1, a6));
  return (a6 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a6 === 1 ? ")" : ", " + a6 + ")");
}
function hex2(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla3(h3, s5, l4, a6) {
  if (a6 <= 0)
    h3 = s5 = l4 = NaN;
  else if (l4 <= 0 || l4 >= 1)
    h3 = s5 = NaN;
  else if (s5 <= 0)
    h3 = NaN;
  return new Hsl2(h3, s5, l4, a6);
}
function hslConvert2(o5) {
  if (o5 instanceof Hsl2)
    return new Hsl2(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Color2))
    o5 = color2(o5);
  if (!o5)
    return new Hsl2();
  if (o5 instanceof Hsl2)
    return o5;
  o5 = o5.rgb();
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, min3 = Math.min(r7, g5, b5), max3 = Math.max(r7, g5, b5), h3 = NaN, s5 = max3 - min3, l4 = (max3 + min3) / 2;
  if (s5) {
    if (r7 === max3)
      h3 = (g5 - b5) / s5 + (g5 < b5) * 6;
    else if (g5 === max3)
      h3 = (b5 - r7) / s5 + 2;
    else
      h3 = (r7 - g5) / s5 + 4;
    s5 /= l4 < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h3 *= 60;
  } else {
    s5 = l4 > 0 && l4 < 1 ? 0 : h3;
  }
  return new Hsl2(h3, s5, l4, o5.opacity);
}
function hsl4(h3, s5, l4, opacity) {
  return arguments.length === 1 ? hslConvert2(h3) : new Hsl2(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Hsl2(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default2(Hsl2, hsl4, extend2(Color2, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter2 : Math.pow(brighter2, k6);
    return new Hsl2(this.h, this.s, this.l * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker2 : Math.pow(darker2, k6);
    return new Hsl2(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb: function() {
    var h3 = this.h % 360 + (this.h < 0) * 360, s5 = isNaN(h3) || isNaN(this.s) ? 0 : this.s, l4 = this.l, m22 = l4 + (l4 < 0.5 ? l4 : 1 - l4) * s5, m1 = 2 * l4 - m22;
    return new Rgb2(
      hsl2rgb2(h3 >= 240 ? h3 - 240 : h3 + 120, m1, m22),
      hsl2rgb2(h3, m1, m22),
      hsl2rgb2(h3 < 120 ? h3 + 240 : h3 - 120, m1, m22),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a6 = this.opacity;
    a6 = isNaN(a6) ? 1 : Math.max(0, Math.min(1, a6));
    return (a6 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a6 === 1 ? ")" : ", " + a6 + ")");
  }
}));
function hsl2rgb2(h3, m1, m22) {
  return (h3 < 60 ? m1 + (m22 - m1) * h3 / 60 : h3 < 180 ? m22 : h3 < 240 ? m1 + (m22 - m1) * (240 - h3) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/node_modules/d3-color/src/math.js
var radians2 = Math.PI / 180;
var degrees3 = 180 / Math.PI;

// node_modules/d3-interpolate/node_modules/d3-color/src/lab.js
var K2 = 18;
var Xn2 = 0.96422;
var Yn2 = 1;
var Zn2 = 0.82521;
var t02 = 4 / 29;
var t12 = 6 / 29;
var t22 = 3 * t12 * t12;
var t32 = t12 * t12 * t12;
function labConvert2(o5) {
  if (o5 instanceof Lab2)
    return new Lab2(o5.l, o5.a, o5.b, o5.opacity);
  if (o5 instanceof Hcl2)
    return hcl2lab2(o5);
  if (!(o5 instanceof Rgb2))
    o5 = rgbConvert2(o5);
  var r7 = rgb2lrgb2(o5.r), g5 = rgb2lrgb2(o5.g), b5 = rgb2lrgb2(o5.b), y4 = xyz2lab2((0.2225045 * r7 + 0.7168786 * g5 + 0.0606169 * b5) / Yn2), x6, z4;
  if (r7 === g5 && g5 === b5)
    x6 = z4 = y4;
  else {
    x6 = xyz2lab2((0.4360747 * r7 + 0.3850649 * g5 + 0.1430804 * b5) / Xn2);
    z4 = xyz2lab2((0.0139322 * r7 + 0.0971045 * g5 + 0.7141733 * b5) / Zn2);
  }
  return new Lab2(116 * y4 - 16, 500 * (x6 - y4), 200 * (y4 - z4), o5.opacity);
}
function lab3(l4, a6, b5, opacity) {
  return arguments.length === 1 ? labConvert2(l4) : new Lab2(l4, a6, b5, opacity == null ? 1 : opacity);
}
function Lab2(l4, a6, b5, opacity) {
  this.l = +l4;
  this.a = +a6;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default2(Lab2, lab3, extend2(Color2, {
  brighter: function(k6) {
    return new Lab2(this.l + K2 * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  darker: function(k6) {
    return new Lab2(this.l - K2 * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y4 = (this.l + 16) / 116, x6 = isNaN(this.a) ? y4 : y4 + this.a / 500, z4 = isNaN(this.b) ? y4 : y4 - this.b / 200;
    x6 = Xn2 * lab2xyz2(x6);
    y4 = Yn2 * lab2xyz2(y4);
    z4 = Zn2 * lab2xyz2(z4);
    return new Rgb2(
      lrgb2rgb2(3.1338561 * x6 - 1.6168667 * y4 - 0.4906146 * z4),
      lrgb2rgb2(-0.9787684 * x6 + 1.9161415 * y4 + 0.033454 * z4),
      lrgb2rgb2(0.0719453 * x6 - 0.2289914 * y4 + 1.4052427 * z4),
      this.opacity
    );
  }
}));
function xyz2lab2(t10) {
  return t10 > t32 ? Math.pow(t10, 1 / 3) : t10 / t22 + t02;
}
function lab2xyz2(t10) {
  return t10 > t12 ? t10 * t10 * t10 : t22 * (t10 - t02);
}
function lrgb2rgb2(x6) {
  return 255 * (x6 <= 31308e-7 ? 12.92 * x6 : 1.055 * Math.pow(x6, 1 / 2.4) - 0.055);
}
function rgb2lrgb2(x6) {
  return (x6 /= 255) <= 0.04045 ? x6 / 12.92 : Math.pow((x6 + 0.055) / 1.055, 2.4);
}
function hclConvert2(o5) {
  if (o5 instanceof Hcl2)
    return new Hcl2(o5.h, o5.c, o5.l, o5.opacity);
  if (!(o5 instanceof Lab2))
    o5 = labConvert2(o5);
  if (o5.a === 0 && o5.b === 0)
    return new Hcl2(NaN, 0 < o5.l && o5.l < 100 ? 0 : NaN, o5.l, o5.opacity);
  var h3 = Math.atan2(o5.b, o5.a) * degrees3;
  return new Hcl2(h3 < 0 ? h3 + 360 : h3, Math.sqrt(o5.a * o5.a + o5.b * o5.b), o5.l, o5.opacity);
}
function hcl3(h3, c11, l4, opacity) {
  return arguments.length === 1 ? hclConvert2(h3) : new Hcl2(h3, c11, l4, opacity == null ? 1 : opacity);
}
function Hcl2(h3, c11, l4, opacity) {
  this.h = +h3;
  this.c = +c11;
  this.l = +l4;
  this.opacity = +opacity;
}
function hcl2lab2(o5) {
  if (isNaN(o5.h))
    return new Lab2(o5.l, 0, 0, o5.opacity);
  var h3 = o5.h * radians2;
  return new Lab2(o5.l, Math.cos(h3) * o5.c, Math.sin(h3) * o5.c, o5.opacity);
}
define_default2(Hcl2, hcl3, extend2(Color2, {
  brighter: function(k6) {
    return new Hcl2(this.h, this.c, this.l + K2 * (k6 == null ? 1 : k6), this.opacity);
  },
  darker: function(k6) {
    return new Hcl2(this.h, this.c, this.l - K2 * (k6 == null ? 1 : k6), this.opacity);
  },
  rgb: function() {
    return hcl2lab2(this).rgb();
  }
}));

// node_modules/d3-interpolate/node_modules/d3-color/src/cubehelix.js
var A3 = -0.14861;
var B2 = 1.78277;
var C3 = -0.29227;
var D2 = -0.90649;
var E3 = 1.97294;
var ED2 = E3 * D2;
var EB2 = E3 * B2;
var BC_DA2 = B2 * C3 - D2 * A3;
function cubehelixConvert2(o5) {
  if (o5 instanceof Cubehelix2)
    return new Cubehelix2(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Rgb2))
    o5 = rgbConvert2(o5);
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, l4 = (BC_DA2 * b5 + ED2 * r7 - EB2 * g5) / (BC_DA2 + ED2 - EB2), bl = b5 - l4, k6 = (E3 * (g5 - l4) - C3 * bl) / D2, s5 = Math.sqrt(k6 * k6 + bl * bl) / (E3 * l4 * (1 - l4)), h3 = s5 ? Math.atan2(k6, bl) * degrees3 - 120 : NaN;
  return new Cubehelix2(h3 < 0 ? h3 + 360 : h3, s5, l4, o5.opacity);
}
function cubehelix3(h3, s5, l4, opacity) {
  return arguments.length === 1 ? cubehelixConvert2(h3) : new Cubehelix2(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Cubehelix2(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default2(Cubehelix2, cubehelix3, extend2(Color2, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter2 : Math.pow(brighter2, k6);
    return new Cubehelix2(this.h, this.s, this.l * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker2 : Math.pow(darker2, k6);
    return new Cubehelix2(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb: function() {
    var h3 = isNaN(this.h) ? 0 : (this.h + 120) * radians2, l4 = +this.l, a6 = isNaN(this.s) ? 0 : this.s * l4 * (1 - l4), cosh4 = Math.cos(h3), sinh4 = Math.sin(h3);
    return new Rgb2(
      255 * (l4 + a6 * (A3 * cosh4 + B2 * sinh4)),
      255 * (l4 + a6 * (C3 * cosh4 + D2 * sinh4)),
      255 * (l4 + a6 * (E3 * cosh4)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis2(t16, v0, v1, v22, v32) {
  var t24 = t16 * t16, t34 = t24 * t16;
  return ((1 - 3 * t16 + 3 * t24 - t34) * v0 + (4 - 6 * t24 + 3 * t34) * v1 + (1 + 3 * t16 + 3 * t24 - 3 * t34) * v22 + t34 * v32) / 6;
}
function basis_default2(values) {
  var n7 = values.length - 1;
  return function(t10) {
    var i6 = t10 <= 0 ? t10 = 0 : t10 >= 1 ? (t10 = 1, n7 - 1) : Math.floor(t10 * n7), v1 = values[i6], v22 = values[i6 + 1], v0 = i6 > 0 ? values[i6 - 1] : 2 * v1 - v22, v32 = i6 < n7 - 1 ? values[i6 + 2] : 2 * v22 - v1;
    return basis2((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default2(values) {
  var n7 = values.length;
  return function(t10) {
    var i6 = Math.floor(((t10 %= 1) < 0 ? ++t10 : t10) * n7), v0 = values[(i6 + n7 - 1) % n7], v1 = values[i6 % n7], v22 = values[(i6 + 1) % n7], v32 = values[(i6 + 2) % n7];
    return basis2((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x6) => () => x6;

// node_modules/d3-interpolate/src/color.js
function linear2(a6, d3) {
  return function(t10) {
    return a6 + t10 * d3;
  };
}
function exponential2(a6, b5, y4) {
  return a6 = Math.pow(a6, y4), b5 = Math.pow(b5, y4) - a6, y4 = 1 / y4, function(t10) {
    return Math.pow(a6 + t10 * b5, y4);
  };
}
function hue2(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear2(a6, d3 > 180 || d3 < -180 ? d3 - 360 * Math.round(d3 / 360) : d3) : constant_default3(isNaN(a6) ? b5 : a6);
}
function gamma2(y4) {
  return (y4 = +y4) === 1 ? nogamma2 : function(a6, b5) {
    return b5 - a6 ? exponential2(a6, b5, y4) : constant_default3(isNaN(a6) ? b5 : a6);
  };
}
function nogamma2(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear2(a6, d3) : constant_default3(isNaN(a6) ? b5 : a6);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default2 = function rgbGamma2(y4) {
  var color4 = gamma2(y4);
  function rgb5(start2, end) {
    var r7 = color4((start2 = rgb3(start2)).r, (end = rgb3(end)).r), g5 = color4(start2.g, end.g), b5 = color4(start2.b, end.b), opacity = nogamma2(start2.opacity, end.opacity);
    return function(t10) {
      start2.r = r7(t10);
      start2.g = g5(t10);
      start2.b = b5(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  }
  rgb5.gamma = rgbGamma2;
  return rgb5;
}(1);
function rgbSpline2(spline) {
  return function(colors3) {
    var n7 = colors3.length, r7 = new Array(n7), g5 = new Array(n7), b5 = new Array(n7), i6, color4;
    for (i6 = 0; i6 < n7; ++i6) {
      color4 = rgb3(colors3[i6]);
      r7[i6] = color4.r || 0;
      g5[i6] = color4.g || 0;
      b5[i6] = color4.b || 0;
    }
    r7 = spline(r7);
    g5 = spline(g5);
    b5 = spline(b5);
    color4.opacity = 1;
    return function(t10) {
      color4.r = r7(t10);
      color4.g = g5(t10);
      color4.b = b5(t10);
      return color4 + "";
    };
  };
}
var rgbBasis2 = rgbSpline2(basis_default2);
var rgbBasisClosed2 = rgbSpline2(basisClosed_default2);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default2(a6, b5) {
  if (!b5)
    b5 = [];
  var n7 = a6 ? Math.min(b5.length, a6.length) : 0, c11 = b5.slice(), i6;
  return function(t10) {
    for (i6 = 0; i6 < n7; ++i6)
      c11[i6] = a6[i6] * (1 - t10) + b5[i6] * t10;
    return c11;
  };
}
function isNumberArray2(x6) {
  return ArrayBuffer.isView(x6) && !(x6 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray2(a6, b5) {
  var nb = b5 ? b5.length : 0, na = a6 ? Math.min(nb, a6.length) : 0, x6 = new Array(na), c11 = new Array(nb), i6;
  for (i6 = 0; i6 < na; ++i6)
    x6[i6] = value_default2(a6[i6], b5[i6]);
  for (; i6 < nb; ++i6)
    c11[i6] = b5[i6];
  return function(t10) {
    for (i6 = 0; i6 < na; ++i6)
      c11[i6] = x6[i6](t10);
    return c11;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default2(a6, b5) {
  var d3 = /* @__PURE__ */ new Date();
  return a6 = +a6, b5 = +b5, function(t10) {
    return d3.setTime(a6 * (1 - t10) + b5 * t10), d3;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default3(a6, b5) {
  return a6 = +a6, b5 = +b5, function(t10) {
    return a6 * (1 - t10) + b5 * t10;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default2(a6, b5) {
  var i6 = {}, c11 = {}, k6;
  if (a6 === null || typeof a6 !== "object")
    a6 = {};
  if (b5 === null || typeof b5 !== "object")
    b5 = {};
  for (k6 in b5) {
    if (k6 in a6) {
      i6[k6] = value_default2(a6[k6], b5[k6]);
    } else {
      c11[k6] = b5[k6];
    }
  }
  return function(t10) {
    for (k6 in i6)
      c11[k6] = i6[k6](t10);
    return c11;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA2 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB2 = new RegExp(reA2.source, "g");
function zero2(b5) {
  return function() {
    return b5;
  };
}
function one2(b5) {
  return function(t10) {
    return b5(t10) + "";
  };
}
function string_default2(a6, b5) {
  var bi2 = reA2.lastIndex = reB2.lastIndex = 0, am, bm, bs, i6 = -1, s5 = [], q = [];
  a6 = a6 + "", b5 = b5 + "";
  while ((am = reA2.exec(a6)) && (bm = reB2.exec(b5))) {
    if ((bs = bm.index) > bi2) {
      bs = b5.slice(bi2, bs);
      if (s5[i6])
        s5[i6] += bs;
      else
        s5[++i6] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s5[i6])
        s5[i6] += bm;
      else
        s5[++i6] = bm;
    } else {
      s5[++i6] = null;
      q.push({ i: i6, x: number_default3(am, bm) });
    }
    bi2 = reB2.lastIndex;
  }
  if (bi2 < b5.length) {
    bs = b5.slice(bi2);
    if (s5[i6])
      s5[i6] += bs;
    else
      s5[++i6] = bs;
  }
  return s5.length < 2 ? q[0] ? one2(q[0].x) : zero2(b5) : (b5 = q.length, function(t10) {
    for (var i7 = 0, o5; i7 < b5; ++i7)
      s5[(o5 = q[i7]).i] = o5.x(t10);
    return s5.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default2(a6, b5) {
  var t10 = typeof b5, c11;
  return b5 == null || t10 === "boolean" ? constant_default3(b5) : (t10 === "number" ? number_default3 : t10 === "string" ? (c11 = color2(b5)) ? (b5 = c11, rgb_default2) : string_default2 : b5 instanceof color2 ? rgb_default2 : b5 instanceof Date ? date_default2 : isNumberArray2(b5) ? numberArray_default2 : Array.isArray(b5) ? genericArray2 : typeof b5.valueOf !== "function" && typeof b5.toString !== "function" || isNaN(b5) ? object_default2 : number_default3)(a6, b5);
}

// node_modules/d3-interpolate/src/round.js
function round_default2(a6, b5) {
  return a6 = +a6, b5 = +b5, function(t10) {
    return Math.round(a6 * (1 - t10) + b5 * t10);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees4 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default2(a6, b5, c11, d3, e11, f4) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a6 * a6 + b5 * b5))
    a6 /= scaleX, b5 /= scaleX;
  if (skewX = a6 * c11 + b5 * d3)
    c11 -= a6 * skewX, d3 -= b5 * skewX;
  if (scaleY = Math.sqrt(c11 * c11 + d3 * d3))
    c11 /= scaleY, d3 /= scaleY, skewX /= scaleY;
  if (a6 * d3 < b5 * c11)
    a6 = -a6, b5 = -b5, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e11,
    translateY: f4,
    rotate: Math.atan2(b5, a6) * degrees4,
    skewX: Math.atan(skewX) * degrees4,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode2;
function parseCss2(value) {
  const m4 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m4.isIdentity ? identity2 : decompose_default2(m4.a, m4.b, m4.c, m4.d, m4.e, m4.f);
}
function parseSvg2(value) {
  if (value == null)
    return identity2;
  if (!svgNode2)
    svgNode2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode2.setAttribute("transform", value);
  if (!(value = svgNode2.transform.baseVal.consolidate()))
    return identity2;
  value = value.matrix;
  return decompose_default2(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform2(parse, pxComma, pxParen, degParen) {
  function pop(s5) {
    return s5.length ? s5.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i6 - 4, x: number_default3(xa, xb) }, { i: i6 - 2, x: number_default3(ya, yb) });
    } else if (xb || yb) {
      s5.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a6, b5, s5, q) {
    if (a6 !== b5) {
      if (a6 - b5 > 180)
        b5 += 360;
      else if (b5 - a6 > 180)
        a6 += 360;
      q.push({ i: s5.push(pop(s5) + "rotate(", null, degParen) - 2, x: number_default3(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "rotate(" + b5 + degParen);
    }
  }
  function skewX(a6, b5, s5, q) {
    if (a6 !== b5) {
      q.push({ i: s5.push(pop(s5) + "skewX(", null, degParen) - 2, x: number_default3(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "skewX(" + b5 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push(pop(s5) + "scale(", null, ",", null, ")");
      q.push({ i: i6 - 4, x: number_default3(xa, xb) }, { i: i6 - 2, x: number_default3(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s5.push(pop(s5) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a6, b5) {
    var s5 = [], q = [];
    a6 = parse(a6), b5 = parse(b5);
    translate(a6.translateX, a6.translateY, b5.translateX, b5.translateY, s5, q);
    rotate(a6.rotate, b5.rotate, s5, q);
    skewX(a6.skewX, b5.skewX, s5, q);
    scale(a6.scaleX, a6.scaleY, b5.scaleX, b5.scaleY, s5, q);
    a6 = b5 = null;
    return function(t10) {
      var i6 = -1, n7 = q.length, o5;
      while (++i6 < n7)
        s5[(o5 = q[i6]).i] = o5.x(t10);
      return s5.join("");
    };
  };
}
var interpolateTransformCss2 = interpolateTransform2(parseCss2, "px, ", "px)", "deg)");
var interpolateTransformSvg2 = interpolateTransform2(parseSvg2, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon22 = 1e-12;
function cosh2(x6) {
  return ((x6 = Math.exp(x6)) + 1 / x6) / 2;
}
function sinh2(x6) {
  return ((x6 = Math.exp(x6)) - 1 / x6) / 2;
}
function tanh2(x6) {
  return ((x6 = Math.exp(2 * x6)) - 1) / (x6 + 1);
}
var zoom_default2 = function zoomRho2(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d22 = dx * dx + dy * dy, i6, S3;
    if (d22 < epsilon22) {
      S3 = Math.log(w1 / w0) / rho;
      i6 = function(t10) {
        return [
          ux0 + t10 * dx,
          uy0 + t10 * dy,
          w0 * Math.exp(rho * t10 * S3)
        ];
      };
    } else {
      var d1 = Math.sqrt(d22), b0 = (w1 * w1 - w0 * w0 + rho4 * d22) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d22) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S3 = (r1 - r0) / rho;
      i6 = function(t10) {
        var s5 = t10 * S3, coshr0 = cosh2(r0), u3 = w0 / (rho2 * d1) * (coshr0 * tanh2(rho * s5 + r0) - sinh2(r0));
        return [
          ux0 + u3 * dx,
          uy0 + u3 * dy,
          w0 * coshr0 / cosh2(rho * s5 + r0)
        ];
      };
    }
    i6.duration = S3 * 1e3 * rho / Math.SQRT2;
    return i6;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho2(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl5(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hsl4(start2)).h, (end = hsl4(end)).h), s5 = nogamma2(start2.s, end.s), l4 = nogamma2(start2.l, end.l), opacity = nogamma2(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.s = s5(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hsl_default2 = hsl5(hue2);
var hslLong2 = hsl5(nogamma2);

// node_modules/d3-interpolate/src/hcl.js
function hcl4(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hcl3(start2)).h, (end = hcl3(end)).h), c11 = nogamma2(start2.c, end.c), l4 = nogamma2(start2.l, end.l), opacity = nogamma2(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.c = c11(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hcl_default2 = hcl4(hue2);
var hclLong2 = hcl4(nogamma2);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix4(hue4) {
  return function cubehelixGamma(y4) {
    y4 = +y4;
    function cubehelix7(start2, end) {
      var h3 = hue4((start2 = cubehelix3(start2)).h, (end = cubehelix3(end)).h), s5 = nogamma2(start2.s, end.s), l4 = nogamma2(start2.l, end.l), opacity = nogamma2(start2.opacity, end.opacity);
      return function(t10) {
        start2.h = h3(t10);
        start2.s = s5(t10);
        start2.l = l4(Math.pow(t10, y4));
        start2.opacity = opacity(t10);
        return start2 + "";
      };
    }
    cubehelix7.gamma = cubehelixGamma;
    return cubehelix7;
  }(1);
}
var cubehelix_default2 = cubehelix4(hue2);
var cubehelixLong2 = cubehelix4(nogamma2);

// node_modules/d3-scale/src/constant.js
function constants(x6) {
  return function() {
    return x6;
  };
}

// node_modules/d3-scale/src/number.js
function number(x6) {
  return +x6;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity3(x6) {
  return x6;
}
function normalize(a6, b5) {
  return (b5 -= a6 = +a6) ? function(x6) {
    return (x6 - a6) / b5;
  } : constants(isNaN(b5) ? NaN : 0.5);
}
function clamper(a6, b5) {
  var t10;
  if (a6 > b5)
    t10 = a6, a6 = b5, b5 = t10;
  return function(x6) {
    return Math.max(a6, Math.min(b5, x6));
  };
}
function bimap(domain, range, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x6) {
    return r0(d0(x6));
  };
}
function polymap(domain, range, interpolate2) {
  var j4 = Math.min(domain.length, range.length) - 1, d3 = new Array(j4), r7 = new Array(j4), i6 = -1;
  if (domain[j4] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i6 < j4) {
    d3[i6] = normalize(domain[i6], domain[i6 + 1]);
    r7[i6] = interpolate2(range[i6], range[i6 + 1]);
  }
  return function(x6) {
    var i7 = bisect_default(domain, x6, 1, j4) - 1;
    return r7[i7](d3[i7](x6));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate2 = value_default2, transform, untransform, unknown, clamp2 = identity3, piecewise4, output, input;
  function rescale() {
    var n7 = Math.min(domain.length, range.length);
    if (clamp2 !== identity3)
      clamp2 = clamper(domain[0], domain[n7 - 1]);
    piecewise4 = n7 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x6) {
    return x6 == null || isNaN(x6 = +x6) ? unknown : (output || (output = piecewise4(domain.map(transform), range, interpolate2)))(transform(clamp2(x6)));
  }
  scale.invert = function(y4) {
    return clamp2(untransform((input || (input = piecewise4(range, domain.map(transform), number_default3)))(y4)));
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain = Array.from(_2, number), rescale()) : domain.slice();
  };
  scale.range = function(_2) {
    return arguments.length ? (range = Array.from(_2), rescale()) : range.slice();
  };
  scale.rangeRound = function(_2) {
    return range = Array.from(_2), interpolate2 = round_default2, rescale();
  };
  scale.clamp = function(_2) {
    return arguments.length ? (clamp2 = _2 ? true : identity3, rescale()) : clamp2 !== identity3;
  };
  scale.interpolate = function(_2) {
    return arguments.length ? (interpolate2 = _2, rescale()) : interpolate2;
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  return function(t10, u3) {
    transform = t10, untransform = u3;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity3, identity3);
}

// node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x6) {
  return Math.abs(x6 = Math.round(x6)) >= 1e21 ? x6.toLocaleString("en").replace(/,/g, "") : x6.toString(10);
}
function formatDecimalParts(x6, p5) {
  if ((i6 = (x6 = p5 ? x6.toExponential(p5 - 1) : x6.toExponential()).indexOf("e")) < 0)
    return null;
  var i6, coefficient = x6.slice(0, i6);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x6.slice(i6 + 1)
  ];
}

// node_modules/d3-scale/node_modules/d3-format/src/exponent.js
function exponent_default(x6) {
  return x6 = formatDecimalParts(Math.abs(x6)), x6 ? x6[1] : NaN;
}

// node_modules/d3-scale/node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i6 = value.length, t10 = [], j4 = 0, g5 = grouping[0], length = 0;
    while (i6 > 0 && g5 > 0) {
      if (length + g5 + 1 > width)
        g5 = Math.max(1, width - length);
      t10.push(value.substring(i6 -= g5, i6 + g5));
      if ((length += g5 + 1) > width)
        break;
      g5 = grouping[j4 = (j4 + 1) % grouping.length];
    }
    return t10.reverse().join(thousands);
  };
}

// node_modules/d3-scale/node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i6) {
      return numerals[+i6];
    });
  };
}

// node_modules/d3-scale/node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-scale/node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s5) {
  out:
    for (var n7 = s5.length, i6 = 1, i0 = -1, i1; i6 < n7; ++i6) {
      switch (s5[i6]) {
        case ".":
          i0 = i1 = i6;
          break;
        case "0":
          if (i0 === 0)
            i0 = i6;
          i1 = i6;
          break;
        default:
          if (!+s5[i6])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s5.slice(0, i0) + s5.slice(i1 + 1) : s5;
}

// node_modules/d3-scale/node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x6, p5) {
  var d3 = formatDecimalParts(x6, p5);
  if (!d3)
    return x6 + "";
  var coefficient = d3[0], exponent = d3[1], i6 = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n7 = coefficient.length;
  return i6 === n7 ? coefficient : i6 > n7 ? coefficient + new Array(i6 - n7 + 1).join("0") : i6 > 0 ? coefficient.slice(0, i6) + "." + coefficient.slice(i6) : "0." + new Array(1 - i6).join("0") + formatDecimalParts(x6, Math.max(0, p5 + i6 - 1))[0];
}

// node_modules/d3-scale/node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x6, p5) {
  var d3 = formatDecimalParts(x6, p5);
  if (!d3)
    return x6 + "";
  var coefficient = d3[0], exponent = d3[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-scale/node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x6, p5) => (x6 * 100).toFixed(p5),
  "b": (x6) => Math.round(x6).toString(2),
  "c": (x6) => x6 + "",
  "d": formatDecimal_default,
  "e": (x6, p5) => x6.toExponential(p5),
  "f": (x6, p5) => x6.toFixed(p5),
  "g": (x6, p5) => x6.toPrecision(p5),
  "o": (x6) => Math.round(x6).toString(8),
  "p": (x6, p5) => formatRounded_default(x6 * 100, p5),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x6) => Math.round(x6).toString(16).toUpperCase(),
  "x": (x6) => Math.round(x6).toString(16)
};

// node_modules/d3-scale/node_modules/d3-format/src/identity.js
function identity_default2(x6) {
  return x6;
}

// node_modules/d3-scale/node_modules/d3-format/src/locale.js
var map3 = Array.prototype.map;
var prefixes2 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale4) {
  var group2 = locale4.grouping === void 0 || locale4.thousands === void 0 ? identity_default2 : formatGroup_default(map3.call(locale4.grouping, Number), locale4.thousands + ""), currencyPrefix = locale4.currency === void 0 ? "" : locale4.currency[0] + "", currencySuffix = locale4.currency === void 0 ? "" : locale4.currency[1] + "", decimal = locale4.decimal === void 0 ? "." : locale4.decimal + "", numerals = locale4.numerals === void 0 ? identity_default2 : formatNumerals_default(map3.call(locale4.numerals, String)), percent = locale4.percent === void 0 ? "%" : locale4.percent + "", minus = locale4.minus === void 0 ? "−" : locale4.minus + "", nan = locale4.nan === void 0 ? "NaN" : locale4.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes_default[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=")
      zero3 = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format3(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i6, n7, c11;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes2[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i6 = -1, n7 = value.length;
          while (++i6 < n7) {
            if (c11 = value.charCodeAt(i6), 48 > c11 || c11 > 57) {
              valueSuffix = (c11 === 46 ? decimal + value.slice(i6 + 1) : value.slice(i6)) + valueSuffix;
              value = value.slice(0, i6);
              break;
            }
          }
        }
      }
      if (comma && !zero3)
        value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3)
        value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format3.toString = function() {
      return specifier + "";
    };
    return format3;
  }
  function formatPrefix3(specifier, value) {
    var f4 = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e11 = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k6 = Math.pow(10, -e11), prefix2 = prefixes2[8 + e11 / 3];
    return function(value2) {
      return f4(k6 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix3
  };
}

// node_modules/d3-scale/node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-scale/node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-scale/node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-scale/node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max3) {
  step = Math.abs(step), max3 = Math.abs(max3) - step;
  return Math.max(0, exponent_default(max3) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop2, count2, specifier) {
  var step = tickStep(start2, stop2, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop2));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop2)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d3 = domain();
    return ticks_default(d3[0], d3[d3.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d3 = domain();
    return tickFormat(d3[0], d3[d3.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null)
      count2 = 10;
    var d3 = domain();
    var i0 = 0;
    var i1 = d3.length - 1;
    var start2 = d3[i0];
    var stop2 = d3[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop2 < start2) {
      step = start2, start2 = stop2, stop2 = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop2, count2);
      if (step === prestep) {
        d3[i0] = start2;
        d3[i1] = stop2;
        return domain(d3);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop2 = Math.ceil(stop2 / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop2 = Math.floor(stop2 * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear3() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear3());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-scale/src/nice.js
function nice2(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t10;
  if (x1 < x0) {
    t10 = i0, i0 = i1, i1 = t10;
    t10 = x0, x0 = x1, x1 = t10;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

// node_modules/d3-scale/src/log.js
function transformLog(x6) {
  return Math.log(x6);
}
function transformExp(x6) {
  return Math.exp(x6);
}
function transformLogn(x6) {
  return -Math.log(-x6);
}
function transformExpn(x6) {
  return -Math.exp(-x6);
}
function pow10(x6) {
  return isFinite(x6) ? +("1e" + x6) : x6 < 0 ? 0 : x6;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x6) {
    return Math.pow(base, x6);
  };
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x6) {
    return Math.log(x6) / base;
  });
}
function reflect(f4) {
  return function(x6) {
    return -f4(-x6);
  };
}
function loggish(transform) {
  var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_2) {
    return arguments.length ? (base = +_2, rescale()) : base;
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.ticks = function(count2) {
    var d3 = domain(), u3 = d3[0], v6 = d3[d3.length - 1], r7;
    if (r7 = v6 < u3)
      i6 = u3, u3 = v6, v6 = i6;
    var i6 = logs(u3), j4 = logs(v6), p5, k6, t10, n7 = count2 == null ? 10 : +count2, z4 = [];
    if (!(base % 1) && j4 - i6 < n7) {
      i6 = Math.floor(i6), j4 = Math.ceil(j4);
      if (u3 > 0)
        for (; i6 <= j4; ++i6) {
          for (k6 = 1, p5 = pows(i6); k6 < base; ++k6) {
            t10 = p5 * k6;
            if (t10 < u3)
              continue;
            if (t10 > v6)
              break;
            z4.push(t10);
          }
        }
      else
        for (; i6 <= j4; ++i6) {
          for (k6 = base - 1, p5 = pows(i6); k6 >= 1; --k6) {
            t10 = p5 * k6;
            if (t10 < u3)
              continue;
            if (t10 > v6)
              break;
            z4.push(t10);
          }
        }
      if (z4.length * 2 < n7)
        z4 = ticks_default(u3, v6, n7);
    } else {
      z4 = ticks_default(i6, j4, Math.min(j4 - i6, n7)).map(pows);
    }
    return r7 ? z4.reverse() : z4;
  };
  scale.tickFormat = function(count2, specifier) {
    if (specifier == null)
      specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function")
      specifier = format(specifier);
    if (count2 === Infinity)
      return specifier;
    if (count2 == null)
      count2 = 10;
    var k6 = Math.max(1, base * count2 / scale.ticks().length);
    return function(d3) {
      var i6 = d3 / pows(Math.round(logs(d3)));
      if (i6 * base < base - 0.5)
        i6 *= base;
      return i6 <= k6 ? specifier(d3) : "";
    };
  };
  scale.nice = function() {
    return domain(nice2(domain(), {
      floor: function(x6) {
        return pows(Math.floor(logs(x6)));
      },
      ceil: function(x6) {
        return pows(Math.ceil(logs(x6)));
      }
    }));
  };
  return scale;
}
function log() {
  var scale = loggish(transformer()).domain([1, 10]);
  scale.copy = function() {
    return copy(scale, log()).base(scale.base());
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3-scale/src/symlog.js
function transformSymlog(c11) {
  return function(x6) {
    return Math.sign(x6) * Math.log1p(Math.abs(x6 / c11));
  };
}
function transformSymexp(c11) {
  return function(x6) {
    return Math.sign(x6) * Math.expm1(Math.abs(x6)) * c11;
  };
}
function symlogish(transform) {
  var c11 = 1, scale = transform(transformSymlog(c11), transformSymexp(c11));
  scale.constant = function(_2) {
    return arguments.length ? transform(transformSymlog(c11 = +_2), transformSymexp(c11)) : c11;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3-time/src/interval.js
var t03 = /* @__PURE__ */ new Date();
var t13 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = function(start2, stop2, step) {
    var range = [], previous;
    start2 = interval.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop2) || !(step > 0))
      return range;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop2);
    return range;
  };
  interval.filter = function(test) {
    return newInterval(function(date2) {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count2) {
    interval.count = function(start2, end) {
      t03.setTime(+start2), t13.setTime(+end);
      floori(t03), floori(t13);
      return Math.floor(count2(t03, t13));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d3) {
        return field(d3) % step === 0;
      } : function(d3) {
        return interval.count(0, d3) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = newInterval(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start2, end) {
  return end - start2;
});
millisecond.every = function(k6) {
  k6 = Math.floor(k6);
  if (!isFinite(k6) || !(k6 > 0))
    return null;
  if (!(k6 > 1))
    return millisecond;
  return newInterval(function(date2) {
    date2.setTime(Math.floor(date2 / k6) * k6);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k6);
  }, function(start2, end) {
    return (end - start2) / k6;
  });
};
var millisecond_default = millisecond;
var milliseconds = millisecond.range;

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/second.js
var second = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond);
}, function(start2, end) {
  return (end - start2) / durationSecond;
}, function(date2) {
  return date2.getUTCSeconds();
});
var second_default = second;
var seconds = second.range;

// node_modules/d3-time/src/minute.js
var minute = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start2, end) {
  return (end - start2) / durationMinute;
}, function(date2) {
  return date2.getMinutes();
});
var minute_default = minute;
var minutes = minute.range;

// node_modules/d3-time/src/hour.js
var hour = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start2, end) {
  return (end - start2) / durationHour;
}, function(date2) {
  return date2.getHours();
});
var hour_default = hour;
var hours = hour.range;

// node_modules/d3-time/src/day.js
var day = newInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
var day_default = day;
var days = day.range;

// node_modules/d3-time/src/week.js
function weekday(i6) {
  return newInterval(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i6) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start2, end) {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/d3-time/src/month.js
var month = newInterval(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start2, end) {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var month_default = month;
var months = month.range;

// node_modules/d3-time/src/year.js
var year = newInterval(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start2, end) {
  return end.getFullYear() - start2.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year.every = function(k6) {
  return !isFinite(k6 = Math.floor(k6)) || !(k6 > 0) ? null : newInterval(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k6) * k6);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k6);
  });
};
var year_default = year;
var years = year.range;

// node_modules/d3-time/src/utcMinute.js
var utcMinute = newInterval(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start2, end) {
  return (end - start2) / durationMinute;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute_default = utcMinute;
var utcMinutes = utcMinute.range;

// node_modules/d3-time/src/utcHour.js
var utcHour = newInterval(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start2, end) {
  return (end - start2) / durationHour;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour_default = utcHour;
var utcHours = utcHour.range;

// node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start2, end) {
  return (end - start2) / durationDay;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/d3-time/src/utcWeek.js
function utcWeekday(i6) {
  return newInterval(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i6) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start2, end) {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/utcMonth.js
var utcMonth = newInterval(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start2, end) {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth_default = utcMonth;
var utcMonths = utcMonth.range;

// node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start2, end) {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear.every = function(k6) {
  return !isFinite(k6 = Math.floor(k6)) || !(k6 > 0) ? null : newInterval(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k6) * k6);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k6);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year3, month3, week, day3, hour3, minute3) {
  const tickIntervals = [
    [second_default, 1, durationSecond],
    [second_default, 5, 5 * durationSecond],
    [second_default, 15, 15 * durationSecond],
    [second_default, 30, 30 * durationSecond],
    [minute3, 1, durationMinute],
    [minute3, 5, 5 * durationMinute],
    [minute3, 15, 15 * durationMinute],
    [minute3, 30, 30 * durationMinute],
    [hour3, 1, durationHour],
    [hour3, 3, 3 * durationHour],
    [hour3, 6, 6 * durationHour],
    [hour3, 12, 12 * durationHour],
    [day3, 1, durationDay],
    [day3, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month3, 1, durationMonth],
    [month3, 3, 3 * durationMonth],
    [year3, 1, durationYear]
  ];
  function ticks(start2, stop2, count2) {
    const reverse2 = stop2 < start2;
    if (reverse2)
      [start2, stop2] = [stop2, start2];
    const interval = count2 && typeof count2.range === "function" ? count2 : tickInterval(start2, stop2, count2);
    const ticks2 = interval ? interval.range(start2, +stop2 + 1) : [];
    return reverse2 ? ticks2.reverse() : ticks2;
  }
  function tickInterval(start2, stop2, count2) {
    const target = Math.abs(stop2 - start2) / count2;
    const i6 = bisector_default(([, , step2]) => step2).right(tickIntervals, target);
    if (i6 === tickIntervals.length)
      return year3.every(tickStep(start2 / durationYear, stop2 / durationYear, count2));
    if (i6 === 0)
      return millisecond_default.every(Math.max(tickStep(start2, stop2, count2), 1));
    const [t10, step] = tickIntervals[target / tickIntervals[i6 - 1][2] < tickIntervals[i6][2] / target ? i6 - 1 : i6];
    return t10.every(step);
  }
  return [ticks, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default);
var [timeTicks, timeTickInterval] = ticker(year_default, month_default, sunday, day_default, hour_default, minute_default);

// node_modules/d3-time-format/src/locale.js
function localDate(d3) {
  if (0 <= d3.y && d3.y < 100) {
    var date2 = new Date(-1, d3.m, d3.d, d3.H, d3.M, d3.S, d3.L);
    date2.setFullYear(d3.y);
    return date2;
  }
  return new Date(d3.y, d3.m, d3.d, d3.H, d3.M, d3.S, d3.L);
}
function utcDate(d3) {
  if (0 <= d3.y && d3.y < 100) {
    var date2 = new Date(Date.UTC(-1, d3.m, d3.d, d3.H, d3.M, d3.S, d3.L));
    date2.setUTCFullYear(d3.y);
    return date2;
  }
  return new Date(Date.UTC(d3.y, d3.m, d3.d, d3.H, d3.M, d3.S, d3.L));
}
function newDate(y4, m4, d3) {
  return { y: y4, m: m4, d: d3, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale4) {
  var locale_dateTime = locale4.dateTime, locale_date = locale4.date, locale_time = locale4.time, locale_periods = locale4.periods, locale_weekdays = locale4.days, locale_shortWeekdays = locale4.shortDays, locale_months = locale4.months, locale_shortMonths = locale4.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string = [], i6 = -1, j4 = 0, n7 = specifier.length, c11, pad2, format3;
      if (!(date2 instanceof Date))
        date2 = /* @__PURE__ */ new Date(+date2);
      while (++i6 < n7) {
        if (specifier.charCodeAt(i6) === 37) {
          string.push(specifier.slice(j4, i6));
          if ((pad2 = pads[c11 = specifier.charAt(++i6)]) != null)
            c11 = specifier.charAt(++i6);
          else
            pad2 = c11 === "e" ? " " : "0";
          if (format3 = formats2[c11])
            c11 = format3(date2, pad2);
          string.push(c11);
          j4 = i6 + 1;
        }
      }
      string.push(specifier.slice(j4, i6));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d3 = newDate(1900, void 0, 1), i6 = parseSpecifier(d3, specifier, string += "", 0), week, day3;
      if (i6 != string.length)
        return null;
      if ("Q" in d3)
        return new Date(d3.Q);
      if ("s" in d3)
        return new Date(d3.s * 1e3 + ("L" in d3 ? d3.L : 0));
      if (Z && !("Z" in d3))
        d3.Z = 0;
      if ("p" in d3)
        d3.H = d3.H % 12 + d3.p * 12;
      if (d3.m === void 0)
        d3.m = "q" in d3 ? d3.q : 0;
      if ("V" in d3) {
        if (d3.V < 1 || d3.V > 53)
          return null;
        if (!("w" in d3))
          d3.w = 1;
        if ("Z" in d3) {
          week = utcDate(newDate(d3.y, 0, 1)), day3 = week.getUTCDay();
          week = day3 > 4 || day3 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay_default.offset(week, (d3.V - 1) * 7);
          d3.y = week.getUTCFullYear();
          d3.m = week.getUTCMonth();
          d3.d = week.getUTCDate() + (d3.w + 6) % 7;
        } else {
          week = localDate(newDate(d3.y, 0, 1)), day3 = week.getDay();
          week = day3 > 4 || day3 === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d3.V - 1) * 7);
          d3.y = week.getFullYear();
          d3.m = week.getMonth();
          d3.d = week.getDate() + (d3.w + 6) % 7;
        }
      } else if ("W" in d3 || "U" in d3) {
        if (!("w" in d3))
          d3.w = "u" in d3 ? d3.u % 7 : "W" in d3 ? 1 : 0;
        day3 = "Z" in d3 ? utcDate(newDate(d3.y, 0, 1)).getUTCDay() : localDate(newDate(d3.y, 0, 1)).getDay();
        d3.m = 0;
        d3.d = "W" in d3 ? (d3.w + 6) % 7 + d3.W * 7 - (day3 + 5) % 7 : d3.w + d3.U * 7 - (day3 + 6) % 7;
      }
      if ("Z" in d3) {
        d3.H += d3.Z / 100 | 0;
        d3.M += d3.Z % 100;
        return utcDate(d3);
      }
      return localDate(d3);
    };
  }
  function parseSpecifier(d3, specifier, string, j4) {
    var i6 = 0, n7 = specifier.length, m4 = string.length, c11, parse;
    while (i6 < n7) {
      if (j4 >= m4)
        return -1;
      c11 = specifier.charCodeAt(i6++);
      if (c11 === 37) {
        c11 = specifier.charAt(i6++);
        parse = parses[c11 in pads ? specifier.charAt(i6++) : c11];
        if (!parse || (j4 = parse(d3, string, j4)) < 0)
          return -1;
      } else if (c11 != string.charCodeAt(j4++)) {
        return -1;
      }
    }
    return j4;
  }
  function parsePeriod(d3, string, i6) {
    var n7 = periodRe.exec(string.slice(i6));
    return n7 ? (d3.p = periodLookup.get(n7[0].toLowerCase()), i6 + n7[0].length) : -1;
  }
  function parseShortWeekday(d3, string, i6) {
    var n7 = shortWeekdayRe.exec(string.slice(i6));
    return n7 ? (d3.w = shortWeekdayLookup.get(n7[0].toLowerCase()), i6 + n7[0].length) : -1;
  }
  function parseWeekday(d3, string, i6) {
    var n7 = weekdayRe.exec(string.slice(i6));
    return n7 ? (d3.w = weekdayLookup.get(n7[0].toLowerCase()), i6 + n7[0].length) : -1;
  }
  function parseShortMonth(d3, string, i6) {
    var n7 = shortMonthRe.exec(string.slice(i6));
    return n7 ? (d3.m = shortMonthLookup.get(n7[0].toLowerCase()), i6 + n7[0].length) : -1;
  }
  function parseMonth(d3, string, i6) {
    var n7 = monthRe.exec(string.slice(i6));
    return n7 ? (d3.m = monthLookup.get(n7[0].toLowerCase()), i6 + n7[0].length) : -1;
  }
  function parseLocaleDateTime(d3, string, i6) {
    return parseSpecifier(d3, locale_dateTime, string, i6);
  }
  function parseLocaleDate(d3, string, i6) {
    return parseSpecifier(d3, locale_date, string, i6);
  }
  function parseLocaleTime(d3, string, i6) {
    return parseSpecifier(d3, locale_time, string, i6);
  }
  function formatShortWeekday(d3) {
    return locale_shortWeekdays[d3.getDay()];
  }
  function formatWeekday(d3) {
    return locale_weekdays[d3.getDay()];
  }
  function formatShortMonth(d3) {
    return locale_shortMonths[d3.getMonth()];
  }
  function formatMonth(d3) {
    return locale_months[d3.getMonth()];
  }
  function formatPeriod(d3) {
    return locale_periods[+(d3.getHours() >= 12)];
  }
  function formatQuarter(d3) {
    return 1 + ~~(d3.getMonth() / 3);
  }
  function formatUTCShortWeekday(d3) {
    return locale_shortWeekdays[d3.getUTCDay()];
  }
  function formatUTCWeekday(d3) {
    return locale_weekdays[d3.getUTCDay()];
  }
  function formatUTCShortMonth(d3) {
    return locale_shortMonths[d3.getUTCMonth()];
  }
  function formatUTCMonth(d3) {
    return locale_months[d3.getUTCMonth()];
  }
  function formatUTCPeriod(d3) {
    return locale_periods[+(d3.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d3) {
    return 1 + ~~(d3.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f4 = newFormat(specifier += "", formats);
      f4.toString = function() {
        return specifier;
      };
      return f4;
    },
    parse: function(specifier) {
      var p5 = newParse(specifier += "", false);
      p5.toString = function() {
        return specifier;
      };
      return p5;
    },
    utcFormat: function(specifier) {
      var f4 = newFormat(specifier += "", utcFormats);
      f4.toString = function() {
        return specifier;
      };
      return f4;
    },
    utcParse: function(specifier) {
      var p5 = newParse(specifier += "", true);
      p5.toString = function() {
        return specifier;
      };
      return p5;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s5) {
  return s5.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i6) => [name.toLowerCase(), i6]));
}
function parseWeekdayNumberSunday(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 1));
  return n7 ? (d3.w = +n7[0], i6 + n7[0].length) : -1;
}
function parseWeekdayNumberMonday(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 1));
  return n7 ? (d3.u = +n7[0], i6 + n7[0].length) : -1;
}
function parseWeekNumberSunday(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.U = +n7[0], i6 + n7[0].length) : -1;
}
function parseWeekNumberISO(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.V = +n7[0], i6 + n7[0].length) : -1;
}
function parseWeekNumberMonday(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.W = +n7[0], i6 + n7[0].length) : -1;
}
function parseFullYear(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 4));
  return n7 ? (d3.y = +n7[0], i6 + n7[0].length) : -1;
}
function parseYear(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.y = +n7[0] + (+n7[0] > 68 ? 1900 : 2e3), i6 + n7[0].length) : -1;
}
function parseZone(d3, string, i6) {
  var n7 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i6, i6 + 6));
  return n7 ? (d3.Z = n7[1] ? 0 : -(n7[2] + (n7[3] || "00")), i6 + n7[0].length) : -1;
}
function parseQuarter(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 1));
  return n7 ? (d3.q = n7[0] * 3 - 3, i6 + n7[0].length) : -1;
}
function parseMonthNumber(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.m = n7[0] - 1, i6 + n7[0].length) : -1;
}
function parseDayOfMonth(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.d = +n7[0], i6 + n7[0].length) : -1;
}
function parseDayOfYear(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 3));
  return n7 ? (d3.m = 0, d3.d = +n7[0], i6 + n7[0].length) : -1;
}
function parseHour24(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.H = +n7[0], i6 + n7[0].length) : -1;
}
function parseMinutes(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.M = +n7[0], i6 + n7[0].length) : -1;
}
function parseSeconds(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 2));
  return n7 ? (d3.S = +n7[0], i6 + n7[0].length) : -1;
}
function parseMilliseconds(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 3));
  return n7 ? (d3.L = +n7[0], i6 + n7[0].length) : -1;
}
function parseMicroseconds(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6, i6 + 6));
  return n7 ? (d3.L = Math.floor(n7[0] / 1e3), i6 + n7[0].length) : -1;
}
function parseLiteralPercent(d3, string, i6) {
  var n7 = percentRe.exec(string.slice(i6, i6 + 1));
  return n7 ? i6 + n7[0].length : -1;
}
function parseUnixTimestamp(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6));
  return n7 ? (d3.Q = +n7[0], i6 + n7[0].length) : -1;
}
function parseUnixTimestampSeconds(d3, string, i6) {
  var n7 = numberRe.exec(string.slice(i6));
  return n7 ? (d3.s = +n7[0], i6 + n7[0].length) : -1;
}
function formatDayOfMonth(d3, p5) {
  return pad(d3.getDate(), p5, 2);
}
function formatHour24(d3, p5) {
  return pad(d3.getHours(), p5, 2);
}
function formatHour12(d3, p5) {
  return pad(d3.getHours() % 12 || 12, p5, 2);
}
function formatDayOfYear(d3, p5) {
  return pad(1 + day_default.count(year_default(d3), d3), p5, 3);
}
function formatMilliseconds(d3, p5) {
  return pad(d3.getMilliseconds(), p5, 3);
}
function formatMicroseconds(d3, p5) {
  return formatMilliseconds(d3, p5) + "000";
}
function formatMonthNumber(d3, p5) {
  return pad(d3.getMonth() + 1, p5, 2);
}
function formatMinutes(d3, p5) {
  return pad(d3.getMinutes(), p5, 2);
}
function formatSeconds(d3, p5) {
  return pad(d3.getSeconds(), p5, 2);
}
function formatWeekdayNumberMonday(d3) {
  var day3 = d3.getDay();
  return day3 === 0 ? 7 : day3;
}
function formatWeekNumberSunday(d3, p5) {
  return pad(sunday.count(year_default(d3) - 1, d3), p5, 2);
}
function dISO(d3) {
  var day3 = d3.getDay();
  return day3 >= 4 || day3 === 0 ? thursday(d3) : thursday.ceil(d3);
}
function formatWeekNumberISO(d3, p5) {
  d3 = dISO(d3);
  return pad(thursday.count(year_default(d3), d3) + (year_default(d3).getDay() === 4), p5, 2);
}
function formatWeekdayNumberSunday(d3) {
  return d3.getDay();
}
function formatWeekNumberMonday(d3, p5) {
  return pad(monday.count(year_default(d3) - 1, d3), p5, 2);
}
function formatYear(d3, p5) {
  return pad(d3.getFullYear() % 100, p5, 2);
}
function formatYearISO(d3, p5) {
  d3 = dISO(d3);
  return pad(d3.getFullYear() % 100, p5, 2);
}
function formatFullYear(d3, p5) {
  return pad(d3.getFullYear() % 1e4, p5, 4);
}
function formatFullYearISO(d3, p5) {
  var day3 = d3.getDay();
  d3 = day3 >= 4 || day3 === 0 ? thursday(d3) : thursday.ceil(d3);
  return pad(d3.getFullYear() % 1e4, p5, 4);
}
function formatZone(d3) {
  var z4 = d3.getTimezoneOffset();
  return (z4 > 0 ? "-" : (z4 *= -1, "+")) + pad(z4 / 60 | 0, "0", 2) + pad(z4 % 60, "0", 2);
}
function formatUTCDayOfMonth(d3, p5) {
  return pad(d3.getUTCDate(), p5, 2);
}
function formatUTCHour24(d3, p5) {
  return pad(d3.getUTCHours(), p5, 2);
}
function formatUTCHour12(d3, p5) {
  return pad(d3.getUTCHours() % 12 || 12, p5, 2);
}
function formatUTCDayOfYear(d3, p5) {
  return pad(1 + utcDay_default.count(utcYear_default(d3), d3), p5, 3);
}
function formatUTCMilliseconds(d3, p5) {
  return pad(d3.getUTCMilliseconds(), p5, 3);
}
function formatUTCMicroseconds(d3, p5) {
  return formatUTCMilliseconds(d3, p5) + "000";
}
function formatUTCMonthNumber(d3, p5) {
  return pad(d3.getUTCMonth() + 1, p5, 2);
}
function formatUTCMinutes(d3, p5) {
  return pad(d3.getUTCMinutes(), p5, 2);
}
function formatUTCSeconds(d3, p5) {
  return pad(d3.getUTCSeconds(), p5, 2);
}
function formatUTCWeekdayNumberMonday(d3) {
  var dow = d3.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d3, p5) {
  return pad(utcSunday.count(utcYear_default(d3) - 1, d3), p5, 2);
}
function UTCdISO(d3) {
  var day3 = d3.getUTCDay();
  return day3 >= 4 || day3 === 0 ? utcThursday(d3) : utcThursday.ceil(d3);
}
function formatUTCWeekNumberISO(d3, p5) {
  d3 = UTCdISO(d3);
  return pad(utcThursday.count(utcYear_default(d3), d3) + (utcYear_default(d3).getUTCDay() === 4), p5, 2);
}
function formatUTCWeekdayNumberSunday(d3) {
  return d3.getUTCDay();
}
function formatUTCWeekNumberMonday(d3, p5) {
  return pad(utcMonday.count(utcYear_default(d3) - 1, d3), p5, 2);
}
function formatUTCYear(d3, p5) {
  return pad(d3.getUTCFullYear() % 100, p5, 2);
}
function formatUTCYearISO(d3, p5) {
  d3 = UTCdISO(d3);
  return pad(d3.getUTCFullYear() % 100, p5, 2);
}
function formatUTCFullYear(d3, p5) {
  return pad(d3.getUTCFullYear() % 1e4, p5, 4);
}
function formatUTCFullYearISO(d3, p5) {
  var day3 = d3.getUTCDay();
  d3 = day3 >= 4 || day3 === 0 ? utcThursday(d3) : utcThursday.ceil(d3);
  return pad(d3.getUTCFullYear() % 1e4, p5, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d3) {
  return +d3;
}
function formatUnixTimestampSeconds(d3) {
  return Math.floor(+d3 / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date2) {
  return date2.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date2 = new Date(string);
  return isNaN(date2) ? null : date2;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/d3-scale/src/time.js
function date(t10) {
  return new Date(t10);
}
function number2(t10) {
  return t10 instanceof Date ? +t10 : +/* @__PURE__ */ new Date(+t10);
}
function calendar(ticks, tickInterval, year3, month3, week, day3, hour3, minute3, second3, format3) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format3(".%L"), formatSecond = format3(":%S"), formatMinute = format3("%I:%M"), formatHour = format3("%I %p"), formatDay = format3("%a %d"), formatWeek = format3("%b %d"), formatMonth = format3("%B"), formatYear2 = format3("%Y");
  function tickFormat2(date2) {
    return (second3(date2) < date2 ? formatMillisecond : minute3(date2) < date2 ? formatSecond : hour3(date2) < date2 ? formatMinute : day3(date2) < date2 ? formatHour : month3(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year3(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale.invert = function(y4) {
    return new Date(invert(y4));
  };
  scale.domain = function(_2) {
    return arguments.length ? domain(Array.from(_2, number2)) : domain().map(date);
  };
  scale.ticks = function(interval) {
    var d3 = domain();
    return ticks(d3[0], d3[d3.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat2 : format3(specifier);
  };
  scale.nice = function(interval) {
    var d3 = domain();
    if (!interval || typeof interval.range !== "function")
      interval = tickInterval(d3[0], d3[d3.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice2(d3, interval)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(ticks, tickInterval, year3, month3, week, day3, hour3, minute3, second3, format3));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, year_default, month_default, sunday, day_default, hour_default, minute_default, second_default, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/utcTime.js
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default, second_default, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  var n7 = specifier.length / 6 | 0, colors3 = new Array(n7), i6 = 0;
  while (i6 < n7)
    colors3[i6] = "#" + specifier.slice(i6 * 6, ++i6 * 6);
  return colors3;
}

// node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default = colors_default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

// node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default = colors_default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

// node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

// node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default = colors_default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

// node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default = colors_default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

// node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default = colors_default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

// node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default = colors_default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

// node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default = colors_default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

// node_modules/d3-scale-chromatic/src/categorical/Tableau10.js
var Tableau10_default = colors_default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/basis.js
function basis3(t16, v0, v1, v22, v32) {
  var t24 = t16 * t16, t34 = t24 * t16;
  return ((1 - 3 * t16 + 3 * t24 - t34) * v0 + (4 - 6 * t24 + 3 * t34) * v1 + (1 + 3 * t16 + 3 * t24 - 3 * t34) * v22 + t34 * v32) / 6;
}
function basis_default3(values) {
  var n7 = values.length - 1;
  return function(t10) {
    var i6 = t10 <= 0 ? t10 = 0 : t10 >= 1 ? (t10 = 1, n7 - 1) : Math.floor(t10 * n7), v1 = values[i6], v22 = values[i6 + 1], v0 = i6 > 0 ? values[i6 - 1] : 2 * v1 - v22, v32 = i6 < n7 - 1 ? values[i6 + 2] : 2 * v22 - v1;
    return basis3((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default3(values) {
  var n7 = values.length;
  return function(t10) {
    var i6 = Math.floor(((t10 %= 1) < 0 ? ++t10 : t10) * n7), v0 = values[(i6 + n7 - 1) % n7], v1 = values[i6 % n7], v22 = values[(i6 + 1) % n7], v32 = values[(i6 + 2) % n7];
    return basis3((t10 - i6 / n7) * n7, v0, v1, v22, v32);
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/constant.js
var constant_default4 = (x6) => () => x6;

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/color.js
function linear4(a6, d3) {
  return function(t10) {
    return a6 + t10 * d3;
  };
}
function exponential3(a6, b5, y4) {
  return a6 = Math.pow(a6, y4), b5 = Math.pow(b5, y4) - a6, y4 = 1 / y4, function(t10) {
    return Math.pow(a6 + t10 * b5, y4);
  };
}
function hue3(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear4(a6, d3 > 180 || d3 < -180 ? d3 - 360 * Math.round(d3 / 360) : d3) : constant_default4(isNaN(a6) ? b5 : a6);
}
function gamma3(y4) {
  return (y4 = +y4) === 1 ? nogamma3 : function(a6, b5) {
    return b5 - a6 ? exponential3(a6, b5, y4) : constant_default4(isNaN(a6) ? b5 : a6);
  };
}
function nogamma3(a6, b5) {
  var d3 = b5 - a6;
  return d3 ? linear4(a6, d3) : constant_default4(isNaN(a6) ? b5 : a6);
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/rgb.js
var rgb_default3 = function rgbGamma3(y4) {
  var color4 = gamma3(y4);
  function rgb5(start2, end) {
    var r7 = color4((start2 = rgb2(start2)).r, (end = rgb2(end)).r), g5 = color4(start2.g, end.g), b5 = color4(start2.b, end.b), opacity = nogamma3(start2.opacity, end.opacity);
    return function(t10) {
      start2.r = r7(t10);
      start2.g = g5(t10);
      start2.b = b5(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  }
  rgb5.gamma = rgbGamma3;
  return rgb5;
}(1);
function rgbSpline3(spline) {
  return function(colors3) {
    var n7 = colors3.length, r7 = new Array(n7), g5 = new Array(n7), b5 = new Array(n7), i6, color4;
    for (i6 = 0; i6 < n7; ++i6) {
      color4 = rgb2(colors3[i6]);
      r7[i6] = color4.r || 0;
      g5[i6] = color4.g || 0;
      b5[i6] = color4.b || 0;
    }
    r7 = spline(r7);
    g5 = spline(g5);
    b5 = spline(b5);
    color4.opacity = 1;
    return function(t10) {
      color4.r = r7(t10);
      color4.g = g5(t10);
      color4.b = b5(t10);
      return color4 + "";
    };
  };
}
var rgbBasis3 = rgbSpline3(basis_default3);
var rgbBasisClosed3 = rgbSpline3(basisClosed_default3);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/number.js
function number_default4(a6, b5) {
  return a6 = +a6, b5 = +b5, function(t10) {
    return a6 * (1 - t10) + b5 * t10;
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/string.js
var reA3 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB3 = new RegExp(reA3.source, "g");

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/decompose.js
var degrees5 = 180 / Math.PI;
var identity5 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default3(a6, b5, c11, d3, e11, f4) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a6 * a6 + b5 * b5))
    a6 /= scaleX, b5 /= scaleX;
  if (skewX = a6 * c11 + b5 * d3)
    c11 -= a6 * skewX, d3 -= b5 * skewX;
  if (scaleY = Math.sqrt(c11 * c11 + d3 * d3))
    c11 /= scaleY, d3 /= scaleY, skewX /= scaleY;
  if (a6 * d3 < b5 * c11)
    a6 = -a6, b5 = -b5, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e11,
    translateY: f4,
    rotate: Math.atan2(b5, a6) * degrees5,
    skewX: Math.atan(skewX) * degrees5,
    scaleX,
    scaleY
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/parse.js
var svgNode3;
function parseCss3(value) {
  const m4 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m4.isIdentity ? identity5 : decompose_default3(m4.a, m4.b, m4.c, m4.d, m4.e, m4.f);
}
function parseSvg3(value) {
  if (value == null)
    return identity5;
  if (!svgNode3)
    svgNode3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode3.setAttribute("transform", value);
  if (!(value = svgNode3.transform.baseVal.consolidate()))
    return identity5;
  value = value.matrix;
  return decompose_default3(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform3(parse, pxComma, pxParen, degParen) {
  function pop(s5) {
    return s5.length ? s5.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i6 - 4, x: number_default4(xa, xb) }, { i: i6 - 2, x: number_default4(ya, yb) });
    } else if (xb || yb) {
      s5.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a6, b5, s5, q) {
    if (a6 !== b5) {
      if (a6 - b5 > 180)
        b5 += 360;
      else if (b5 - a6 > 180)
        a6 += 360;
      q.push({ i: s5.push(pop(s5) + "rotate(", null, degParen) - 2, x: number_default4(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "rotate(" + b5 + degParen);
    }
  }
  function skewX(a6, b5, s5, q) {
    if (a6 !== b5) {
      q.push({ i: s5.push(pop(s5) + "skewX(", null, degParen) - 2, x: number_default4(a6, b5) });
    } else if (b5) {
      s5.push(pop(s5) + "skewX(" + b5 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s5, q) {
    if (xa !== xb || ya !== yb) {
      var i6 = s5.push(pop(s5) + "scale(", null, ",", null, ")");
      q.push({ i: i6 - 4, x: number_default4(xa, xb) }, { i: i6 - 2, x: number_default4(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s5.push(pop(s5) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a6, b5) {
    var s5 = [], q = [];
    a6 = parse(a6), b5 = parse(b5);
    translate(a6.translateX, a6.translateY, b5.translateX, b5.translateY, s5, q);
    rotate(a6.rotate, b5.rotate, s5, q);
    skewX(a6.skewX, b5.skewX, s5, q);
    scale(a6.scaleX, a6.scaleY, b5.scaleX, b5.scaleY, s5, q);
    a6 = b5 = null;
    return function(t10) {
      var i6 = -1, n7 = q.length, o5;
      while (++i6 < n7)
        s5[(o5 = q[i6]).i] = o5.x(t10);
      return s5.join("");
    };
  };
}
var interpolateTransformCss3 = interpolateTransform3(parseCss3, "px, ", "px)", "deg)");
var interpolateTransformSvg3 = interpolateTransform3(parseSvg3, ", ", ")", ")");

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/zoom.js
var epsilon23 = 1e-12;
function cosh3(x6) {
  return ((x6 = Math.exp(x6)) + 1 / x6) / 2;
}
function sinh3(x6) {
  return ((x6 = Math.exp(x6)) - 1 / x6) / 2;
}
function tanh3(x6) {
  return ((x6 = Math.exp(2 * x6)) - 1) / (x6 + 1);
}
var zoom_default3 = function zoomRho3(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d22 = dx * dx + dy * dy, i6, S3;
    if (d22 < epsilon23) {
      S3 = Math.log(w1 / w0) / rho;
      i6 = function(t10) {
        return [
          ux0 + t10 * dx,
          uy0 + t10 * dy,
          w0 * Math.exp(rho * t10 * S3)
        ];
      };
    } else {
      var d1 = Math.sqrt(d22), b0 = (w1 * w1 - w0 * w0 + rho4 * d22) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d22) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S3 = (r1 - r0) / rho;
      i6 = function(t10) {
        var s5 = t10 * S3, coshr0 = cosh3(r0), u3 = w0 / (rho2 * d1) * (coshr0 * tanh3(rho * s5 + r0) - sinh3(r0));
        return [
          ux0 + u3 * dx,
          uy0 + u3 * dy,
          w0 * coshr0 / cosh3(rho * s5 + r0)
        ];
      };
    }
    i6.duration = S3 * 1e3 * rho / Math.SQRT2;
    return i6;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho3(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/hsl.js
function hsl6(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hsl2(start2)).h, (end = hsl2(end)).h), s5 = nogamma3(start2.s, end.s), l4 = nogamma3(start2.l, end.l), opacity = nogamma3(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.s = s5(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hsl_default3 = hsl6(hue3);
var hslLong3 = hsl6(nogamma3);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/hcl.js
function hcl5(hue4) {
  return function(start2, end) {
    var h3 = hue4((start2 = hcl(start2)).h, (end = hcl(end)).h), c11 = nogamma3(start2.c, end.c), l4 = nogamma3(start2.l, end.l), opacity = nogamma3(start2.opacity, end.opacity);
    return function(t10) {
      start2.h = h3(t10);
      start2.c = c11(t10);
      start2.l = l4(t10);
      start2.opacity = opacity(t10);
      return start2 + "";
    };
  };
}
var hcl_default3 = hcl5(hue3);
var hclLong3 = hcl5(nogamma3);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix5(hue4) {
  return function cubehelixGamma(y4) {
    y4 = +y4;
    function cubehelix7(start2, end) {
      var h3 = hue4((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s5 = nogamma3(start2.s, end.s), l4 = nogamma3(start2.l, end.l), opacity = nogamma3(start2.opacity, end.opacity);
      return function(t10) {
        start2.h = h3(t10);
        start2.s = s5(t10);
        start2.l = l4(Math.pow(t10, y4));
        start2.opacity = opacity(t10);
        return start2 + "";
      };
    }
    cubehelix7.gamma = cubehelixGamma;
    return cubehelix7;
  }(1);
}
var cubehelix_default3 = cubehelix5(hue3);
var cubehelixLong3 = cubehelix5(nogamma3);

// node_modules/d3-scale-chromatic/src/ramp.js
var ramp_default = (scheme55) => rgbBasis3(scheme55[scheme55.length - 1]);

// node_modules/d3-scale-chromatic/src/diverging/BrBG.js
var scheme = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(colors_default);
var BrBG_default = ramp_default(scheme);

// node_modules/d3-scale-chromatic/src/diverging/PRGn.js
var scheme2 = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(colors_default);
var PRGn_default = ramp_default(scheme2);

// node_modules/d3-scale-chromatic/src/diverging/PiYG.js
var scheme3 = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(colors_default);
var PiYG_default = ramp_default(scheme3);

// node_modules/d3-scale-chromatic/src/diverging/PuOr.js
var scheme4 = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(colors_default);
var PuOr_default = ramp_default(scheme4);

// node_modules/d3-scale-chromatic/src/diverging/RdBu.js
var scheme5 = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(colors_default);
var RdBu_default = ramp_default(scheme5);

// node_modules/d3-scale-chromatic/src/diverging/RdGy.js
var scheme6 = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(colors_default);
var RdGy_default = ramp_default(scheme6);

// node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js
var scheme7 = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors_default);
var RdYlBu_default = ramp_default(scheme7);

// node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js
var scheme8 = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(colors_default);
var RdYlGn_default = ramp_default(scheme8);

// node_modules/d3-scale-chromatic/src/diverging/Spectral.js
var scheme9 = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(colors_default);
var Spectral_default = ramp_default(scheme9);

// node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js
var scheme10 = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(colors_default);
var BuGn_default = ramp_default(scheme10);

// node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js
var scheme11 = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(colors_default);
var BuPu_default = ramp_default(scheme11);

// node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js
var scheme12 = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors_default);
var GnBu_default = ramp_default(scheme12);

// node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js
var scheme13 = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(colors_default);
var OrRd_default = ramp_default(scheme13);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js
var scheme14 = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(colors_default);
var PuBuGn_default = ramp_default(scheme14);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js
var scheme15 = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(colors_default);
var PuBu_default = ramp_default(scheme15);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js
var scheme16 = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(colors_default);
var PuRd_default = ramp_default(scheme16);

// node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js
var scheme17 = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(colors_default);
var RdPu_default = ramp_default(scheme17);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js
var scheme18 = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(colors_default);
var YlGnBu_default = ramp_default(scheme18);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js
var scheme19 = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(colors_default);
var YlGn_default = ramp_default(scheme19);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js
var scheme20 = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(colors_default);
var YlOrBr_default = ramp_default(scheme20);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js
var scheme21 = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(colors_default);
var YlOrRd_default = ramp_default(scheme21);

// node_modules/d3-scale-chromatic/src/sequential-single/Blues.js
var scheme22 = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(colors_default);
var Blues_default = ramp_default(scheme22);

// node_modules/d3-scale-chromatic/src/sequential-single/Greens.js
var scheme23 = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(colors_default);
var Greens_default = ramp_default(scheme23);

// node_modules/d3-scale-chromatic/src/sequential-single/Greys.js
var scheme24 = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(colors_default);
var Greys_default = ramp_default(scheme24);

// node_modules/d3-scale-chromatic/src/sequential-single/Purples.js
var scheme25 = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(colors_default);
var Purples_default = ramp_default(scheme25);

// node_modules/d3-scale-chromatic/src/sequential-single/Reds.js
var scheme26 = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(colors_default);
var Reds_default = ramp_default(scheme26);

// node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js
var scheme27 = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(colors_default);
var Oranges_default = ramp_default(scheme27);

// node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js
var cubehelix_default4 = cubehelixLong3(cubehelix(300, 0.5, 0), cubehelix(-240, 0.5, 1));

// node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm = cubehelixLong3(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var cool = cubehelixLong3(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var c = cubehelix();

// node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js
var c6 = rgb2();
var pi_1_3 = Math.PI / 3;
var pi_2_3 = Math.PI * 2 / 3;

// node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp(range) {
  var n7 = range.length;
  return function(t10) {
    return range[Math.max(0, Math.min(n7 - 1, Math.floor(t10 * n7)))];
  };
}
var viridis_default = ramp(colors_default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors_default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors_default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors_default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// node_modules/@nivo/core/dist/nivo-core.es.js
var import_isFunction = __toESM(require_isFunction());
var import_without = __toESM(require_without());

// node_modules/d3-path/src/path.js
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x6, y4) {
    this._ += "M" + (this._x0 = this._x1 = +x6) + "," + (this._y0 = this._y1 = +y4);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x6, y4) {
    this._ += "L" + (this._x1 = +x6) + "," + (this._y1 = +y4);
  },
  quadraticCurveTo: function(x1, y1, x6, y4) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x6) + "," + (this._y1 = +y4);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x6, y4) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x22 + "," + +y22 + "," + (this._x1 = +x6) + "," + (this._y1 = +y4);
  },
  arcTo: function(x1, y1, x22, y22, r7) {
    x1 = +x1, y1 = +y1, x22 = +x22, y22 = +y22, r7 = +r7;
    var x0 = this._x1, y0 = this._y1, x21 = x22 - x1, y21 = y22 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r7 < 0)
      throw new Error("negative radius: " + r7);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r7) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x22 - x0, y20 = y22 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l4 = r7 * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l4 / l01, t21 = l4 / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r7 + "," + r7 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x6, y4, r7, a0, a1, ccw) {
    x6 = +x6, y4 = +y4, r7 = +r7, ccw = !!ccw;
    var dx = r7 * Math.cos(a0), dy = r7 * Math.sin(a0), x0 = x6 + dx, y0 = y4 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r7 < 0)
      throw new Error("negative radius: " + r7);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r7)
      return;
    if (da < 0)
      da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r7 + "," + r7 + ",0,1," + cw + "," + (x6 - dx) + "," + (y4 - dy) + "A" + r7 + "," + r7 + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r7 + "," + r7 + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x6 + r7 * Math.cos(a1)) + "," + (this._y1 = y4 + r7 * Math.sin(a1));
    }
  },
  rect: function(x6, y4, w4, h3) {
    this._ += "M" + (this._x0 = this._x1 = +x6) + "," + (this._y0 = this._y1 = +y4) + "h" + +w4 + "v" + +h3 + "h" + -w4 + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/d3-shape/src/constant.js
function constant_default5(x6) {
  return function constant() {
    return x6;
  };
}

// node_modules/d3-shape/src/math.js
var epsilon3 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x6, y4);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/point.js
function x2(p5) {
  return p5[0];
}
function y2(p5) {
  return p5[1];
}

// node_modules/d3-shape/src/line.js
function line_default() {
  var x6 = x2, y4 = y2, defined = constant_default5(true), context = null, curve = linear_default, output = null;
  function line(data) {
    var i6, n7 = data.length, d3, defined0 = false, buffer;
    if (context == null)
      output = curve(buffer = path_default());
    for (i6 = 0; i6 <= n7; ++i6) {
      if (!(i6 < n7 && defined(d3 = data[i6], i6, data)) === defined0) {
        if (defined0 = !defined0)
          output.lineStart();
        else
          output.lineEnd();
      }
      if (defined0)
        output.point(+x6(d3, i6, data), +y4(d3, i6, data));
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  line.x = function(_2) {
    return arguments.length ? (x6 = typeof _2 === "function" ? _2 : constant_default5(+_2), line) : x6;
  };
  line.y = function(_2) {
    return arguments.length ? (y4 = typeof _2 === "function" ? _2 : constant_default5(+_2), line) : y4;
  };
  line.defined = function(_2) {
    return arguments.length ? (defined = typeof _2 === "function" ? _2 : constant_default5(!!_2), line) : defined;
  };
  line.curve = function(_2) {
    return arguments.length ? (curve = _2, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_2) {
    return arguments.length ? (_2 == null ? context = output = null : output = curve(context = _2), line) : context;
  };
  return line;
}

// node_modules/d3-shape/src/area.js
function area_default() {
  var x0 = x2, x1 = null, y0 = constant_default5(0), y1 = y2, defined = constant_default5(true), context = null, curve = linear_default, output = null;
  function area(data) {
    var i6, j4, k6, n7 = data.length, d3, defined0 = false, buffer, x0z = new Array(n7), y0z = new Array(n7);
    if (context == null)
      output = curve(buffer = path_default());
    for (i6 = 0; i6 <= n7; ++i6) {
      if (!(i6 < n7 && defined(d3 = data[i6], i6, data)) === defined0) {
        if (defined0 = !defined0) {
          j4 = i6;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k6 = i6 - 1; k6 >= j4; --k6) {
            output.point(x0z[k6], y0z[k6]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i6] = +x0(d3, i6, data), y0z[i6] = +y0(d3, i6, data);
        output.point(x1 ? +x1(d3, i6, data) : x0z[i6], y1 ? +y1(d3, i6, data) : y0z[i6]);
      }
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  function arealine() {
    return line_default().defined(defined).curve(curve).context(context);
  }
  area.x = function(_2) {
    return arguments.length ? (x0 = typeof _2 === "function" ? _2 : constant_default5(+_2), x1 = null, area) : x0;
  };
  area.x0 = function(_2) {
    return arguments.length ? (x0 = typeof _2 === "function" ? _2 : constant_default5(+_2), area) : x0;
  };
  area.x1 = function(_2) {
    return arguments.length ? (x1 = _2 == null ? null : typeof _2 === "function" ? _2 : constant_default5(+_2), area) : x1;
  };
  area.y = function(_2) {
    return arguments.length ? (y0 = typeof _2 === "function" ? _2 : constant_default5(+_2), y1 = null, area) : y0;
  };
  area.y0 = function(_2) {
    return arguments.length ? (y0 = typeof _2 === "function" ? _2 : constant_default5(+_2), area) : y0;
  };
  area.y1 = function(_2) {
    return arguments.length ? (y1 = _2 == null ? null : typeof _2 === "function" ? _2 : constant_default5(+_2), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_2) {
    return arguments.length ? (defined = typeof _2 === "function" ? _2 : constant_default5(!!_2), area) : defined;
  };
  area.curve = function(_2) {
    return arguments.length ? (curve = _2, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_2) {
    return arguments.length ? (_2 == null ? context = output = null : output = curve(context = _2), area) : context;
  };
  return area;
}

// node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a6, r7) {
    this._curve.point(r7 * Math.sin(a6), r7 * -Math.cos(a6));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/d3-shape/src/array.js
var slice2 = Array.prototype.slice;

// node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k2 = 1 / Math.sqrt(12);
var a = (k2 / 2 + 1) * 3;

// node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/d3-shape/src/curve/basis.js
function point2(that, x6, y4) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x6) / 6,
    (that._y0 + 4 * that._y1 + y4) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point2(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point2(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = x6;
    this._y0 = this._y1, this._y1 = y4;
  }
};
function basis_default4(context) {
  return new Basis(context);
}

// node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x6, this._y2 = y4;
        break;
      case 1:
        this._point = 2;
        this._x3 = x6, this._y3 = y4;
        break;
      case 2:
        this._point = 3;
        this._x4 = x6, this._y4 = y4;
        this._context.moveTo((this._x0 + 4 * this._x1 + x6) / 6, (this._y0 + 4 * this._y1 + y4) / 6);
        break;
      default:
        point2(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = x6;
    this._y0 = this._y1, this._y1 = y4;
  }
};
function basisClosed_default4(context) {
  return new BasisClosed(context);
}

// node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x6) / 6, y0 = (this._y0 + 4 * this._y1 + y4) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point2(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = x6;
    this._y0 = this._y1, this._y1 = y4;
  }
};
function basisOpen_default(context) {
  return new BasisOpen(context);
}

// node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x6 = this._x, y4 = this._y, j4 = x6.length - 1;
    if (j4 > 0) {
      var x0 = x6[0], y0 = y4[0], dx = x6[j4] - x0, dy = y4[j4] - y0, i6 = -1, t10;
      while (++i6 <= j4) {
        t10 = i6 / j4;
        this._basis.point(
          this._beta * x6[i6] + (1 - this._beta) * (x0 + t10 * dx),
          this._beta * y4[i6] + (1 - this._beta) * (y0 + t10 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x6, y4) {
    this._x.push(+x6);
    this._y.push(+y4);
  }
};
var bundle_default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/d3-shape/src/curve/cardinal.js
function point3(that, x6, y4) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x6),
    that._y2 + that._k * (that._y1 - y4),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
        this._x1 = x6, this._y1 = y4;
        break;
      case 2:
        this._point = 3;
      default:
        point3(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var cardinal_default = function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x6, this._y3 = y4;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x6, this._y4 = y4);
        break;
      case 2:
        this._point = 3;
        this._x5 = x6, this._y5 = y4;
        break;
      default:
        point3(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var cardinalClosed_default = function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point3(this, x6, y4);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var cardinalOpen_default = function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point4(that, x6, y4) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon3) {
    var a6 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n7 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a6 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n7;
    y1 = (y1 * a6 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n7;
  }
  if (that._l23_a > epsilon3) {
    var b5 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m4 = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b5 + that._x1 * that._l23_2a - x6 * that._l12_2a) / m4;
    y22 = (y22 * b5 + that._y1 * that._l23_2a - y4 * that._l12_2a) / m4;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    if (this._point) {
      var x23 = this._x2 - x6, y23 = this._y2 - y4;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point4(this, x6, y4);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var catmullRom_default = function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    if (this._point) {
      var x23 = this._x2 - x6, y23 = this._y2 - y4;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x6, this._y3 = y4;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x6, this._y4 = y4);
        break;
      case 2:
        this._point = 3;
        this._x5 = x6, this._y5 = y4;
        break;
      default:
        point4(this, x6, y4);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var catmullRomClosed_default = function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    if (this._point) {
      var x23 = this._x2 - x6, y23 = this._y2 - y4;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point4(this, x6, y4);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x6;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y4;
  }
};
var catmullRomOpen_default = function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    if (this._point)
      this._context.lineTo(x6, y4);
    else
      this._point = 1, this._context.moveTo(x6, y4);
  }
};
function linearClosed_default(context) {
  return new LinearClosed(context);
}

// node_modules/d3-shape/src/curve/monotone.js
function sign(x6) {
  return x6 < 0 ? -1 : 1;
}
function slope3(that, x22, y22) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y22 - that._y1) / (h1 || h0 < 0 && -0), p5 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p5)) || 0;
}
function slope2(that, t10) {
  var h3 = that._x1 - that._x0;
  return h3 ? (3 * (that._y1 - that._y0) / h3 - t10) / 2 : t10;
}
function point5(that, t06, t16) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t06, x1 - dx, y1 - dx * t16, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point5(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    var t16 = NaN;
    x6 = +x6, y4 = +y4;
    if (x6 === this._x1 && y4 === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point5(this, slope2(this, t16 = slope3(this, x6, y4)), t16);
        break;
      default:
        point5(this, this._t0, t16 = slope3(this, x6, y4));
        break;
    }
    this._x0 = this._x1, this._x1 = x6;
    this._y0 = this._y1, this._y1 = y4;
    this._t0 = t16;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x6, y4) {
  MonotoneX.prototype.point.call(this, y4, x6);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x6, y4) {
    this._context.moveTo(y4, x6);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x6, y4) {
    this._context.lineTo(y4, x6);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x6, y4) {
    this._context.bezierCurveTo(y1, x1, y22, x22, y4, x6);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}

// node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x6 = this._x, y4 = this._y, n7 = x6.length;
    if (n7) {
      this._line ? this._context.lineTo(x6[0], y4[0]) : this._context.moveTo(x6[0], y4[0]);
      if (n7 === 2) {
        this._context.lineTo(x6[1], y4[1]);
      } else {
        var px = controlPoints(x6), py = controlPoints(y4);
        for (var i0 = 0, i1 = 1; i1 < n7; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x6[i1], y4[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n7 === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x6, y4) {
    this._x.push(+x6);
    this._y.push(+y4);
  }
};
function controlPoints(x6) {
  var i6, n7 = x6.length - 1, m4, a6 = new Array(n7), b5 = new Array(n7), r7 = new Array(n7);
  a6[0] = 0, b5[0] = 2, r7[0] = x6[0] + 2 * x6[1];
  for (i6 = 1; i6 < n7 - 1; ++i6)
    a6[i6] = 1, b5[i6] = 4, r7[i6] = 4 * x6[i6] + 2 * x6[i6 + 1];
  a6[n7 - 1] = 2, b5[n7 - 1] = 7, r7[n7 - 1] = 8 * x6[n7 - 1] + x6[n7];
  for (i6 = 1; i6 < n7; ++i6)
    m4 = a6[i6] / b5[i6 - 1], b5[i6] -= m4, r7[i6] -= m4 * r7[i6 - 1];
  a6[n7 - 1] = r7[n7 - 1] / b5[n7 - 1];
  for (i6 = n7 - 2; i6 >= 0; --i6)
    a6[i6] = (r7[i6] - a6[i6 + 1]) / b5[i6];
  b5[n7 - 1] = (x6[n7] + a6[n7 - 1]) / 2;
  for (i6 = 0; i6 < n7 - 1; ++i6)
    b5[i6] = 2 * x6[i6 + 1] - a6[i6 + 1];
  return [a6, b5];
}
function natural_default(context) {
  return new Natural(context);
}

// node_modules/d3-shape/src/curve/step.js
function Step(context, t10) {
  this._context = context;
  this._t = t10;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x6, y4) {
    x6 = +x6, y4 = +y4;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x6, y4) : this._context.moveTo(x6, y4);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y4);
          this._context.lineTo(x6, y4);
        } else {
          var x1 = this._x * (1 - this._t) + x6 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y4);
        }
        break;
      }
    }
    this._x = x6, this._y = y4;
  }
};
function step_default(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}

// node_modules/d3-shape/src/offset/none.js
function none_default(series, order) {
  if (!((n7 = series.length) > 1))
    return;
  for (var i6 = 1, j4, s0, s1 = series[order[0]], n7, m4 = s1.length; i6 < n7; ++i6) {
    s0 = s1, s1 = series[order[i6]];
    for (j4 = 0; j4 < m4; ++j4) {
      s1[j4][1] += s1[j4][0] = isNaN(s0[j4][1]) ? s0[j4][0] : s0[j4][1];
    }
  }
}

// node_modules/d3-shape/src/order/none.js
function none_default2(series) {
  var n7 = series.length, o5 = new Array(n7);
  while (--n7 >= 0)
    o5[n7] = n7;
  return o5;
}

// node_modules/d3-shape/src/offset/expand.js
function expand_default(series, order) {
  if (!((n7 = series.length) > 0))
    return;
  for (var i6, n7, j4 = 0, m4 = series[0].length, y4; j4 < m4; ++j4) {
    for (y4 = i6 = 0; i6 < n7; ++i6)
      y4 += series[i6][j4][1] || 0;
    if (y4)
      for (i6 = 0; i6 < n7; ++i6)
        series[i6][j4][1] /= y4;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series, order) {
  if (!((n7 = series.length) > 0))
    return;
  for (var i6, j4 = 0, d3, dy, yp, yn2, n7, m4 = series[order[0]].length; j4 < m4; ++j4) {
    for (yp = yn2 = 0, i6 = 0; i6 < n7; ++i6) {
      if ((dy = (d3 = series[order[i6]][j4])[1] - d3[0]) > 0) {
        d3[0] = yp, d3[1] = yp += dy;
      } else if (dy < 0) {
        d3[1] = yn2, d3[0] = yn2 += dy;
      } else {
        d3[0] = 0, d3[1] = dy;
      }
    }
  }
}

// node_modules/d3-shape/src/offset/silhouette.js
function silhouette_default(series, order) {
  if (!((n7 = series.length) > 0))
    return;
  for (var j4 = 0, s0 = series[order[0]], n7, m4 = s0.length; j4 < m4; ++j4) {
    for (var i6 = 0, y4 = 0; i6 < n7; ++i6)
      y4 += series[i6][j4][1] || 0;
    s0[j4][1] += s0[j4][0] = -y4 / 2;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/wiggle.js
function wiggle_default(series, order) {
  if (!((n7 = series.length) > 0) || !((m4 = (s0 = series[order[0]]).length) > 0))
    return;
  for (var y4 = 0, j4 = 1, s0, m4, n7; j4 < m4; ++j4) {
    for (var i6 = 0, s1 = 0, s22 = 0; i6 < n7; ++i6) {
      var si = series[order[i6]], sij0 = si[j4][1] || 0, sij1 = si[j4 - 1][1] || 0, s32 = (sij0 - sij1) / 2;
      for (var k6 = 0; k6 < i6; ++k6) {
        var sk = series[order[k6]], skj0 = sk[j4][1] || 0, skj1 = sk[j4 - 1][1] || 0;
        s32 += skj0 - skj1;
      }
      s1 += sij0, s22 += s32 * sij0;
    }
    s0[j4 - 1][1] += s0[j4 - 1][0] = y4;
    if (s1)
      y4 -= s22 / s1;
  }
  s0[j4 - 1][1] += s0[j4 - 1][0] = y4;
  none_default(series, order);
}

// node_modules/d3-shape/src/order/appearance.js
function appearance_default(series) {
  var peaks = series.map(peak);
  return none_default2(series).sort(function(a6, b5) {
    return peaks[a6] - peaks[b5];
  });
}
function peak(series) {
  var i6 = -1, j4 = 0, n7 = series.length, vi2, vj = -Infinity;
  while (++i6 < n7)
    if ((vi2 = +series[i6][1]) > vj)
      vj = vi2, j4 = i6;
  return j4;
}

// node_modules/d3-shape/src/order/ascending.js
function ascending_default2(series) {
  var sums = series.map(sum2);
  return none_default2(series).sort(function(a6, b5) {
    return sums[a6] - sums[b5];
  });
}
function sum2(series) {
  var s5 = 0, i6 = -1, n7 = series.length, v6;
  while (++i6 < n7)
    if (v6 = +series[i6][1])
      s5 += v6;
  return s5;
}

// node_modules/d3-shape/src/order/descending.js
function descending_default3(series) {
  return ascending_default2(series).reverse();
}

// node_modules/d3-shape/src/order/insideOut.js
function insideOut_default(series) {
  var n7 = series.length, i6, j4, sums = series.map(sum2), order = appearance_default(series), top = 0, bottom = 0, tops = [], bottoms = [];
  for (i6 = 0; i6 < n7; ++i6) {
    j4 = order[i6];
    if (top < bottom) {
      top += sums[j4];
      tops.push(j4);
    } else {
      bottom += sums[j4];
      bottoms.push(j4);
    }
  }
  return bottoms.reverse().concat(tops);
}

// node_modules/d3-shape/src/order/reverse.js
function reverse_default(series) {
  return none_default2(series).reverse();
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default2(x6) {
  return Math.abs(x6 = Math.round(x6)) >= 1e21 ? x6.toLocaleString("en").replace(/,/g, "") : x6.toString(10);
}
function formatDecimalParts2(x6, p5) {
  if ((i6 = (x6 = p5 ? x6.toExponential(p5 - 1) : x6.toExponential()).indexOf("e")) < 0)
    return null;
  var i6, coefficient = x6.slice(0, i6);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x6.slice(i6 + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default2(x6) {
  return x6 = formatDecimalParts2(Math.abs(x6)), x6 ? x6[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default2(grouping, thousands) {
  return function(value, width) {
    var i6 = value.length, t10 = [], j4 = 0, g5 = grouping[0], length = 0;
    while (i6 > 0 && g5 > 0) {
      if (length + g5 + 1 > width)
        g5 = Math.max(1, width - length);
      t10.push(value.substring(i6 -= g5, i6 + g5));
      if ((length += g5 + 1) > width)
        break;
      g5 = grouping[j4 = (j4 + 1) % grouping.length];
    }
    return t10.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default2(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i6) {
      return numerals[+i6];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re2 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier2(specifier) {
  if (!(match = re2.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier2({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier2.prototype = FormatSpecifier2.prototype;
function FormatSpecifier2(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier2.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default2(s5) {
  out:
    for (var n7 = s5.length, i6 = 1, i0 = -1, i1; i6 < n7; ++i6) {
      switch (s5[i6]) {
        case ".":
          i0 = i1 = i6;
          break;
        case "0":
          if (i0 === 0)
            i0 = i6;
          i1 = i6;
          break;
        default:
          if (!+s5[i6])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s5.slice(0, i0) + s5.slice(i1 + 1) : s5;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent2;
function formatPrefixAuto_default2(x6, p5) {
  var d3 = formatDecimalParts2(x6, p5);
  if (!d3)
    return x6 + "";
  var coefficient = d3[0], exponent = d3[1], i6 = exponent - (prefixExponent2 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n7 = coefficient.length;
  return i6 === n7 ? coefficient : i6 > n7 ? coefficient + new Array(i6 - n7 + 1).join("0") : i6 > 0 ? coefficient.slice(0, i6) + "." + coefficient.slice(i6) : "0." + new Array(1 - i6).join("0") + formatDecimalParts2(x6, Math.max(0, p5 + i6 - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default2(x6, p5) {
  var d3 = formatDecimalParts2(x6, p5);
  if (!d3)
    return x6 + "";
  var coefficient = d3[0], exponent = d3[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default2 = {
  "%": function(x6, p5) {
    return (x6 * 100).toFixed(p5);
  },
  "b": function(x6) {
    return Math.round(x6).toString(2);
  },
  "c": function(x6) {
    return x6 + "";
  },
  "d": formatDecimal_default2,
  "e": function(x6, p5) {
    return x6.toExponential(p5);
  },
  "f": function(x6, p5) {
    return x6.toFixed(p5);
  },
  "g": function(x6, p5) {
    return x6.toPrecision(p5);
  },
  "o": function(x6) {
    return Math.round(x6).toString(8);
  },
  "p": function(x6, p5) {
    return formatRounded_default2(x6 * 100, p5);
  },
  "r": formatRounded_default2,
  "s": formatPrefixAuto_default2,
  "X": function(x6) {
    return Math.round(x6).toString(16).toUpperCase();
  },
  "x": function(x6) {
    return Math.round(x6).toString(16);
  }
};

// node_modules/d3-format/src/identity.js
function identity_default4(x6) {
  return x6;
}

// node_modules/d3-format/src/locale.js
var map4 = Array.prototype.map;
var prefixes3 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default2(locale4) {
  var group2 = locale4.grouping === void 0 || locale4.thousands === void 0 ? identity_default4 : formatGroup_default2(map4.call(locale4.grouping, Number), locale4.thousands + ""), currencyPrefix = locale4.currency === void 0 ? "" : locale4.currency[0] + "", currencySuffix = locale4.currency === void 0 ? "" : locale4.currency[1] + "", decimal = locale4.decimal === void 0 ? "." : locale4.decimal + "", numerals = locale4.numerals === void 0 ? identity_default4 : formatNumerals_default2(map4.call(locale4.numerals, String)), percent = locale4.percent === void 0 ? "%" : locale4.percent + "", minus = locale4.minus === void 0 ? "-" : locale4.minus + "", nan = locale4.nan === void 0 ? "NaN" : locale4.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier2(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes_default2[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=")
      zero3 = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default2[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format3(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i6, n7, c11;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default2(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes3[8 + prefixExponent2 / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i6 = -1, n7 = value.length;
          while (++i6 < n7) {
            if (c11 = value.charCodeAt(i6), 48 > c11 || c11 > 57) {
              valueSuffix = (c11 === 46 ? decimal + value.slice(i6 + 1) : value.slice(i6)) + valueSuffix;
              value = value.slice(0, i6);
              break;
            }
          }
        }
      }
      if (comma && !zero3)
        value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3)
        value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format3.toString = function() {
      return specifier + "";
    };
    return format3;
  }
  function formatPrefix3(specifier, value) {
    var f4 = newFormat((specifier = formatSpecifier2(specifier), specifier.type = "f", specifier)), e11 = Math.max(-8, Math.min(8, Math.floor(exponent_default2(value) / 3))) * 3, k6 = Math.pow(10, -e11), prefix2 = prefixes3[8 + e11 / 3];
    return function(value2) {
      return f4(k6 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix3
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale3;
var format2;
var formatPrefix2;
defaultLocale3({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale3(definition) {
  locale3 = locale_default2(definition);
  format2 = locale3.format;
  formatPrefix2 = locale3.formatPrefix;
  return locale3;
}

// node_modules/@nivo/core/dist/nivo-core.es.js
var import_isPlainObject = __toESM(require_isPlainObject());
var import_pick = __toESM(require_pick());
var import_isEqual = __toESM(require_isEqual());
function Sr() {
  return Sr = Object.assign ? Object.assign.bind() : function(e11) {
    for (var r7 = 1; r7 < arguments.length; r7++) {
      var t10 = arguments[r7];
      for (var i6 in t10)
        Object.prototype.hasOwnProperty.call(t10, i6) && (e11[i6] = t10[i6]);
    }
    return e11;
  }, Sr.apply(this, arguments);
}
function Mr(e11, r7) {
  return Mr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e12, r8) {
    return e12.__proto__ = r8, e12;
  }, Mr(e11, r7);
}
function jr(e11, r7) {
  if (null == e11)
    return {};
  var t10, i6, n7 = {}, o5 = Object.keys(e11);
  for (i6 = 0; i6 < o5.length; i6++)
    t10 = o5[i6], r7.indexOf(t10) >= 0 || (n7[t10] = e11[t10]);
  return n7;
}
var Br = { fill: import_prop_types.default.string, fontSize: import_prop_types.default.number, fontFamily: import_prop_types.default.string };
var Gr = import_prop_types.default.shape({ domain: import_prop_types.default.shape({ line: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, strokeDasharray: import_prop_types.default.string }).isRequired }).isRequired, ticks: import_prop_types.default.shape({ line: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, strokeDasharray: import_prop_types.default.string }).isRequired, text: import_prop_types.default.shape(Sr({}, Br)).isRequired }).isRequired, legend: import_prop_types.default.shape({ text: import_prop_types.default.shape(Sr({}, Br)).isRequired }).isRequired });
var Lr = import_prop_types.default.shape({ line: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, strokeDasharray: import_prop_types.default.string }).isRequired });
var Ir = import_prop_types.default.shape({ hidden: import_prop_types.default.shape({ symbol: import_prop_types.default.shape({ fill: import_prop_types.default.string.isRequired, opacity: import_prop_types.default.number }).isRequired, text: import_prop_types.default.shape(Sr({}, Br, { opacity: import_prop_types.default.number })).isRequired }).isRequired, text: import_prop_types.default.shape(Sr({}, Br)).isRequired });
var Dr = import_prop_types.default.shape({ text: import_prop_types.default.shape(Sr({}, Br)).isRequired });
var Yr = import_prop_types.default.shape({ text: import_prop_types.default.shape(Sr({}, Br)).isRequired });
var Ar = import_prop_types.default.shape({ text: import_prop_types.default.shape(Sr({}, Br)).isRequired });
var Fr = import_prop_types.default.shape({ line: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, strokeDasharray: import_prop_types.default.string }).isRequired });
var Er = import_prop_types.default.shape({ text: import_prop_types.default.shape(Sr({}, Br, { outlineWidth: import_prop_types.default.number.isRequired, outlineColor: import_prop_types.default.string.isRequired })).isRequired, link: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, outlineWidth: import_prop_types.default.number.isRequired, outlineColor: import_prop_types.default.string.isRequired }).isRequired, outline: import_prop_types.default.shape({ stroke: import_prop_types.default.string.isRequired, strokeWidth: import_prop_types.default.number.isRequired, outlineWidth: import_prop_types.default.number.isRequired, outlineColor: import_prop_types.default.string.isRequired }).isRequired, symbol: import_prop_types.default.shape({ fill: import_prop_types.default.string.isRequired, outlineWidth: import_prop_types.default.number.isRequired, outlineColor: import_prop_types.default.string.isRequired }).isRequired });
var Ur = import_prop_types.default.shape({ background: import_prop_types.default.string.isRequired, fontFamily: import_prop_types.default.string.isRequired, fontSize: import_prop_types.default.number.isRequired, textColor: import_prop_types.default.string.isRequired, axis: Gr.isRequired, grid: Lr.isRequired, legends: Ir.isRequired, labels: Dr.isRequired, dots: Yr.isRequired, markers: Ar, crosshair: Fr.isRequired, annotations: Er.isRequired });
var Xr = { background: "transparent", text: { fontFamily: "sans-serif", fontSize: 11, fill: "#333333", outlineWidth: 0, outlineColor: "transparent" }, axis: { domain: { line: { stroke: "transparent", strokeWidth: 1 } }, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: {} }, legend: { text: { fontSize: 12 } } }, grid: { line: { stroke: "#dddddd", strokeWidth: 1 } }, legends: { hidden: { symbol: { fill: "#333333", opacity: 0.6 }, text: { fill: "#333333", opacity: 0.6 } }, text: {}, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: { fontSize: 10 } }, title: { text: {} } }, labels: { text: {} }, markers: { lineColor: "#000000", lineStrokeWidth: 1, text: {} }, dots: { text: {} }, tooltip: { container: { background: "white", color: "inherit", fontSize: "inherit", borderRadius: "2px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)", padding: "5px 9px" }, basic: { whiteSpace: "pre", display: "flex", alignItems: "center" }, chip: { marginRight: 7 }, table: {}, tableCell: { padding: "3px 5px" }, tableCellValue: { fontWeight: "bold" } }, crosshair: { line: { stroke: "#000000", strokeWidth: 1, strokeOpacity: 0.75, strokeDasharray: "6 6" } }, annotations: { text: { fontSize: 13, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, link: { stroke: "#000000", strokeWidth: 1, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, outline: { fill: "none", stroke: "#000000", strokeWidth: 2, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, symbol: { fill: "#000000", outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 } } };
var Hr = ["axis.ticks.text", "axis.legend.text", "legends.title.text", "legends.text", "legends.ticks.text", "legends.title.text", "labels.text", "dots.text", "markers.text", "annotations.text"];
var Kr = function(e11, r7) {
  var t10 = (0, import_merge2.default)({}, e11, r7);
  return Hr.forEach(function(e12) {
    void 0 === (0, import_get.default)(t10, e12 + ".fontFamily") && (0, import_set2.default)(t10, e12 + ".fontFamily", t10.text.fontFamily), void 0 === (0, import_get.default)(t10, e12 + ".fontSize") && (0, import_set2.default)(t10, e12 + ".fontSize", t10.text.fontSize), void 0 === (0, import_get.default)(t10, e12 + ".fill") && (0, import_set2.default)(t10, e12 + ".fill", t10.text.fill), void 0 === (0, import_get.default)(t10, e12 + ".outlineWidth") && (0, import_set2.default)(t10, e12 + ".outlineWidth", t10.text.outlineWidth), void 0 === (0, import_get.default)(t10, e12 + ".outlineColor") && (0, import_set2.default)(t10, e12 + ".outlineColor", t10.text.outlineColor);
  }), t10;
};
var Nr = (0, import_react16.createContext)();
var Vr = function(e11) {
  var t10 = e11.children, i6 = e11.animate, n7 = e11.config, o5 = (0, import_react16.useMemo)(function() {
    var e12 = (0, import_isString.default)(n7) ? config[n7] : n7;
    return { animate: i6, config: e12 };
  }, [i6, n7]);
  return (0, import_jsx_runtime2.jsx)(Nr.Provider, { value: o5, children: t10 });
};
var Jr = { animate: import_prop_types.default.bool, motionConfig: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(Object.keys(config)), import_prop_types.default.shape({ mass: import_prop_types.default.number, tension: import_prop_types.default.number, friction: import_prop_types.default.number, clamp: import_prop_types.default.bool, precision: import_prop_types.default.number, velocity: import_prop_types.default.number, duration: import_prop_types.default.number, easing: import_prop_types.default.func })]) };
Vr.propTypes = { children: import_prop_types.default.node.isRequired, animate: Jr.animate, config: Jr.motionConfig };
var Qr = { animate: true, config: "default" };
Vr.defaultProps = Qr;
var Zr = function() {
  return (0, import_react16.useContext)(Nr);
};
var $r = function(e11) {
  var t10 = Zr(), o5 = t10.animate, a6 = t10.config, l4 = function(e12) {
    var r7 = (0, import_react16.useRef)();
    return (0, import_react16.useEffect)(function() {
      r7.current = e12;
    }, [e12]), r7.current;
  }(e11), s5 = (0, import_react16.useMemo)(function() {
    return string_default(l4, e11);
  }, [l4, e11]), d3 = useSpring({ from: { value: 0 }, to: { value: 1 }, reset: true, config: a6, immediate: !o5 }).value;
  return to2(d3, s5);
};
var et = { nivo: ["#d76445", "#f47560", "#e8c1a0", "#97e3d5", "#61cdbb", "#00b0a7"], BrBG: (0, import_last.default)(scheme), PRGn: (0, import_last.default)(scheme2), PiYG: (0, import_last.default)(scheme3), PuOr: (0, import_last.default)(scheme4), RdBu: (0, import_last.default)(scheme5), RdGy: (0, import_last.default)(scheme6), RdYlBu: (0, import_last.default)(scheme7), RdYlGn: (0, import_last.default)(scheme8), spectral: (0, import_last.default)(scheme9), blues: (0, import_last.default)(scheme22), greens: (0, import_last.default)(scheme23), greys: (0, import_last.default)(scheme24), oranges: (0, import_last.default)(scheme27), purples: (0, import_last.default)(scheme25), reds: (0, import_last.default)(scheme26), BuGn: (0, import_last.default)(scheme10), BuPu: (0, import_last.default)(scheme11), GnBu: (0, import_last.default)(scheme12), OrRd: (0, import_last.default)(scheme13), PuBuGn: (0, import_last.default)(scheme14), PuBu: (0, import_last.default)(scheme15), PuRd: (0, import_last.default)(scheme16), RdPu: (0, import_last.default)(scheme17), YlGnBu: (0, import_last.default)(scheme18), YlGn: (0, import_last.default)(scheme19), YlOrBr: (0, import_last.default)(scheme20), YlOrRd: (0, import_last.default)(scheme21) };
var rt = Object.keys(et);
var it = { nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"], category10: category10_default, accent: Accent_default, dark2: Dark2_default, paired: Paired_default, pastel1: Pastel1_default, pastel2: Pastel2_default, set1: Set1_default, set2: Set2_default, set3: Set3_default, brown_blueGreen: (0, import_last.default)(scheme), purpleRed_green: (0, import_last.default)(scheme2), pink_yellowGreen: (0, import_last.default)(scheme3), purple_orange: (0, import_last.default)(scheme4), red_blue: (0, import_last.default)(scheme5), red_grey: (0, import_last.default)(scheme6), red_yellow_blue: (0, import_last.default)(scheme7), red_yellow_green: (0, import_last.default)(scheme8), spectral: (0, import_last.default)(scheme9), blues: (0, import_last.default)(scheme22), greens: (0, import_last.default)(scheme23), greys: (0, import_last.default)(scheme24), oranges: (0, import_last.default)(scheme27), purples: (0, import_last.default)(scheme25), reds: (0, import_last.default)(scheme26), blue_green: (0, import_last.default)(scheme10), blue_purple: (0, import_last.default)(scheme11), green_blue: (0, import_last.default)(scheme12), orange_red: (0, import_last.default)(scheme13), purple_blue_green: (0, import_last.default)(scheme14), purple_blue: (0, import_last.default)(scheme15), purple_red: (0, import_last.default)(scheme16), red_purple: (0, import_last.default)(scheme17), yellow_green_blue: (0, import_last.default)(scheme18), yellow_green: (0, import_last.default)(scheme19), yellow_orange_brown: (0, import_last.default)(scheme20), yellow_orange_red: (0, import_last.default)(scheme21) };
var dt = import_prop_types.default.oneOfType([import_prop_types.default.oneOf(rt), import_prop_types.default.func, import_prop_types.default.arrayOf(import_prop_types.default.string)]);
var ut = { basis: basis_default4, basisClosed: basisClosed_default4, basisOpen: basisOpen_default, bundle: bundle_default, cardinal: cardinal_default, cardinalClosed: cardinalClosed_default, cardinalOpen: cardinalOpen_default, catmullRom: catmullRom_default, catmullRomClosed: catmullRomClosed_default, catmullRomOpen: catmullRomOpen_default, linear: linear_default, linearClosed: linearClosed_default, monotoneX, monotoneY, natural: natural_default, step: step_default, stepAfter, stepBefore };
var ct = Object.keys(ut);
var ft = import_prop_types.default.oneOf(ct);
var pt = ct.filter(function(e11) {
  return e11.endsWith("Closed");
});
var ht = (0, import_without.default)(ct, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
var gt = (0, import_without.default)(ct, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
var bt = import_prop_types.default.oneOf(gt);
var mt = function(e11) {
  if (!ut[e11])
    throw new TypeError("'" + e11 + "', is not a valid curve interpolator identifier.");
  return ut[e11];
};
var yt = { defs: import_prop_types.default.arrayOf(import_prop_types.default.shape({ id: import_prop_types.default.string.isRequired })).isRequired, fill: import_prop_types.default.arrayOf(import_prop_types.default.shape({ id: import_prop_types.default.string.isRequired, match: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["*"]), import_prop_types.default.object, import_prop_types.default.func]).isRequired })).isRequired };
var vt = { ascending: ascending_default2, descending: descending_default3, insideOut: insideOut_default, none: none_default2, reverse: reverse_default };
var Rt = Object.keys(vt);
var qt = import_prop_types.default.oneOf(Rt);
var _t = { expand: expand_default, diverging: diverging_default, none: none_default, silhouette: silhouette_default, wiggle: wiggle_default };
var wt = Object.keys(_t);
var xt = import_prop_types.default.oneOf(wt);
var Wt = import_prop_types.default.shape({ top: import_prop_types.default.number, right: import_prop_types.default.number, bottom: import_prop_types.default.number, left: import_prop_types.default.number }).isRequired;
var Ct = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
var zt = import_prop_types.default.oneOf(Ct);
var Mt = ordinal(Set3_default);
var jt = { top: 0, right: 0, bottom: 0, left: 0 };
var Bt = function(e11, t10, i6) {
  return void 0 === i6 && (i6 = {}), (0, import_react16.useMemo)(function() {
    var r7 = Sr({}, jt, i6);
    return { margin: r7, innerWidth: e11 - r7.left - r7.right, innerHeight: t10 - r7.top - r7.bottom, outerWidth: e11, outerHeight: t10 };
  }, [e11, t10, i6.top, i6.right, i6.bottom, i6.left]);
};
var Gt = function() {
  var e11 = (0, import_react16.useRef)(null), r7 = (0, import_react16.useState)({ left: 0, top: 0, width: 0, height: 0 }), t10 = r7[0], a6 = r7[1], l4 = (0, import_react16.useState)(function() {
    return "undefined" == typeof ResizeObserver ? null : new ResizeObserver(function(e12) {
      var r8 = e12[0];
      return a6(r8.contentRect);
    });
  })[0];
  return (0, import_react16.useEffect)(function() {
    return e11.current && null !== l4 && l4.observe(e11.current), function() {
      null !== l4 && l4.disconnect();
    };
  }, []), [e11, t10];
};
var Lt = function(e11) {
  return (0, import_react16.useMemo)(function() {
    return Kr(Xr, e11);
  }, [e11]);
};
var It = function(e11) {
  return "function" == typeof e11 ? e11 : "string" == typeof e11 ? 0 === e11.indexOf("time:") ? timeFormat(e11.slice("5")) : format2(e11) : function(e12) {
    return "" + e12;
  };
};
var Dt = function(e11) {
  return (0, import_react16.useMemo)(function() {
    return It(e11);
  }, [e11]);
};
var Yt = (0, import_react16.createContext)();
var At = {};
var Ft = function(e11) {
  var r7 = e11.theme, t10 = void 0 === r7 ? At : r7, i6 = e11.children, n7 = Lt(t10);
  return (0, import_jsx_runtime2.jsx)(Yt.Provider, { value: n7, children: i6 });
};
Ft.propTypes = { children: import_prop_types.default.node.isRequired, theme: import_prop_types.default.object };
var Et = function() {
  return (0, import_react16.useContext)(Yt);
};
var Ut = function(e11) {
  var r7 = e11.children, t10 = e11.condition, i6 = e11.wrapper;
  return t10 ? (0, import_react16.cloneElement)(i6, {}, r7) : r7;
};
Ut.propTypes = { children: import_prop_types.default.node.isRequired, condition: import_prop_types.default.bool.isRequired, wrapper: import_prop_types.default.element.isRequired };
var Xt = { position: "relative" };
var Ht = function(e11) {
  var r7 = e11.children, t10 = e11.theme, n7 = e11.renderWrapper, o5 = void 0 === n7 || n7, a6 = e11.isInteractive, l4 = void 0 === a6 || a6, s5 = e11.animate, d3 = e11.motionConfig, u3 = (0, import_react16.useRef)(null);
  return (0, import_jsx_runtime2.jsx)(Ft, { theme: t10, children: (0, import_jsx_runtime2.jsx)(Vr, { animate: s5, config: d3, children: (0, import_jsx_runtime2.jsx)(M, { container: u3, children: (0, import_jsx_runtime2.jsxs)(Ut, { condition: o5, wrapper: (0, import_jsx_runtime2.jsx)("div", { style: Xt, ref: u3 }), children: [r7, l4 && (0, import_jsx_runtime2.jsx)(F, {})] }) }) }) });
};
Ht.propTypes = { children: import_prop_types.default.element.isRequired, isInteractive: import_prop_types.default.bool, renderWrapper: import_prop_types.default.bool, theme: import_prop_types.default.object, animate: import_prop_types.default.bool, motionConfig: import_prop_types.default.string };
var Kt = function() {
};
var Nt = { position: "relative" };
var Vt = function(e11) {
  var t10 = e11.children, n7 = e11.theme, o5 = e11.isInteractive, a6 = void 0 === o5 || o5, s5 = e11.renderWrapper, d3 = void 0 === s5 || s5, u3 = e11.animate, c11 = e11.motionConfig, f4 = (0, import_react16.useRef)(null), m4 = V(f4), y4 = m4.actions, v6 = m4.state, R = (0, import_react16.useCallback)(function(e12, r7) {
    return y4.showTooltipFromEvent(e12, r7);
  }, [y4.showTooltipFromEvent]), q = (0, import_react16.useMemo)(function() {
    return { showTooltip: a6 ? R : Kt, hideTooltip: a6 ? y4.hideTooltip : Kt };
  }, [y4.hideTooltip, a6, R]);
  return (0, import_jsx_runtime2.jsx)(Ft, { theme: n7, children: (0, import_jsx_runtime2.jsx)(Vr, { animate: u3, config: c11, children: (0, import_jsx_runtime2.jsx)(j.Provider, { value: y4, children: (0, import_jsx_runtime2.jsx)(O.Provider, { value: v6, children: (0, import_jsx_runtime2.jsxs)(Ut, { condition: d3, wrapper: (0, import_jsx_runtime2.jsx)("div", { style: Nt, ref: f4 }), children: [t10(q), a6 && (0, import_jsx_runtime2.jsx)(F, {})] }) }) }) }) });
};
Vt.propTypes = { children: import_prop_types.default.func.isRequired, isInteractive: import_prop_types.default.bool, renderWrapper: import_prop_types.default.bool, theme: import_prop_types.default.object.isRequired, animate: import_prop_types.default.bool.isRequired, motionConfig: import_prop_types.default.string };
var Jt = function(e11) {
  var r7 = e11.children, t10 = Gt(), i6 = t10[0], n7 = t10[1], o5 = n7.width > 0 && n7.height > 0;
  return (0, import_jsx_runtime2.jsx)("div", { ref: i6, style: { width: "100%", height: "100%" }, children: o5 && r7({ width: n7.width, height: n7.height }) });
};
Jt.propTypes = { children: import_prop_types.default.func.isRequired };
var Qt = ["id", "colors"];
var Zt = function(e11) {
  var r7 = e11.id, t10 = e11.colors, i6 = jr(e11, Qt);
  return (0, import_jsx_runtime2.jsx)("linearGradient", Sr({ id: r7, x1: 0, x2: 0, y1: 0, y2: 1 }, i6, { children: t10.map(function(e12) {
    var r8 = e12.offset, t11 = e12.color, i7 = e12.opacity;
    return (0, import_jsx_runtime2.jsx)("stop", { offset: r8 + "%", stopColor: t11, stopOpacity: void 0 !== i7 ? i7 : 1 }, r8);
  }) }));
};
Zt.propTypes = { id: import_prop_types.default.string.isRequired, colors: import_prop_types.default.arrayOf(import_prop_types.default.shape({ offset: import_prop_types.default.number.isRequired, color: import_prop_types.default.string.isRequired, opacity: import_prop_types.default.number })).isRequired, gradientTransform: import_prop_types.default.string };
var ei = { linearGradient: Zt };
var ri = (0, import_react16.memo)(function(e11) {
  var r7 = e11.id, t10 = e11.background, i6 = e11.color, n7 = e11.size, o5 = e11.padding, a6 = e11.stagger, l4 = n7 + o5, s5 = n7 / 2, d3 = o5 / 2;
  return true === a6 && (l4 = 2 * n7 + 2 * o5), (0, import_jsx_runtime2.jsxs)("pattern", { id: r7, width: l4, height: l4, patternUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime2.jsx)("rect", { width: l4, height: l4, fill: t10 }), (0, import_jsx_runtime2.jsx)("circle", { cx: d3 + s5, cy: d3 + s5, r: s5, fill: i6 }), a6 && (0, import_jsx_runtime2.jsx)("circle", { cx: 1.5 * o5 + n7 + s5, cy: 1.5 * o5 + n7 + s5, r: s5, fill: i6 })] });
});
ri.displayName = "PatternDots", ri.propTypes = { id: import_prop_types.default.string.isRequired, color: import_prop_types.default.string.isRequired, background: import_prop_types.default.string.isRequired, size: import_prop_types.default.number.isRequired, padding: import_prop_types.default.number.isRequired, stagger: import_prop_types.default.bool.isRequired }, ri.defaultProps = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: false };
var ii = 2 * Math.PI;
var ni = function(e11) {
  return e11 * Math.PI / 180;
};
var fi = { svg: { align: { left: "start", center: "middle", right: "end", start: "start", middle: "middle", end: "end" }, baseline: { top: "text-before-edge", center: "central", bottom: "alphabetic" } }, canvas: { align: { left: "left", center: "center", right: "right", start: "left", middle: "center", end: "right" }, baseline: { top: "top", center: "middle", bottom: "bottom" } } };
var hi = (0, import_react16.memo)(function(e11) {
  var r7 = e11.id, t10 = e11.spacing, i6 = e11.rotation, n7 = e11.background, o5 = e11.color, a6 = e11.lineWidth, l4 = Math.round(i6) % 360, s5 = Math.abs(t10);
  l4 > 180 ? l4 -= 360 : l4 > 90 ? l4 -= 180 : l4 < -180 ? l4 += 360 : l4 < -90 && (l4 += 180);
  var d3, u3 = s5, c11 = s5;
  return 0 === l4 ? d3 = "\n                M 0 0 L " + u3 + " 0\n                M 0 " + c11 + " L " + u3 + " " + c11 + "\n            " : 90 === l4 ? d3 = "\n                M 0 0 L 0 " + c11 + "\n                M " + u3 + " 0 L " + u3 + " " + c11 + "\n            " : (u3 = Math.abs(s5 / Math.sin(ni(l4))), c11 = s5 / Math.sin(ni(90 - l4)), d3 = l4 > 0 ? "\n                    M 0 " + -c11 + " L " + 2 * u3 + " " + c11 + "\n                    M " + -u3 + " " + -c11 + " L " + u3 + " " + c11 + "\n                    M " + -u3 + " 0 L " + u3 + " " + 2 * c11 + "\n                " : "\n                    M " + -u3 + " " + c11 + " L " + u3 + " " + -c11 + "\n                    M " + -u3 + " " + 2 * c11 + " L " + 2 * u3 + " " + -c11 + "\n                    M 0 " + 2 * c11 + " L " + 2 * u3 + " 0\n                "), (0, import_jsx_runtime2.jsxs)("pattern", { id: r7, width: u3, height: c11, patternUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime2.jsx)("rect", { width: u3, height: c11, fill: n7, stroke: "rgba(255, 0, 0, 0.1)", strokeWidth: 0 }), (0, import_jsx_runtime2.jsx)("path", { d: d3, strokeWidth: a6, stroke: o5, strokeLinecap: "square" })] });
});
hi.displayName = "PatternLines", hi.propTypes = { id: import_prop_types.default.string.isRequired, spacing: import_prop_types.default.number.isRequired, rotation: import_prop_types.default.number.isRequired, background: import_prop_types.default.string.isRequired, color: import_prop_types.default.string.isRequired, lineWidth: import_prop_types.default.number.isRequired }, hi.defaultProps = { spacing: 5, rotation: 0, color: "#000000", background: "#ffffff", lineWidth: 2 };
var bi = (0, import_react16.memo)(function(e11) {
  var r7 = e11.id, t10 = e11.background, i6 = e11.color, n7 = e11.size, o5 = e11.padding, a6 = e11.stagger, l4 = n7 + o5, s5 = o5 / 2;
  return true === a6 && (l4 = 2 * n7 + 2 * o5), (0, import_jsx_runtime2.jsxs)("pattern", { id: r7, width: l4, height: l4, patternUnits: "userSpaceOnUse", children: [(0, import_jsx_runtime2.jsx)("rect", { width: l4, height: l4, fill: t10 }), (0, import_jsx_runtime2.jsx)("rect", { x: s5, y: s5, width: n7, height: n7, fill: i6 }), a6 && (0, import_jsx_runtime2.jsx)("rect", { x: 1.5 * o5 + n7, y: 1.5 * o5 + n7, width: n7, height: n7, fill: i6 })] });
});
bi.displayName = "PatternSquares", bi.propTypes = { id: import_prop_types.default.string.isRequired, color: import_prop_types.default.string.isRequired, background: import_prop_types.default.string.isRequired, size: import_prop_types.default.number.isRequired, padding: import_prop_types.default.number.isRequired, stagger: import_prop_types.default.bool.isRequired }, bi.defaultProps = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: false };
var yi = { patternDots: ri, patternLines: hi, patternSquares: bi };
var vi = ["type"];
var Ri = Sr({}, ei, yi);
var qi = function(e11) {
  var r7 = e11.defs;
  return !r7 || r7.length < 1 ? null : (0, import_jsx_runtime2.jsx)("defs", { "aria-hidden": true, children: r7.map(function(e12) {
    var r8 = e12.type, t10 = jr(e12, vi);
    return Ri[r8] ? (0, import_react16.createElement)(Ri[r8], Sr({ key: t10.id }, t10)) : null;
  }) });
};
qi.propTypes = { defs: import_prop_types.default.arrayOf(import_prop_types.default.shape({ type: import_prop_types.default.oneOf(Object.keys(Ri)).isRequired, id: import_prop_types.default.string.isRequired })) };
var ki = (0, import_react16.memo)(qi);
var _i = function(e11) {
  var r7 = e11.width, t10 = e11.height, i6 = e11.margin, n7 = e11.defs, o5 = e11.children, a6 = e11.role, l4 = e11.ariaLabel, s5 = e11.ariaLabelledBy, d3 = e11.ariaDescribedBy, u3 = e11.isFocusable, c11 = Et();
  return (0, import_jsx_runtime2.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: r7, height: t10, role: a6, "aria-label": l4, "aria-labelledby": s5, "aria-describedby": d3, focusable: u3, tabIndex: u3 ? 0 : void 0, children: [(0, import_jsx_runtime2.jsx)(ki, { defs: n7 }), (0, import_jsx_runtime2.jsx)("rect", { width: r7, height: t10, fill: c11.background }), (0, import_jsx_runtime2.jsx)("g", { transform: "translate(" + i6.left + "," + i6.top + ")", children: o5 })] });
};
_i.propTypes = { width: import_prop_types.default.number.isRequired, height: import_prop_types.default.number.isRequired, margin: import_prop_types.default.shape({ top: import_prop_types.default.number.isRequired, left: import_prop_types.default.number.isRequired }).isRequired, defs: import_prop_types.default.array, children: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.node), import_prop_types.default.node]).isRequired, role: import_prop_types.default.string, isFocusable: import_prop_types.default.bool, ariaLabel: import_prop_types.default.string, ariaLabelledBy: import_prop_types.default.string, ariaDescribedBy: import_prop_types.default.string };
var wi = function(e11) {
  var r7 = e11.size, t10 = e11.color, i6 = e11.borderWidth, n7 = e11.borderColor;
  return (0, import_jsx_runtime2.jsx)("circle", { r: r7 / 2, fill: t10, stroke: n7, strokeWidth: i6, style: { pointerEvents: "none" } });
};
wi.propTypes = { size: import_prop_types.default.number.isRequired, color: import_prop_types.default.string.isRequired, borderWidth: import_prop_types.default.number.isRequired, borderColor: import_prop_types.default.string.isRequired };
var xi = (0, import_react16.memo)(wi);
var Oi = function(e11) {
  var r7 = e11.x, t10 = e11.y, i6 = e11.symbol, n7 = void 0 === i6 ? xi : i6, o5 = e11.size, a6 = e11.datum, l4 = e11.color, s5 = e11.borderWidth, u3 = e11.borderColor, c11 = e11.label, f4 = e11.labelTextAnchor, p5 = void 0 === f4 ? "middle" : f4, h3 = e11.labelYOffset, g5 = void 0 === h3 ? -12 : h3, b5 = Et(), m4 = Zr(), y4 = m4.animate, v6 = m4.config, R = useSpring({ transform: "translate(" + r7 + ", " + t10 + ")", config: v6, immediate: !y4 });
  return (0, import_jsx_runtime2.jsxs)(animated.g, { transform: R.transform, style: { pointerEvents: "none" }, children: [(0, import_react16.createElement)(n7, { size: o5, color: l4, datum: a6, borderWidth: s5, borderColor: u3 }), c11 && (0, import_jsx_runtime2.jsx)("text", { textAnchor: p5, y: g5, style: b5.dots.text, children: c11 })] });
};
Oi.propTypes = { x: import_prop_types.default.number.isRequired, y: import_prop_types.default.number.isRequired, datum: import_prop_types.default.object.isRequired, size: import_prop_types.default.number.isRequired, color: import_prop_types.default.string.isRequired, borderWidth: import_prop_types.default.number.isRequired, borderColor: import_prop_types.default.string.isRequired, symbol: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]), label: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]), labelTextAnchor: import_prop_types.default.oneOf(["start", "middle", "end"]), labelYOffset: import_prop_types.default.number };
var Wi = (0, import_react16.memo)(Oi);
var Ci = function(e11) {
  var r7 = e11.width, t10 = e11.height, i6 = e11.axis, n7 = e11.scale, o5 = e11.value, a6 = e11.lineStyle, l4 = e11.textStyle, s5 = e11.legend, d3 = e11.legendPosition, u3 = e11.legendOffsetX, c11 = e11.legendOffsetY, f4 = e11.legendOrientation, p5 = Et(), h3 = 0, g5 = 0, b5 = 0, m4 = 0;
  "y" === i6 ? (b5 = n7(o5), g5 = r7) : (h3 = n7(o5), m4 = t10);
  var y4 = null;
  if (s5) {
    var v6 = function(e12) {
      var r8 = e12.axis, t11 = e12.width, i7 = e12.height, n8 = e12.position, o6 = e12.offsetX, a7 = e12.offsetY, l5 = e12.orientation, s6 = 0, d4 = 0, u4 = "vertical" === l5 ? -90 : 0, c12 = "start";
      if ("x" === r8)
        switch (n8) {
          case "top-left":
            s6 = -o6, d4 = a7, c12 = "end";
            break;
          case "top":
            d4 = -a7, c12 = "horizontal" === l5 ? "middle" : "start";
            break;
          case "top-right":
            s6 = o6, d4 = a7, c12 = "horizontal" === l5 ? "start" : "end";
            break;
          case "right":
            s6 = o6, d4 = i7 / 2, c12 = "horizontal" === l5 ? "start" : "middle";
            break;
          case "bottom-right":
            s6 = o6, d4 = i7 - a7, c12 = "start";
            break;
          case "bottom":
            d4 = i7 + a7, c12 = "horizontal" === l5 ? "middle" : "end";
            break;
          case "bottom-left":
            d4 = i7 - a7, s6 = -o6, c12 = "horizontal" === l5 ? "end" : "start";
            break;
          case "left":
            s6 = -o6, d4 = i7 / 2, c12 = "horizontal" === l5 ? "end" : "middle";
        }
      else
        switch (n8) {
          case "top-left":
            s6 = o6, d4 = -a7, c12 = "start";
            break;
          case "top":
            s6 = t11 / 2, d4 = -a7, c12 = "horizontal" === l5 ? "middle" : "start";
            break;
          case "top-right":
            s6 = t11 - o6, d4 = -a7, c12 = "horizontal" === l5 ? "end" : "start";
            break;
          case "right":
            s6 = t11 + o6, c12 = "horizontal" === l5 ? "start" : "middle";
            break;
          case "bottom-right":
            s6 = t11 - o6, d4 = a7, c12 = "end";
            break;
          case "bottom":
            s6 = t11 / 2, d4 = a7, c12 = "horizontal" === l5 ? "middle" : "end";
            break;
          case "bottom-left":
            s6 = o6, d4 = a7, c12 = "horizontal" === l5 ? "start" : "end";
            break;
          case "left":
            s6 = -o6, c12 = "horizontal" === l5 ? "end" : "middle";
        }
      return { x: s6, y: d4, rotation: u4, textAnchor: c12 };
    }({ axis: i6, width: r7, height: t10, position: d3, offsetX: u3, offsetY: c11, orientation: f4 });
    y4 = (0, import_jsx_runtime2.jsx)("text", { transform: "translate(" + v6.x + ", " + v6.y + ") rotate(" + v6.rotation + ")", textAnchor: v6.textAnchor, dominantBaseline: "central", style: l4, children: s5 });
  }
  return (0, import_jsx_runtime2.jsxs)("g", { transform: "translate(" + h3 + ", " + b5 + ")", children: [(0, import_jsx_runtime2.jsx)("line", { x1: 0, x2: g5, y1: 0, y2: m4, stroke: p5.markers.lineColor, strokeWidth: p5.markers.lineStrokeWidth, style: a6 }), y4] });
};
Ci.propTypes = { width: import_prop_types.default.number.isRequired, height: import_prop_types.default.number.isRequired, axis: import_prop_types.default.oneOf(["x", "y"]).isRequired, scale: import_prop_types.default.func.isRequired, value: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]).isRequired, lineStyle: import_prop_types.default.object, textStyle: import_prop_types.default.object, legend: import_prop_types.default.string, legendPosition: import_prop_types.default.oneOf(["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"]), legendOffsetX: import_prop_types.default.number.isRequired, legendOffsetY: import_prop_types.default.number.isRequired, legendOrientation: import_prop_types.default.oneOf(["horizontal", "vertical"]).isRequired }, Ci.defaultProps = { legendPosition: "top-right", legendOffsetX: 14, legendOffsetY: 14, legendOrientation: "horizontal" };
var zi = (0, import_react16.memo)(Ci);
var Pi = function(e11) {
  var r7 = e11.markers, t10 = e11.width, i6 = e11.height, n7 = e11.xScale, o5 = e11.yScale;
  return r7 && 0 !== r7.length ? r7.map(function(e12, r8) {
    return (0, import_jsx_runtime2.jsx)(zi, Sr({}, e12, { width: t10, height: i6, scale: "y" === e12.axis ? o5 : n7 }), r8);
  }) : null;
};
Pi.propTypes = { width: import_prop_types.default.number.isRequired, height: import_prop_types.default.number.isRequired, xScale: import_prop_types.default.func.isRequired, yScale: import_prop_types.default.func.isRequired, markers: import_prop_types.default.arrayOf(import_prop_types.default.shape({ axis: import_prop_types.default.oneOf(["x", "y"]).isRequired, value: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]).isRequired, lineStyle: import_prop_types.default.object, textStyle: import_prop_types.default.object })) };
var Ti = (0, import_react16.memo)(Pi);
var Si = ["theme", "renderWrapper", "animate", "motionConfig"];
var Mi = function(e11) {
  return function(r7) {
    var t10, i6;
    function n7() {
      return r7.apply(this, arguments) || this;
    }
    return i6 = r7, (t10 = n7).prototype = Object.create(i6.prototype), t10.prototype.constructor = t10, Mr(t10, i6), n7.prototype.render = function() {
      var r8 = this.props, t11 = r8.theme, i7 = r8.renderWrapper, n8 = r8.animate, o5 = r8.motionConfig, a6 = jr(r8, Si);
      return (0, import_jsx_runtime2.jsx)(Ht, { theme: t11, renderWrapper: i7, isInteractive: a6.isInteractive, animate: n8, motionConfig: o5, children: (0, import_jsx_runtime2.jsx)(e11, Sr({}, a6)) });
    }, n7;
  }(import_react16.Component);
};
var ji = function(e11, r7) {
  var t10, i6 = (0, import_isFunction.default)(e11) ? e11 : function(r8) {
    return (0, import_get.default)(r8, e11);
  };
  return r7 && (t10 = (0, import_isFunction.default)(r7) ? r7 : format2(r7)), t10 ? function(e12) {
    return t10(i6(e12));
  } : i6;
};
var Ai = function(e11, r7, t10, i6, n7, o5) {
  return e11 <= n7 && n7 <= e11 + t10 && r7 <= o5 && o5 <= r7 + i6;
};
var Fi = function(e11, r7) {
  var t10, i6 = r7.clientX, n7 = r7.clientY, o5 = e11.getBoundingClientRect(), a6 = (t10 = void 0 !== e11.getBBox ? e11.getBBox() : { width: e11.offsetWidth, height: e11.offsetHeight }).width === o5.width ? 1 : t10.width / o5.width;
  return [(i6 - o5.left) * a6, (n7 - o5.top) * a6];
};
var Ei = Object.keys(ei);
var Ui = Object.keys(yi);
var Xi = function(e11, r7, t10) {
  if ("*" === e11)
    return true;
  if ((0, import_isFunction.default)(e11))
    return e11(r7);
  if ((0, import_isPlainObject.default)(e11)) {
    var i6 = t10 ? (0, import_get.default)(r7, t10) : r7;
    return (0, import_isEqual.default)((0, import_pick.default)(i6, Object.keys(e11)), e11);
  }
  return false;
};
var Hi = function(e11, r7, t10, i6) {
  var n7 = void 0 === i6 ? {} : i6, o5 = n7.dataKey, a6 = n7.colorKey, l4 = void 0 === a6 ? "color" : a6, s5 = n7.targetKey, d3 = void 0 === s5 ? "fill" : s5, u3 = [], c11 = {};
  return e11.length && r7.length && (u3 = [].concat(e11), r7.forEach(function(r8) {
    for (var i7 = function() {
      var i8 = t10[n8], a7 = i8.id, s6 = i8.match;
      if (Xi(s6, r8, o5)) {
        var f4 = e11.find(function(e12) {
          return e12.id === a7;
        });
        if (f4) {
          if (Ui.includes(f4.type))
            if ("inherit" === f4.background || "inherit" === f4.color) {
              var p5 = (0, import_get.default)(r8, l4), h3 = f4.background, g5 = f4.color, b5 = a7;
              "inherit" === f4.background && (b5 = b5 + ".bg." + p5, h3 = p5), "inherit" === f4.color && (b5 = b5 + ".fg." + p5, g5 = p5), (0, import_set2.default)(r8, d3, "url(#" + b5 + ")"), c11[b5] || (u3.push(Sr({}, f4, { id: b5, background: h3, color: g5 })), c11[b5] = 1);
            } else
              (0, import_set2.default)(r8, d3, "url(#" + a7 + ")");
          else if (Ei.includes(f4.type)) {
            if (f4.colors.map(function(e12) {
              return e12.color;
            }).includes("inherit")) {
              var m4 = (0, import_get.default)(r8, l4), R = a7, q = Sr({}, f4, { colors: f4.colors.map(function(e12, r9) {
                return "inherit" !== e12.color ? e12 : (R = R + "." + r9 + "." + m4, Sr({}, e12, { color: "inherit" === e12.color ? m4 : e12.color }));
              }) });
              q.id = R, (0, import_set2.default)(r8, d3, "url(#" + R + ")"), c11[R] || (u3.push(q), c11[R] = 1);
            } else
              (0, import_set2.default)(r8, d3, "url(#" + a7 + ")");
          }
        }
        return "break";
      }
    }, n8 = 0; n8 < t10.length; n8++) {
      if ("break" === i7())
        break;
    }
  })), u3;
};

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/colors.js
function colors_default2(specifier) {
  var n7 = specifier.length / 6 | 0, colors3 = new Array(n7), i6 = 0;
  while (i6 < n7)
    colors3[i6] = "#" + specifier.slice(i6 * 6, ++i6 * 6);
  return colors3;
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default2 = colors_default2("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default2 = colors_default2("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default2 = colors_default2("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default2 = colors_default2("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default2 = colors_default2("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default2 = colors_default2("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default2 = colors_default2("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default2 = colors_default2("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default2 = colors_default2("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/categorical/Tableau10.js
var Tableau10_default2 = colors_default2("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/ramp.js
var ramp_default2 = (scheme55) => rgbBasis2(scheme55[scheme55.length - 1]);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/BrBG.js
var scheme28 = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(colors_default2);
var BrBG_default2 = ramp_default2(scheme28);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/PRGn.js
var scheme29 = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(colors_default2);
var PRGn_default2 = ramp_default2(scheme29);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/PiYG.js
var scheme30 = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(colors_default2);
var PiYG_default2 = ramp_default2(scheme30);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/PuOr.js
var scheme31 = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(colors_default2);
var PuOr_default2 = ramp_default2(scheme31);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/RdBu.js
var scheme32 = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(colors_default2);
var RdBu_default2 = ramp_default2(scheme32);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/RdGy.js
var scheme33 = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(colors_default2);
var RdGy_default2 = ramp_default2(scheme33);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js
var scheme34 = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors_default2);
var RdYlBu_default2 = ramp_default2(scheme34);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js
var scheme35 = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(colors_default2);
var RdYlGn_default2 = ramp_default2(scheme35);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/diverging/Spectral.js
var scheme36 = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(colors_default2);
var Spectral_default2 = ramp_default2(scheme36);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js
var scheme37 = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(colors_default2);
var BuGn_default2 = ramp_default2(scheme37);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js
var scheme38 = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(colors_default2);
var BuPu_default2 = ramp_default2(scheme38);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js
var scheme39 = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors_default2);
var GnBu_default2 = ramp_default2(scheme39);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js
var scheme40 = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(colors_default2);
var OrRd_default2 = ramp_default2(scheme40);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js
var scheme41 = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(colors_default2);
var PuBuGn_default2 = ramp_default2(scheme41);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js
var scheme42 = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(colors_default2);
var PuBu_default2 = ramp_default2(scheme42);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js
var scheme43 = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(colors_default2);
var PuRd_default2 = ramp_default2(scheme43);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js
var scheme44 = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(colors_default2);
var RdPu_default2 = ramp_default2(scheme44);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js
var scheme45 = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(colors_default2);
var YlGnBu_default2 = ramp_default2(scheme45);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js
var scheme46 = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(colors_default2);
var YlGn_default2 = ramp_default2(scheme46);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js
var scheme47 = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(colors_default2);
var YlOrBr_default2 = ramp_default2(scheme47);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js
var scheme48 = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(colors_default2);
var YlOrRd_default2 = ramp_default2(scheme48);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Blues.js
var scheme49 = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(colors_default2);
var Blues_default2 = ramp_default2(scheme49);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Greens.js
var scheme50 = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(colors_default2);
var Greens_default2 = ramp_default2(scheme50);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Greys.js
var scheme51 = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(colors_default2);
var Greys_default2 = ramp_default2(scheme51);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Purples.js
var scheme52 = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(colors_default2);
var Purples_default2 = ramp_default2(scheme52);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Reds.js
var scheme53 = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(colors_default2);
var Reds_default2 = ramp_default2(scheme53);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js
var scheme54 = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(colors_default2);
var Oranges_default2 = ramp_default2(scheme54);

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js
function cividis_default2(t10) {
  t10 = Math.max(0, Math.min(1, t10));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t10 * (35.34 - t10 * (2381.73 - t10 * (6402.7 - t10 * (7024.72 - t10 * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t10 * (170.73 + t10 * (52.82 - t10 * (131.46 - t10 * (176.58 - t10 * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t10 * (442.36 - t10 * (2482.43 - t10 * (6167.24 - t10 * (6614.94 - t10 * 2475.67))))))) + ")";
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/node_modules/d3-color/src/define.js
function define_default3(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend3(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/node_modules/d3-color/src/color.js
function Color3() {
}
var darker3 = 0.7;
var brighter3 = 1 / darker3;
var reI3 = "\\s*([+-]?\\d+)\\s*";
var reN3 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP3 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex3 = /^#([0-9a-f]{3,8})$/;
var reRgbInteger3 = new RegExp("^rgb\\(" + [reI3, reI3, reI3] + "\\)$");
var reRgbPercent3 = new RegExp("^rgb\\(" + [reP3, reP3, reP3] + "\\)$");
var reRgbaInteger3 = new RegExp("^rgba\\(" + [reI3, reI3, reI3, reN3] + "\\)$");
var reRgbaPercent3 = new RegExp("^rgba\\(" + [reP3, reP3, reP3, reN3] + "\\)$");
var reHslPercent3 = new RegExp("^hsl\\(" + [reN3, reP3, reP3] + "\\)$");
var reHslaPercent3 = new RegExp("^hsla\\(" + [reN3, reP3, reP3, reN3] + "\\)$");
var named3 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default3(Color3, color3, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex3,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex3,
  formatHsl: color_formatHsl3,
  formatRgb: color_formatRgb3,
  toString: color_formatRgb3
});
function color_formatHex3() {
  return this.rgb().formatHex();
}
function color_formatHsl3() {
  return hslConvert3(this).formatHsl();
}
function color_formatRgb3() {
  return this.rgb().formatRgb();
}
function color3(format3) {
  var m4, l4;
  format3 = (format3 + "").trim().toLowerCase();
  return (m4 = reHex3.exec(format3)) ? (l4 = m4[1].length, m4 = parseInt(m4[1], 16), l4 === 6 ? rgbn3(m4) : l4 === 3 ? new Rgb3(m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, (m4 & 15) << 4 | m4 & 15, 1) : l4 === 8 ? rgba4(m4 >> 24 & 255, m4 >> 16 & 255, m4 >> 8 & 255, (m4 & 255) / 255) : l4 === 4 ? rgba4(m4 >> 12 & 15 | m4 >> 8 & 240, m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, ((m4 & 15) << 4 | m4 & 15) / 255) : null) : (m4 = reRgbInteger3.exec(format3)) ? new Rgb3(m4[1], m4[2], m4[3], 1) : (m4 = reRgbPercent3.exec(format3)) ? new Rgb3(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, 1) : (m4 = reRgbaInteger3.exec(format3)) ? rgba4(m4[1], m4[2], m4[3], m4[4]) : (m4 = reRgbaPercent3.exec(format3)) ? rgba4(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, m4[4]) : (m4 = reHslPercent3.exec(format3)) ? hsla4(m4[1], m4[2] / 100, m4[3] / 100, 1) : (m4 = reHslaPercent3.exec(format3)) ? hsla4(m4[1], m4[2] / 100, m4[3] / 100, m4[4]) : named3.hasOwnProperty(format3) ? rgbn3(named3[format3]) : format3 === "transparent" ? new Rgb3(NaN, NaN, NaN, 0) : null;
}
function rgbn3(n7) {
  return new Rgb3(n7 >> 16 & 255, n7 >> 8 & 255, n7 & 255, 1);
}
function rgba4(r7, g5, b5, a6) {
  if (a6 <= 0)
    r7 = g5 = b5 = NaN;
  return new Rgb3(r7, g5, b5, a6);
}
function rgbConvert3(o5) {
  if (!(o5 instanceof Color3))
    o5 = color3(o5);
  if (!o5)
    return new Rgb3();
  o5 = o5.rgb();
  return new Rgb3(o5.r, o5.g, o5.b, o5.opacity);
}
function rgb4(r7, g5, b5, opacity) {
  return arguments.length === 1 ? rgbConvert3(r7) : new Rgb3(r7, g5, b5, opacity == null ? 1 : opacity);
}
function Rgb3(r7, g5, b5, opacity) {
  this.r = +r7;
  this.g = +g5;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default3(Rgb3, rgb4, extend3(Color3, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter3 : Math.pow(brighter3, k6);
    return new Rgb3(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker3 : Math.pow(darker3, k6);
    return new Rgb3(this.r * k6, this.g * k6, this.b * k6, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex3,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex3,
  formatRgb: rgb_formatRgb3,
  toString: rgb_formatRgb3
}));
function rgb_formatHex3() {
  return "#" + hex5(this.r) + hex5(this.g) + hex5(this.b);
}
function rgb_formatRgb3() {
  var a6 = this.opacity;
  a6 = isNaN(a6) ? 1 : Math.max(0, Math.min(1, a6));
  return (a6 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a6 === 1 ? ")" : ", " + a6 + ")");
}
function hex5(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla4(h3, s5, l4, a6) {
  if (a6 <= 0)
    h3 = s5 = l4 = NaN;
  else if (l4 <= 0 || l4 >= 1)
    h3 = s5 = NaN;
  else if (s5 <= 0)
    h3 = NaN;
  return new Hsl3(h3, s5, l4, a6);
}
function hslConvert3(o5) {
  if (o5 instanceof Hsl3)
    return new Hsl3(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Color3))
    o5 = color3(o5);
  if (!o5)
    return new Hsl3();
  if (o5 instanceof Hsl3)
    return o5;
  o5 = o5.rgb();
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, min3 = Math.min(r7, g5, b5), max3 = Math.max(r7, g5, b5), h3 = NaN, s5 = max3 - min3, l4 = (max3 + min3) / 2;
  if (s5) {
    if (r7 === max3)
      h3 = (g5 - b5) / s5 + (g5 < b5) * 6;
    else if (g5 === max3)
      h3 = (b5 - r7) / s5 + 2;
    else
      h3 = (r7 - g5) / s5 + 4;
    s5 /= l4 < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h3 *= 60;
  } else {
    s5 = l4 > 0 && l4 < 1 ? 0 : h3;
  }
  return new Hsl3(h3, s5, l4, o5.opacity);
}
function hsl7(h3, s5, l4, opacity) {
  return arguments.length === 1 ? hslConvert3(h3) : new Hsl3(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Hsl3(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default3(Hsl3, hsl7, extend3(Color3, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter3 : Math.pow(brighter3, k6);
    return new Hsl3(this.h, this.s, this.l * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker3 : Math.pow(darker3, k6);
    return new Hsl3(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb: function() {
    var h3 = this.h % 360 + (this.h < 0) * 360, s5 = isNaN(h3) || isNaN(this.s) ? 0 : this.s, l4 = this.l, m22 = l4 + (l4 < 0.5 ? l4 : 1 - l4) * s5, m1 = 2 * l4 - m22;
    return new Rgb3(
      hsl2rgb3(h3 >= 240 ? h3 - 240 : h3 + 120, m1, m22),
      hsl2rgb3(h3, m1, m22),
      hsl2rgb3(h3 < 120 ? h3 + 240 : h3 - 120, m1, m22),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a6 = this.opacity;
    a6 = isNaN(a6) ? 1 : Math.max(0, Math.min(1, a6));
    return (a6 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a6 === 1 ? ")" : ", " + a6 + ")");
  }
}));
function hsl2rgb3(h3, m1, m22) {
  return (h3 < 60 ? m1 + (m22 - m1) * h3 / 60 : h3 < 180 ? m22 : h3 < 240 ? m1 + (m22 - m1) * (240 - h3) / 60 : m1) * 255;
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/node_modules/d3-color/src/math.js
var radians3 = Math.PI / 180;
var degrees6 = 180 / Math.PI;

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/node_modules/d3-color/src/lab.js
var K3 = 18;
var Xn3 = 0.96422;
var Yn3 = 1;
var Zn3 = 0.82521;
var t04 = 4 / 29;
var t14 = 6 / 29;
var t23 = 3 * t14 * t14;
var t33 = t14 * t14 * t14;
function labConvert3(o5) {
  if (o5 instanceof Lab3)
    return new Lab3(o5.l, o5.a, o5.b, o5.opacity);
  if (o5 instanceof Hcl3)
    return hcl2lab3(o5);
  if (!(o5 instanceof Rgb3))
    o5 = rgbConvert3(o5);
  var r7 = rgb2lrgb3(o5.r), g5 = rgb2lrgb3(o5.g), b5 = rgb2lrgb3(o5.b), y4 = xyz2lab3((0.2225045 * r7 + 0.7168786 * g5 + 0.0606169 * b5) / Yn3), x6, z4;
  if (r7 === g5 && g5 === b5)
    x6 = z4 = y4;
  else {
    x6 = xyz2lab3((0.4360747 * r7 + 0.3850649 * g5 + 0.1430804 * b5) / Xn3);
    z4 = xyz2lab3((0.0139322 * r7 + 0.0971045 * g5 + 0.7141733 * b5) / Zn3);
  }
  return new Lab3(116 * y4 - 16, 500 * (x6 - y4), 200 * (y4 - z4), o5.opacity);
}
function lab6(l4, a6, b5, opacity) {
  return arguments.length === 1 ? labConvert3(l4) : new Lab3(l4, a6, b5, opacity == null ? 1 : opacity);
}
function Lab3(l4, a6, b5, opacity) {
  this.l = +l4;
  this.a = +a6;
  this.b = +b5;
  this.opacity = +opacity;
}
define_default3(Lab3, lab6, extend3(Color3, {
  brighter: function(k6) {
    return new Lab3(this.l + K3 * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  darker: function(k6) {
    return new Lab3(this.l - K3 * (k6 == null ? 1 : k6), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y4 = (this.l + 16) / 116, x6 = isNaN(this.a) ? y4 : y4 + this.a / 500, z4 = isNaN(this.b) ? y4 : y4 - this.b / 200;
    x6 = Xn3 * lab2xyz3(x6);
    y4 = Yn3 * lab2xyz3(y4);
    z4 = Zn3 * lab2xyz3(z4);
    return new Rgb3(
      lrgb2rgb3(3.1338561 * x6 - 1.6168667 * y4 - 0.4906146 * z4),
      lrgb2rgb3(-0.9787684 * x6 + 1.9161415 * y4 + 0.033454 * z4),
      lrgb2rgb3(0.0719453 * x6 - 0.2289914 * y4 + 1.4052427 * z4),
      this.opacity
    );
  }
}));
function xyz2lab3(t10) {
  return t10 > t33 ? Math.pow(t10, 1 / 3) : t10 / t23 + t04;
}
function lab2xyz3(t10) {
  return t10 > t14 ? t10 * t10 * t10 : t23 * (t10 - t04);
}
function lrgb2rgb3(x6) {
  return 255 * (x6 <= 31308e-7 ? 12.92 * x6 : 1.055 * Math.pow(x6, 1 / 2.4) - 0.055);
}
function rgb2lrgb3(x6) {
  return (x6 /= 255) <= 0.04045 ? x6 / 12.92 : Math.pow((x6 + 0.055) / 1.055, 2.4);
}
function hclConvert3(o5) {
  if (o5 instanceof Hcl3)
    return new Hcl3(o5.h, o5.c, o5.l, o5.opacity);
  if (!(o5 instanceof Lab3))
    o5 = labConvert3(o5);
  if (o5.a === 0 && o5.b === 0)
    return new Hcl3(NaN, 0 < o5.l && o5.l < 100 ? 0 : NaN, o5.l, o5.opacity);
  var h3 = Math.atan2(o5.b, o5.a) * degrees6;
  return new Hcl3(h3 < 0 ? h3 + 360 : h3, Math.sqrt(o5.a * o5.a + o5.b * o5.b), o5.l, o5.opacity);
}
function hcl6(h3, c11, l4, opacity) {
  return arguments.length === 1 ? hclConvert3(h3) : new Hcl3(h3, c11, l4, opacity == null ? 1 : opacity);
}
function Hcl3(h3, c11, l4, opacity) {
  this.h = +h3;
  this.c = +c11;
  this.l = +l4;
  this.opacity = +opacity;
}
function hcl2lab3(o5) {
  if (isNaN(o5.h))
    return new Lab3(o5.l, 0, 0, o5.opacity);
  var h3 = o5.h * radians3;
  return new Lab3(o5.l, Math.cos(h3) * o5.c, Math.sin(h3) * o5.c, o5.opacity);
}
define_default3(Hcl3, hcl6, extend3(Color3, {
  brighter: function(k6) {
    return new Hcl3(this.h, this.c, this.l + K3 * (k6 == null ? 1 : k6), this.opacity);
  },
  darker: function(k6) {
    return new Hcl3(this.h, this.c, this.l - K3 * (k6 == null ? 1 : k6), this.opacity);
  },
  rgb: function() {
    return hcl2lab3(this).rgb();
  }
}));

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/node_modules/d3-color/src/cubehelix.js
var A4 = -0.14861;
var B3 = 1.78277;
var C5 = -0.29227;
var D3 = -0.90649;
var E4 = 1.97294;
var ED3 = E4 * D3;
var EB3 = E4 * B3;
var BC_DA3 = B3 * C5 - D3 * A4;
function cubehelixConvert3(o5) {
  if (o5 instanceof Cubehelix3)
    return new Cubehelix3(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Rgb3))
    o5 = rgbConvert3(o5);
  var r7 = o5.r / 255, g5 = o5.g / 255, b5 = o5.b / 255, l4 = (BC_DA3 * b5 + ED3 * r7 - EB3 * g5) / (BC_DA3 + ED3 - EB3), bl = b5 - l4, k6 = (E4 * (g5 - l4) - C5 * bl) / D3, s5 = Math.sqrt(k6 * k6 + bl * bl) / (E4 * l4 * (1 - l4)), h3 = s5 ? Math.atan2(k6, bl) * degrees6 - 120 : NaN;
  return new Cubehelix3(h3 < 0 ? h3 + 360 : h3, s5, l4, o5.opacity);
}
function cubehelix6(h3, s5, l4, opacity) {
  return arguments.length === 1 ? cubehelixConvert3(h3) : new Cubehelix3(h3, s5, l4, opacity == null ? 1 : opacity);
}
function Cubehelix3(h3, s5, l4, opacity) {
  this.h = +h3;
  this.s = +s5;
  this.l = +l4;
  this.opacity = +opacity;
}
define_default3(Cubehelix3, cubehelix6, extend3(Color3, {
  brighter: function(k6) {
    k6 = k6 == null ? brighter3 : Math.pow(brighter3, k6);
    return new Cubehelix3(this.h, this.s, this.l * k6, this.opacity);
  },
  darker: function(k6) {
    k6 = k6 == null ? darker3 : Math.pow(darker3, k6);
    return new Cubehelix3(this.h, this.s, this.l * k6, this.opacity);
  },
  rgb: function() {
    var h3 = isNaN(this.h) ? 0 : (this.h + 120) * radians3, l4 = +this.l, a6 = isNaN(this.s) ? 0 : this.s * l4 * (1 - l4), cosh4 = Math.cos(h3), sinh4 = Math.sin(h3);
    return new Rgb3(
      255 * (l4 + a6 * (A4 * cosh4 + B3 * sinh4)),
      255 * (l4 + a6 * (C5 * cosh4 + D3 * sinh4)),
      255 * (l4 + a6 * (E4 * cosh4)),
      this.opacity
    );
  }
}));

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js
var cubehelix_default5 = cubehelixLong2(cubehelix6(300, 0.5, 0), cubehelix6(-240, 0.5, 1));

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm2 = cubehelixLong2(cubehelix6(-100, 0.75, 0.35), cubehelix6(80, 1.5, 0.8));
var cool2 = cubehelixLong2(cubehelix6(260, 0.75, 0.35), cubehelix6(80, 1.5, 0.8));
var c8 = cubehelix6();
function rainbow_default2(t10) {
  if (t10 < 0 || t10 > 1)
    t10 -= Math.floor(t10);
  var ts2 = Math.abs(t10 - 0.5);
  c8.h = 360 * t10 - 100;
  c8.s = 1.5 - 1.5 * ts2;
  c8.l = 0.8 - 0.9 * ts2;
  return c8 + "";
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js
var c9 = rgb4();
var pi_1_32 = Math.PI / 3;
var pi_2_32 = Math.PI * 2 / 3;
function sinebow_default2(t10) {
  var x6;
  t10 = (0.5 - t10) * Math.PI;
  c9.r = 255 * (x6 = Math.sin(t10)) * x6;
  c9.g = 255 * (x6 = Math.sin(t10 + pi_1_32)) * x6;
  c9.b = 255 * (x6 = Math.sin(t10 + pi_2_32)) * x6;
  return c9 + "";
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js
function turbo_default2(t10) {
  t10 = Math.max(0, Math.min(1, t10));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t10 * (1172.33 - t10 * (10793.56 - t10 * (33300.12 - t10 * (38394.49 - t10 * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t10 * (557.33 + t10 * (1225.33 - t10 * (3574.96 - t10 * (1073.77 + t10 * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t10 * (3211.1 - t10 * (15327.97 - t10 * (27814 - t10 * (22569.18 - t10 * 6838.66))))))) + ")";
}

// node_modules/@nivo/colors/node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp2(range) {
  var n7 = range.length;
  return function(t10) {
    return range[Math.max(0, Math.min(n7 - 1, Math.floor(t10 * n7)))];
  };
}
var viridis_default2 = ramp2(colors_default2("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma2 = ramp2(colors_default2("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno2 = ramp2(colors_default2("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma2 = ramp2(colors_default2("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// node_modules/@nivo/colors/dist/nivo-colors.es.js
var import_react17 = __toESM(require_react());
var import_get2 = __toESM(require_get());
var import_isPlainObject2 = __toESM(require_isPlainObject());
var import_prop_types2 = __toESM(require_prop_types());
function qe() {
  return qe = Object.assign ? Object.assign.bind() : function(e11) {
    for (var r7 = 1; r7 < arguments.length; r7++) {
      var n7 = arguments[r7];
      for (var t10 in n7)
        Object.prototype.hasOwnProperty.call(n7, t10) && (e11[t10] = n7[t10]);
    }
    return e11;
  }, qe.apply(this, arguments);
}
function Se(e11, r7) {
  (null == r7 || r7 > e11.length) && (r7 = e11.length);
  for (var n7 = 0, t10 = new Array(r7); n7 < r7; n7++)
    t10[n7] = e11[n7];
  return t10;
}
function Re(e11, r7) {
  var n7 = "undefined" != typeof Symbol && e11[Symbol.iterator] || e11["@@iterator"];
  if (n7)
    return (n7 = n7.call(e11)).next.bind(n7);
  if (Array.isArray(e11) || (n7 = function(e12, r8) {
    if (e12) {
      if ("string" == typeof e12)
        return Se(e12, r8);
      var n8 = Object.prototype.toString.call(e12).slice(8, -1);
      return "Object" === n8 && e12.constructor && (n8 = e12.constructor.name), "Map" === n8 || "Set" === n8 ? Array.from(e12) : "Arguments" === n8 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n8) ? Se(e12, r8) : void 0;
    }
  }(e11)) || r7 && e11 && "number" == typeof e11.length) {
    n7 && (e11 = n7);
    var t10 = 0;
    return function() {
      return t10 >= e11.length ? { done: true } : { done: false, value: e11[t10++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var Ce = { nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"], category10: category10_default2, accent: Accent_default2, dark2: Dark2_default2, paired: Paired_default2, pastel1: Pastel1_default2, pastel2: Pastel2_default2, set1: Set1_default2, set2: Set2_default2, set3: Set3_default2 };
var Ge = Object.keys(Ce);
var Ve = { brown_blueGreen: scheme28, purpleRed_green: scheme29, pink_yellowGreen: scheme30, purple_orange: scheme31, red_blue: scheme32, red_grey: scheme33, red_yellow_blue: scheme34, red_yellow_green: scheme35, spectral: scheme36 };
var Te = Object.keys(Ve);
var Pe = { brown_blueGreen: BrBG_default2, purpleRed_green: PRGn_default2, pink_yellowGreen: PiYG_default2, purple_orange: PuOr_default2, red_blue: RdBu_default2, red_grey: RdGy_default2, red_yellow_blue: RdYlBu_default2, red_yellow_green: RdYlGn_default2, spectral: Spectral_default2 };
var Ue = { blues: scheme49, greens: scheme50, greys: scheme51, oranges: scheme54, purples: scheme52, reds: scheme53, blue_green: scheme37, blue_purple: scheme38, green_blue: scheme39, orange_red: scheme40, purple_blue_green: scheme41, purple_blue: scheme42, purple_red: scheme43, red_purple: scheme44, yellow_green_blue: scheme45, yellow_green: scheme46, yellow_orange_brown: scheme47, yellow_orange_red: scheme48 };
var De = Object.keys(Ue);
var Me = { blues: Blues_default2, greens: Greens_default2, greys: Greys_default2, oranges: Oranges_default2, purples: Purples_default2, reds: Reds_default2, turbo: turbo_default2, viridis: viridis_default2, inferno: inferno2, magma: magma2, plasma: plasma2, cividis: cividis_default2, warm: warm2, cool: cool2, cubehelixDefault: cubehelix_default5, blue_green: BuGn_default2, blue_purple: BuPu_default2, green_blue: GnBu_default2, orange_red: OrRd_default2, purple_blue_green: PuBuGn_default2, purple_blue: PuBu_default2, purple_red: PuRd_default2, red_purple: RdPu_default2, yellow_green_blue: YlGnBu_default2, yellow_green: YlGn_default2, yellow_orange_brown: YlOrBr_default2, yellow_orange_red: YlOrRd_default2 };
var $e = qe({}, Ce, Ve, Ue);
var Be = Object.keys($e);
var Fe = function(e11) {
  return Ge.includes(e11);
};
var He = function(e11) {
  return Te.includes(e11);
};
var Je = function(e11) {
  return De.includes(e11);
};
var Ke = { rainbow: rainbow_default2, sinebow: sinebow_default2 };
var Le = qe({}, Pe, Me, Ke);
var Ne = Object.keys(Le);
var Qe2 = function(e11, r7) {
  if ("function" == typeof e11)
    return e11;
  if ((0, import_isPlainObject2.default)(e11)) {
    if (function(e12) {
      return void 0 !== e12.theme;
    }(e11)) {
      if (void 0 === r7)
        throw new Error("Unable to use color from theme as no theme was provided");
      var n7 = (0, import_get2.default)(r7, e11.theme);
      if (void 0 === n7)
        throw new Error("Color from theme is undefined at path: '" + e11.theme + "'");
      return function() {
        return n7;
      };
    }
    if (function(e12) {
      return void 0 !== e12.from;
    }(e11)) {
      var t10 = function(r8) {
        return (0, import_get2.default)(r8, e11.from);
      };
      if (Array.isArray(e11.modifiers)) {
        for (var o5, i6 = [], u3 = function() {
          var e12 = o5.value, r8 = e12[0], n8 = e12[1];
          if ("brighter" === r8)
            i6.push(function(e13) {
              return e13.brighter(n8);
            });
          else if ("darker" === r8)
            i6.push(function(e13) {
              return e13.darker(n8);
            });
          else {
            if ("opacity" !== r8)
              throw new Error("Invalid color modifier: '" + r8 + "', must be one of: 'brighter', 'darker', 'opacity'");
            i6.push(function(e13) {
              return e13.opacity = n8, e13;
            });
          }
        }, a6 = Re(e11.modifiers); !(o5 = a6()).done; )
          u3();
        return 0 === i6.length ? t10 : function(e12) {
          return i6.reduce(function(e13, r8) {
            return r8(e13);
          }, rgb2(t10(e12))).toString();
        };
      }
      return t10;
    }
    throw new Error("Invalid color spec, you should either specify 'theme' or 'from' when using a config object");
  }
  return function() {
    return e11;
  };
};
var We = function(e11, r7) {
  return (0, import_react17.useMemo)(function() {
    return Qe2(e11, r7);
  }, [e11, r7]);
};
var Xe = import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.arrayOf(import_prop_types2.default.string), import_prop_types2.default.shape({ scheme: import_prop_types2.default.oneOf(Be).isRequired, size: import_prop_types2.default.number }), import_prop_types2.default.shape({ datum: import_prop_types2.default.string.isRequired }), import_prop_types2.default.string]);
var Ye = import_prop_types2.default.oneOfType([import_prop_types2.default.string, import_prop_types2.default.func, import_prop_types2.default.shape({ theme: import_prop_types2.default.string.isRequired }), import_prop_types2.default.shape({ from: import_prop_types2.default.string.isRequired, modifiers: import_prop_types2.default.arrayOf(import_prop_types2.default.array) })]);
var fr = function(e11, r7) {
  if ("function" == typeof e11)
    return e11;
  var n7 = "function" == typeof r7 ? r7 : function(e12) {
    return (0, import_get2.default)(e12, r7);
  };
  if (Array.isArray(e11)) {
    var t10 = ordinal(e11), o5 = function(e12) {
      return t10(n7(e12));
    };
    return o5.scale = t10, o5;
  }
  if ((0, import_isPlainObject2.default)(e11)) {
    if (function(e12) {
      return void 0 !== e12.datum;
    }(e11))
      return function(r8) {
        return (0, import_get2.default)(r8, e11.datum);
      };
    if (function(e12) {
      return void 0 !== e12.scheme;
    }(e11)) {
      if (Fe(e11.scheme)) {
        var i6 = ordinal($e[e11.scheme]), u3 = function(e12) {
          return i6(n7(e12));
        };
        return u3.scale = i6, u3;
      }
      if (He(e11.scheme)) {
        if (void 0 !== e11.size && (e11.size < 3 || e11.size > 11))
          throw new Error("Invalid size '" + e11.size + "' for diverging color scheme '" + e11.scheme + "', must be between 3~11");
        var a6 = ordinal($e[e11.scheme][e11.size || 11]), l4 = function(e12) {
          return a6(n7(e12));
        };
        return l4.scale = a6, l4;
      }
      if (Je(e11.scheme)) {
        if (void 0 !== e11.size && (e11.size < 3 || e11.size > 9))
          throw new Error("Invalid size '" + e11.size + "' for sequential color scheme '" + e11.scheme + "', must be between 3~9");
        var s5 = ordinal($e[e11.scheme][e11.size || 9]), c11 = function(e12) {
          return s5(n7(e12));
        };
        return c11.scale = s5, c11;
      }
    }
    throw new Error("Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property");
  }
  return function() {
    return e11;
  };
};
var pr = function(e11, r7) {
  return (0, import_react17.useMemo)(function() {
    return fr(e11, r7);
  }, [e11, r7]);
};

// node_modules/@nivo/axes/dist/nivo-axes.es.js
var t6 = __toESM(require_react());
var import_react18 = __toESM(require_react());

// node_modules/@nivo/scales/dist/nivo-scales.es.js
var import_uniq = __toESM(require_uniq());
var import_uniqBy = __toESM(require_uniqBy());
var import_sortBy = __toESM(require_sortBy());
var import_last2 = __toESM(require_last());
var import_isDate = __toESM(require_isDate());

// node_modules/@nivo/scales/node_modules/d3-time/src/interval.js
var t05 = /* @__PURE__ */ new Date();
var t15 = /* @__PURE__ */ new Date();
function newInterval2(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = function(start2, stop2, step) {
    var range = [], previous;
    start2 = interval.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop2) || !(step > 0))
      return range;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop2);
    return range;
  };
  interval.filter = function(test) {
    return newInterval2(function(date2) {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count2) {
    interval.count = function(start2, end) {
      t05.setTime(+start2), t15.setTime(+end);
      floori(t05), floori(t15);
      return Math.floor(count2(t05, t15));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d3) {
        return field(d3) % step === 0;
      } : function(d3) {
        return interval.count(0, d3) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/@nivo/scales/node_modules/d3-time/src/millisecond.js
var millisecond2 = newInterval2(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start2, end) {
  return end - start2;
});
millisecond2.every = function(k6) {
  k6 = Math.floor(k6);
  if (!isFinite(k6) || !(k6 > 0))
    return null;
  if (!(k6 > 1))
    return millisecond2;
  return newInterval2(function(date2) {
    date2.setTime(Math.floor(date2 / k6) * k6);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k6);
  }, function(start2, end) {
    return (end - start2) / k6;
  });
};
var millisecond_default2 = millisecond2;
var milliseconds2 = millisecond2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/duration.js
var durationSecond2 = 1e3;
var durationMinute2 = 6e4;
var durationHour2 = 36e5;
var durationDay2 = 864e5;
var durationWeek2 = 6048e5;

// node_modules/@nivo/scales/node_modules/d3-time/src/second.js
var second2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond2);
}, function(start2, end) {
  return (end - start2) / durationSecond2;
}, function(date2) {
  return date2.getUTCSeconds();
});
var second_default2 = second2;
var seconds2 = second2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/minute.js
var minute2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond2);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute2);
}, function(start2, end) {
  return (end - start2) / durationMinute2;
}, function(date2) {
  return date2.getMinutes();
});
var minute_default2 = minute2;
var minutes2 = minute2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/hour.js
var hour2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond2 - date2.getMinutes() * durationMinute2);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour2);
}, function(start2, end) {
  return (end - start2) / durationHour2;
}, function(date2) {
  return date2.getHours();
});
var hour_default2 = hour2;
var hours2 = hour2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/day.js
var day2 = newInterval2(function(date2) {
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setDate(date2.getDate() + step);
}, function(start2, end) {
  return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute2) / durationDay2;
}, function(date2) {
  return date2.getDate() - 1;
});
var days2 = day2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/week.js
function weekday2(i6) {
  return newInterval2(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i6) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start2, end) {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute2) / durationWeek2;
  });
}
var sunday2 = weekday2(0);
var monday2 = weekday2(1);
var tuesday2 = weekday2(2);
var wednesday2 = weekday2(3);
var thursday2 = weekday2(4);
var friday2 = weekday2(5);
var saturday2 = weekday2(6);
var sundays2 = sunday2.range;
var mondays2 = monday2.range;
var tuesdays2 = tuesday2.range;
var wednesdays2 = wednesday2.range;
var thursdays2 = thursday2.range;
var fridays2 = friday2.range;
var saturdays2 = saturday2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/month.js
var month2 = newInterval2(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start2, end) {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var month_default2 = month2;
var months2 = month2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/year.js
var year2 = newInterval2(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start2, end) {
  return end.getFullYear() - start2.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year2.every = function(k6) {
  return !isFinite(k6 = Math.floor(k6)) || !(k6 > 0) ? null : newInterval2(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k6) * k6);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k6);
  });
};
var year_default2 = year2;
var years2 = year2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcMinute.js
var utcMinute2 = newInterval2(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute2);
}, function(start2, end) {
  return (end - start2) / durationMinute2;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute_default2 = utcMinute2;
var utcMinutes2 = utcMinute2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcHour.js
var utcHour2 = newInterval2(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour2);
}, function(start2, end) {
  return (end - start2) / durationHour2;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour_default2 = utcHour2;
var utcHours2 = utcHour2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcDay.js
var utcDay2 = newInterval2(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start2, end) {
  return (end - start2) / durationDay2;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDays2 = utcDay2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcWeek.js
function utcWeekday2(i6) {
  return newInterval2(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i6) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start2, end) {
    return (end - start2) / durationWeek2;
  });
}
var utcSunday2 = utcWeekday2(0);
var utcMonday2 = utcWeekday2(1);
var utcTuesday2 = utcWeekday2(2);
var utcWednesday2 = utcWeekday2(3);
var utcThursday2 = utcWeekday2(4);
var utcFriday2 = utcWeekday2(5);
var utcSaturday2 = utcWeekday2(6);
var utcSundays2 = utcSunday2.range;
var utcMondays2 = utcMonday2.range;
var utcTuesdays2 = utcTuesday2.range;
var utcWednesdays2 = utcWednesday2.range;
var utcThursdays2 = utcThursday2.range;
var utcFridays2 = utcFriday2.range;
var utcSaturdays2 = utcSaturday2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcMonth.js
var utcMonth2 = newInterval2(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start2, end) {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth_default2 = utcMonth2;
var utcMonths2 = utcMonth2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcYear.js
var utcYear2 = newInterval2(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start2, end) {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear2.every = function(k6) {
  return !isFinite(k6 = Math.floor(k6)) || !(k6 > 0) ? null : newInterval2(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k6) * k6);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k6);
  });
};
var utcYear_default2 = utcYear2;
var utcYears2 = utcYear2.range;

// node_modules/@nivo/scales/dist/nivo-scales.es.js
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(n7) {
    for (var t10 = 1; t10 < arguments.length; t10++) {
      var r7 = arguments[t10];
      for (var e11 in r7)
        Object.prototype.hasOwnProperty.call(r7, e11) && (n7[e11] = r7[e11]);
    }
    return n7;
  }, $.apply(this, arguments);
}
var J = [function(n7) {
  return n7.setMilliseconds(0);
}, function(n7) {
  return n7.setSeconds(0);
}, function(n7) {
  return n7.setMinutes(0);
}, function(n7) {
  return n7.setHours(0);
}, function(n7) {
  return n7.setDate(1);
}, function(n7) {
  return n7.setMonth(0);
}];
var K4 = { millisecond: [], second: J.slice(0, 1), minute: J.slice(0, 2), hour: J.slice(0, 3), day: J.slice(0, 4), month: J.slice(0, 5), year: J.slice(0, 6) };
var L = function(n7) {
  return function(t10) {
    return K4[n7].forEach(function(n8) {
      n8(t10);
    }), t10;
  };
};
var Q = function(n7) {
  var t10 = n7.format, r7 = void 0 === t10 ? "native" : t10, e11 = n7.precision, a6 = void 0 === e11 ? "millisecond" : e11, u3 = n7.useUTC, c11 = void 0 === u3 || u3, s5 = L(a6);
  return function(n8) {
    if (void 0 === n8)
      return n8;
    if ("native" === r7 || n8 instanceof Date)
      return s5(n8);
    var t11 = c11 ? utcParse(r7) : timeParse(r7);
    return s5(t11(n8));
  };
};
var W2 = function(n7, t10, r7, e11) {
  var a6, i6, o5, c11, s5 = n7.min, d3 = void 0 === s5 ? 0 : s5, f4 = n7.max, l4 = void 0 === f4 ? "auto" : f4, m4 = n7.stacked, v6 = void 0 !== m4 && m4, y4 = n7.reverse, p5 = void 0 !== y4 && y4, h3 = n7.clamp, g5 = void 0 !== h3 && h3, x6 = n7.nice, k6 = void 0 !== x6 && x6;
  "auto" === d3 ? a6 = true === v6 ? null != (i6 = t10.minStacked) ? i6 : 0 : t10.min : a6 = d3;
  "auto" === l4 ? o5 = true === v6 ? null != (c11 = t10.maxStacked) ? c11 : 0 : t10.max : o5 = l4;
  var T4 = linear3().rangeRound("x" === e11 ? [0, r7] : [r7, 0]).domain(p5 ? [o5, a6] : [a6, o5]).clamp(g5);
  return true === k6 ? T4.nice() : "number" == typeof k6 && T4.nice(k6), X(T4, v6);
};
var X = function(n7, t10) {
  void 0 === t10 && (t10 = false);
  var r7 = n7;
  return r7.type = "linear", r7.stacked = t10, r7;
};
var Y = function(n7, t10, r7) {
  var e11 = point().range([0, r7]).domain(t10.all);
  return e11.type = "point", e11;
};
var _ = function(n7, t10, r7, e11) {
  var a6 = n7.round, i6 = void 0 === a6 || a6, o5 = band().range("x" === e11 ? [0, r7] : [r7, 0]).domain(t10.all).round(i6);
  return nn(o5);
};
var nn = function(n7) {
  var t10 = n7;
  return t10.type = "band", t10;
};
var tn = function(n7, t10, r7) {
  var e11, a6, i6 = n7.format, o5 = void 0 === i6 ? "native" : i6, u3 = n7.precision, c11 = void 0 === u3 ? "millisecond" : u3, s5 = n7.min, l4 = void 0 === s5 ? "auto" : s5, m4 = n7.max, v6 = void 0 === m4 ? "auto" : m4, y4 = n7.useUTC, p5 = void 0 === y4 || y4, h3 = n7.nice, g5 = void 0 !== h3 && h3, x6 = Q({ format: o5, precision: c11, useUTC: p5 });
  e11 = "auto" === l4 ? x6(t10.min) : "native" !== o5 ? x6(l4) : l4, a6 = "auto" === v6 ? x6(t10.max) : "native" !== o5 ? x6(v6) : v6;
  var k6 = p5 ? utcTime() : time();
  k6.range([0, r7]), e11 && a6 && k6.domain([e11, a6]), true === g5 ? k6.nice() : "object" != typeof g5 && "number" != typeof g5 || k6.nice(g5);
  var T4 = k6;
  return T4.type = "time", T4.useUTC = p5, T4;
};
var rn = function(n7, t10, r7, e11) {
  var a6, i6 = n7.base, o5 = void 0 === i6 ? 10 : i6, u3 = n7.min, c11 = void 0 === u3 ? "auto" : u3, s5 = n7.max, d3 = void 0 === s5 ? "auto" : s5;
  if (t10.all.some(function(n8) {
    return 0 === n8;
  }))
    throw new Error("a log scale domain must not include or cross zero");
  var f4, m4, v6 = false;
  if (t10.all.filter(function(n8) {
    return null != n8;
  }).forEach(function(n8) {
    v6 || (void 0 === a6 ? a6 = Math.sign(n8) : Math.sign(n8) !== a6 && (v6 = true));
  }), v6)
    throw new Error("a log scale domain must be strictly-positive or strictly-negative");
  f4 = "auto" === c11 ? t10.min : c11, m4 = "auto" === d3 ? t10.max : d3;
  var y4 = log().domain([f4, m4]).rangeRound("x" === e11 ? [0, r7] : [r7, 0]).base(o5).nice();
  return y4.type = "log", y4;
};
var en = function(n7, t10, r7, e11) {
  var a6, i6, o5 = n7.constant, u3 = void 0 === o5 ? 1 : o5, c11 = n7.min, s5 = void 0 === c11 ? "auto" : c11, d3 = n7.max, f4 = void 0 === d3 ? "auto" : d3, l4 = n7.reverse, v6 = void 0 !== l4 && l4;
  a6 = "auto" === s5 ? t10.min : s5, i6 = "auto" === f4 ? t10.max : f4;
  var y4 = symlog().constant(u3).rangeRound("x" === e11 ? [0, r7] : [r7, 0]).nice();
  true === v6 ? y4.domain([i6, a6]) : y4.domain([a6, i6]);
  var p5 = y4;
  return p5.type = "symlog", p5;
};
var an = function(n7) {
  return "x" === n7 ? "y" : "x";
};
var on = function(n7, t10) {
  return n7 === t10;
};
var un = function(n7, t10) {
  return n7.getTime() === t10.getTime();
};
function cn(n7, t10, r7, e11) {
  switch (n7.type) {
    case "linear":
      return W2(n7, t10, r7, e11);
    case "point":
      return Y(n7, t10, r7);
    case "band":
      return _(n7, t10, r7, e11);
    case "time":
      return tn(n7, t10, r7);
    case "log":
      return rn(n7, t10, r7, e11);
    case "symlog":
      return en(n7, t10, r7, e11);
    default:
      throw new Error("invalid scale spec");
  }
}
var sn = function(n7, t10, r7) {
  var e11;
  if ("stacked" in r7 && r7.stacked) {
    var a6 = n7.data["x" === t10 ? "xStacked" : "yStacked"];
    return null == a6 ? null : r7(a6);
  }
  return null != (e11 = r7(n7.data[t10])) ? e11 : null;
};
var dn = function(n7, t10, r7, e11, a6) {
  var i6 = n7.map(function(n8) {
    return function(n9) {
      return $({}, n9, { data: n9.data.map(function(n10) {
        return { data: $({}, n10) };
      }) });
    }(n8);
  }), o5 = fn(i6, t10, r7);
  "stacked" in t10 && true === t10.stacked && vn(o5, i6), "stacked" in r7 && true === r7.stacked && yn(o5, i6);
  var u3 = cn(t10, o5.x, e11, "x"), c11 = cn(r7, o5.y, a6, "y"), s5 = i6.map(function(n8) {
    return $({}, n8, { data: n8.data.map(function(n9) {
      return $({}, n9, { position: { x: sn(n9, "x", u3), y: sn(n9, "y", c11) } });
    }) });
  });
  return $({}, o5, { series: s5, xScale: u3, yScale: c11 });
};
var fn = function(n7, t10, r7) {
  return { x: ln(n7, "x", t10), y: ln(n7, "y", r7) };
};
var ln = function(a6, i6, o5, u3) {
  var c11 = void 0 === u3 ? {} : u3, s5 = c11.getValue, d3 = void 0 === s5 ? function(n7) {
    return n7.data[i6];
  } : s5, f4 = c11.setValue, l4 = void 0 === f4 ? function(n7, t10) {
    n7.data[i6] = t10;
  } : f4;
  if ("linear" === o5.type)
    a6.forEach(function(n7) {
      n7.data.forEach(function(n8) {
        var t10 = d3(n8);
        t10 && l4(n8, parseFloat(String(t10)));
      });
    });
  else if ("time" === o5.type && "native" !== o5.format) {
    var m4 = Q(o5);
    a6.forEach(function(n7) {
      n7.data.forEach(function(n8) {
        var t10 = d3(n8);
        t10 && l4(n8, m4(t10));
      });
    });
  }
  var v6 = [];
  switch (a6.forEach(function(n7) {
    n7.data.forEach(function(n8) {
      v6.push(d3(n8));
    });
  }), o5.type) {
    case "linear":
      var y4 = (0, import_sortBy.default)((0, import_uniq.default)(v6).filter(function(n7) {
        return null !== n7;
      }), function(n7) {
        return n7;
      });
      return { all: y4, min: Math.min.apply(Math, y4), max: Math.max.apply(Math, y4) };
    case "time":
      var p5 = (0, import_uniqBy.default)(v6, function(n7) {
        return n7.getTime();
      }).slice(0).sort(function(n7, t10) {
        return t10.getTime() - n7.getTime();
      }).reverse();
      return { all: p5, min: p5[0], max: (0, import_last2.default)(p5) };
    default:
      var h3 = (0, import_uniq.default)(v6);
      return { all: h3, min: h3[0], max: (0, import_last2.default)(h3) };
  }
};
var mn = function(n7, t10, r7) {
  var i6 = an(n7), o5 = [];
  t10[i6].all.forEach(function(t11) {
    var u3 = (0, import_isDate.default)(t11) ? un : on, c11 = [];
    r7.forEach(function(r8) {
      var a6 = r8.data.find(function(n8) {
        return u3(n8.data[i6], t11);
      }), s5 = null, d3 = null;
      if (void 0 !== a6) {
        if (null !== (s5 = a6.data[n7])) {
          var f4 = (0, import_last2.default)(c11);
          void 0 === f4 ? d3 = s5 : null !== f4 && (d3 = f4 + s5);
        }
        a6.data["x" === n7 ? "xStacked" : "yStacked"] = d3;
      }
      c11.push(d3), null !== d3 && o5.push(d3);
    });
  }), t10[n7].minStacked = Math.min.apply(Math, o5), t10[n7].maxStacked = Math.max.apply(Math, o5);
};
var vn = function(n7, t10) {
  return mn("x", n7, t10);
};
var yn = function(n7, t10) {
  return mn("y", n7, t10);
};
var pn = function(n7) {
  var t10 = n7.bandwidth();
  if (0 === t10)
    return n7;
  var r7 = t10 / 2;
  return n7.round() && (r7 = Math.round(r7)), function(t11) {
    var e11;
    return (null != (e11 = n7(t11)) ? e11 : 0) + r7;
  };
};
var hn = { millisecond: [millisecond_default2, millisecond_default2], second: [second_default2, second_default2], minute: [minute_default2, utcMinute_default2], hour: [hour_default2, utcHour_default2], day: [newInterval2(function(n7) {
  return n7.setHours(0, 0, 0, 0);
}, function(n7, t10) {
  return n7.setDate(n7.getDate() + t10);
}, function(n7, t10) {
  return (t10.getTime() - n7.getTime()) / 864e5;
}, function(n7) {
  return Math.floor(n7.getTime() / 864e5);
}), newInterval2(function(n7) {
  return n7.setUTCHours(0, 0, 0, 0);
}, function(n7, t10) {
  return n7.setUTCDate(n7.getUTCDate() + t10);
}, function(n7, t10) {
  return (t10.getTime() - n7.getTime()) / 864e5;
}, function(n7) {
  return Math.floor(n7.getTime() / 864e5);
})], week: [sunday2, utcSunday2], sunday: [sunday2, utcSunday2], monday: [monday2, utcMonday2], tuesday: [tuesday2, utcTuesday2], wednesday: [wednesday2, utcWednesday2], thursday: [thursday2, utcThursday2], friday: [friday2, utcFriday2], saturday: [saturday2, utcSaturday2], month: [month_default2, utcMonth_default2], year: [year_default2, utcYear_default2] };
var gn = Object.keys(hn);
var xn = new RegExp("^every\\s*(\\d+)?\\s*(" + gn.join("|") + ")s?$", "i");
var kn = function(n7, t10) {
  if (Array.isArray(t10))
    return t10;
  if ("string" == typeof t10 && "useUTC" in n7) {
    var r7 = t10.match(xn);
    if (r7) {
      var e11 = r7[1], a6 = r7[2], i6 = hn[a6][n7.useUTC ? 1 : 0];
      if ("day" === a6) {
        var o5, u3, c11 = n7.domain(), s5 = c11[0], d3 = c11[1], f4 = new Date(d3);
        return f4.setDate(f4.getDate() + 1), null != (o5 = null == (u3 = i6.every(Number(null != e11 ? e11 : 1))) ? void 0 : u3.range(s5, f4)) ? o5 : [];
      }
      if (void 0 === e11)
        return n7.ticks(i6);
      var l4 = i6.every(Number(e11));
      if (l4)
        return n7.ticks(l4);
    }
    throw new Error("Invalid tickValues: " + t10);
  }
  if ("ticks" in n7) {
    if (void 0 === t10)
      return n7.ticks();
    if ("number" == typeof (m4 = t10) && isFinite(m4) && Math.floor(m4) === m4)
      return n7.ticks(t10);
  }
  var m4;
  return n7.domain();
};

// node_modules/@nivo/axes/dist/nivo-axes.es.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_prop_types3 = __toESM(require_prop_types());
function p2() {
  return p2 = Object.assign ? Object.assign.bind() : function(t10) {
    for (var e11 = 1; e11 < arguments.length; e11++) {
      var i6 = arguments[e11];
      for (var n7 in i6)
        Object.prototype.hasOwnProperty.call(i6, n7) && (t10[n7] = i6[n7]);
    }
    return t10;
  }, p2.apply(this, arguments);
}
var b2 = function(t10) {
  var e11, i6 = t10.axis, n7 = t10.scale, r7 = t10.ticksPosition, a6 = t10.tickValues, l4 = t10.tickSize, s5 = t10.tickPadding, c11 = t10.tickRotation, f4 = t10.truncateTickAt, u3 = t10.engine, d3 = void 0 === u3 ? "svg" : u3, x6 = kn(n7, a6), h3 = fi[d3], g5 = "bandwidth" in n7 ? pn(n7) : n7, k6 = { lineX: 0, lineY: 0 }, v6 = { textX: 0, textY: 0 }, b5 = "object" == typeof document && "rtl" === document.dir, T4 = h3.align.center, P4 = h3.baseline.center;
  "x" === i6 ? (e11 = function(t11) {
    var e12;
    return { x: null != (e12 = g5(t11)) ? e12 : 0, y: 0 };
  }, k6.lineY = l4 * ("after" === r7 ? 1 : -1), v6.textY = (l4 + s5) * ("after" === r7 ? 1 : -1), P4 = "after" === r7 ? h3.baseline.top : h3.baseline.bottom, 0 === c11 ? T4 = h3.align.center : "after" === r7 && c11 < 0 || "before" === r7 && c11 > 0 ? (T4 = h3.align[b5 ? "left" : "right"], P4 = h3.baseline.center) : ("after" === r7 && c11 > 0 || "before" === r7 && c11 < 0) && (T4 = h3.align[b5 ? "right" : "left"], P4 = h3.baseline.center)) : (e11 = function(t11) {
    var e12;
    return { x: 0, y: null != (e12 = g5(t11)) ? e12 : 0 };
  }, k6.lineX = l4 * ("after" === r7 ? 1 : -1), v6.textX = (l4 + s5) * ("after" === r7 ? 1 : -1), T4 = "after" === r7 ? h3.align.left : h3.align.right);
  return { ticks: x6.map(function(t11) {
    var i7 = "string" == typeof t11 ? function(t16) {
      var e12 = String(t16).length;
      return f4 && f4 > 0 && e12 > f4 ? "" + String(t16).slice(0, f4).concat("...") : "" + t16;
    }(t11) : t11;
    return p2({ key: t11 instanceof Date ? "" + t11.valueOf() : "" + t11, value: i7 }, e11(t11), k6, v6);
  }), textAlign: T4, textBaseline: P4 };
};
var T2 = function(t10, e11) {
  if (void 0 === t10 || "function" == typeof t10)
    return t10;
  if ("time" === e11.type) {
    var i6 = timeFormat(t10);
    return function(t11) {
      return i6(t11 instanceof Date ? t11 : new Date(t11));
    };
  }
  return format2(t10);
};
var P2 = function(t10) {
  var e11, i6 = t10.width, n7 = t10.height, r7 = t10.scale, o5 = t10.axis, a6 = t10.values, l4 = (e11 = a6, Array.isArray(e11) ? a6 : void 0) || kn(r7, a6), s5 = "bandwidth" in r7 ? pn(r7) : r7, c11 = "x" === o5 ? l4.map(function(t11) {
    var e12, i7;
    return { key: t11 instanceof Date ? "" + t11.valueOf() : "" + t11, x1: null != (e12 = s5(t11)) ? e12 : 0, x2: null != (i7 = s5(t11)) ? i7 : 0, y1: 0, y2: n7 };
  }) : l4.map(function(t11) {
    var e12, n8;
    return { key: t11 instanceof Date ? "" + t11.valueOf() : "" + t11, x1: 0, x2: i6, y1: null != (e12 = s5(t11)) ? e12 : 0, y2: null != (n8 = s5(t11)) ? n8 : 0 };
  });
  return c11;
};
var S = (0, import_react18.memo)(function(t10) {
  var e11, n7 = t10.value, r7 = t10.format, o5 = t10.lineX, l4 = t10.lineY, s5 = t10.onClick, f4 = t10.textBaseline, u3 = t10.textAnchor, d3 = t10.animatedProps, x6 = Et(), m4 = x6.axis.ticks.line, y4 = x6.axis.ticks.text, k6 = null != (e11 = null == r7 ? void 0 : r7(n7)) ? e11 : n7, v6 = (0, import_react18.useMemo)(function() {
    var t11 = { opacity: d3.opacity };
    return s5 ? { style: p2({}, t11, { cursor: "pointer" }), onClick: function(t16) {
      return s5(t16, k6);
    } } : { style: t11 };
  }, [d3.opacity, s5, k6]);
  return (0, import_jsx_runtime3.jsxs)(animated.g, p2({ transform: d3.transform }, v6, { children: [(0, import_jsx_runtime3.jsx)("line", { x1: 0, x2: o5, y1: 0, y2: l4, style: m4 }), y4.outlineWidth > 0 && (0, import_jsx_runtime3.jsx)(animated.text, { dominantBaseline: f4, textAnchor: u3, transform: d3.textTransform, style: y4, strokeWidth: 2 * y4.outlineWidth, stroke: y4.outlineColor, strokeLinejoin: "round", children: "" + k6 }), (0, import_jsx_runtime3.jsx)(animated.text, { dominantBaseline: f4, textAnchor: u3, transform: d3.textTransform, style: y4, children: "" + k6 })] }));
});
var A5 = function(e11) {
  var r7 = e11.axis, o5 = e11.scale, s5 = e11.x, d3 = void 0 === s5 ? 0 : s5, x6 = e11.y, m4 = void 0 === x6 ? 0 : x6, y4 = e11.length, v6 = e11.ticksPosition, P4 = e11.tickValues, A6 = e11.tickSize, W4 = void 0 === A6 ? 5 : A6, O5 = e11.tickPadding, w4 = void 0 === O5 ? 5 : O5, B6 = e11.tickRotation, X4 = void 0 === B6 ? 0 : B6, Y4 = e11.format, C8 = e11.renderTick, z4 = void 0 === C8 ? S : C8, V3 = e11.truncateTickAt, j4 = e11.legend, D5 = e11.legendPosition, R = void 0 === D5 ? "end" : D5, E5 = e11.legendOffset, L2 = void 0 === E5 ? 0 : E5, q = e11.onClick, F2 = e11.ariaHidden, H2 = Et(), N3 = H2.axis.legend.text, I = (0, import_react18.useMemo)(function() {
    return T2(Y4, o5);
  }, [Y4, o5]), J2 = b2({ axis: r7, scale: o5, ticksPosition: v6, tickValues: P4, tickSize: W4, tickPadding: w4, tickRotation: X4, truncateTickAt: V3 }), G = J2.ticks, K6 = J2.textAlign, M2 = J2.textBaseline, Q3 = null;
  if (void 0 !== j4) {
    var U, Z = 0, $2 = 0, _2 = 0;
    "y" === r7 ? (_2 = -90, Z = L2, "start" === R ? (U = "start", $2 = y4) : "middle" === R ? (U = "middle", $2 = y4 / 2) : "end" === R && (U = "end")) : ($2 = L2, "start" === R ? U = "start" : "middle" === R ? (U = "middle", Z = y4 / 2) : "end" === R && (U = "end", Z = y4)), Q3 = (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [N3.outlineWidth > 0 && (0, import_jsx_runtime3.jsx)("text", { transform: "translate(" + Z + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U, style: p2({ dominantBaseline: "central" }, N3), strokeWidth: 2 * N3.outlineWidth, stroke: N3.outlineColor, strokeLinejoin: "round", children: j4 }), (0, import_jsx_runtime3.jsx)("text", { transform: "translate(" + Z + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U, style: p2({ dominantBaseline: "central" }, N3), children: j4 })] });
  }
  var tt = Zr(), et2 = tt.animate, it2 = tt.config, nt = useSpring({ transform: "translate(" + d3 + "," + m4 + ")", lineX2: "x" === r7 ? y4 : 0, lineY2: "x" === r7 ? 0 : y4, config: it2, immediate: !et2 }), rt2 = (0, import_react18.useCallback)(function(t10) {
    return { opacity: 1, transform: "translate(" + t10.x + "," + t10.y + ")", textTransform: "translate(" + t10.textX + "," + t10.textY + ") rotate(" + X4 + ")" };
  }, [X4]), ot = (0, import_react18.useCallback)(function(t10) {
    return { opacity: 0, transform: "translate(" + t10.x + "," + t10.y + ")", textTransform: "translate(" + t10.textX + "," + t10.textY + ") rotate(" + X4 + ")" };
  }, [X4]), at = useTransition(G, { keys: function(t10) {
    return t10.key;
  }, initial: rt2, from: ot, enter: rt2, update: rt2, leave: { opacity: 0 }, config: it2, immediate: !et2 });
  return (0, import_jsx_runtime3.jsxs)(animated.g, { transform: nt.transform, "aria-hidden": F2, children: [at(function(e12, i6, n7, r8) {
    return t6.createElement(z4, p2({ tickIndex: r8, format: I, rotate: X4, textBaseline: M2, textAnchor: K6, truncateTickAt: V3, animatedProps: e12 }, i6, q ? { onClick: q } : {}));
  }), (0, import_jsx_runtime3.jsx)(animated.line, { style: H2.axis.domain.line, x1: 0, x2: nt.lineX2, y1: 0, y2: nt.lineY2 }), Q3] });
};
var W3 = (0, import_react18.memo)(A5);
var O3 = { ticksPosition: import_prop_types3.default.oneOf(["before", "after"]), tickValues: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.instanceOf(Date)])), import_prop_types3.default.string]), rotateOnTickLength: import_prop_types3.default.shape({ angle: import_prop_types3.default.number, length: import_prop_types3.default.number }), tickSize: import_prop_types3.default.number, tickPadding: import_prop_types3.default.number, tickRotation: import_prop_types3.default.number, format: import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.string]), renderTick: import_prop_types3.default.func, legend: import_prop_types3.default.node, legendPosition: import_prop_types3.default.oneOf(["start", "middle", "end"]), legendOffset: import_prop_types3.default.number, ariaHidden: import_prop_types3.default.bool };
var w2 = import_prop_types3.default.shape(O3);
var B4 = ["top", "right", "bottom", "left"];
var X2 = (0, import_react18.memo)(function(t10) {
  var e11 = t10.xScale, i6 = t10.yScale, n7 = t10.width, r7 = t10.height, o5 = { top: t10.top, right: t10.right, bottom: t10.bottom, left: t10.left };
  return (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: B4.map(function(t11) {
    var a6 = o5[t11];
    if (!a6)
      return null;
    var l4 = "top" === t11 || "bottom" === t11;
    return (0, import_jsx_runtime3.jsx)(W3, p2({}, a6, { axis: l4 ? "x" : "y", x: "right" === t11 ? n7 : 0, y: "bottom" === t11 ? r7 : 0, scale: l4 ? e11 : i6, length: l4 ? n7 : r7, ticksPosition: "top" === t11 || "left" === t11 ? "before" : "after", truncateTickAt: a6.truncateTickAt }), t11);
  }) });
});
var Y2 = (0, import_react18.memo)(function(t10) {
  var e11 = t10.animatedProps, i6 = Et();
  return (0, import_jsx_runtime3.jsx)(animated.line, p2({}, e11, i6.grid.line));
});
var C6 = (0, import_react18.memo)(function(t10) {
  var e11 = t10.lines, i6 = Zr(), n7 = i6.animate, o5 = i6.config, a6 = useTransition(e11, { keys: function(t11) {
    return t11.key;
  }, initial: function(t11) {
    return { opacity: 1, x1: t11.x1, x2: t11.x2, y1: t11.y1, y2: t11.y2 };
  }, from: function(t11) {
    return { opacity: 0, x1: t11.x1, x2: t11.x2, y1: t11.y1, y2: t11.y2 };
  }, enter: function(t11) {
    return { opacity: 1, x1: t11.x1, x2: t11.x2, y1: t11.y1, y2: t11.y2 };
  }, update: function(t11) {
    return { opacity: 1, x1: t11.x1, x2: t11.x2, y1: t11.y1, y2: t11.y2 };
  }, leave: { opacity: 0 }, config: o5, immediate: !n7 });
  return (0, import_jsx_runtime3.jsx)("g", { children: a6(function(t11, e12) {
    return (0, import_react18.createElement)(Y2, p2({}, e12, { key: e12.key, animatedProps: t11 }));
  }) });
});
var z3 = (0, import_react18.memo)(function(t10) {
  var e11 = t10.width, n7 = t10.height, r7 = t10.xScale, o5 = t10.yScale, a6 = t10.xValues, l4 = t10.yValues, s5 = (0, import_react18.useMemo)(function() {
    return !!r7 && P2({ width: e11, height: n7, scale: r7, axis: "x", values: a6 });
  }, [r7, a6, e11, n7]), c11 = (0, import_react18.useMemo)(function() {
    return !!o5 && P2({ width: e11, height: n7, scale: o5, axis: "y", values: l4 });
  }, [n7, e11, o5, l4]);
  return (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [s5 && (0, import_jsx_runtime3.jsx)(C6, { lines: s5 }), c11 && (0, import_jsx_runtime3.jsx)(C6, { lines: c11 })] });
});
var V2 = function(t10, e11) {
  var i6, n7 = e11.axis, r7 = e11.scale, o5 = e11.x, a6 = void 0 === o5 ? 0 : o5, l4 = e11.y, c11 = void 0 === l4 ? 0 : l4, f4 = e11.length, u3 = e11.ticksPosition, d3 = e11.tickValues, x6 = e11.tickSize, m4 = void 0 === x6 ? 5 : x6, y4 = e11.tickPadding, h3 = void 0 === y4 ? 5 : y4, g5 = e11.tickRotation, k6 = void 0 === g5 ? 0 : g5, v6 = e11.format, p5 = e11.legend, T4 = e11.legendPosition, P4 = void 0 === T4 ? "end" : T4, S3 = e11.legendOffset, A6 = void 0 === S3 ? 0 : S3, W4 = e11.theme, O5 = b2({ axis: n7, scale: r7, ticksPosition: u3, tickValues: d3, tickSize: m4, tickPadding: h3, tickRotation: k6, engine: "canvas" }), w4 = O5.ticks, B6 = O5.textAlign, X4 = O5.textBaseline;
  t10.save(), t10.translate(a6, c11), t10.textAlign = B6, t10.textBaseline = X4;
  var Y4 = W4.axis.ticks.text;
  t10.font = (Y4.fontWeight ? Y4.fontWeight + " " : "") + Y4.fontSize + "px " + Y4.fontFamily, (null != (i6 = W4.axis.domain.line.strokeWidth) ? i6 : 0) > 0 && (t10.lineWidth = Number(W4.axis.domain.line.strokeWidth), t10.lineCap = "square", W4.axis.domain.line.stroke && (t10.strokeStyle = W4.axis.domain.line.stroke), t10.beginPath(), t10.moveTo(0, 0), t10.lineTo("x" === n7 ? f4 : 0, "x" === n7 ? 0 : f4), t10.stroke());
  var C8 = "function" == typeof v6 ? v6 : function(t11) {
    return "" + t11;
  };
  if (w4.forEach(function(e12) {
    var i7;
    (null != (i7 = W4.axis.ticks.line.strokeWidth) ? i7 : 0) > 0 && (t10.lineWidth = Number(W4.axis.ticks.line.strokeWidth), t10.lineCap = "square", W4.axis.ticks.line.stroke && (t10.strokeStyle = W4.axis.ticks.line.stroke), t10.beginPath(), t10.moveTo(e12.x, e12.y), t10.lineTo(e12.x + e12.lineX, e12.y + e12.lineY), t10.stroke());
    var n8 = C8(e12.value);
    t10.save(), t10.translate(e12.x + e12.textX, e12.y + e12.textY), t10.rotate(ni(k6)), Y4.outlineWidth > 0 && (t10.strokeStyle = Y4.outlineColor, t10.lineWidth = 2 * Y4.outlineWidth, t10.lineJoin = "round", t10.strokeText("" + n8, 0, 0)), W4.axis.ticks.text.fill && (t10.fillStyle = Y4.fill), t10.fillText("" + n8, 0, 0), t10.restore();
  }), void 0 !== p5) {
    var z4 = 0, V3 = 0, j4 = 0, D5 = "center";
    "y" === n7 ? (j4 = -90, z4 = A6, "start" === P4 ? (D5 = "start", V3 = f4) : "middle" === P4 ? (D5 = "center", V3 = f4 / 2) : "end" === P4 && (D5 = "end")) : (V3 = A6, "start" === P4 ? D5 = "start" : "middle" === P4 ? (D5 = "center", z4 = f4 / 2) : "end" === P4 && (D5 = "end", z4 = f4)), t10.translate(z4, V3), t10.rotate(ni(j4)), t10.font = (W4.axis.legend.text.fontWeight ? W4.axis.legend.text.fontWeight + " " : "") + W4.axis.legend.text.fontSize + "px " + W4.axis.legend.text.fontFamily, W4.axis.legend.text.fill && (t10.fillStyle = W4.axis.legend.text.fill), t10.textAlign = D5, t10.textBaseline = "middle", t10.fillText(p5, 0, 0);
  }
  t10.restore();
};
var j2 = function(t10, e11) {
  var i6 = e11.xScale, n7 = e11.yScale, r7 = e11.width, o5 = e11.height, a6 = e11.top, l4 = e11.right, s5 = e11.bottom, c11 = e11.left, f4 = e11.theme, u3 = { top: a6, right: l4, bottom: s5, left: c11 };
  B4.forEach(function(e12) {
    var a7 = u3[e12];
    if (!a7)
      return null;
    var l5 = "top" === e12 || "bottom" === e12, s6 = "top" === e12 || "left" === e12 ? "before" : "after", c12 = l5 ? i6 : n7, d3 = T2(a7.format, c12);
    V2(t10, p2({}, a7, { axis: l5 ? "x" : "y", x: "right" === e12 ? r7 : 0, y: "bottom" === e12 ? o5 : 0, scale: c12, format: d3, length: l5 ? r7 : o5, ticksPosition: s6, theme: f4 }));
  });
};
var D4 = function(t10, e11) {
  var i6 = e11.width, n7 = e11.height, r7 = e11.scale, o5 = e11.axis, a6 = e11.values;
  P2({ width: i6, height: n7, scale: r7, axis: o5, values: a6 }).forEach(function(e12) {
    t10.beginPath(), t10.moveTo(e12.x1, e12.y1), t10.lineTo(e12.x2, e12.y2), t10.stroke();
  });
};

// node_modules/@nivo/legends/dist/nivo-legends.es.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var a4 = __toESM(require_react());
var import_react19 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
var m3 = function(e11) {
  var i6 = e11.x, n7 = e11.y, o5 = e11.size, r7 = e11.fill, l4 = e11.opacity, a6 = void 0 === l4 ? 1 : l4, c11 = e11.borderWidth, s5 = void 0 === c11 ? 0 : c11, d3 = e11.borderColor;
  return (0, import_jsx_runtime4.jsx)("circle", { r: o5 / 2, cx: i6 + o5 / 2, cy: n7 + o5 / 2, fill: r7, opacity: a6, strokeWidth: s5, stroke: void 0 === d3 ? "transparent" : d3, style: { pointerEvents: "none" } });
};
var f2 = function(e11) {
  var i6 = e11.x, n7 = e11.y, o5 = e11.size, r7 = e11.fill, l4 = e11.opacity, a6 = void 0 === l4 ? 1 : l4, c11 = e11.borderWidth, s5 = void 0 === c11 ? 0 : c11, d3 = e11.borderColor;
  return (0, import_jsx_runtime4.jsx)("g", { transform: "translate(" + i6 + "," + n7 + ")", children: (0, import_jsx_runtime4.jsx)("path", { d: "\n                    M" + o5 / 2 + " 0\n                    L" + 0.8 * o5 + " " + o5 / 2 + "\n                    L" + o5 / 2 + " " + o5 + "\n                    L" + 0.2 * o5 + " " + o5 / 2 + "\n                    L" + o5 / 2 + " 0\n                ", fill: r7, opacity: a6, strokeWidth: s5, stroke: void 0 === d3 ? "transparent" : d3, style: { pointerEvents: "none" } }) });
};
var u2 = function(e11) {
  var i6 = e11.x, n7 = e11.y, o5 = e11.size, r7 = e11.fill, l4 = e11.opacity, a6 = void 0 === l4 ? 1 : l4, c11 = e11.borderWidth, s5 = void 0 === c11 ? 0 : c11, d3 = e11.borderColor;
  return (0, import_jsx_runtime4.jsx)("rect", { x: i6, y: n7, fill: r7, opacity: a6, strokeWidth: s5, stroke: void 0 === d3 ? "transparent" : d3, width: o5, height: o5, style: { pointerEvents: "none" } });
};
var v4 = function(e11) {
  var i6 = e11.x, n7 = e11.y, o5 = e11.size, r7 = e11.fill, l4 = e11.opacity, a6 = void 0 === l4 ? 1 : l4, c11 = e11.borderWidth, s5 = void 0 === c11 ? 0 : c11, d3 = e11.borderColor;
  return (0, import_jsx_runtime4.jsx)("g", { transform: "translate(" + i6 + "," + n7 + ")", children: (0, import_jsx_runtime4.jsx)("path", { d: "\n                M" + o5 / 2 + " 0\n                L" + o5 + " " + o5 + "\n                L0 " + o5 + "\n                L" + o5 / 2 + " 0\n            ", fill: r7, opacity: a6, strokeWidth: s5, stroke: void 0 === d3 ? "transparent" : d3, style: { pointerEvents: "none" } }) });
};
function p3() {
  return p3 = Object.assign ? Object.assign.bind() : function(t10) {
    for (var e11 = 1; e11 < arguments.length; e11++) {
      var i6 = arguments[e11];
      for (var n7 in i6)
        Object.prototype.hasOwnProperty.call(i6, n7) && (t10[n7] = i6[n7]);
    }
    return t10;
  }, p3.apply(this, arguments);
}
var b3 = { top: 0, right: 0, bottom: 0, left: 0 };
var k4 = function(t10) {
  var e11, i6 = t10.direction, n7 = t10.itemsSpacing, o5 = t10.padding, r7 = t10.itemCount, l4 = t10.itemWidth, a6 = t10.itemHeight;
  if ("number" != typeof o5 && ("object" != typeof (e11 = o5) || Array.isArray(e11) || null === e11))
    throw new Error("Invalid property padding, must be one of: number, object");
  var c11 = "number" == typeof o5 ? { top: o5, right: o5, bottom: o5, left: o5 } : p3({}, b3, o5), s5 = c11.left + c11.right, d3 = c11.top + c11.bottom, h3 = l4 + s5, g5 = a6 + d3, m4 = (r7 - 1) * n7;
  return "row" === i6 ? h3 = l4 * r7 + m4 + s5 : "column" === i6 && (g5 = a6 * r7 + m4 + d3), { width: h3, height: g5, padding: c11 };
};
var x4 = function(t10) {
  var e11 = t10.anchor, i6 = t10.translateX, n7 = t10.translateY, o5 = t10.containerWidth, r7 = t10.containerHeight, l4 = t10.width, a6 = t10.height, c11 = i6, s5 = n7;
  switch (e11) {
    case "top":
      c11 += (o5 - l4) / 2;
      break;
    case "top-right":
      c11 += o5 - l4;
      break;
    case "right":
      c11 += o5 - l4, s5 += (r7 - a6) / 2;
      break;
    case "bottom-right":
      c11 += o5 - l4, s5 += r7 - a6;
      break;
    case "bottom":
      c11 += (o5 - l4) / 2, s5 += r7 - a6;
      break;
    case "bottom-left":
      s5 += r7 - a6;
      break;
    case "left":
      s5 += (r7 - a6) / 2;
      break;
    case "center":
      c11 += (o5 - l4) / 2, s5 += (r7 - a6) / 2;
  }
  return { x: c11, y: s5 };
};
var S2 = function(t10) {
  var e11, i6, n7, o5, r7, l4, a6 = t10.direction, c11 = t10.justify, s5 = t10.symbolSize, d3 = t10.symbolSpacing, h3 = t10.width, g5 = t10.height;
  switch (a6) {
    case "left-to-right":
      e11 = 0, i6 = (g5 - s5) / 2, o5 = g5 / 2, l4 = "central", c11 ? (n7 = h3, r7 = "end") : (n7 = s5 + d3, r7 = "start");
      break;
    case "right-to-left":
      e11 = h3 - s5, i6 = (g5 - s5) / 2, o5 = g5 / 2, l4 = "central", c11 ? (n7 = 0, r7 = "start") : (n7 = h3 - s5 - d3, r7 = "end");
      break;
    case "top-to-bottom":
      e11 = (h3 - s5) / 2, i6 = 0, n7 = h3 / 2, r7 = "middle", c11 ? (o5 = g5, l4 = "alphabetic") : (o5 = s5 + d3, l4 = "text-before-edge");
      break;
    case "bottom-to-top":
      e11 = (h3 - s5) / 2, i6 = g5 - s5, n7 = h3 / 2, r7 = "middle", c11 ? (o5 = 0, l4 = "text-before-edge") : (o5 = g5 - s5 - d3, l4 = "alphabetic");
  }
  return { symbolX: e11, symbolY: i6, labelX: n7, labelY: o5, labelAnchor: r7, labelAlignment: l4 };
};
var C7 = { circle: m3, diamond: f2, square: u2, triangle: v4 };
var B5 = function(i6) {
  var n7, r7, l4, c11, h3, g5, m4, f4, u3, v6, y4, b5 = i6.x, k6 = i6.y, x6 = i6.width, A6 = i6.height, W4 = i6.data, O5 = i6.direction, z4 = void 0 === O5 ? "left-to-right" : O5, B6 = i6.justify, w4 = void 0 !== B6 && B6, X4 = i6.textColor, Y4 = i6.background, H2 = void 0 === Y4 ? "transparent" : Y4, E5 = i6.opacity, j4 = void 0 === E5 ? 1 : E5, T4 = i6.symbolShape, L2 = void 0 === T4 ? "square" : T4, M2 = i6.symbolSize, F2 = void 0 === M2 ? 16 : M2, P4 = i6.symbolSpacing, R = void 0 === P4 ? 8 : P4, q = i6.symbolBorderWidth, V3 = void 0 === q ? 0 : q, D5 = i6.symbolBorderColor, G = void 0 === D5 ? "transparent" : D5, I = i6.onClick, N3 = i6.onMouseEnter, _2 = i6.onMouseLeave, J2 = i6.toggleSerie, K6 = i6.effects, Q3 = (0, import_react19.useState)({}), U = Q3[0], Z = Q3[1], $2 = Et(), tt = (0, import_react19.useCallback)(function(t10) {
    if (K6) {
      var e11 = K6.filter(function(t11) {
        return "hover" === t11.on;
      }).reduce(function(t11, e12) {
        return p3({}, t11, e12.style);
      }, {});
      Z(e11);
    }
    null == N3 || N3(W4, t10);
  }, [N3, W4, K6]), et2 = (0, import_react19.useCallback)(function(t10) {
    if (K6) {
      var e11 = K6.filter(function(t11) {
        return "hover" !== t11.on;
      }).reduce(function(t11, e12) {
        return p3({}, t11, e12.style);
      }, {});
      Z(e11);
    }
    null == _2 || _2(W4, t10);
  }, [_2, W4, K6]), it2 = S2({ direction: z4, justify: w4, symbolSize: null != (n7 = U.symbolSize) ? n7 : F2, symbolSpacing: R, width: x6, height: A6 }), nt = it2.symbolX, ot = it2.symbolY, rt2 = it2.labelX, lt = it2.labelY, at = it2.labelAnchor, ct2 = it2.labelAlignment, st = [I, N3, _2, J2].some(function(t10) {
    return void 0 !== t10;
  }), dt2 = "function" == typeof L2 ? L2 : C7[L2];
  return (0, import_jsx_runtime4.jsxs)("g", { transform: "translate(" + b5 + "," + k6 + ")", style: { opacity: null != (r7 = U.itemOpacity) ? r7 : j4 }, children: [(0, import_jsx_runtime4.jsx)("rect", { width: x6, height: A6, fill: null != (l4 = U.itemBackground) ? l4 : H2, style: { cursor: st ? "pointer" : "auto" }, onClick: function(t10) {
    null == I || I(W4, t10), null == J2 || J2(W4.id);
  }, onMouseEnter: tt, onMouseLeave: et2 }), a4.createElement(dt2, p3({ id: W4.id, x: nt, y: ot, size: null != (c11 = U.symbolSize) ? c11 : F2, fill: null != (h3 = null != (g5 = W4.fill) ? g5 : W4.color) ? h3 : "black", borderWidth: null != (m4 = U.symbolBorderWidth) ? m4 : V3, borderColor: null != (f4 = U.symbolBorderColor) ? f4 : G }, W4.hidden ? $2.legends.hidden.symbol : void 0)), (0, import_jsx_runtime4.jsx)("text", { textAnchor: at, style: p3({}, $2.legends.text, { fill: null != (u3 = null != (v6 = null != (y4 = U.itemTextColor) ? y4 : X4) ? v6 : $2.legends.text.fill) ? u3 : "black", dominantBaseline: ct2, pointerEvents: "none", userSelect: "none" }, W4.hidden ? $2.legends.hidden.text : void 0), x: rt2, y: lt, children: W4.label })] });
};
var w3 = function(e11) {
  var i6 = e11.data, n7 = e11.x, o5 = e11.y, r7 = e11.direction, l4 = e11.padding, a6 = void 0 === l4 ? 0 : l4, c11 = e11.justify, s5 = e11.effects, d3 = e11.itemWidth, h3 = e11.itemHeight, g5 = e11.itemDirection, m4 = void 0 === g5 ? "left-to-right" : g5, f4 = e11.itemsSpacing, u3 = void 0 === f4 ? 0 : f4, v6 = e11.itemTextColor, p5 = e11.itemBackground, y4 = void 0 === p5 ? "transparent" : p5, b5 = e11.itemOpacity, x6 = void 0 === b5 ? 1 : b5, S3 = e11.symbolShape, A6 = e11.symbolSize, W4 = e11.symbolSpacing, O5 = e11.symbolBorderWidth, z4 = e11.symbolBorderColor, C8 = e11.onClick, w4 = e11.onMouseEnter, X4 = e11.onMouseLeave, Y4 = e11.toggleSerie, H2 = k4({ itemCount: i6.length, itemWidth: d3, itemHeight: h3, itemsSpacing: u3, direction: r7, padding: a6 }).padding, E5 = "row" === r7 ? d3 + u3 : 0, j4 = "column" === r7 ? h3 + u3 : 0;
  return (0, import_jsx_runtime4.jsx)("g", { transform: "translate(" + n7 + "," + o5 + ")", children: i6.map(function(e12, i7) {
    return (0, import_jsx_runtime4.jsx)(B5, { data: e12, x: i7 * E5 + H2.left, y: i7 * j4 + H2.top, width: d3, height: h3, direction: m4, justify: c11, effects: s5, textColor: v6, background: y4, opacity: x6, symbolShape: S3, symbolSize: A6, symbolSpacing: W4, symbolBorderWidth: O5, symbolBorderColor: z4, onClick: C8, onMouseEnter: w4, onMouseLeave: X4, toggleSerie: Y4 }, i7);
  }) });
};
var X3 = function(e11) {
  var i6 = e11.data, n7 = e11.containerWidth, o5 = e11.containerHeight, r7 = e11.translateX, l4 = void 0 === r7 ? 0 : r7, a6 = e11.translateY, c11 = void 0 === a6 ? 0 : a6, s5 = e11.anchor, d3 = e11.direction, h3 = e11.padding, g5 = void 0 === h3 ? 0 : h3, m4 = e11.justify, f4 = e11.itemsSpacing, u3 = void 0 === f4 ? 0 : f4, v6 = e11.itemWidth, p5 = e11.itemHeight, y4 = e11.itemDirection, b5 = e11.itemTextColor, S3 = e11.itemBackground, A6 = e11.itemOpacity, W4 = e11.symbolShape, O5 = e11.symbolSize, z4 = e11.symbolSpacing, C8 = e11.symbolBorderWidth, B6 = e11.symbolBorderColor, X4 = e11.onClick, Y4 = e11.onMouseEnter, H2 = e11.onMouseLeave, E5 = e11.toggleSerie, j4 = e11.effects, T4 = k4({ itemCount: i6.length, itemsSpacing: u3, itemWidth: v6, itemHeight: p5, direction: d3, padding: g5 }), L2 = T4.width, M2 = T4.height, F2 = x4({ anchor: s5, translateX: l4, translateY: c11, containerWidth: n7, containerHeight: o5, width: L2, height: M2 }), P4 = F2.x, R = F2.y;
  return (0, import_jsx_runtime4.jsx)(w3, { data: i6, x: P4, y: R, direction: d3, padding: g5, justify: m4, effects: j4, itemsSpacing: u3, itemWidth: v6, itemHeight: p5, itemDirection: y4, itemTextColor: b5, itemBackground: S3, itemOpacity: A6, symbolShape: W4, symbolSize: O5, symbolSpacing: z4, symbolBorderWidth: C8, symbolBorderColor: B6, onClick: X4, onMouseEnter: Y4, onMouseLeave: H2, toggleSerie: "boolean" == typeof E5 ? void 0 : E5 });
};
var Y3 = { start: "left", middle: "center", end: "right" };
var H = function(t10, e11) {
  var i6 = e11.data, n7 = e11.containerWidth, o5 = e11.containerHeight, r7 = e11.translateX, l4 = void 0 === r7 ? 0 : r7, a6 = e11.translateY, c11 = void 0 === a6 ? 0 : a6, s5 = e11.anchor, d3 = e11.direction, h3 = e11.padding, g5 = void 0 === h3 ? 0 : h3, m4 = e11.justify, f4 = void 0 !== m4 && m4, u3 = e11.itemsSpacing, v6 = void 0 === u3 ? 0 : u3, p5 = e11.itemWidth, y4 = e11.itemHeight, b5 = e11.itemDirection, A6 = void 0 === b5 ? "left-to-right" : b5, W4 = e11.itemTextColor, O5 = e11.symbolSize, z4 = void 0 === O5 ? 16 : O5, C8 = e11.symbolSpacing, B6 = void 0 === C8 ? 8 : C8, w4 = e11.theme, X4 = k4({ itemCount: i6.length, itemWidth: p5, itemHeight: y4, itemsSpacing: v6, direction: d3, padding: g5 }), H2 = X4.width, E5 = X4.height, j4 = X4.padding, T4 = x4({ anchor: s5, translateX: l4, translateY: c11, containerWidth: n7, containerHeight: o5, width: H2, height: E5 }), L2 = T4.x, M2 = T4.y, F2 = "row" === d3 ? p5 + v6 : 0, P4 = "column" === d3 ? y4 + v6 : 0;
  t10.save(), t10.translate(L2, M2), t10.font = w4.legends.text.fontSize + "px " + (w4.legends.text.fontFamily || "sans-serif"), i6.forEach(function(e12, i7) {
    var n8, o6, r8 = i7 * F2 + j4.left, l5 = i7 * P4 + j4.top, a7 = S2({ direction: A6, justify: f4, symbolSize: z4, symbolSpacing: B6, width: p5, height: y4 }), c12 = a7.symbolX, s6 = a7.symbolY, d4 = a7.labelX, h4 = a7.labelY, g6 = a7.labelAnchor, m5 = a7.labelAlignment;
    t10.fillStyle = null != (n8 = e12.color) ? n8 : "black", t10.fillRect(r8 + c12, l5 + s6, z4, z4), t10.textAlign = Y3[g6], "central" === m5 && (t10.textBaseline = "middle"), t10.fillStyle = null != (o6 = null != W4 ? W4 : w4.legends.text.fill) ? o6 : "black", t10.fillText(String(e12.label), r8 + d4, l5 + h4);
  }), t10.restore();
};
var T3 = { data: import_prop_types4.default.arrayOf(import_prop_types4.default.object), anchor: import_prop_types4.default.oneOf(["top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", "center"]).isRequired, translateX: import_prop_types4.default.number, translateY: import_prop_types4.default.number, direction: import_prop_types4.default.oneOf(["row", "column"]).isRequired, itemsSpacing: import_prop_types4.default.number, itemWidth: import_prop_types4.default.number.isRequired, itemHeight: import_prop_types4.default.number.isRequired, itemDirection: import_prop_types4.default.oneOf(["left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"]), itemTextColor: import_prop_types4.default.string, itemBackground: import_prop_types4.default.string, itemOpacity: import_prop_types4.default.number, symbolShape: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["circle", "diamond", "square", "triangle"]), import_prop_types4.default.func]), symbolSize: import_prop_types4.default.number, symbolSpacing: import_prop_types4.default.number, symbolBorderWidth: import_prop_types4.default.number, symbolBorderColor: import_prop_types4.default.string, onClick: import_prop_types4.default.func, onMouseEnter: import_prop_types4.default.func, onMouseLeave: import_prop_types4.default.func, effects: import_prop_types4.default.arrayOf(import_prop_types4.default.shape({ on: import_prop_types4.default.oneOfType([import_prop_types4.default.oneOf(["hover"])]).isRequired, style: import_prop_types4.default.shape({ itemTextColor: import_prop_types4.default.string, itemBackground: import_prop_types4.default.string, itemOpacity: import_prop_types4.default.number, symbolSize: import_prop_types4.default.number, symbolBorderWidth: import_prop_types4.default.number, symbolBorderColor: import_prop_types4.default.string }).isRequired })) };

// node_modules/@nivo/line/dist/nivo-line.es.js
var import_prop_types5 = __toESM(require_prop_types());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());

// node_modules/@nivo/voronoi/dist/nivo-voronoi.es.js
var import_react20 = __toESM(require_react());

// node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);
var Delaunator = class _Delaunator {
  static from(points, getX = defaultGetX, getY = defaultGetY) {
    const n7 = points.length;
    const coords = new Float64Array(n7 * 2);
    for (let i6 = 0; i6 < n7; i6++) {
      const p5 = points[i6];
      coords[2 * i6] = getX(p5);
      coords[2 * i6 + 1] = getY(p5);
    }
    return new _Delaunator(coords);
  }
  constructor(coords) {
    const n7 = coords.length >> 1;
    if (n7 > 0 && typeof coords[0] !== "number")
      throw new Error("Expected coords to contain numbers.");
    this.coords = coords;
    const maxTriangles = Math.max(2 * n7 - 5, 0);
    this._triangles = new Uint32Array(maxTriangles * 3);
    this._halfedges = new Int32Array(maxTriangles * 3);
    this._hashSize = Math.ceil(Math.sqrt(n7));
    this._hullPrev = new Uint32Array(n7);
    this._hullNext = new Uint32Array(n7);
    this._hullTri = new Uint32Array(n7);
    this._hullHash = new Int32Array(this._hashSize).fill(-1);
    this._ids = new Uint32Array(n7);
    this._dists = new Float64Array(n7);
    this.update();
  }
  update() {
    const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
    const n7 = coords.length >> 1;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i6 = 0; i6 < n7; i6++) {
      const x6 = coords[2 * i6];
      const y4 = coords[2 * i6 + 1];
      if (x6 < minX)
        minX = x6;
      if (y4 < minY)
        minY = y4;
      if (x6 > maxX)
        maxX = x6;
      if (y4 > maxY)
        maxY = y4;
      this._ids[i6] = i6;
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    let minDist = Infinity;
    let i0, i1, i22;
    for (let i6 = 0; i6 < n7; i6++) {
      const d3 = dist(cx, cy, coords[2 * i6], coords[2 * i6 + 1]);
      if (d3 < minDist) {
        i0 = i6;
        minDist = d3;
      }
    }
    const i0x = coords[2 * i0];
    const i0y = coords[2 * i0 + 1];
    minDist = Infinity;
    for (let i6 = 0; i6 < n7; i6++) {
      if (i6 === i0)
        continue;
      const d3 = dist(i0x, i0y, coords[2 * i6], coords[2 * i6 + 1]);
      if (d3 < minDist && d3 > 0) {
        i1 = i6;
        minDist = d3;
      }
    }
    let i1x = coords[2 * i1];
    let i1y = coords[2 * i1 + 1];
    let minRadius = Infinity;
    for (let i6 = 0; i6 < n7; i6++) {
      if (i6 === i0 || i6 === i1)
        continue;
      const r7 = circumradius(i0x, i0y, i1x, i1y, coords[2 * i6], coords[2 * i6 + 1]);
      if (r7 < minRadius) {
        i22 = i6;
        minRadius = r7;
      }
    }
    let i2x = coords[2 * i22];
    let i2y = coords[2 * i22 + 1];
    if (minRadius === Infinity) {
      for (let i6 = 0; i6 < n7; i6++) {
        this._dists[i6] = coords[2 * i6] - coords[0] || coords[2 * i6 + 1] - coords[1];
      }
      quicksort(this._ids, this._dists, 0, n7 - 1);
      const hull = new Uint32Array(n7);
      let j4 = 0;
      for (let i6 = 0, d0 = -Infinity; i6 < n7; i6++) {
        const id = this._ids[i6];
        if (this._dists[id] > d0) {
          hull[j4++] = id;
          d0 = this._dists[id];
        }
      }
      this.hull = hull.subarray(0, j4);
      this.triangles = new Uint32Array(0);
      this.halfedges = new Uint32Array(0);
      return;
    }
    if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
      const i6 = i1;
      const x6 = i1x;
      const y4 = i1y;
      i1 = i22;
      i1x = i2x;
      i1y = i2y;
      i22 = i6;
      i2x = x6;
      i2y = y4;
    }
    const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
    this._cx = center.x;
    this._cy = center.y;
    for (let i6 = 0; i6 < n7; i6++) {
      this._dists[i6] = dist(coords[2 * i6], coords[2 * i6 + 1], center.x, center.y);
    }
    quicksort(this._ids, this._dists, 0, n7 - 1);
    this._hullStart = i0;
    let hullSize = 3;
    hullNext[i0] = hullPrev[i22] = i1;
    hullNext[i1] = hullPrev[i0] = i22;
    hullNext[i22] = hullPrev[i1] = i0;
    hullTri[i0] = 0;
    hullTri[i1] = 1;
    hullTri[i22] = 2;
    hullHash.fill(-1);
    hullHash[this._hashKey(i0x, i0y)] = i0;
    hullHash[this._hashKey(i1x, i1y)] = i1;
    hullHash[this._hashKey(i2x, i2y)] = i22;
    this.trianglesLen = 0;
    this._addTriangle(i0, i1, i22, -1, -1, -1);
    for (let k6 = 0, xp, yp; k6 < this._ids.length; k6++) {
      const i6 = this._ids[k6];
      const x6 = coords[2 * i6];
      const y4 = coords[2 * i6 + 1];
      if (k6 > 0 && Math.abs(x6 - xp) <= EPSILON && Math.abs(y4 - yp) <= EPSILON)
        continue;
      xp = x6;
      yp = y4;
      if (i6 === i0 || i6 === i1 || i6 === i22)
        continue;
      let start2 = 0;
      for (let j4 = 0, key = this._hashKey(x6, y4); j4 < this._hashSize; j4++) {
        start2 = hullHash[(key + j4) % this._hashSize];
        if (start2 !== -1 && start2 !== hullNext[start2])
          break;
      }
      start2 = hullPrev[start2];
      let e11 = start2, q;
      while (q = hullNext[e11], !orient(x6, y4, coords[2 * e11], coords[2 * e11 + 1], coords[2 * q], coords[2 * q + 1])) {
        e11 = q;
        if (e11 === start2) {
          e11 = -1;
          break;
        }
      }
      if (e11 === -1)
        continue;
      let t10 = this._addTriangle(e11, i6, hullNext[e11], -1, -1, hullTri[e11]);
      hullTri[i6] = this._legalize(t10 + 2);
      hullTri[e11] = t10;
      hullSize++;
      let n8 = hullNext[e11];
      while (q = hullNext[n8], orient(x6, y4, coords[2 * n8], coords[2 * n8 + 1], coords[2 * q], coords[2 * q + 1])) {
        t10 = this._addTriangle(n8, i6, q, hullTri[i6], -1, hullTri[n8]);
        hullTri[i6] = this._legalize(t10 + 2);
        hullNext[n8] = n8;
        hullSize--;
        n8 = q;
      }
      if (e11 === start2) {
        while (q = hullPrev[e11], orient(x6, y4, coords[2 * q], coords[2 * q + 1], coords[2 * e11], coords[2 * e11 + 1])) {
          t10 = this._addTriangle(q, i6, e11, -1, hullTri[e11], hullTri[q]);
          this._legalize(t10 + 2);
          hullTri[q] = t10;
          hullNext[e11] = e11;
          hullSize--;
          e11 = q;
        }
      }
      this._hullStart = hullPrev[i6] = e11;
      hullNext[e11] = hullPrev[n8] = i6;
      hullNext[i6] = n8;
      hullHash[this._hashKey(x6, y4)] = i6;
      hullHash[this._hashKey(coords[2 * e11], coords[2 * e11 + 1])] = e11;
    }
    this.hull = new Uint32Array(hullSize);
    for (let i6 = 0, e11 = this._hullStart; i6 < hullSize; i6++) {
      this.hull[i6] = e11;
      e11 = hullNext[e11];
    }
    this.triangles = this._triangles.subarray(0, this.trianglesLen);
    this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  _hashKey(x6, y4) {
    return Math.floor(pseudoAngle(x6 - this._cx, y4 - this._cy) * this._hashSize) % this._hashSize;
  }
  _legalize(a6) {
    const { _triangles: triangles, _halfedges: halfedges, coords } = this;
    let i6 = 0;
    let ar = 0;
    while (true) {
      const b5 = halfedges[a6];
      const a0 = a6 - a6 % 3;
      ar = a0 + (a6 + 2) % 3;
      if (b5 === -1) {
        if (i6 === 0)
          break;
        a6 = EDGE_STACK[--i6];
        continue;
      }
      const b0 = b5 - b5 % 3;
      const al = a0 + (a6 + 1) % 3;
      const bl = b0 + (b5 + 2) % 3;
      const p0 = triangles[ar];
      const pr2 = triangles[a6];
      const pl = triangles[al];
      const p1 = triangles[bl];
      const illegal = inCircle(
        coords[2 * p0],
        coords[2 * p0 + 1],
        coords[2 * pr2],
        coords[2 * pr2 + 1],
        coords[2 * pl],
        coords[2 * pl + 1],
        coords[2 * p1],
        coords[2 * p1 + 1]
      );
      if (illegal) {
        triangles[a6] = p1;
        triangles[b5] = p0;
        const hbl = halfedges[bl];
        if (hbl === -1) {
          let e11 = this._hullStart;
          do {
            if (this._hullTri[e11] === bl) {
              this._hullTri[e11] = a6;
              break;
            }
            e11 = this._hullPrev[e11];
          } while (e11 !== this._hullStart);
        }
        this._link(a6, hbl);
        this._link(b5, halfedges[ar]);
        this._link(ar, bl);
        const br = b0 + (b5 + 1) % 3;
        if (i6 < EDGE_STACK.length) {
          EDGE_STACK[i6++] = br;
        }
      } else {
        if (i6 === 0)
          break;
        a6 = EDGE_STACK[--i6];
      }
    }
    return ar;
  }
  _link(a6, b5) {
    this._halfedges[a6] = b5;
    if (b5 !== -1)
      this._halfedges[b5] = a6;
  }
  // add a new triangle given vertex indices and adjacent half-edge ids
  _addTriangle(i0, i1, i22, a6, b5, c11) {
    const t10 = this.trianglesLen;
    this._triangles[t10] = i0;
    this._triangles[t10 + 1] = i1;
    this._triangles[t10 + 2] = i22;
    this._link(t10, a6);
    this._link(t10 + 1, b5);
    this._link(t10 + 2, c11);
    this.trianglesLen += 3;
    return t10;
  }
};
function pseudoAngle(dx, dy) {
  const p5 = dx / (Math.abs(dx) + Math.abs(dy));
  return (dy > 0 ? 3 - p5 : 1 + p5) / 4;
}
function dist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
function orientIfSure(px, py, rx, ry, qx, qy) {
  const l4 = (ry - py) * (qx - px);
  const r7 = (rx - px) * (qy - py);
  return Math.abs(l4 - r7) >= 33306690738754716e-32 * Math.abs(l4 + r7) ? l4 - r7 : 0;
}
function orient(rx, ry, qx, qy, px, py) {
  const sign2 = orientIfSure(px, py, rx, ry, qx, qy) || orientIfSure(rx, ry, qx, qy, px, py) || orientIfSure(qx, qy, px, py, rx, ry);
  return sign2 < 0;
}
function inCircle(ax, ay, bx, by, cx, cy, px, py) {
  const dx = ax - px;
  const dy = ay - py;
  const ex = bx - px;
  const ey = by - py;
  const fx = cx - px;
  const fy = cy - py;
  const ap = dx * dx + dy * dy;
  const bp = ex * ex + ey * ey;
  const cp = fx * fx + fy * fy;
  return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
function circumradius(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d3 = 0.5 / (dx * ey - dy * ex);
  const x6 = (ey * bl - dy * cl) * d3;
  const y4 = (dx * cl - ex * bl) * d3;
  return x6 * x6 + y4 * y4;
}
function circumcenter(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d3 = 0.5 / (dx * ey - dy * ex);
  const x6 = ax + (ey * bl - dy * cl) * d3;
  const y4 = ay + (dx * cl - ex * bl) * d3;
  return { x: x6, y: y4 };
}
function quicksort(ids, dists, left, right) {
  if (right - left <= 20) {
    for (let i6 = left + 1; i6 <= right; i6++) {
      const temp = ids[i6];
      const tempDist = dists[temp];
      let j4 = i6 - 1;
      while (j4 >= left && dists[ids[j4]] > tempDist)
        ids[j4 + 1] = ids[j4--];
      ids[j4 + 1] = temp;
    }
  } else {
    const median = left + right >> 1;
    let i6 = left + 1;
    let j4 = right;
    swap(ids, median, i6);
    if (dists[ids[left]] > dists[ids[right]])
      swap(ids, left, right);
    if (dists[ids[i6]] > dists[ids[right]])
      swap(ids, i6, right);
    if (dists[ids[left]] > dists[ids[i6]])
      swap(ids, left, i6);
    const temp = ids[i6];
    const tempDist = dists[temp];
    while (true) {
      do
        i6++;
      while (dists[ids[i6]] < tempDist);
      do
        j4--;
      while (dists[ids[j4]] > tempDist);
      if (j4 < i6)
        break;
      swap(ids, i6, j4);
    }
    ids[left + 1] = ids[j4];
    ids[j4] = temp;
    if (right - i6 + 1 >= j4 - left) {
      quicksort(ids, dists, i6, right);
      quicksort(ids, dists, left, j4 - 1);
    } else {
      quicksort(ids, dists, left, j4 - 1);
      quicksort(ids, dists, i6, right);
    }
  }
}
function swap(arr, i6, j4) {
  const tmp = arr[i6];
  arr[i6] = arr[j4];
  arr[j4] = tmp;
}
function defaultGetX(p5) {
  return p5[0];
}
function defaultGetY(p5) {
  return p5[1];
}

// node_modules/d3-delaunay/src/path.js
var epsilon4 = 1e-6;
var Path2 = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
  }
  moveTo(x6, y4) {
    this._ += `M${this._x0 = this._x1 = +x6},${this._y0 = this._y1 = +y4}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x6, y4) {
    this._ += `L${this._x1 = +x6},${this._y1 = +y4}`;
  }
  arc(x6, y4, r7) {
    x6 = +x6, y4 = +y4, r7 = +r7;
    const x0 = x6 + r7;
    const y0 = y4;
    if (r7 < 0)
      throw new Error("negative radius");
    if (this._x1 === null)
      this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon4 || Math.abs(this._y1 - y0) > epsilon4)
      this._ += "L" + x0 + "," + y0;
    if (!r7)
      return;
    this._ += `A${r7},${r7},0,1,1,${x6 - r7},${y4}A${r7},${r7},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x6, y4, w4, h3) {
    this._ += `M${this._x0 = this._x1 = +x6},${this._y0 = this._y1 = +y4}h${+w4}v${+h3}h${-w4}Z`;
  }
  value() {
    return this._ || null;
  }
};

// node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
  constructor() {
    this._ = [];
  }
  moveTo(x6, y4) {
    this._.push([x6, y4]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x6, y4) {
    this._.push([x6, y4]);
  }
  value() {
    return this._.length ? this._ : null;
  }
};

// node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin)))
      throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const { delaunay: { points, hull, triangles }, vectors } = this;
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i6 = 0, j4 = 0, n7 = triangles.length, x6, y4; i6 < n7; i6 += 3, j4 += 2) {
      const t16 = triangles[i6] * 2;
      const t24 = triangles[i6 + 1] * 2;
      const t34 = triangles[i6 + 2] * 2;
      const x12 = points[t16];
      const y12 = points[t16 + 1];
      const x22 = points[t24];
      const y22 = points[t24 + 1];
      const x32 = points[t34];
      const y32 = points[t34 + 1];
      const dx = x22 - x12;
      const dy = y22 - y12;
      const ex = x32 - x12;
      const ey = y32 - y12;
      const bl = dx * dx + dy * dy;
      const cl = ex * ex + ey * ey;
      const ab = (dx * ey - dy * ex) * 2;
      if (!ab) {
        x6 = (x12 + x32) / 2 - 1e8 * ey;
        y4 = (y12 + y32) / 2 + 1e8 * ex;
      } else if (Math.abs(ab) < 1e-8) {
        x6 = (x12 + x32) / 2;
        y4 = (y12 + y32) / 2;
      } else {
        const d3 = 1 / ab;
        x6 = x12 + (ey * bl - dy * cl) * d3;
        y4 = y12 + (dx * cl - ex * bl) * d3;
      }
      circumcenters[j4] = x6;
      circumcenters[j4 + 1] = y4;
    }
    let h3 = hull[hull.length - 1];
    let p0, p1 = h3 * 4;
    let x0, x1 = points[2 * h3];
    let y0, y1 = points[2 * h3 + 1];
    vectors.fill(0);
    for (let i6 = 0; i6 < hull.length; ++i6) {
      h3 = hull[i6];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h3 * 4, x1 = points[2 * h3], y1 = points[2 * h3 + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
    if (hull.length <= 1)
      return null;
    for (let i6 = 0, n7 = halfedges.length; i6 < n7; ++i6) {
      const j4 = halfedges[i6];
      if (j4 < i6)
        continue;
      const ti = Math.floor(i6 / 3) * 2;
      const tj = Math.floor(j4 / 3) * 2;
      const xi2 = circumcenters[ti];
      const yi2 = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi2, yi2, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i6 = 0; i6 < hull.length; ++i6) {
      h0 = h1, h1 = hull[i6];
      const t10 = Math.floor(inedges[h1] / 3) * 2;
      const x6 = circumcenters[t10];
      const y4 = circumcenters[t10 + 1];
      const v6 = h0 * 4;
      const p5 = this._project(x6, y4, vectors[v6 + 2], vectors[v6 + 3]);
      if (p5)
        this._renderSegment(x6, y4, p5[0], p5[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i6, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const points = this._clip(i6);
    if (points === null || !points.length)
      return;
    context.moveTo(points[0], points[1]);
    let n7 = points.length;
    while (points[0] === points[n7 - 2] && points[1] === points[n7 - 1] && n7 > 1)
      n7 -= 2;
    for (let i7 = 2; i7 < n7; i7 += 2) {
      if (points[i7] !== points[i7 - 2] || points[i7 + 1] !== points[i7 - 1])
        context.lineTo(points[i7], points[i7 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const { delaunay: { points } } = this;
    for (let i6 = 0, n7 = points.length / 2; i6 < n7; ++i6) {
      const cell = this.cellPolygon(i6);
      if (cell)
        cell.index = i6, yield cell;
    }
  }
  cellPolygon(i6) {
    const polygon = new Polygon();
    this.renderCell(i6, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S3;
    const c0 = this._regioncode(x0, y0);
    const c12 = this._regioncode(x1, y1);
    if (c0 === 0 && c12 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S3 = this._clipSegment(x0, y0, x1, y1, c0, c12)) {
      context.moveTo(S3[0], S3[1]);
      context.lineTo(S3[2], S3[3]);
    }
  }
  contains(i6, x6, y4) {
    if ((x6 = +x6, x6 !== x6) || (y4 = +y4, y4 !== y4))
      return false;
    return this.delaunay._step(i6, x6, y4) === i6;
  }
  *neighbors(i6) {
    const ci = this._clip(i6);
    if (ci)
      for (const j4 of this.delaunay.neighbors(i6)) {
        const cj = this._clip(j4);
        if (cj)
          loop:
            for (let ai = 0, li = ci.length; ai < li; ai += 2) {
              for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
                if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
                  yield j4;
                  break loop;
                }
              }
            }
      }
  }
  _cell(i6) {
    const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
    const e0 = inedges[i6];
    if (e0 === -1)
      return null;
    const points = [];
    let e11 = e0;
    do {
      const t10 = Math.floor(e11 / 3);
      points.push(circumcenters[t10 * 2], circumcenters[t10 * 2 + 1]);
      e11 = e11 % 3 === 2 ? e11 - 2 : e11 + 1;
      if (triangles[e11] !== i6)
        break;
      e11 = halfedges[e11];
    } while (e11 !== e0 && e11 !== -1);
    return points;
  }
  _clip(i6) {
    if (i6 === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i6);
    if (points === null)
      return null;
    const { vectors: V3 } = this;
    const v6 = i6 * 4;
    return V3[v6] || V3[v6 + 1] ? this._clipInfinite(i6, points, V3[v6], V3[v6 + 1], V3[v6 + 2], V3[v6 + 3]) : this._clipFinite(i6, points);
  }
  _clipFinite(i6, points) {
    const n7 = points.length;
    let P4 = null;
    let x0, y0, x1 = points[n7 - 2], y1 = points[n7 - 1];
    let c0, c12 = this._regioncode(x1, y1);
    let e0, e1;
    for (let j4 = 0; j4 < n7; j4 += 2) {
      x0 = x1, y0 = y1, x1 = points[j4], y1 = points[j4 + 1];
      c0 = c12, c12 = this._regioncode(x1, y1);
      if (c0 === 0 && c12 === 0) {
        e0 = e1, e1 = 0;
        if (P4)
          P4.push(x1, y1);
        else
          P4 = [x1, y1];
      } else {
        let S3, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S3 = this._clipSegment(x0, y0, x1, y1, c0, c12)) === null)
            continue;
          [sx0, sy0, sx1, sy1] = S3;
        } else {
          if ((S3 = this._clipSegment(x1, y1, x0, y0, c12, c0)) === null)
            continue;
          [sx1, sy1, sx0, sy0] = S3;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1)
            this._edge(i6, e0, e1, P4, P4.length);
          if (P4)
            P4.push(sx0, sy0);
          else
            P4 = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1)
          this._edge(i6, e0, e1, P4, P4.length);
        if (P4)
          P4.push(sx1, sy1);
        else
          P4 = [sx1, sy1];
      }
    }
    if (P4) {
      e0 = e1, e1 = this._edgecode(P4[0], P4[1]);
      if (e0 && e1)
        this._edge(i6, e0, e1, P4, P4.length);
    } else if (this.contains(i6, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P4;
  }
  _clipSegment(x0, y0, x1, y1, c0, c12) {
    while (true) {
      if (c0 === 0 && c12 === 0)
        return [x0, y0, x1, y1];
      if (c0 & c12)
        return null;
      let x6, y4, c11 = c0 || c12;
      if (c11 & 8)
        x6 = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y4 = this.ymax;
      else if (c11 & 4)
        x6 = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y4 = this.ymin;
      else if (c11 & 2)
        y4 = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x6 = this.xmax;
      else
        y4 = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x6 = this.xmin;
      if (c0)
        x0 = x6, y0 = y4, c0 = this._regioncode(x0, y0);
      else
        x1 = x6, y1 = y4, c12 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i6, points, vx0, vy0, vxn, vyn) {
    let P4 = Array.from(points), p5;
    if (p5 = this._project(P4[0], P4[1], vx0, vy0))
      P4.unshift(p5[0], p5[1]);
    if (p5 = this._project(P4[P4.length - 2], P4[P4.length - 1], vxn, vyn))
      P4.push(p5[0], p5[1]);
    if (P4 = this._clipFinite(i6, P4)) {
      for (let j4 = 0, n7 = P4.length, c0, c12 = this._edgecode(P4[n7 - 2], P4[n7 - 1]); j4 < n7; j4 += 2) {
        c0 = c12, c12 = this._edgecode(P4[j4], P4[j4 + 1]);
        if (c0 && c12)
          j4 = this._edge(i6, c0, c12, P4, j4), n7 = P4.length;
      }
    } else if (this.contains(i6, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P4 = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P4;
  }
  _edge(i6, e0, e1, P4, j4) {
    while (e0 !== e1) {
      let x6, y4;
      switch (e0) {
        case 5:
          e0 = 4;
          continue;
        case 4:
          e0 = 6, x6 = this.xmax, y4 = this.ymin;
          break;
        case 6:
          e0 = 2;
          continue;
        case 2:
          e0 = 10, x6 = this.xmax, y4 = this.ymax;
          break;
        case 10:
          e0 = 8;
          continue;
        case 8:
          e0 = 9, x6 = this.xmin, y4 = this.ymax;
          break;
        case 9:
          e0 = 1;
          continue;
        case 1:
          e0 = 5, x6 = this.xmin, y4 = this.ymin;
          break;
      }
      if ((P4[j4] !== x6 || P4[j4 + 1] !== y4) && this.contains(i6, x6, y4)) {
        P4.splice(j4, 0, x6, y4), j4 += 2;
      }
    }
    if (P4.length > 4) {
      for (let i7 = 0; i7 < P4.length; i7 += 2) {
        const j5 = (i7 + 2) % P4.length, k6 = (i7 + 4) % P4.length;
        if (P4[i7] === P4[j5] && P4[j5] === P4[k6] || P4[i7 + 1] === P4[j5 + 1] && P4[j5 + 1] === P4[k6 + 1])
          P4.splice(j5, 2), i7 -= 2;
      }
    }
    return j4;
  }
  _project(x0, y0, vx, vy) {
    let t10 = Infinity, c11, x6, y4;
    if (vy < 0) {
      if (y0 <= this.ymin)
        return null;
      if ((c11 = (this.ymin - y0) / vy) < t10)
        y4 = this.ymin, x6 = x0 + (t10 = c11) * vx;
    } else if (vy > 0) {
      if (y0 >= this.ymax)
        return null;
      if ((c11 = (this.ymax - y0) / vy) < t10)
        y4 = this.ymax, x6 = x0 + (t10 = c11) * vx;
    }
    if (vx > 0) {
      if (x0 >= this.xmax)
        return null;
      if ((c11 = (this.xmax - x0) / vx) < t10)
        x6 = this.xmax, y4 = y0 + (t10 = c11) * vy;
    } else if (vx < 0) {
      if (x0 <= this.xmin)
        return null;
      if ((c11 = (this.xmin - x0) / vx) < t10)
        x6 = this.xmin, y4 = y0 + (t10 = c11) * vy;
    }
    return [x6, y4];
  }
  _edgecode(x6, y4) {
    return (x6 === this.xmin ? 1 : x6 === this.xmax ? 2 : 0) | (y4 === this.ymin ? 4 : y4 === this.ymax ? 8 : 0);
  }
  _regioncode(x6, y4) {
    return (x6 < this.xmin ? 1 : x6 > this.xmax ? 2 : 0) | (y4 < this.ymin ? 4 : y4 > this.ymax ? 8 : 0);
  }
};

// node_modules/d3-delaunay/src/delaunay.js
var tau3 = 2 * Math.PI;
var pow2 = Math.pow;
function pointX(p5) {
  return p5[0];
}
function pointY(p5) {
  return p5[1];
}
function collinear(d3) {
  const { triangles, coords } = d3;
  for (let i6 = 0; i6 < triangles.length; i6 += 3) {
    const a6 = 2 * triangles[i6], b5 = 2 * triangles[i6 + 1], c11 = 2 * triangles[i6 + 2], cross2 = (coords[c11] - coords[a6]) * (coords[b5 + 1] - coords[a6 + 1]) - (coords[b5] - coords[a6]) * (coords[c11 + 1] - coords[a6 + 1]);
    if (cross2 > 1e-10)
      return false;
  }
  return true;
}
function jitter(x6, y4, r7) {
  return [x6 + Math.sin(x6 + y4) * r7, y4 + Math.cos(x6 - y4) * r7];
}
var Delaunay = class _Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new _Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d3 = this._delaunator, points = this.points;
    if (d3.hull && d3.hull.length > 2 && collinear(d3)) {
      this.collinear = Int32Array.from({ length: points.length / 2 }, (_2, i6) => i6).sort((i6, j4) => points[2 * i6] - points[2 * j4] || points[2 * i6 + 1] - points[2 * j4 + 1]);
      const e11 = this.collinear[0], f4 = this.collinear[this.collinear.length - 1], bounds = [points[2 * e11], points[2 * e11 + 1], points[2 * f4], points[2 * f4 + 1]], r7 = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i6 = 0, n7 = points.length / 2; i6 < n7; ++i6) {
        const p5 = jitter(points[2 * i6], points[2 * i6 + 1], r7);
        points[2 * i6] = p5[0];
        points[2 * i6 + 1] = p5[1];
      }
      this._delaunator = new Delaunator(points);
    } else {
      delete this.collinear;
    }
    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);
    for (let e11 = 0, n7 = halfedges.length; e11 < n7; ++e11) {
      const p5 = triangles[e11 % 3 === 2 ? e11 - 2 : e11 + 1];
      if (halfedges[e11] === -1 || inedges[p5] === -1)
        inedges[p5] = e11;
    }
    for (let i6 = 0, n7 = hull.length; i6 < n7; ++i6) {
      hullIndex[hull[i6]] = i6;
    }
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      this.triangles[1] = hull[1];
      this.triangles[2] = hull[1];
      inedges[hull[0]] = 1;
      if (hull.length === 2)
        inedges[hull[1]] = 0;
    }
  }
  voronoi(bounds) {
    return new Voronoi(this, bounds);
  }
  *neighbors(i6) {
    const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
    if (collinear2) {
      const l4 = collinear2.indexOf(i6);
      if (l4 > 0)
        yield collinear2[l4 - 1];
      if (l4 < collinear2.length - 1)
        yield collinear2[l4 + 1];
      return;
    }
    const e0 = inedges[i6];
    if (e0 === -1)
      return;
    let e11 = e0, p0 = -1;
    do {
      yield p0 = triangles[e11];
      e11 = e11 % 3 === 2 ? e11 - 2 : e11 + 1;
      if (triangles[e11] !== i6)
        return;
      e11 = halfedges[e11];
      if (e11 === -1) {
        const p5 = hull[(_hullIndex[i6] + 1) % hull.length];
        if (p5 !== p0)
          yield p5;
        return;
      }
    } while (e11 !== e0);
  }
  find(x6, y4, i6 = 0) {
    if ((x6 = +x6, x6 !== x6) || (y4 = +y4, y4 !== y4))
      return -1;
    const i0 = i6;
    let c11;
    while ((c11 = this._step(i6, x6, y4)) >= 0 && c11 !== i6 && c11 !== i0)
      i6 = c11;
    return c11;
  }
  _step(i6, x6, y4) {
    const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
    if (inedges[i6] === -1 || !points.length)
      return (i6 + 1) % (points.length >> 1);
    let c11 = i6;
    let dc = pow2(x6 - points[i6 * 2], 2) + pow2(y4 - points[i6 * 2 + 1], 2);
    const e0 = inedges[i6];
    let e11 = e0;
    do {
      let t10 = triangles[e11];
      const dt2 = pow2(x6 - points[t10 * 2], 2) + pow2(y4 - points[t10 * 2 + 1], 2);
      if (dt2 < dc)
        dc = dt2, c11 = t10;
      e11 = e11 % 3 === 2 ? e11 - 2 : e11 + 1;
      if (triangles[e11] !== i6)
        break;
      e11 = halfedges[e11];
      if (e11 === -1) {
        e11 = hull[(_hullIndex[i6] + 1) % hull.length];
        if (e11 !== t10) {
          if (pow2(x6 - points[e11 * 2], 2) + pow2(y4 - points[e11 * 2 + 1], 2) < dc)
            return e11;
        }
        break;
      }
    } while (e11 !== e0);
    return c11;
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, halfedges, triangles } = this;
    for (let i6 = 0, n7 = halfedges.length; i6 < n7; ++i6) {
      const j4 = halfedges[i6];
      if (j4 < i6)
        continue;
      const ti = triangles[i6] * 2;
      const tj = triangles[j4] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r7 = 2) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points } = this;
    for (let i6 = 0, n7 = points.length; i6 < n7; i6 += 2) {
      const x6 = points[i6], y4 = points[i6 + 1];
      context.moveTo(x6 + r7, y4);
      context.arc(x6, y4, r7, 0, tau3);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { hull, points } = this;
    const h3 = hull[0] * 2, n7 = hull.length;
    context.moveTo(points[h3], points[h3 + 1]);
    for (let i6 = 1; i6 < n7; ++i6) {
      const h4 = 2 * hull[i6];
      context.lineTo(points[h4], points[h4 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new Polygon();
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i6, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, triangles } = this;
    const t06 = triangles[i6 *= 3] * 2;
    const t16 = triangles[i6 + 1] * 2;
    const t24 = triangles[i6 + 2] * 2;
    context.moveTo(points[t06], points[t06 + 1]);
    context.lineTo(points[t16], points[t16 + 1]);
    context.lineTo(points[t24], points[t24 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const { triangles } = this;
    for (let i6 = 0, n7 = triangles.length / 3; i6 < n7; ++i6) {
      yield this.trianglePolygon(i6);
    }
  }
  trianglePolygon(i6) {
    const polygon = new Polygon();
    this.renderTriangle(i6, polygon);
    return polygon.value();
  }
};
function flatArray(points, fx, fy, that) {
  const n7 = points.length;
  const array2 = new Float64Array(n7 * 2);
  for (let i6 = 0; i6 < n7; ++i6) {
    const p5 = points[i6];
    array2[i6 * 2] = fx.call(that, p5, i6, points);
    array2[i6 * 2 + 1] = fy.call(that, p5, i6, points);
  }
  return array2;
}
function* flatIterable(points, fx, fy, that) {
  let i6 = 0;
  for (const p5 of points) {
    yield fx.call(that, p5, i6, points);
    yield fy.call(that, p5, i6, points);
    ++i6;
  }
}

// node_modules/@nivo/voronoi/dist/nivo-voronoi.es.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var g4 = function(n7) {
  return "function" == typeof n7 ? n7 : function(e11) {
    return e11[n7];
  };
};
var b4 = function(n7) {
  var e11 = n7.points, i6 = n7.x, o5 = void 0 === i6 ? "x" : i6, t10 = n7.y, r7 = void 0 === t10 ? "y" : t10, l4 = g4(o5), u3 = g4(r7);
  return e11.map(function(n8) {
    return [l4(n8), u3(n8)];
  });
};
var k5 = function(n7) {
  var e11 = n7.points, i6 = n7.width, o5 = n7.height, t10 = n7.debug, r7 = Delaunay.from(e11), l4 = t10 ? r7.voronoi([0, 0, i6, o5]) : void 0;
  return { delaunay: r7, voronoi: l4 };
};
var x5 = function(e11) {
  var i6 = e11.points, o5 = e11.x, t10 = e11.y, r7 = e11.width, l4 = e11.height, u3 = e11.debug, a6 = (0, import_react20.useMemo)(function() {
    return b4({ points: i6, x: o5, y: t10 });
  }, [i6, o5, t10]);
  return (0, import_react20.useMemo)(function() {
    return k5({ points: a6, width: r7, height: l4, debug: u3 });
  }, [a6, r7, l4, u3]);
};
var O4 = function(e11) {
  var i6 = e11.nodes, l4 = e11.width, u3 = e11.height, a6 = e11.x, d3 = e11.y, c11 = e11.onMouseEnter, h3 = e11.onMouseMove, m4 = e11.onMouseLeave, y4 = e11.onClick, g5 = e11.debug, b5 = (0, import_react20.useRef)(null), k6 = (0, import_react20.useState)(null), C8 = k6[0], L2 = k6[1], w4 = x5({ points: i6, x: a6, y: d3, width: l4, height: u3, debug: g5 }), W4 = w4.delaunay, D5 = w4.voronoi, M2 = (0, import_react20.useMemo)(function() {
    if (g5 && D5)
      return D5.render();
  }, [g5, D5]), O5 = (0, import_react20.useCallback)(function(n7) {
    if (!b5.current)
      return [null, null];
    var e12 = Fi(b5.current, n7), o5 = e12[0], t10 = e12[1], r7 = W4.find(o5, t10);
    return [r7, void 0 !== r7 ? i6[r7] : null];
  }, [b5, W4]), P4 = (0, import_react20.useCallback)(function(n7) {
    var e12 = O5(n7), i7 = e12[0], o5 = e12[1];
    L2(i7), o5 && (null == c11 || c11(o5, n7));
  }, [O5, L2, c11]), j4 = (0, import_react20.useCallback)(function(n7) {
    var e12 = O5(n7), i7 = e12[0], o5 = e12[1];
    L2(i7), o5 && (null == h3 || h3(o5, n7));
  }, [O5, L2, h3]), S3 = (0, import_react20.useCallback)(function(n7) {
    if (L2(null), m4) {
      var e12 = void 0;
      null !== C8 && (e12 = i6[C8]), e12 && m4(e12, n7);
    }
  }, [L2, C8, m4, i6]), z4 = (0, import_react20.useCallback)(function(n7) {
    var e12 = O5(n7), i7 = e12[0], o5 = e12[1];
    L2(i7), o5 && (null == y4 || y4(o5, n7));
  }, [O5, L2, y4]);
  return (0, import_jsx_runtime5.jsxs)("g", { ref: b5, children: [g5 && D5 && (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [(0, import_jsx_runtime5.jsx)("path", { d: M2, stroke: "red", strokeWidth: 1, opacity: 0.75 }), null !== C8 && (0, import_jsx_runtime5.jsx)("path", { fill: "pink", opacity: 0.35, d: D5.renderCell(C8) })] }), (0, import_jsx_runtime5.jsx)("rect", { width: l4, height: u3, fill: "red", opacity: 0, style: { cursor: "auto" }, onMouseEnter: P4, onMouseMove: j4, onMouseLeave: S3, onClick: z4 })] });
};
var P3 = function(n7, e11) {
  n7.save(), n7.globalAlpha = 0.75, n7.beginPath(), e11.render(n7), n7.strokeStyle = "red", n7.lineWidth = 1, n7.stroke(), n7.restore();
};
var j3 = function(n7, e11, i6) {
  n7.save(), n7.globalAlpha = 0.35, n7.beginPath(), e11.renderCell(i6, n7), n7.fillStyle = "red", n7.fill(), n7.restore();
};

// node_modules/@nivo/line/dist/nivo-line.es.js
function re3() {
  return re3 = Object.assign ? Object.assign.bind() : function(e11) {
    for (var i6 = 1; i6 < arguments.length; i6++) {
      var r7 = arguments[i6];
      for (var n7 in r7)
        Object.prototype.hasOwnProperty.call(r7, n7) && (e11[n7] = r7[n7]);
    }
    return e11;
  }, re3.apply(this, arguments);
}
var ne = function(e11) {
  var i6 = e11.point;
  return (0, import_jsx_runtime6.jsx)(w, { id: (0, import_jsx_runtime6.jsxs)("span", { children: ["x: ", (0, import_jsx_runtime6.jsx)("strong", { children: i6.data.xFormatted }), ", y:", " ", (0, import_jsx_runtime6.jsx)("strong", { children: i6.data.yFormatted })] }), enableChip: true, color: i6.serieColor });
};
ne.propTypes = { point: import_prop_types5.default.object.isRequired };
var oe = (0, import_react21.memo)(ne);
var te = function(e11) {
  var i6 = e11.slice, r7 = e11.axis, n7 = Et(), o5 = "x" === r7 ? "y" : "x";
  return (0, import_jsx_runtime6.jsx)(C, { rows: i6.points.map(function(e12) {
    return [(0, import_jsx_runtime6.jsx)(g, { color: e12.serieColor, style: n7.tooltip.chip }, "chip"), e12.serieId, (0, import_jsx_runtime6.jsx)("span", { style: n7.tooltip.tableCellValue, children: e12.data[o5 + "Formatted"] }, "value")];
  }) });
};
te.propTypes = { slice: import_prop_types5.default.object.isRequired, axis: import_prop_types5.default.oneOf(["x", "y"]).isRequired };
var ae = (0, import_react21.memo)(te);
var se = { data: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ id: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number]).isRequired, data: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ x: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]), y: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]) })).isRequired })).isRequired, xScale: import_prop_types5.default.object.isRequired, xFormat: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.string]), yScale: import_prop_types5.default.object.isRequired, yFormat: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.string]), layers: import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["grid", "markers", "axes", "areas", "crosshair", "lines", "slices", "points", "mesh", "legends"]), import_prop_types5.default.func])).isRequired, curve: bt.isRequired, axisTop: w2, axisRight: w2, axisBottom: w2, axisLeft: w2, enableGridX: import_prop_types5.default.bool.isRequired, enableGridY: import_prop_types5.default.bool.isRequired, gridXValues: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]))]), gridYValues: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]))]), enablePoints: import_prop_types5.default.bool.isRequired, pointSymbol: import_prop_types5.default.func, pointSize: import_prop_types5.default.number.isRequired, pointColor: import_prop_types5.default.any.isRequired, pointBorderWidth: import_prop_types5.default.number.isRequired, pointBorderColor: import_prop_types5.default.any.isRequired, enablePointLabel: import_prop_types5.default.bool.isRequired, pointLabel: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.func]).isRequired, markers: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ axis: import_prop_types5.default.oneOf(["x", "y"]).isRequired, value: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]).isRequired, style: import_prop_types5.default.object })), colors: Xe.isRequired, enableArea: import_prop_types5.default.bool.isRequired, areaOpacity: import_prop_types5.default.number.isRequired, areaBlendMode: zt.isRequired, areaBaselineValue: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]).isRequired, lineWidth: import_prop_types5.default.number.isRequired, legends: import_prop_types5.default.arrayOf(import_prop_types5.default.shape(T3)).isRequired, isInteractive: import_prop_types5.default.bool.isRequired, debugMesh: import_prop_types5.default.bool.isRequired, tooltip: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]).isRequired, enableSlices: import_prop_types5.default.oneOf(["x", "y", false]).isRequired, debugSlices: import_prop_types5.default.bool.isRequired, sliceTooltip: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]).isRequired, enableCrosshair: import_prop_types5.default.bool.isRequired, crosshairType: import_prop_types5.default.string.isRequired };
var le = re3({}, se, { enablePointLabel: import_prop_types5.default.bool.isRequired, role: import_prop_types5.default.string.isRequired, useMesh: import_prop_types5.default.bool.isRequired }, Jr, yt);
var ue = re3({ pixelRatio: import_prop_types5.default.number.isRequired }, se);
var de = { curve: "linear", xScale: { type: "point" }, yScale: { type: "linear", min: 0, max: "auto" }, layers: ["grid", "markers", "axes", "areas", "crosshair", "lines", "points", "slices", "mesh", "legends"], axisBottom: {}, axisLeft: {}, enableGridX: true, enableGridY: true, enablePoints: true, pointSize: 6, pointColor: { from: "color" }, pointBorderWidth: 0, pointBorderColor: { theme: "background" }, enablePointLabel: false, pointLabel: "yFormatted", colors: { scheme: "nivo" }, enableArea: false, areaBaselineValue: 0, areaOpacity: 0.2, areaBlendMode: "normal", lineWidth: 2, legends: [], isInteractive: true, tooltip: oe, enableSlices: false, debugSlices: false, sliceTooltip: ae, debugMesh: false, enableCrosshair: true, crosshairType: "bottom-left" };
var ce = re3({}, de, { enablePointLabel: false, useMesh: false, animate: true, motionConfig: "gentle", defs: [], fill: [], role: "img" });
var fe = re3({}, de, { pixelRatio: "undefined" != typeof window && window.devicePixelRatio || 1 });
var pe = function(e11) {
  var r7 = e11.curve;
  return (0, import_react21.useMemo)(function() {
    return line_default().defined(function(e12) {
      return null !== e12.x && null !== e12.y;
    }).x(function(e12) {
      return e12.x;
    }).y(function(e12) {
      return e12.y;
    }).curve(mt(r7));
  }, [r7]);
};
var he = function(e11) {
  var r7 = e11.curve, n7 = e11.yScale, o5 = e11.areaBaselineValue;
  return (0, import_react21.useMemo)(function() {
    return area_default().defined(function(e12) {
      return null !== e12.x && null !== e12.y;
    }).x(function(e12) {
      return e12.x;
    }).y1(function(e12) {
      return e12.y;
    }).curve(mt(r7)).y0(n7(o5));
  }, [r7, n7, o5]);
};
var ye = function(e11) {
  var r7 = e11.enableSlices, n7 = e11.points, o5 = e11.width, t10 = e11.height;
  return (0, import_react21.useMemo)(function() {
    if (false === r7)
      return [];
    if ("x" === r7) {
      var e12 = /* @__PURE__ */ new Map();
      return n7.forEach(function(i7) {
        null !== i7.data.x && null !== i7.data.y && (e12.has(i7.x) ? e12.get(i7.x).push(i7) : e12.set(i7.x, [i7]));
      }), Array.from(e12.entries()).sort(function(e13, i7) {
        return e13[0] - i7[0];
      }).map(function(e13, i7, r8) {
        var n8, a6 = e13[0], s5 = e13[1], l4 = r8[i7 - 1], u3 = r8[i7 + 1];
        return { id: a6, x0: n8 = l4 ? a6 - (a6 - l4[0]) / 2 : a6, x: a6, y0: 0, y: 0, width: u3 ? a6 - n8 + (u3[0] - a6) / 2 : o5 - n8, height: t10, points: s5.reverse() };
      });
    }
    if ("y" === r7) {
      var i6 = /* @__PURE__ */ new Map();
      return n7.forEach(function(e13) {
        null !== e13.data.x && null !== e13.data.y && (i6.has(e13.y) ? i6.get(e13.y).push(e13) : i6.set(e13.y, [e13]));
      }), Array.from(i6.entries()).sort(function(e13, i7) {
        return e13[0] - i7[0];
      }).map(function(e13, i7, r8) {
        var n8, a6, s5 = e13[0], l4 = e13[1], u3 = r8[i7 - 1], d3 = r8[i7 + 1];
        return n8 = u3 ? s5 - (s5 - u3[0]) / 2 : s5, a6 = d3 ? s5 - n8 + (d3[0] - s5) / 2 : t10 - n8, { id: s5, x0: 0, x: 0, y0: n8, y: s5, width: o5, height: a6, points: l4.reverse() };
      });
    }
  }, [r7, n7]);
};
var be = function(e11) {
  var o5 = e11.data, t10 = e11.xScale, a6 = void 0 === t10 ? ce.xScale : t10, s5 = e11.xFormat, l4 = e11.yScale, d3 = void 0 === l4 ? ce.yScale : l4, c11 = e11.yFormat, f4 = e11.width, p5 = e11.height, h3 = e11.colors, b5 = void 0 === h3 ? ce.colors : h3, g5 = e11.curve, m4 = void 0 === g5 ? ce.curve : g5, v6 = e11.areaBaselineValue, x6 = void 0 === v6 ? ce.areaBaselineValue : v6, R = e11.pointColor, q = void 0 === R ? ce.pointColor : R, O5 = e11.pointBorderColor, M2 = void 0 === O5 ? ce.pointBorderColor : O5, C8 = e11.enableSlices, S3 = void 0 === C8 ? ce.enableSlicesTooltip : C8, T4 = Dt(s5), w4 = Dt(c11), L2 = pr(b5, "id"), W4 = Et(), G = We(q, W4), P4 = We(M2, W4), E5 = (0, import_react21.useState)([]), j4 = E5[0], F2 = E5[1], V3 = (0, import_react21.useMemo)(function() {
    return dn(o5.filter(function(e12) {
      return -1 === j4.indexOf(e12.id);
    }), a6, d3, f4, p5);
  }, [o5, j4, a6, d3, f4, p5]), Y4 = V3.xScale, D5 = V3.yScale, X4 = V3.series, z4 = (0, import_react21.useMemo)(function() {
    var e12 = o5.map(function(e13) {
      return { id: e13.id, label: e13.id, color: L2(e13) };
    }), i6 = e12.map(function(e13) {
      return re3({}, X4.find(function(i7) {
        return i7.id === e13.id;
      }), { color: e13.color });
    }).filter(function(e13) {
      return Boolean(e13.id);
    });
    return { legendData: e12.map(function(e13) {
      return re3({}, e13, { hidden: !i6.find(function(i7) {
        return i7.id === e13.id;
      }) });
    }).reverse(), series: i6 };
  }, [o5, X4, L2]), A6 = z4.legendData, H2 = z4.series, I = (0, import_react21.useCallback)(function(e12) {
    F2(function(i6) {
      return i6.indexOf(e12) > -1 ? i6.filter(function(i7) {
        return i7 !== e12;
      }) : [].concat(i6, [e12]);
    });
  }, []), K6 = function(e12) {
    var r7 = e12.series, n7 = e12.getPointColor, o6 = e12.getPointBorderColor, t11 = e12.formatX, a7 = e12.formatY;
    return (0, import_react21.useMemo)(function() {
      return r7.reduce(function(e13, i6) {
        return [].concat(e13, i6.data.filter(function(e14) {
          return null !== e14.position.x && null !== e14.position.y;
        }).map(function(r8, s6) {
          var l5 = { id: i6.id + "." + s6, index: e13.length + s6, serieId: i6.id, serieColor: i6.color, x: r8.position.x, y: r8.position.y };
          return l5.color = n7(i6), l5.borderColor = o6(l5), l5.data = re3({}, r8.data, { xFormatted: t11(r8.data.x), yFormatted: a7(r8.data.y) }), l5;
        }));
      }, []);
    }, [r7, n7, o6, t11, a7]);
  }({ series: H2, getPointColor: G, getPointBorderColor: P4, formatX: T4, formatY: w4 }), N3 = ye({ enableSlices: S3, points: K6, width: f4, height: p5 });
  return { legendData: A6, toggleSerie: I, lineGenerator: pe({ curve: m4 }), areaGenerator: he({ curve: m4, yScale: D5, areaBaselineValue: x6 }), getColor: L2, series: H2, xScale: Y4, yScale: D5, slices: N3, points: K6 };
};
var ge = function(e11) {
  var i6 = e11.areaBlendMode, r7 = e11.areaOpacity, n7 = e11.color, o5 = e11.fill, t10 = e11.path, a6 = Zr(), s5 = a6.animate, l4 = a6.config, u3 = $r(t10), d3 = useSpring({ color: n7, config: l4, immediate: !s5 });
  return (0, import_jsx_runtime6.jsx)(animated.path, { d: u3, fill: o5 || d3.color, fillOpacity: r7, strokeWidth: 0, style: { mixBlendMode: i6 } });
};
ge.propTypes = { areaBlendMode: zt.isRequired, areaOpacity: import_prop_types5.default.number.isRequired, color: import_prop_types5.default.string, fill: import_prop_types5.default.string, path: import_prop_types5.default.string.isRequired };
var me = function(e11) {
  var i6 = e11.areaGenerator, r7 = e11.areaOpacity, n7 = e11.areaBlendMode, o5 = e11.lines.slice(0).reverse();
  return (0, import_jsx_runtime6.jsx)("g", { children: o5.map(function(e12) {
    return (0, import_jsx_runtime6.jsx)(ge, re3({ path: i6(e12.data.map(function(e13) {
      return e13.position;
    })) }, re3({ areaOpacity: r7, areaBlendMode: n7 }, e12)), e12.id);
  }) });
};
me.propTypes = { areaGenerator: import_prop_types5.default.func.isRequired, areaOpacity: import_prop_types5.default.number.isRequired, areaBlendMode: zt.isRequired, lines: import_prop_types5.default.arrayOf(import_prop_types5.default.object).isRequired };
var ve = (0, import_react21.memo)(me);
var xe = function(e11) {
  var r7 = e11.lineGenerator, n7 = e11.points, o5 = e11.color, t10 = e11.thickness, a6 = (0, import_react21.useMemo)(function() {
    return r7(n7);
  }, [r7, n7]), s5 = $r(a6);
  return (0, import_jsx_runtime6.jsx)(animated.path, { d: s5, fill: "none", strokeWidth: t10, stroke: o5 });
};
xe.propTypes = { points: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ x: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number]), y: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number]) })), lineGenerator: import_prop_types5.default.func.isRequired, color: import_prop_types5.default.string.isRequired, thickness: import_prop_types5.default.number.isRequired };
var Re2 = (0, import_react21.memo)(xe);
var qe2 = function(e11) {
  var i6 = e11.lines, r7 = e11.lineGenerator, n7 = e11.lineWidth;
  return i6.slice(0).reverse().map(function(e12) {
    var i7 = e12.id, o5 = e12.data, t10 = e12.color;
    return (0, import_jsx_runtime6.jsx)(Re2, { id: i7, points: o5.map(function(e13) {
      return e13.position;
    }), lineGenerator: r7, color: t10, thickness: n7 }, i7);
  });
};
qe2.propTypes = { lines: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ id: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number]).isRequired, color: import_prop_types5.default.string.isRequired, data: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ data: import_prop_types5.default.shape({ x: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number, import_prop_types5.default.instanceOf(Date)]), y: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.number, import_prop_types5.default.instanceOf(Date)]) }).isRequired, position: import_prop_types5.default.shape({ x: import_prop_types5.default.number, y: import_prop_types5.default.number }).isRequired })).isRequired })).isRequired, lineWidth: import_prop_types5.default.number.isRequired, lineGenerator: import_prop_types5.default.func.isRequired };
var Oe2 = (0, import_react21.memo)(qe2);
var Me2 = function(e11) {
  var i6 = e11.slice, r7 = e11.axis, t10 = e11.debug, a6 = e11.tooltip, s5 = e11.isCurrent, l4 = e11.setCurrent, u3 = e11.onMouseEnter, d3 = e11.onMouseMove, c11 = e11.onMouseLeave, f4 = e11.onClick, p5 = k(), h3 = p5.showTooltipFromEvent, y4 = p5.hideTooltip, b5 = (0, import_react21.useCallback)(function(e12) {
    h3((0, import_react21.createElement)(a6, { slice: i6, axis: r7 }), e12, "right"), l4(i6), u3 && u3(i6, e12);
  }, [h3, a6, i6, u3]), g5 = (0, import_react21.useCallback)(function(e12) {
    h3((0, import_react21.createElement)(a6, { slice: i6, axis: r7 }), e12, "right"), d3 && d3(i6, e12);
  }, [h3, a6, i6, d3]), m4 = (0, import_react21.useCallback)(function(e12) {
    y4(), l4(null), c11 && c11(i6, e12);
  }, [y4, i6, c11]), v6 = (0, import_react21.useCallback)(function(e12) {
    f4 && f4(i6, e12);
  }, [i6, f4]);
  return (0, import_jsx_runtime6.jsx)("rect", { x: i6.x0, y: i6.y0, width: i6.width, height: i6.height, stroke: "red", strokeWidth: t10 ? 1 : 0, strokeOpacity: 0.75, fill: "red", fillOpacity: s5 && t10 ? 0.35 : 0, onMouseEnter: b5, onMouseMove: g5, onMouseLeave: m4, onClick: v6, "data-testid": "slice-" + i6.id });
};
Me2.propTypes = { slice: import_prop_types5.default.object.isRequired, axis: import_prop_types5.default.oneOf(["x", "y"]).isRequired, debug: import_prop_types5.default.bool.isRequired, height: import_prop_types5.default.number.isRequired, tooltip: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]), isCurrent: import_prop_types5.default.bool.isRequired, setCurrent: import_prop_types5.default.func.isRequired, onMouseEnter: import_prop_types5.default.func, onMouseMove: import_prop_types5.default.func, onMouseLeave: import_prop_types5.default.func, onClick: import_prop_types5.default.func };
var Ce2 = (0, import_react21.memo)(Me2);
var Se2 = function(e11) {
  var i6 = e11.slices, r7 = e11.axis, n7 = e11.debug, o5 = e11.height, t10 = e11.tooltip, a6 = e11.current, s5 = e11.setCurrent, l4 = e11.onMouseEnter, u3 = e11.onMouseMove, d3 = e11.onMouseLeave, c11 = e11.onClick;
  return i6.map(function(e12) {
    return (0, import_jsx_runtime6.jsx)(Ce2, { slice: e12, axis: r7, debug: n7, height: o5, tooltip: t10, setCurrent: s5, isCurrent: null !== a6 && a6.id === e12.id, onMouseEnter: l4, onMouseMove: u3, onMouseLeave: d3, onClick: c11 }, e12.id);
  });
};
Se2.propTypes = { slices: import_prop_types5.default.arrayOf(import_prop_types5.default.shape({ id: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string, import_prop_types5.default.instanceOf(Date)]).isRequired, x: import_prop_types5.default.number.isRequired, y: import_prop_types5.default.number.isRequired, points: import_prop_types5.default.arrayOf(import_prop_types5.default.object).isRequired })).isRequired, axis: import_prop_types5.default.oneOf(["x", "y"]).isRequired, debug: import_prop_types5.default.bool.isRequired, height: import_prop_types5.default.number.isRequired, tooltip: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]).isRequired, current: import_prop_types5.default.object, setCurrent: import_prop_types5.default.func.isRequired, onMouseEnter: import_prop_types5.default.func, onMouseMove: import_prop_types5.default.func, onMouseLeave: import_prop_types5.default.func, onClick: import_prop_types5.default.func };
var Te2 = (0, import_react21.memo)(Se2);
var we2 = function(e11) {
  var i6 = e11.points, r7 = e11.symbol, n7 = e11.size, o5 = e11.borderWidth, t10 = e11.enableLabel, a6 = e11.label, s5 = e11.labelYOffset, l4 = Et(), d3 = ji(a6), c11 = i6.slice(0).reverse().map(function(e12) {
    return { id: e12.id, x: e12.x, y: e12.y, datum: e12.data, fill: e12.color, stroke: e12.borderColor, label: t10 ? d3(e12.data) : null };
  });
  return (0, import_jsx_runtime6.jsx)("g", { children: c11.map(function(e12) {
    return (0, import_jsx_runtime6.jsx)(Wi, { x: e12.x, y: e12.y, datum: e12.datum, symbol: r7, size: n7, color: e12.fill, borderWidth: o5, borderColor: e12.stroke, label: e12.label, labelYOffset: s5, theme: l4 }, e12.id);
  }) });
};
we2.propTypes = { points: import_prop_types5.default.arrayOf(import_prop_types5.default.object), symbol: import_prop_types5.default.func, size: import_prop_types5.default.number.isRequired, color: import_prop_types5.default.func.isRequired, borderWidth: import_prop_types5.default.number.isRequired, borderColor: import_prop_types5.default.func.isRequired, enableLabel: import_prop_types5.default.bool.isRequired, label: import_prop_types5.default.oneOfType([import_prop_types5.default.string, import_prop_types5.default.func]).isRequired, labelYOffset: import_prop_types5.default.number };
var ke = (0, import_react21.memo)(we2);
var Be2 = function(e11) {
  var i6 = e11.points, r7 = e11.width, t10 = e11.height, a6 = e11.margin, s5 = e11.setCurrent, l4 = e11.onMouseEnter, u3 = e11.onMouseMove, d3 = e11.onMouseLeave, c11 = e11.onClick, f4 = e11.tooltip, p5 = e11.debug, h3 = k(), y4 = h3.showTooltipAt, b5 = h3.hideTooltip, g5 = (0, import_react21.useCallback)(function(e12, i7) {
    y4((0, import_react21.createElement)(f4, { point: e12 }), [e12.x + a6.left, e12.y + a6.top], "top"), s5(e12), l4 && l4(e12, i7);
  }, [s5, y4, f4, l4, a6]), m4 = (0, import_react21.useCallback)(function(e12, i7) {
    y4((0, import_react21.createElement)(f4, { point: e12 }), [e12.x + a6.left, e12.y + a6.top], "top"), s5(e12), u3 && u3(e12, i7);
  }, [s5, y4, f4, u3]), v6 = (0, import_react21.useCallback)(function(e12, i7) {
    b5(), s5(null), d3 && d3(e12, i7);
  }, [b5, s5, d3]), x6 = (0, import_react21.useCallback)(function(e12, i7) {
    c11 && c11(e12, i7);
  }, [c11]);
  return (0, import_jsx_runtime6.jsx)(O4, { nodes: i6, width: r7, height: t10, onMouseEnter: g5, onMouseMove: m4, onMouseLeave: v6, onClick: x6, debug: p5 });
};
Be2.propTypes = { points: import_prop_types5.default.arrayOf(import_prop_types5.default.object).isRequired, width: import_prop_types5.default.number.isRequired, height: import_prop_types5.default.number.isRequired, margin: import_prop_types5.default.object.isRequired, setCurrent: import_prop_types5.default.func.isRequired, onMouseEnter: import_prop_types5.default.func, onMouseMove: import_prop_types5.default.func, onMouseLeave: import_prop_types5.default.func, onClick: import_prop_types5.default.func, tooltip: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]).isRequired, debug: import_prop_types5.default.bool.isRequired };
var Le2 = (0, import_react21.memo)(Be2);
var We2 = function(e11) {
  var i6 = e11.data, n7 = e11.xScale, o5 = e11.xFormat, a6 = e11.yScale, s5 = e11.yFormat, l4 = e11.layers, d3 = e11.curve, c11 = e11.areaBaselineValue, f4 = e11.colors, p5 = e11.margin, h3 = e11.width, y4 = e11.height, b5 = e11.axisTop, g5 = e11.axisRight, m4 = e11.axisBottom, v6 = e11.axisLeft, x6 = e11.enableGridX, C8 = e11.enableGridY, S3 = e11.gridXValues, T4 = e11.gridYValues, w4 = e11.lineWidth, k6 = e11.enableArea, L2 = e11.areaOpacity, P4 = e11.areaBlendMode, E5 = e11.enablePoints, j4 = e11.pointSymbol, V3 = e11.pointSize, Y4 = e11.pointColor, D5 = e11.pointBorderWidth, X4 = e11.pointBorderColor, z4 = e11.enablePointLabel, H2 = e11.pointLabel, I = e11.pointLabelYOffset, J2 = e11.defs, K6 = e11.fill, Q3 = e11.markers, U = e11.legends, Z = e11.isInteractive, $2 = e11.useMesh, _2 = e11.debugMesh, ee = e11.onMouseEnter, ie = e11.onMouseMove, ne2 = e11.onMouseLeave, oe2 = e11.onClick, te2 = e11.tooltip, ae2 = e11.enableSlices, se2 = e11.debugSlices, le2 = e11.sliceTooltip, ue2 = e11.enableCrosshair, de2 = e11.crosshairType, ce2 = e11.role, fe2 = Bt(h3, y4, p5), pe2 = fe2.margin, he2 = fe2.innerWidth, ye2 = fe2.innerHeight, ge2 = fe2.outerWidth, me2 = fe2.outerHeight, xe2 = be({ data: i6, xScale: n7, xFormat: o5, yScale: a6, yFormat: s5, width: he2, height: ye2, colors: f4, curve: d3, areaBaselineValue: c11, pointColor: Y4, pointBorderColor: X4, enableSlices: ae2 }), Re3 = xe2.legendData, qe3 = xe2.toggleSerie, Me3 = xe2.lineGenerator, Ce3 = xe2.areaGenerator, Se3 = xe2.series, we3 = xe2.xScale, Be3 = xe2.yScale, We3 = xe2.slices, Ge3 = xe2.points, Pe3 = Et(), Ee2 = We(Y4, Pe3), je3 = We(X4, Pe3), Fe3 = (0, import_react21.useState)(null), Ve3 = Fe3[0], Ye2 = Fe3[1], De2 = (0, import_react21.useState)(null), Xe2 = De2[0], ze = De2[1], Ae = { grid: (0, import_jsx_runtime6.jsx)(z3, { theme: Pe3, width: he2, height: ye2, xScale: x6 ? we3 : null, yScale: C8 ? Be3 : null, xValues: S3, yValues: T4 }, "grid"), markers: (0, import_jsx_runtime6.jsx)(Ti, { markers: Q3, width: he2, height: ye2, xScale: we3, yScale: Be3, theme: Pe3 }, "markers"), axes: (0, import_jsx_runtime6.jsx)(X2, { xScale: we3, yScale: Be3, width: he2, height: ye2, theme: Pe3, top: b5, right: g5, bottom: m4, left: v6 }, "axes"), areas: null, lines: (0, import_jsx_runtime6.jsx)(Oe2, { lines: Se3, lineGenerator: Me3, lineWidth: w4 }, "lines"), slices: null, points: null, crosshair: null, mesh: null, legends: U.map(function(e12, i7) {
    return (0, import_jsx_runtime6.jsx)(X3, re3({}, e12, { containerWidth: he2, containerHeight: ye2, data: e12.data || Re3, theme: Pe3, toggleSerie: e12.toggleSerie ? qe3 : void 0 }), "legend." + i7);
  }) }, He2 = Hi(J2, Se3, K6);
  return k6 && (Ae.areas = (0, import_jsx_runtime6.jsx)(ve, { areaGenerator: Ce3, areaOpacity: L2, areaBlendMode: P4, lines: Se3 }, "areas")), Z && false !== ae2 && (Ae.slices = (0, import_jsx_runtime6.jsx)(Te2, { slices: We3, axis: ae2, debug: se2, height: ye2, tooltip: le2, current: Xe2, setCurrent: ze, onMouseEnter: ee, onMouseMove: ie, onMouseLeave: ne2, onClick: oe2 }, "slices")), E5 && (Ae.points = (0, import_jsx_runtime6.jsx)(ke, { points: Ge3, symbol: j4, size: V3, color: Ee2, borderWidth: D5, borderColor: je3, enableLabel: z4, label: H2, labelYOffset: I }, "points")), Z && ue2 && (null !== Ve3 && (Ae.crosshair = (0, import_jsx_runtime6.jsx)(P, { width: he2, height: ye2, x: Ve3.x, y: Ve3.y, type: de2 }, "crosshair")), null !== Xe2 && (Ae.crosshair = (0, import_jsx_runtime6.jsx)(P, { width: he2, height: ye2, x: Xe2.x, y: Xe2.y, type: ae2 }, "crosshair"))), Z && $2 && false === ae2 && (Ae.mesh = (0, import_jsx_runtime6.jsx)(Le2, { points: Ge3, width: he2, height: ye2, margin: pe2, current: Ve3, setCurrent: Ye2, onMouseEnter: ee, onMouseMove: ie, onMouseLeave: ne2, onClick: oe2, tooltip: te2, debug: _2 }, "mesh")), (0, import_jsx_runtime6.jsx)(_i, { defs: He2, width: ge2, height: me2, margin: pe2, role: ce2, children: l4.map(function(i7, r7) {
    return "function" == typeof i7 ? (0, import_jsx_runtime6.jsx)(import_react21.Fragment, { children: i7(re3({}, e11, { innerWidth: he2, innerHeight: ye2, series: Se3, slices: We3, points: Ge3, xScale: we3, yScale: Be3, lineGenerator: Me3, areaGenerator: Ce3, currentPoint: Ve3, setCurrentPoint: Ye2, currentSlice: Xe2, setCurrentSlice: ze })) }, r7) : Ae[i7];
  }) });
};
We2.propTypes = le, We2.defaultProps = ce;
var Ge2 = Mi(We2);
var Pe2 = function(e11) {
  return (0, import_jsx_runtime6.jsx)(Jt, { children: function(i6) {
    var r7 = i6.width, n7 = i6.height;
    return (0, import_jsx_runtime6.jsx)(Ge2, re3({ width: r7, height: n7 }, e11));
  } });
};
var Ee = function(e11) {
  var i6 = e11.width, t10 = e11.height, a6 = e11.margin, d3 = e11.pixelRatio, c11 = e11.data, f4 = e11.xScale, p5 = e11.xFormat, h3 = e11.yScale, y4 = e11.yFormat, b5 = e11.curve, g5 = e11.layers, m4 = e11.colors, v6 = e11.lineWidth, x6 = e11.enableArea, q = e11.areaBaselineValue, O5 = e11.areaOpacity, M2 = e11.enablePoints, C8 = e11.pointSize, w4 = e11.pointColor, k6 = e11.pointBorderWidth, B6 = e11.pointBorderColor, L2 = e11.enableGridX, W4 = e11.gridXValues, G = e11.enableGridY, j4 = e11.gridYValues, F2 = e11.axisTop, Y4 = e11.axisRight, D5 = e11.axisBottom, X4 = e11.axisLeft, A6 = e11.legends, H2 = e11.isInteractive, I = e11.debugMesh, J2 = e11.onMouseLeave, K6 = e11.onClick, Q3 = e11.tooltip, U = e11.canvasRef, Z = (0, import_react21.useRef)(null), $2 = Bt(i6, t10, a6), ne2 = $2.margin, oe2 = $2.innerWidth, te2 = $2.innerHeight, ae2 = $2.outerWidth, se2 = $2.outerHeight, le2 = Et(), ue2 = (0, import_react21.useState)(null), de2 = ue2[0], ce2 = ue2[1], fe2 = be({ data: c11, xScale: f4, xFormat: p5, yScale: h3, yFormat: y4, width: oe2, height: te2, colors: m4, curve: b5, areaBaselineValue: q, pointColor: w4, pointBorderColor: B6 }), pe2 = fe2.lineGenerator, he2 = fe2.areaGenerator, ye2 = fe2.series, ge2 = fe2.xScale, me2 = fe2.yScale, ve2 = fe2.points, xe2 = x5({ points: ve2, width: oe2, height: te2, debug: I }), Re3 = xe2.delaunay, qe3 = xe2.voronoi;
  (0, import_react21.useEffect)(function() {
    U && (U.current = Z.current), Z.current.width = ae2 * d3, Z.current.height = se2 * d3;
    var e12 = Z.current.getContext("2d");
    e12.scale(d3, d3), e12.fillStyle = le2.background, e12.fillRect(0, 0, ae2, se2), e12.translate(ne2.left, ne2.top), g5.forEach(function(i7) {
      if ("function" == typeof i7 && i7({ ctx: e12, innerWidth: oe2, innerHeight: te2, series: ye2, points: ve2, xScale: ge2, yScale: me2, lineWidth: v6, lineGenerator: pe2, areaGenerator: he2, currentPoint: de2, setCurrentPoint: ce2 }), "grid" === i7 && le2.grid.line.strokeWidth > 0 && (e12.lineWidth = le2.grid.line.strokeWidth, e12.strokeStyle = le2.grid.line.stroke, L2 && D4(e12, { width: oe2, height: te2, scale: ge2, axis: "x", values: W4 }), G && D4(e12, { width: oe2, height: te2, scale: me2, axis: "y", values: j4 })), "axes" === i7 && j2(e12, { xScale: ge2, yScale: me2, width: oe2, height: te2, top: F2, right: Y4, bottom: D5, left: X4, theme: le2 }), "areas" === i7 && true === x6 && (e12.save(), e12.globalAlpha = O5, he2.context(e12), ye2.forEach(function(i8) {
        e12.fillStyle = i8.color, e12.beginPath(), he2(i8.data.map(function(e13) {
          return e13.position;
        })), e12.fill();
      }), e12.restore()), "lines" === i7 && (pe2.context(e12), ye2.forEach(function(i8) {
        e12.strokeStyle = i8.color, e12.lineWidth = v6, e12.beginPath(), pe2(i8.data.map(function(e13) {
          return e13.position;
        })), e12.stroke();
      })), "points" === i7 && true === M2 && C8 > 0 && ve2.forEach(function(i8) {
        e12.fillStyle = i8.color, e12.beginPath(), e12.arc(i8.x, i8.y, C8 / 2, 0, 2 * Math.PI), e12.fill(), k6 > 0 && (e12.strokeStyle = i8.borderColor, e12.lineWidth = k6, e12.stroke());
      }), "mesh" === i7 && true === I && (P3(e12, qe3), de2 && j3(e12, qe3, de2.index)), "legends" === i7) {
        var r7 = ye2.map(function(e13) {
          return { id: e13.id, label: e13.id, color: e13.color };
        }).reverse();
        A6.forEach(function(i8) {
          H(e12, re3({}, i8, { data: i8.data || r7, containerWidth: oe2, containerHeight: te2, theme: le2 }));
        });
      }
    });
  }, [Z, ae2, se2, g5, le2, pe2, ye2, ge2, me2, L2, W4, G, j4, F2, Y4, D5, X4, A6, ve2, M2, C8, de2]);
  var Oe3 = (0, import_react21.useCallback)(function(e12) {
    var i7 = Fi(Z.current, e12), r7 = i7[0], n7 = i7[1];
    if (!Ai(ne2.left, ne2.top, oe2, te2, r7, n7))
      return null;
    var o5 = Re3.find(r7 - ne2.left, n7 - ne2.top);
    return ve2[o5];
  }, [Z, ne2, oe2, te2, Re3]), Me3 = k(), Ce3 = Me3.showTooltipFromEvent, Se3 = Me3.hideTooltip, Te3 = (0, import_react21.useCallback)(function(e12) {
    var i7 = Oe3(e12);
    ce2(i7), i7 ? Ce3((0, import_react21.createElement)(Q3, { point: i7 }), e12) : Se3();
  }, [Oe3, ce2, Ce3, Se3, Q3]), we3 = (0, import_react21.useCallback)(function(e12) {
    Se3(), ce2(null), de2 && J2 && J2(de2, e12);
  }, [Se3, ce2, J2]), ke2 = (0, import_react21.useCallback)(function(e12) {
    if (K6) {
      var i7 = Oe3(e12);
      i7 && K6(i7, e12);
    }
  }, [Oe3, K6]);
  return (0, import_jsx_runtime6.jsx)("canvas", { ref: Z, width: ae2 * d3, height: se2 * d3, style: { width: ae2, height: se2, cursor: H2 ? "auto" : "normal" }, onMouseEnter: H2 ? Te3 : void 0, onMouseMove: H2 ? Te3 : void 0, onMouseLeave: H2 ? we3 : void 0, onClick: H2 ? ke2 : void 0 });
};
Ee.propTypes = ue, Ee.defaultProps = fe;
var je2 = Mi(Ee);
var Fe2 = (0, import_react21.forwardRef)(function(e11, i6) {
  return (0, import_jsx_runtime6.jsx)(je2, re3({}, e11, { canvasRef: i6 }));
});
var Ve2 = (0, import_react21.forwardRef)(function(e11, i6) {
  return (0, import_jsx_runtime6.jsx)(Jt, { children: function(r7) {
    var n7 = r7.width, o5 = r7.height;
    return (0, import_jsx_runtime6.jsx)(Fe2, re3({ width: n7, height: o5 }, e11, { ref: i6 }));
  } });
});
export {
  Ge2 as Line,
  Fe2 as LineCanvas,
  fe as LineCanvasDefaultProps,
  ue as LineCanvasPropTypes,
  ce as LineDefaultProps,
  le as LinePropTypes,
  Pe2 as ResponsiveLine,
  Ve2 as ResponsiveLineCanvas,
  he as useAreaGenerator,
  be as useLine,
  pe as useLineGenerator,
  ye as useSlices
};
//# sourceMappingURL=@nivo_line.js.map
