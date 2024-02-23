import {
  ImageListContext_default
} from "./chunk-MA55FXRA.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-KSWPDCMO.js";
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
  init_esm,
  init_extends,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_useThemeProps,
  integerPropType_default,
  require_react_is,
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

// node_modules/@mui/material/ImageListItem/ImageListItem.js
init_objectWithoutPropertiesLoose();
init_extends();
init_composeClasses();
init_esm();
init_clsx();
var import_prop_types = __toESM(require_prop_types());
var React = __toESM(require_react());
var import_react_is = __toESM(require_react_is());
init_styled();
init_useThemeProps();
init_isMuiElement();

// node_modules/@mui/material/ImageListItem/imageListItemClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getImageListItemUtilityClass(slot) {
  return generateUtilityClass("MuiImageListItem", slot);
}
var imageListItemClasses = generateUtilityClasses("MuiImageListItem", ["root", "img", "standard", "woven", "masonry", "quilted"]);
var imageListItemClasses_default = imageListItemClasses;

// node_modules/@mui/material/ImageListItem/ImageListItem.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "cols", "component", "rows", "style"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant],
    img: ["img"]
  };
  return composeClasses(slots, getImageListItemUtilityClass, classes);
};
var ImageListItemRoot = styled_default("li", {
  name: "MuiImageListItem",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${imageListItemClasses_default.img}`]: styles.img
    }, styles.root, styles[ownerState.variant]];
  }
})(({
  ownerState
}) => _extends({
  display: "block",
  position: "relative"
}, ownerState.variant === "standard" && {
  // For titlebar under list item
  display: "flex",
  flexDirection: "column"
}, ownerState.variant === "woven" && {
  height: "100%",
  alignSelf: "center",
  "&:nth-of-type(even)": {
    height: "70%"
  }
}, {
  [`& .${imageListItemClasses_default.img}`]: _extends({
    objectFit: "cover",
    width: "100%",
    height: "100%",
    display: "block"
  }, ownerState.variant === "standard" && {
    height: "auto",
    flexGrow: 1
  })
}));
var ImageListItem = React.forwardRef(function ImageListItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiImageListItem"
  });
  const {
    children,
    className,
    cols = 1,
    component = "li",
    rows = 1,
    style
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    rowHeight = "auto",
    gap,
    variant
  } = React.useContext(ImageListContext_default);
  let height = "auto";
  if (variant === "woven") {
    height = void 0;
  } else if (rowHeight !== "auto") {
    height = rowHeight * rows + gap * (rows - 1);
  }
  const ownerState = _extends({}, props, {
    cols,
    component,
    gap,
    rowHeight,
    rows,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(ImageListItemRoot, _extends({
    as: component,
    className: clsx_default(classes.root, classes[variant], className),
    ref,
    style: _extends({
      height,
      gridColumnEnd: variant !== "masonry" ? `span ${cols}` : void 0,
      gridRowEnd: variant !== "masonry" ? `span ${rows}` : void 0,
      marginBottom: variant === "masonry" ? gap : void 0,
      breakInside: variant === "masonry" ? "avoid" : void 0
    }, style),
    ownerState
  }, other, {
    children: React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      if (true) {
        if ((0, import_react_is.isFragment)(child)) {
          console.error(["MUI: The ImageListItem component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      if (child.type === "img" || isMuiElement_default(child, ["Image"])) {
        return React.cloneElement(child, {
          className: clsx_default(classes.img, child.props.className)
        });
      }
      return child;
    })
  }));
});
true ? ImageListItem.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `<img>`.
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
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: integerPropType_default,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: integerPropType_default,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var ImageListItem_default = ImageListItem;

export {
  getImageListItemUtilityClass,
  imageListItemClasses_default,
  ImageListItem_default
};
//# sourceMappingURL=chunk-7L6O4OIU.js.map
