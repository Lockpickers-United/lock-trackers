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

// node_modules/@mui/material/DialogActions/DialogActions.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/DialogActions/dialogActionsClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass("MuiDialogActions", slot);
}
var dialogActionsClasses = generateUtilityClasses("MuiDialogActions", ["root", "spacing"]);
var dialogActionsClasses_default = dialogActionsClasses;

// node_modules/@mui/material/DialogActions/DialogActions.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "disableSpacing"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    disableSpacing
  } = ownerState;
  const slots = {
    root: ["root", !disableSpacing && "spacing"]
  };
  return composeClasses(slots, getDialogActionsUtilityClass, classes);
};
var DialogActionsRoot = styled_default("div", {
  name: "MuiDialogActions",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  alignItems: "center",
  padding: 8,
  justifyContent: "flex-end",
  flex: "0 0 auto"
}, !ownerState.disableSpacing && {
  "& > :not(style) ~ :not(style)": {
    marginLeft: 8
  }
}));
var DialogActions = React.forwardRef(function DialogActions2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDialogActions"
  });
  const {
    className,
    disableSpacing = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    disableSpacing
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(DialogActionsRoot, _extends({
    className: clsx_default(classes.root, className),
    ownerState,
    ref
  }, other));
});
true ? DialogActions.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var DialogActions_default = DialogActions;

export {
  getDialogActionsUtilityClass,
  dialogActionsClasses_default,
  DialogActions_default
};
//# sourceMappingURL=chunk-OOXZEKMW.js.map
