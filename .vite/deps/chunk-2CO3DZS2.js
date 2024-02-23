import {
  Typography_default
} from "./chunk-EUHWYJZB.js";
import {
  init_composeClasses
} from "./chunk-DOXINDPB.js";
import {
  init_styled,
  styled_default
} from "./chunk-25NJGCRO.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_extends,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-WTE66XJJ.js";
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
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/CardHeader/CardHeader.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_useThemeProps();
init_styled();

// node_modules/@mui/material/CardHeader/cardHeaderClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass("MuiCardHeader", slot);
}
var cardHeaderClasses = generateUtilityClasses("MuiCardHeader", ["root", "avatar", "action", "content", "title", "subheader"]);
var cardHeaderClasses_default = cardHeaderClasses;

// node_modules/@mui/material/CardHeader/CardHeader.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["action", "avatar", "className", "component", "disableTypography", "subheader", "subheaderTypographyProps", "title", "titleTypographyProps"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    avatar: ["avatar"],
    action: ["action"],
    content: ["content"],
    title: ["title"],
    subheader: ["subheader"]
  };
  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};
var CardHeaderRoot = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Root",
  overridesResolver: (props, styles) => _extends({
    [`& .${cardHeaderClasses_default.title}`]: styles.title,
    [`& .${cardHeaderClasses_default.subheader}`]: styles.subheader
  }, styles.root)
})({
  display: "flex",
  alignItems: "center",
  padding: 16
});
var CardHeaderAvatar = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Avatar",
  overridesResolver: (props, styles) => styles.avatar
})({
  display: "flex",
  flex: "0 0 auto",
  marginRight: 16
});
var CardHeaderAction = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  flex: "0 0 auto",
  alignSelf: "flex-start",
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
var CardHeaderContent = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Content",
  overridesResolver: (props, styles) => styles.content
})({
  flex: "1 1 auto"
});
var CardHeader = React.forwardRef(function CardHeader2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardHeader"
  });
  const {
    action,
    avatar,
    className,
    component = "div",
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    disableTypography
  });
  const classes = useUtilityClasses(ownerState);
  let title = titleProp;
  if (title != null && title.type !== Typography_default && !disableTypography) {
    title = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: avatar ? "body2" : "h5",
      className: classes.title,
      component: "span",
      display: "block"
    }, titleTypographyProps, {
      children: title
    }));
  }
  let subheader = subheaderProp;
  if (subheader != null && subheader.type !== Typography_default && !disableTypography) {
    subheader = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: avatar ? "body2" : "body1",
      className: classes.subheader,
      color: "text.secondary",
      component: "span",
      display: "block"
    }, subheaderTypographyProps, {
      children: subheader
    }));
  }
  return (0, import_jsx_runtime2.jsxs)(CardHeaderRoot, _extends({
    className: clsx_default(classes.root, className),
    as: component,
    ref,
    ownerState
  }, other, {
    children: [avatar && (0, import_jsx_runtime.jsx)(CardHeaderAvatar, {
      className: classes.avatar,
      ownerState,
      children: avatar
    }), (0, import_jsx_runtime2.jsxs)(CardHeaderContent, {
      className: classes.content,
      ownerState,
      children: [title, subheader]
    }), action && (0, import_jsx_runtime.jsx)(CardHeaderAction, {
      className: classes.action,
      ownerState,
      children: action
    })]
  }));
});
true ? CardHeader.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display in the card header.
   */
  action: import_prop_types.default.node,
  /**
   * The Avatar element to display.
   */
  avatar: import_prop_types.default.node,
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: import_prop_types.default.bool,
  /**
   * The content of the component.
   */
  subheader: import_prop_types.default.node,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   */
  subheaderTypographyProps: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The content of the component.
   */
  title: import_prop_types.default.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps: import_prop_types.default.object
} : void 0;
var CardHeader_default = CardHeader;

export {
  getCardHeaderUtilityClass,
  cardHeaderClasses_default,
  CardHeader_default
};
//# sourceMappingURL=chunk-2CO3DZS2.js.map
