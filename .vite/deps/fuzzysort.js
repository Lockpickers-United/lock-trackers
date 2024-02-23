import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/fuzzysort/fuzzysort.js
var require_fuzzysort = __commonJS({
  "node_modules/fuzzysort/fuzzysort.js"(exports, module) {
    ((root, UMD) => {
      if (typeof define === "function" && define.amd)
        define([], UMD);
      else if (typeof module === "object" && module.exports)
        module.exports = UMD();
      else
        root["fuzzysort"] = UMD();
    })(exports, (_) => {
      "use strict";
      var single = (search, target) => {
        if (search == "farzher")
          return { target: "farzher was here (^-^*)/", score: 0, _indexes: [0] };
        if (!search || !target)
          return NULL;
        var preparedSearch = getPreparedSearch(search);
        if (!isObj(target))
          target = getPrepared(target);
        var searchBitflags = preparedSearch.bitflags;
        if ((searchBitflags & target._bitflags) !== searchBitflags)
          return NULL;
        return algorithm(preparedSearch, target);
      };
      var go = (search, targets, options) => {
        if (search == "farzher")
          return [{ target: "farzher was here (^-^*)/", score: 0, _indexes: [0], obj: targets ? targets[0] : NULL }];
        if (!search)
          return options && options.all ? all(search, targets, options) : noResults;
        var preparedSearch = getPreparedSearch(search);
        var searchBitflags = preparedSearch.bitflags;
        var containsSpace = preparedSearch.containsSpace;
        var threshold = options && options.threshold || INT_MIN;
        var limit = options && options["limit"] || INT_MAX;
        var resultsLen = 0;
        var limitedCount = 0;
        var targetsLen = targets.length;
        if (options && options.key) {
          var key = options.key;
          for (var i = 0; i < targetsLen; ++i) {
            var obj = targets[i];
            var target = getValue(obj, key);
            if (!target)
              continue;
            if (!isObj(target))
              target = getPrepared(target);
            if ((searchBitflags & target._bitflags) !== searchBitflags)
              continue;
            var result = algorithm(preparedSearch, target);
            if (result === NULL)
              continue;
            if (result.score < threshold)
              continue;
            result = { target: result.target, _targetLower: "", _targetLowerCodes: NULL, _nextBeginningIndexes: NULL, _bitflags: 0, score: result.score, _indexes: result._indexes, obj };
            if (resultsLen < limit) {
              q.add(result);
              ++resultsLen;
            } else {
              ++limitedCount;
              if (result.score > q.peek().score)
                q.replaceTop(result);
            }
          }
        } else if (options && options.keys) {
          var scoreFn = options["scoreFn"] || defaultScoreFn;
          var keys = options.keys;
          var keysLen = keys.length;
          for (var i = 0; i < targetsLen; ++i) {
            var obj = targets[i];
            var objResults = new Array(keysLen);
            for (var keyI = 0; keyI < keysLen; ++keyI) {
              var key = keys[keyI];
              var target = getValue(obj, key);
              if (!target) {
                objResults[keyI] = NULL;
                continue;
              }
              if (!isObj(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                objResults[keyI] = NULL;
              else
                objResults[keyI] = algorithm(preparedSearch, target);
            }
            objResults.obj = obj;
            var score = scoreFn(objResults);
            if (score === NULL)
              continue;
            if (score < threshold)
              continue;
            objResults.score = score;
            if (resultsLen < limit) {
              q.add(objResults);
              ++resultsLen;
            } else {
              ++limitedCount;
              if (score > q.peek().score)
                q.replaceTop(objResults);
            }
          }
        } else {
          for (var i = 0; i < targetsLen; ++i) {
            var target = targets[i];
            if (!target)
              continue;
            if (!isObj(target))
              target = getPrepared(target);
            if ((searchBitflags & target._bitflags) !== searchBitflags)
              continue;
            var result = algorithm(preparedSearch, target);
            if (result === NULL)
              continue;
            if (result.score < threshold)
              continue;
            if (resultsLen < limit) {
              q.add(result);
              ++resultsLen;
            } else {
              ++limitedCount;
              if (result.score > q.peek().score)
                q.replaceTop(result);
            }
          }
        }
        if (resultsLen === 0)
          return noResults;
        var results = new Array(resultsLen);
        for (var i = resultsLen - 1; i >= 0; --i)
          results[i] = q.poll();
        results.total = resultsLen + limitedCount;
        return results;
      };
      var highlight = (result, hOpen, hClose) => {
        if (typeof hOpen === "function")
          return highlightCallback(result, hOpen);
        if (result === NULL)
          return NULL;
        if (hOpen === void 0)
          hOpen = "<b>";
        if (hClose === void 0)
          hClose = "</b>";
        var highlighted = "";
        var matchesIndex = 0;
        var opened = false;
        var target = result.target;
        var targetLen = target.length;
        var indexes2 = result._indexes;
        indexes2 = indexes2.slice(0, indexes2.len).sort((a, b) => a - b);
        for (var i = 0; i < targetLen; ++i) {
          var char = target[i];
          if (indexes2[matchesIndex] === i) {
            ++matchesIndex;
            if (!opened) {
              opened = true;
              highlighted += hOpen;
            }
            if (matchesIndex === indexes2.length) {
              highlighted += char + hClose + target.substr(i + 1);
              break;
            }
          } else {
            if (opened) {
              opened = false;
              highlighted += hClose;
            }
          }
          highlighted += char;
        }
        return highlighted;
      };
      var highlightCallback = (result, cb) => {
        if (result === NULL)
          return NULL;
        var target = result.target;
        var targetLen = target.length;
        var indexes2 = result._indexes;
        indexes2 = indexes2.slice(0, indexes2.len).sort((a, b) => a - b);
        var highlighted = "";
        var matchI = 0;
        var indexesI = 0;
        var opened = false;
        var result = [];
        for (var i = 0; i < targetLen; ++i) {
          var char = target[i];
          if (indexes2[indexesI] === i) {
            ++indexesI;
            if (!opened) {
              opened = true;
              result.push(highlighted);
              highlighted = "";
            }
            if (indexesI === indexes2.length) {
              highlighted += char;
              result.push(cb(highlighted, matchI++));
              highlighted = "";
              result.push(target.substr(i + 1));
              break;
            }
          } else {
            if (opened) {
              opened = false;
              result.push(cb(highlighted, matchI++));
              highlighted = "";
            }
          }
          highlighted += char;
        }
        return result;
      };
      var indexes = (result) => result._indexes.slice(0, result._indexes.len).sort((a, b) => a - b);
      var prepare = (target) => {
        if (typeof target !== "string")
          target = "";
        var info = prepareLowerInfo(target);
        return { "target": target, _targetLower: info._lower, _targetLowerCodes: info.lowerCodes, _nextBeginningIndexes: NULL, _bitflags: info.bitflags, "score": NULL, _indexes: [0], "obj": NULL };
      };
      var prepareSearch = (search) => {
        if (typeof search !== "string")
          search = "";
        search = search.trim();
        var info = prepareLowerInfo(search);
        var spaceSearches = [];
        if (info.containsSpace) {
          var searches = search.split(/\s+/);
          searches = [...new Set(searches)];
          for (var i = 0; i < searches.length; i++) {
            if (searches[i] === "")
              continue;
            var _info = prepareLowerInfo(searches[i]);
            spaceSearches.push({ lowerCodes: _info.lowerCodes, _lower: searches[i].toLowerCase(), containsSpace: false });
          }
        }
        return { lowerCodes: info.lowerCodes, bitflags: info.bitflags, containsSpace: info.containsSpace, _lower: info._lower, spaceSearches };
      };
      var getPrepared = (target) => {
        if (target.length > 999)
          return prepare(target);
        var targetPrepared = preparedCache.get(target);
        if (targetPrepared !== void 0)
          return targetPrepared;
        targetPrepared = prepare(target);
        preparedCache.set(target, targetPrepared);
        return targetPrepared;
      };
      var getPreparedSearch = (search) => {
        if (search.length > 999)
          return prepareSearch(search);
        var searchPrepared = preparedSearchCache.get(search);
        if (searchPrepared !== void 0)
          return searchPrepared;
        searchPrepared = prepareSearch(search);
        preparedSearchCache.set(search, searchPrepared);
        return searchPrepared;
      };
      var all = (search, targets, options) => {
        var results = [];
        results.total = targets.length;
        var limit = options && options.limit || INT_MAX;
        if (options && options.key) {
          for (var i = 0; i < targets.length; i++) {
            var obj = targets[i];
            var target = getValue(obj, options.key);
            if (!target)
              continue;
            if (!isObj(target))
              target = getPrepared(target);
            target.score = INT_MIN;
            target._indexes.len = 0;
            var result = target;
            result = { target: result.target, _targetLower: "", _targetLowerCodes: NULL, _nextBeginningIndexes: NULL, _bitflags: 0, score: target.score, _indexes: NULL, obj };
            results.push(result);
            if (results.length >= limit)
              return results;
          }
        } else if (options && options.keys) {
          for (var i = 0; i < targets.length; i++) {
            var obj = targets[i];
            var objResults = new Array(options.keys.length);
            for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
              var target = getValue(obj, options.keys[keyI]);
              if (!target) {
                objResults[keyI] = NULL;
                continue;
              }
              if (!isObj(target))
                target = getPrepared(target);
              target.score = INT_MIN;
              target._indexes.len = 0;
              objResults[keyI] = target;
            }
            objResults.obj = obj;
            objResults.score = INT_MIN;
            results.push(objResults);
            if (results.length >= limit)
              return results;
          }
        } else {
          for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if (!target)
              continue;
            if (!isObj(target))
              target = getPrepared(target);
            target.score = INT_MIN;
            target._indexes.len = 0;
            results.push(target);
            if (results.length >= limit)
              return results;
          }
        }
        return results;
      };
      var algorithm = (preparedSearch, prepared, allowSpaces = false) => {
        if (allowSpaces === false && preparedSearch.containsSpace)
          return algorithmSpaces(preparedSearch, prepared);
        var searchLower = preparedSearch._lower;
        var searchLowerCodes = preparedSearch.lowerCodes;
        var searchLowerCode = searchLowerCodes[0];
        var targetLowerCodes = prepared._targetLowerCodes;
        var searchLen = searchLowerCodes.length;
        var targetLen = targetLowerCodes.length;
        var searchI = 0;
        var targetI = 0;
        var matchesSimpleLen = 0;
        for (; ; ) {
          var isMatch = searchLowerCode === targetLowerCodes[targetI];
          if (isMatch) {
            matchesSimple[matchesSimpleLen++] = targetI;
            ++searchI;
            if (searchI === searchLen)
              break;
            searchLowerCode = searchLowerCodes[searchI];
          }
          ++targetI;
          if (targetI >= targetLen)
            return NULL;
        }
        var searchI = 0;
        var successStrict = false;
        var matchesStrictLen = 0;
        var nextBeginningIndexes = prepared._nextBeginningIndexes;
        if (nextBeginningIndexes === NULL)
          nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target);
        var firstPossibleI = targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
        var backtrackCount = 0;
        if (targetI !== targetLen)
          for (; ; ) {
            if (targetI >= targetLen) {
              if (searchI <= 0)
                break;
              ++backtrackCount;
              if (backtrackCount > 200)
                break;
              --searchI;
              var lastMatch = matchesStrict[--matchesStrictLen];
              targetI = nextBeginningIndexes[lastMatch];
            } else {
              var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
              if (isMatch) {
                matchesStrict[matchesStrictLen++] = targetI;
                ++searchI;
                if (searchI === searchLen) {
                  successStrict = true;
                  break;
                }
                ++targetI;
              } else {
                targetI = nextBeginningIndexes[targetI];
              }
            }
          }
        var substringIndex = prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
        var isSubstring = ~substringIndex;
        if (isSubstring && !successStrict) {
          for (var i = 0; i < matchesSimpleLen; ++i)
            matchesSimple[i] = substringIndex + i;
        }
        var isSubstringBeginning = false;
        if (isSubstring) {
          isSubstringBeginning = prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
        }
        {
          if (successStrict) {
            var matchesBest = matchesStrict;
            var matchesBestLen = matchesStrictLen;
          } else {
            var matchesBest = matchesSimple;
            var matchesBestLen = matchesSimpleLen;
          }
          var score = 0;
          var extraMatchGroupCount = 0;
          for (var i = 1; i < searchLen; ++i) {
            if (matchesBest[i] - matchesBest[i - 1] !== 1) {
              score -= matchesBest[i];
              ++extraMatchGroupCount;
            }
          }
          var unmatchedDistance = matchesBest[searchLen - 1] - matchesBest[0] - (searchLen - 1);
          score -= (12 + unmatchedDistance) * extraMatchGroupCount;
          if (matchesBest[0] !== 0)
            score -= matchesBest[0] * matchesBest[0] * 0.2;
          if (!successStrict) {
            score *= 1e3;
          } else {
            var uniqueBeginningIndexes = 1;
            for (var i = nextBeginningIndexes[0]; i < targetLen; i = nextBeginningIndexes[i])
              ++uniqueBeginningIndexes;
            if (uniqueBeginningIndexes > 24)
              score *= (uniqueBeginningIndexes - 24) * 10;
          }
          if (isSubstring)
            score /= 1 + searchLen * searchLen * 1;
          if (isSubstringBeginning)
            score /= 1 + searchLen * searchLen * 1;
          score -= targetLen - searchLen;
          prepared.score = score;
          for (var i = 0; i < matchesBestLen; ++i)
            prepared._indexes[i] = matchesBest[i];
          prepared._indexes.len = matchesBestLen;
          return prepared;
        }
      };
      var algorithmSpaces = (preparedSearch, target) => {
        var seen_indexes = /* @__PURE__ */ new Set();
        var score = 0;
        var result = NULL;
        var first_seen_index_last_search = 0;
        var searches = preparedSearch.spaceSearches;
        for (var i = 0; i < searches.length; ++i) {
          var search = searches[i];
          result = algorithm(search, target);
          if (result === NULL)
            return NULL;
          score += result.score;
          if (result._indexes[0] < first_seen_index_last_search) {
            score -= first_seen_index_last_search - result._indexes[0];
          }
          first_seen_index_last_search = result._indexes[0];
          for (var j = 0; j < result._indexes.len; ++j)
            seen_indexes.add(result._indexes[j]);
        }
        var allowSpacesResult = algorithm(
          preparedSearch,
          target,
          /*allowSpaces=*/
          true
        );
        if (allowSpacesResult !== NULL && allowSpacesResult.score > score) {
          return allowSpacesResult;
        }
        result.score = score;
        var i = 0;
        for (let index of seen_indexes)
          result._indexes[i++] = index;
        result._indexes.len = i;
        return result;
      };
      var prepareLowerInfo = (str) => {
        var strLen = str.length;
        var lower = str.toLowerCase();
        var lowerCodes = [];
        var bitflags = 0;
        var containsSpace = false;
        for (var i = 0; i < strLen; ++i) {
          var lowerCode = lowerCodes[i] = lower.charCodeAt(i);
          if (lowerCode === 32) {
            containsSpace = true;
            continue;
          }
          var bit = lowerCode >= 97 && lowerCode <= 122 ? lowerCode - 97 : lowerCode >= 48 && lowerCode <= 57 ? 26 : lowerCode <= 127 ? 30 : 31;
          bitflags |= 1 << bit;
        }
        return { lowerCodes, bitflags, containsSpace, _lower: lower };
      };
      var prepareBeginningIndexes = (target) => {
        var targetLen = target.length;
        var beginningIndexes = [];
        var beginningIndexesLen = 0;
        var wasUpper = false;
        var wasAlphanum = false;
        for (var i = 0; i < targetLen; ++i) {
          var targetCode = target.charCodeAt(i);
          var isUpper = targetCode >= 65 && targetCode <= 90;
          var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
          var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
          wasUpper = isUpper;
          wasAlphanum = isAlphanum;
          if (isBeginning)
            beginningIndexes[beginningIndexesLen++] = i;
        }
        return beginningIndexes;
      };
      var prepareNextBeginningIndexes = (target) => {
        var targetLen = target.length;
        var beginningIndexes = prepareBeginningIndexes(target);
        var nextBeginningIndexes = [];
        var lastIsBeginning = beginningIndexes[0];
        var lastIsBeginningI = 0;
        for (var i = 0; i < targetLen; ++i) {
          if (lastIsBeginning > i) {
            nextBeginningIndexes[i] = lastIsBeginning;
          } else {
            lastIsBeginning = beginningIndexes[++lastIsBeginningI];
            nextBeginningIndexes[i] = lastIsBeginning === void 0 ? targetLen : lastIsBeginning;
          }
        }
        return nextBeginningIndexes;
      };
      var cleanup = () => {
        preparedCache.clear();
        preparedSearchCache.clear();
        matchesSimple = [];
        matchesStrict = [];
      };
      var preparedCache = /* @__PURE__ */ new Map();
      var preparedSearchCache = /* @__PURE__ */ new Map();
      var matchesSimple = [];
      var matchesStrict = [];
      var defaultScoreFn = (a) => {
        var max = INT_MIN;
        var len = a.length;
        for (var i = 0; i < len; ++i) {
          var result = a[i];
          if (result === NULL)
            continue;
          var score = result.score;
          if (score > max)
            max = score;
        }
        if (max === INT_MIN)
          return NULL;
        return max;
      };
      var getValue = (obj, prop) => {
        var tmp = obj[prop];
        if (tmp !== void 0)
          return tmp;
        var segs = prop;
        if (!Array.isArray(prop))
          segs = prop.split(".");
        var len = segs.length;
        var i = -1;
        while (obj && ++i < len)
          obj = obj[segs[i]];
        return obj;
      };
      var isObj = (x) => {
        return typeof x === "object";
      };
      var INT_MAX = Infinity;
      var INT_MIN = -INT_MAX;
      var noResults = [];
      noResults.total = 0;
      var NULL = null;
      var fastpriorityqueue = (r) => {
        var e = [], o = 0, a = {}, v = (r2) => {
          for (var a2 = 0, v2 = e[a2], c = 1; c < o; ) {
            var s = c + 1;
            a2 = c, s < o && e[s].score < e[c].score && (a2 = s), e[a2 - 1 >> 1] = e[a2], c = 1 + (a2 << 1);
          }
          for (var f = a2 - 1 >> 1; a2 > 0 && v2.score < e[f].score; f = (a2 = f) - 1 >> 1)
            e[a2] = e[f];
          e[a2] = v2;
        };
        return a.add = (r2) => {
          var a2 = o;
          e[o++] = r2;
          for (var v2 = a2 - 1 >> 1; a2 > 0 && r2.score < e[v2].score; v2 = (a2 = v2) - 1 >> 1)
            e[a2] = e[v2];
          e[a2] = r2;
        }, a.poll = (r2) => {
          if (0 !== o) {
            var a2 = e[0];
            return e[0] = e[--o], v(), a2;
          }
        }, a.peek = (r2) => {
          if (0 !== o)
            return e[0];
        }, a.replaceTop = (r2) => {
          e[0] = r2, v();
        }, a;
      };
      var q = fastpriorityqueue();
      return { "single": single, "go": go, "highlight": highlight, "prepare": prepare, "indexes": indexes, "cleanup": cleanup };
    });
  }
});
export default require_fuzzysort();
//# sourceMappingURL=fuzzysort.js.map
