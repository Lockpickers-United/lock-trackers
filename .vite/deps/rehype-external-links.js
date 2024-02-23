import {
  esm_default,
  parse,
  visit
} from "./chunk-PSIPRC5M.js";
import "./chunk-WXXH56N5.js";

// node_modules/hast-util-is-element/lib/index.js
var convertElement = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends TestFunction>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &
   *   (<Condition extends string>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &
   *   ((test?: null | undefined) => (element?: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test | null | undefined} [test]
   * @returns {Check}
   */
  function(test) {
    if (test === null || test === void 0) {
      return element;
    }
    if (typeof test === "string") {
      return tagNameFactory(test);
    }
    if (typeof test === "object") {
      return anyFactory(test);
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    throw new Error("Expected function, string, or array as `test`");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convertElement(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters))
        return true;
    }
    return false;
  }
}
function tagNameFactory(check) {
  return castFactory(tagName);
  function tagName(element2) {
    return element2.tagName === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(
      looksLikeAnElement(value) && testFunction.call(
        this,
        value,
        typeof index === "number" ? index : void 0,
        parent || void 0
      )
    );
  }
}
function element(element2) {
  return Boolean(
    element2 && typeof element2 === "object" && "type" in element2 && element2.type === "element" && "tagName" in element2 && typeof element2.tagName === "string"
  );
}
function looksLikeAnElement(value) {
  return value !== null && typeof value === "object" && "type" in value && "tagName" in value;
}

// node_modules/is-absolute-url/index.js
var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
var WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/;
function isAbsoluteUrl(url) {
  if (typeof url !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }
  if (WINDOWS_PATH_REGEX.test(url)) {
    return false;
  }
  return ABSOLUTE_URL_REGEX.test(url);
}

// node_modules/rehype-external-links/lib/index.js
var defaultProtocols = ["http", "https"];
var defaultRel = ["nofollow"];
var emptyOptions = {};
function rehypeExternalLinks(options) {
  const settings = options || emptyOptions;
  const protocols = settings.protocols || defaultProtocols;
  const is = convertElement(settings.test);
  return function(tree) {
    visit(tree, "element", function(node, index, parent) {
      if (node.tagName === "a" && typeof node.properties.href === "string" && is(node, index, parent)) {
        const url = node.properties.href;
        if (isAbsoluteUrl(url) ? protocols.includes(url.slice(0, url.indexOf(":"))) : url.startsWith("//")) {
          const contentRaw = createIfNeeded(settings.content, node);
          const content = contentRaw && !Array.isArray(contentRaw) ? [contentRaw] : contentRaw;
          const relRaw = createIfNeeded(settings.rel, node) || defaultRel;
          const rel = typeof relRaw === "string" ? parse(relRaw) : relRaw;
          const target = createIfNeeded(settings.target, node);
          const properties = createIfNeeded(settings.properties, node);
          if (properties) {
            Object.assign(node.properties, esm_default(properties));
          }
          if (rel.length > 0) {
            node.properties.rel = [...rel];
          }
          if (target) {
            node.properties.target = target;
          }
          if (content) {
            const properties2 = createIfNeeded(settings.contentProperties, node) || {};
            node.children.push({
              type: "element",
              tagName: "span",
              properties: esm_default(properties2),
              children: esm_default(content)
            });
          }
        }
      }
    });
  };
}
function createIfNeeded(value, element2) {
  return typeof value === "function" ? value(element2) : value;
}
export {
  rehypeExternalLinks as default
};
//# sourceMappingURL=rehype-external-links.js.map
