import {
  capitalize_default,
  init_capitalize
} from "./chunk-2BM7AL6D.js";
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

// node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
init_objectWithoutPropertiesLoose();
init_extends();
init_composeClasses();
init_clsx();
var import_prop_types = __toESM(require_prop_types());
var React = __toESM(require_react());
init_styled();
init_useThemeProps();
init_capitalize();

// node_modules/@mui/material/ImageListItemBar/imageListItemBarClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getImageListItemBarUtilityClass(slot) {
  return generateUtilityClass("MuiImageListItemBar", slot);
}
var imageListItemBarClasses = generateUtilityClasses("MuiImageListItemBar", ["root", "positionBottom", "positionTop", "positionBelow", "titleWrap", "titleWrapBottom", "titleWrapTop", "titleWrapBelow", "titleWrapActionPosLeft", "titleWrapActionPosRight", "title", "subtitle", "actionIcon", "actionIconActionPosLeft", "actionIconActionPosRight"]);
var imageListItemBarClasses_default = imageListItemBarClasses;

// node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["actionIcon", "actionPosition", "className", "subtitle", "title", "position"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    position,
    actionIcon,
    actionPosition
  } = ownerState;
  const slots = {
    root: ["root", `position${capitalize_default(position)}`],
    titleWrap: ["titleWrap", `titleWrap${capitalize_default(position)}`, actionIcon && `titleWrapActionPos${capitalize_default(actionPosition)}`],
    title: ["title"],
    subtitle: ["subtitle"],
    actionIcon: ["actionIcon", `actionIconActionPos${capitalize_default(actionPosition)}`]
  };
  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};
var ImageListItemBarRoot = styled_default("div", {
  name: "MuiImageListItemBar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${capitalize_default(ownerState.position)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  return _extends({
    position: "absolute",
    left: 0,
    right: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    fontFamily: theme.typography.fontFamily
  }, ownerState.position === "bottom" && {
    bottom: 0
  }, ownerState.position === "top" && {
    top: 0
  }, ownerState.position === "below" && {
    position: "relative",
    background: "transparent",
    alignItems: "normal"
  });
});
var ImageListItemBarTitleWrap = styled_default("div", {
  name: "MuiImageListItemBar",
  slot: "TitleWrap",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.titleWrap, styles[`titleWrap${capitalize_default(ownerState.position)}`], ownerState.actionIcon && styles[`titleWrapActionPos${capitalize_default(ownerState.actionPosition)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  return _extends({
    flexGrow: 1,
    padding: "12px 16px",
    color: (theme.vars || theme).palette.common.white,
    overflow: "hidden"
  }, ownerState.position === "below" && {
    padding: "6px 0 12px",
    color: "inherit"
  }, ownerState.actionIcon && ownerState.actionPosition === "left" && {
    paddingLeft: 0
  }, ownerState.actionIcon && ownerState.actionPosition === "right" && {
    paddingRight: 0
  });
});
var ImageListItemBarTitle = styled_default("div", {
  name: "MuiImageListItemBar",
  slot: "Title",
  overridesResolver: (props, styles) => styles.title
})(({
  theme
}) => {
  return {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: "24px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  };
});
var ImageListItemBarSubtitle = styled_default("div", {
  name: "MuiImageListItemBar",
  slot: "Subtitle",
  overridesResolver: (props, styles) => styles.subtitle
})(({
  theme
}) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  };
});
var ImageListItemBarActionIcon = styled_default("div", {
  name: "MuiImageListItemBar",
  slot: "ActionIcon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.actionIcon, styles[`actionIconActionPos${capitalize_default(ownerState.actionPosition)}`]];
  }
})(({
  ownerState
}) => {
  return _extends({}, ownerState.actionPosition === "left" && {
    order: -1
  });
});
var ImageListItemBar = React.forwardRef(function ImageListItemBar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiImageListItemBar"
  });
  const {
    actionIcon,
    actionPosition = "right",
    className,
    subtitle,
    title,
    position = "bottom"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    position,
    actionPosition
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime2.jsxs)(ImageListItemBarRoot, _extends({
    ownerState,
    className: clsx_default(classes.root, className),
    ref
  }, other, {
    children: [(0, import_jsx_runtime2.jsxs)(ImageListItemBarTitleWrap, {
      ownerState,
      className: classes.titleWrap,
      children: [(0, import_jsx_runtime.jsx)(ImageListItemBarTitle, {
        className: classes.title,
        children: title
      }), subtitle ? (0, import_jsx_runtime.jsx)(ImageListItemBarSubtitle, {
        className: classes.subtitle,
        children: subtitle
      }) : null]
    }), actionIcon ? (0, import_jsx_runtime.jsx)(ImageListItemBarActionIcon, {
      ownerState,
      className: classes.actionIcon,
      children: actionIcon
    }) : null]
  }));
});
true ? ImageListItemBar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: import_prop_types.default.node,
  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: import_prop_types.default.oneOf(["left", "right"]),
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
   * Position of the title bar.
   * @default 'bottom'
   */
  position: import_prop_types.default.oneOf(["below", "bottom", "top"]),
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: import_prop_types.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * Title to be displayed.
   */
  title: import_prop_types.default.node
} : void 0;
var ImageListItemBar_default = ImageListItemBar;

export {
  getImageListItemBarUtilityClass,
  imageListItemBarClasses_default,
  ImageListItemBar_default
};
//# sourceMappingURL=chunk-YDIFXNT2.js.map
