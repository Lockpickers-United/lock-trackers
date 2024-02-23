import {
  ArrowDropDownIcon,
  CalendarIcon,
  DEFAULT_DESKTOP_MODE_MEDIA_QUERY,
  DIALOG_WIDTH,
  DayCalendar,
  MAX_CALENDAR_HEIGHT,
  PickerViewRoot,
  PickersArrowSwitcher,
  PickersToolbar,
  SECTION_TYPE_GRANULARITY,
  VIEW_HEIGHT,
  _objectWithoutPropertiesLoose,
  applyDefaultDate,
  applyDefaultViewProps,
  composeClasses,
  extractValidationProps,
  findClosestEnabledDate,
  generateUtilityClass,
  generateUtilityClasses,
  getMonthsInYear,
  isDatePickerView,
  mergeDateAndTime,
  refType_default,
  resolveComponentProps,
  resolveDateFormat,
  singleItemFieldValueManager,
  singleItemValueManager,
  splitFieldInternalAndForwardedProps,
  uncapitalizeObjectKeys,
  useCalendarState,
  useClearableField,
  useControlled,
  useControlledValueWithTimezone,
  useDefaultDates,
  useDefaultReduceAnimations,
  useDesktopPicker,
  useEnhancedEffect_default,
  useEventCallback_default,
  useField,
  useForkRef,
  useId,
  useLocaleText,
  useMobilePicker,
  useNextMonthDisabled,
  useNow,
  usePreviousMonthDisabled,
  useSlotProps,
  useUtils,
  useViews,
  validateDate
} from "./chunk-4GQSH2DB.js";
import {
  _extends
} from "./chunk-FSLIEGQF.js";
import {
  useMediaQuery
} from "./chunk-US4CS5BH.js";
import {
  TextField_default
} from "./chunk-ZIWKL3QB.js";
import {
  Fade_default
} from "./chunk-D6FP3J4Z.js";
import {
  IconButton_default
} from "./chunk-KPCZEGE2.js";
import {
  Typography_default
} from "./chunk-NUSCNWFA.js";
import {
  useTheme
} from "./chunk-LDJGHHXU.js";
import {
  TransitionGroup_default
} from "./chunk-OB46IE4A.js";
import {
  styled_default
} from "./chunk-M2QJNYU2.js";
import {
  alpha,
  clsx_default,
  init_clsx,
  init_esm2 as init_esm,
  require_prop_types,
  useThemeProps2 as useThemeProps,
  useTheme_default
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

// node_modules/@mui/x-date-pickers/DatePicker/DatePicker.js
var React14 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());

// node_modules/@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker.js
var React12 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());

// node_modules/@mui/x-date-pickers/DatePicker/shared.js
var React2 = __toESM(require_react());

// node_modules/@mui/x-date-pickers/DatePicker/DatePickerToolbar.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/x-date-pickers/DatePicker/datePickerToolbarClasses.js
function getDatePickerToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiDatePickerToolbar", slot);
}
var datePickerToolbarClasses = generateUtilityClasses("MuiDatePickerToolbar", ["root", "title"]);

// node_modules/@mui/x-date-pickers/DatePicker/DatePickerToolbar.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["value", "isLandscape", "onChange", "toolbarFormat", "toolbarPlaceholder", "views"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    title: ["title"]
  };
  return composeClasses(slots, getDatePickerToolbarUtilityClass, classes);
};
var DatePickerToolbarRoot = styled_default(PickersToolbar, {
  name: "MuiDatePickerToolbar",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})({});
var DatePickerToolbarTitle = styled_default(Typography_default, {
  name: "MuiDatePickerToolbar",
  slot: "Title",
  overridesResolver: (_, styles) => styles.title
})(({
  ownerState
}) => _extends({}, ownerState.isLandscape && {
  margin: "auto 16px auto auto"
}));
var DatePickerToolbar = React.forwardRef(function DatePickerToolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDatePickerToolbar"
  });
  const {
    value,
    isLandscape,
    toolbarFormat,
    toolbarPlaceholder = "––",
    views
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const utils = useUtils();
  const localeText = useLocaleText();
  const classes = useUtilityClasses(props);
  const dateText = React.useMemo(() => {
    if (!value) {
      return toolbarPlaceholder;
    }
    const formatFromViews = resolveDateFormat(utils, {
      format: toolbarFormat,
      views
    }, true);
    return utils.formatByString(value, formatFromViews);
  }, [value, toolbarFormat, toolbarPlaceholder, utils, views]);
  const ownerState = props;
  return (0, import_jsx_runtime.jsx)(DatePickerToolbarRoot, _extends({
    ref,
    toolbarTitle: localeText.datePickerToolbarTitle,
    isLandscape,
    className: classes.root
  }, other, {
    children: (0, import_jsx_runtime.jsx)(DatePickerToolbarTitle, {
      variant: "h4",
      align: isLandscape ? "left" : "center",
      ownerState,
      className: classes.title,
      children: dateText
    })
  }));
});
true ? DatePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types.default.object,
  /**
   * className applied to the root component.
   */
  className: import_prop_types.default.string,
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: import_prop_types.default.bool,
  isLandscape: import_prop_types.default.bool.isRequired,
  onChange: import_prop_types.default.func.isRequired,
  /**
   * Callback called when a toolbar is clicked
   * @template TView
   * @param {TView} view The view to open
   */
  onViewChange: import_prop_types.default.func.isRequired,
  readOnly: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  titleId: import_prop_types.default.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: import_prop_types.default.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: import_prop_types.default.node,
  value: import_prop_types.default.any,
  /**
   * Currently visible picker view.
   */
  view: import_prop_types.default.oneOf(["day", "month", "year"]).isRequired,
  views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["day", "month", "year"]).isRequired).isRequired
} : void 0;

// node_modules/@mui/x-date-pickers/DatePicker/shared.js
function useDatePickerDefaultizedProps(props, name) {
  var _themeProps$slots, _themeProps$disableFu, _themeProps$disablePa, _themeProps$slotProps;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  const localeText = React2.useMemo(() => {
    var _themeProps$localeTex;
    if (((_themeProps$localeTex = themeProps.localeText) == null ? void 0 : _themeProps$localeTex.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      datePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  const slots = (_themeProps$slots = themeProps.slots) != null ? _themeProps$slots : uncapitalizeObjectKeys(themeProps.components);
  return _extends({}, themeProps, {
    localeText
  }, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ["year", "day"],
    defaultOpenTo: "day"
  }), {
    disableFuture: (_themeProps$disableFu = themeProps.disableFuture) != null ? _themeProps$disableFu : false,
    disablePast: (_themeProps$disablePa = themeProps.disablePast) != null ? _themeProps$disablePa : false,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
    slots: _extends({
      toolbar: DatePickerToolbar
    }, slots),
    slotProps: (_themeProps$slotProps = themeProps.slotProps) != null ? _themeProps$slotProps : themeProps.componentsProps
  });
}

// node_modules/@mui/x-date-pickers/DateField/DateField.js
var React3 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/x-date-pickers/DateField/useDateField.js
var useDefaultizedDateField = (props) => {
  var _props$disablePast, _props$disableFuture, _props$format;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  });
};
var useDateField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, "date");
  return useField({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateDate,
    valueType: "date"
  });
};

// node_modules/@mui/x-date-pickers/DateField/DateField.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["components", "componentsProps", "slots", "slotProps", "InputProps", "inputProps"];
var _excluded22 = ["inputRef"];
var _excluded3 = ["ref", "onPaste", "onKeyDown", "inputMode", "readOnly", "clearable", "onClear"];
var DateField = React3.forwardRef(function DateField2(inProps, ref) {
  var _ref, _slots$textField, _slotProps$textField;
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiDateField"
  });
  const {
    components,
    componentsProps,
    slots,
    slotProps,
    InputProps,
    inputProps
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded2);
  const ownerState = themeProps;
  const TextField = (_ref = (_slots$textField = slots == null ? void 0 : slots.textField) != null ? _slots$textField : components == null ? void 0 : components.TextField) != null ? _ref : TextField_default;
  const _useSlotProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: (_slotProps$textField = slotProps == null ? void 0 : slotProps.textField) != null ? _slotProps$textField : componentsProps == null ? void 0 : componentsProps.textField,
    externalForwardedProps: other,
    ownerState
  }), {
    inputRef: externalInputRef
  } = _useSlotProps, textFieldProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded22);
  textFieldProps.inputProps = _extends({}, inputProps, textFieldProps.inputProps);
  textFieldProps.InputProps = _extends({}, InputProps, textFieldProps.InputProps);
  const _useDateField = useDateField({
    props: textFieldProps,
    inputRef: externalInputRef
  }), {
    ref: inputRef,
    onPaste,
    onKeyDown,
    inputMode,
    readOnly,
    clearable,
    onClear
  } = _useDateField, fieldProps = _objectWithoutPropertiesLoose(_useDateField, _excluded3);
  const {
    InputProps: ProcessedInputProps,
    fieldProps: processedFieldProps
  } = useClearableField({
    onClear,
    clearable,
    fieldProps,
    InputProps: fieldProps.InputProps,
    slots,
    slotProps,
    components,
    componentsProps
  });
  return (0, import_jsx_runtime2.jsx)(TextField, _extends({
    ref
  }, processedFieldProps, {
    InputProps: _extends({}, ProcessedInputProps, {
      readOnly
    }),
    inputProps: _extends({}, fieldProps.inputProps, {
      inputMode,
      onPaste,
      onKeyDown,
      ref: inputRef
    })
  }));
});
true ? DateField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: import_prop_types2.default.bool,
  className: import_prop_types2.default.string,
  /**
   * If `true`, a clear button will be shown in the field allowing value clearing.
   * @default false
   */
  clearable: import_prop_types2.default.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types2.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]),
  component: import_prop_types2.default.elementType,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types2.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types2.default.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types2.default.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types2.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types2.default.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: import_prop_types2.default.bool,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: import_prop_types2.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types2.default.oneOf(["dense", "spacious"]),
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: import_prop_types2.default.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types2.default.bool,
  /**
   * The helper text content.
   */
  helperText: import_prop_types2.default.node,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: import_prop_types2.default.bool,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: import_prop_types2.default.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: import_prop_types2.default.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types2.default.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: import_prop_types2.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types2.default.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: import_prop_types2.default.oneOf(["dense", "none", "normal"]),
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types2.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types2.default.any,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types2.default.string,
  onBlur: import_prop_types2.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types2.default.func,
  /**
   * Callback fired when the clear button is clicked.
   */
  onClear: import_prop_types2.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types2.default.func,
  onFocus: import_prop_types2.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types2.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly: import_prop_types2.default.bool,
  /**
   * The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
   * For example, on time fields it will be used to determine the date to set.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
   */
  referenceDate: import_prop_types2.default.any,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: import_prop_types2.default.bool,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["all", "day", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types2.default.number, import_prop_types2.default.shape({
    endIndex: import_prop_types2.default.number.isRequired,
    startIndex: import_prop_types2.default.number.isRequired
  })]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types2.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types2.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types2.default.func,
  /**
   * If `true`, the format will respect the leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
   * If `false`, the format will always add leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
   *
   * Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (e.g: "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
   *
   * Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
   * If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
   *
   * Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
   * This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
   *
   * @default `false`
   */
  shouldRespectLeadingZeros: import_prop_types2.default.bool,
  /**
   * The size of the component.
   */
  size: import_prop_types2.default.oneOf(["medium", "small"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types2.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types2.default.object,
  style: import_prop_types2.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types2.default.string,
  /**
   * The ref object used to imperatively interact with the field.
   */
  unstableFieldRef: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types2.default.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: import_prop_types2.default.oneOf(["filled", "outlined", "standard"])
} : void 0;

// node_modules/@mui/x-date-pickers/dateViewRenderers/dateViewRenderers.js
var React11 = __toESM(require_react());

// node_modules/@mui/x-date-pickers/DateCalendar/DateCalendar.js
var React10 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
init_clsx();

// node_modules/@mui/x-date-pickers/DateCalendar/PickersFadeTransitionGroup.js
var React4 = __toESM(require_react());
init_clsx();

// node_modules/@mui/x-date-pickers/DateCalendar/pickersFadeTransitionGroupClasses.js
var getPickersFadeTransitionGroupUtilityClass = (slot) => generateUtilityClass("MuiPickersFadeTransitionGroup", slot);
var pickersFadeTransitionGroupClasses = generateUtilityClasses("MuiPickersFadeTransitionGroup", ["root"]);

// node_modules/@mui/x-date-pickers/DateCalendar/PickersFadeTransitionGroup.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var useUtilityClasses2 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getPickersFadeTransitionGroupUtilityClass, classes);
};
var PickersFadeTransitionGroupRoot = styled_default(TransitionGroup_default, {
  name: "MuiPickersFadeTransitionGroup",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})({
  display: "block",
  position: "relative"
});
function PickersFadeTransitionGroup(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersFadeTransitionGroup"
  });
  const {
    children,
    className,
    reduceAnimations,
    transKey
  } = props;
  const classes = useUtilityClasses2(props);
  const theme = useTheme();
  if (reduceAnimations) {
    return children;
  }
  return (0, import_jsx_runtime3.jsx)(PickersFadeTransitionGroupRoot, {
    className: clsx_default(classes.root, className),
    children: (0, import_jsx_runtime3.jsx)(Fade_default, {
      appear: false,
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: {
        appear: theme.transitions.duration.enteringScreen,
        enter: theme.transitions.duration.enteringScreen,
        exit: 0
      },
      children
    }, transKey)
  });
}

// node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendar.js
var React6 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_clsx();
init_esm();

// node_modules/@mui/x-date-pickers/MonthCalendar/PickersMonth.js
var React5 = __toESM(require_react());

// node_modules/@mui/x-date-pickers/MonthCalendar/pickersMonthClasses.js
function getPickersMonthUtilityClass(slot) {
  return generateUtilityClass("MuiPickersMonth", slot);
}
var pickersMonthClasses = generateUtilityClasses("MuiPickersMonth", ["root", "monthButton", "disabled", "selected"]);

// node_modules/@mui/x-date-pickers/MonthCalendar/PickersMonth.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded4 = ["autoFocus", "children", "disabled", "selected", "value", "tabIndex", "onClick", "onKeyDown", "onFocus", "onBlur", "aria-current", "aria-label", "monthsPerRow"];
var useUtilityClasses3 = (ownerState) => {
  const {
    disabled,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    monthButton: ["monthButton", disabled && "disabled", selected && "selected"]
  };
  return composeClasses(slots, getPickersMonthUtilityClass, classes);
};
var PickersMonthRoot = styled_default("div", {
  name: "MuiPickersMonth",
  slot: "Root",
  overridesResolver: (_, styles) => [styles.root]
})(({
  ownerState
}) => ({
  flexBasis: ownerState.monthsPerRow === 3 ? "33.3%" : "25%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
var PickersMonthButton = styled_default("button", {
  name: "MuiPickersMonth",
  slot: "MonthButton",
  overridesResolver: (_, styles) => [styles.monthButton, {
    [`&.${pickersMonthClasses.disabled}`]: styles.disabled
  }, {
    [`&.${pickersMonthClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  color: "unset",
  backgroundColor: "transparent",
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  margin: "8px 0",
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:disabled": {
    cursor: "auto",
    pointerEvents: "none"
  },
  [`&.${pickersMonthClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.secondary
  },
  [`&.${pickersMonthClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    "&:focus, &:hover": {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  }
}));
var PickersMonth = React5.memo(function PickersMonth2(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersMonth"
  });
  const {
    autoFocus,
    children,
    disabled,
    selected,
    value,
    tabIndex,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    "aria-current": ariaCurrent,
    "aria-label": ariaLabel
    // We don't want to forward this prop to the root element
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const ref = React5.useRef(null);
  const classes = useUtilityClasses3(props);
  useEnhancedEffect_default(() => {
    if (autoFocus) {
      var _ref$current;
      (_ref$current = ref.current) == null || _ref$current.focus();
    }
  }, [autoFocus]);
  return (0, import_jsx_runtime4.jsx)(PickersMonthRoot, _extends({
    className: classes.root,
    ownerState: props
  }, other, {
    children: (0, import_jsx_runtime4.jsx)(PickersMonthButton, {
      ref,
      disabled,
      type: "button",
      role: "radio",
      tabIndex: disabled ? -1 : tabIndex,
      "aria-current": ariaCurrent,
      "aria-checked": selected,
      "aria-label": ariaLabel,
      onClick: (event) => onClick(event, value),
      onKeyDown: (event) => onKeyDown(event, value),
      onFocus: (event) => onFocus(event, value),
      onBlur: (event) => onBlur(event, value),
      className: classes.monthButton,
      ownerState: props,
      children
    })
  }));
});

// node_modules/@mui/x-date-pickers/MonthCalendar/monthCalendarClasses.js
function getMonthCalendarUtilityClass(slot) {
  return generateUtilityClass("MuiMonthCalendar", slot);
}
var monthCalendarClasses = generateUtilityClasses("MuiMonthCalendar", ["root"]);

// node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendar.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var _excluded5 = ["className", "value", "defaultValue", "referenceDate", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "shouldDisableMonth", "readOnly", "disableHighlightToday", "autoFocus", "onMonthFocus", "hasFocus", "onFocusedViewChange", "monthsPerRow", "timezone", "gridLabelId"];
var useUtilityClasses4 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getMonthCalendarUtilityClass, classes);
};
function useMonthCalendarDefaultizedProps(props, name) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  return _extends({
    disableFuture: false,
    disablePast: false
  }, themeProps, {
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}
var MonthCalendarRoot = styled_default("div", {
  name: "MuiMonthCalendar",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "stretch",
  padding: "0 4px",
  width: DIALOG_WIDTH,
  // avoid padding increasing width over defined
  boxSizing: "border-box"
});
var MonthCalendar = React6.forwardRef(function MonthCalendar2(inProps, ref) {
  const props = useMonthCalendarDefaultizedProps(inProps, "MuiMonthCalendar");
  const {
    className,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    shouldDisableMonth,
    readOnly,
    disableHighlightToday,
    autoFocus = false,
    onMonthFocus,
    hasFocus,
    onFocusedViewChange,
    monthsPerRow = 3,
    timezone: timezoneProp,
    gridLabelId
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValueWithTimezone({
    name: "MonthCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: singleItemValueManager
  });
  const now = useNow(timezone);
  const theme = useTheme_default();
  const utils = useUtils();
  const referenceDate = React6.useMemo(
    () => singleItemValueManager.getInitialReferenceValue({
      value,
      utils,
      props,
      timezone,
      referenceDate: referenceDateProp,
      granularity: SECTION_TYPE_GRANULARITY.month
    }),
    []
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  const ownerState = props;
  const classes = useUtilityClasses4(ownerState);
  const todayMonth = React6.useMemo(() => utils.getMonth(now), [utils, now]);
  const selectedMonth = React6.useMemo(() => {
    if (value != null) {
      return utils.getMonth(value);
    }
    if (disableHighlightToday) {
      return null;
    }
    return utils.getMonth(referenceDate);
  }, [value, utils, disableHighlightToday, referenceDate]);
  const [focusedMonth, setFocusedMonth] = React6.useState(() => selectedMonth || todayMonth);
  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: "MonthCalendar",
    state: "hasFocus",
    controlled: hasFocus,
    default: autoFocus != null ? autoFocus : false
  });
  const changeHasFocus = useEventCallback_default((newHasFocus) => {
    setInternalHasFocus(newHasFocus);
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });
  const isMonthDisabled = React6.useCallback((dateToValidate) => {
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    const monthToValidate = utils.startOfMonth(dateToValidate);
    if (utils.isBefore(monthToValidate, firstEnabledMonth)) {
      return true;
    }
    if (utils.isAfter(monthToValidate, lastEnabledMonth)) {
      return true;
    }
    if (!shouldDisableMonth) {
      return false;
    }
    return shouldDisableMonth(monthToValidate);
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableMonth, utils]);
  const handleMonthSelection = useEventCallback_default((event, month) => {
    if (readOnly) {
      return;
    }
    const newDate = utils.setMonth(value != null ? value : referenceDate, month);
    handleValueChange(newDate);
  });
  const focusMonth = useEventCallback_default((month) => {
    if (!isMonthDisabled(utils.setMonth(value != null ? value : referenceDate, month))) {
      setFocusedMonth(month);
      changeHasFocus(true);
      if (onMonthFocus) {
        onMonthFocus(month);
      }
    }
  });
  React6.useEffect(() => {
    setFocusedMonth((prevFocusedMonth) => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
  }, [selectedMonth]);
  const handleKeyDown = useEventCallback_default((event, month) => {
    const monthsInYear = 12;
    const monthsInRow = 3;
    switch (event.key) {
      case "ArrowUp":
        focusMonth((monthsInYear + month - monthsInRow) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowDown":
        focusMonth((monthsInYear + month + monthsInRow) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowLeft":
        focusMonth((monthsInYear + month + (theme.direction === "ltr" ? -1 : 1)) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowRight":
        focusMonth((monthsInYear + month + (theme.direction === "ltr" ? 1 : -1)) % monthsInYear);
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  const handleMonthFocus = useEventCallback_default((event, month) => {
    focusMonth(month);
  });
  const handleMonthBlur = useEventCallback_default((event, month) => {
    if (focusedMonth === month) {
      changeHasFocus(false);
    }
  });
  return (0, import_jsx_runtime5.jsx)(MonthCalendarRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState,
    role: "radiogroup",
    "aria-labelledby": gridLabelId
  }, other, {
    children: getMonthsInYear(utils, value != null ? value : referenceDate).map((month) => {
      const monthNumber = utils.getMonth(month);
      const monthText = utils.format(month, "monthShort");
      const monthLabel = utils.format(month, "month");
      const isSelected = monthNumber === selectedMonth;
      const isDisabled = disabled || isMonthDisabled(month);
      return (0, import_jsx_runtime5.jsx)(PickersMonth, {
        selected: isSelected,
        value: monthNumber,
        onClick: handleMonthSelection,
        onKeyDown: handleKeyDown,
        autoFocus: internalHasFocus && monthNumber === focusedMonth,
        disabled: isDisabled,
        tabIndex: monthNumber === focusedMonth ? 0 : -1,
        onFocus: handleMonthFocus,
        onBlur: handleMonthBlur,
        "aria-current": todayMonth === monthNumber ? "date" : void 0,
        "aria-label": monthLabel,
        monthsPerRow,
        children: monthText
      }, monthText);
    })
  }));
});
true ? MonthCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: import_prop_types3.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types3.default.object,
  /**
   * className applied to the root element.
   */
  className: import_prop_types3.default.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types3.default.any,
  /**
   * If `true` picker is disabled
   */
  disabled: import_prop_types3.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types3.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types3.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types3.default.bool,
  gridLabelId: import_prop_types3.default.string,
  hasFocus: import_prop_types3.default.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types3.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types3.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types3.default.oneOf([3, 4]),
  /**
   * Callback fired when the value changes.
   * @template TDate
   * @param {TDate} value The new value.
   */
  onChange: import_prop_types3.default.func,
  onFocusedViewChange: import_prop_types3.default.func,
  onMonthFocus: import_prop_types3.default.func,
  /**
   * If `true` picker is readonly
   */
  readOnly: import_prop_types3.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid month using the validation props, except callbacks such as `shouldDisableMonth`.
   */
  referenceDate: import_prop_types3.default.any,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types3.default.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types3.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types3.default.any
} : void 0;

// node_modules/@mui/x-date-pickers/YearCalendar/YearCalendar.js
var React8 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
init_clsx();
init_esm();

// node_modules/@mui/x-date-pickers/YearCalendar/PickersYear.js
var React7 = __toESM(require_react());
init_clsx();

// node_modules/@mui/x-date-pickers/YearCalendar/pickersYearClasses.js
function getPickersYearUtilityClass(slot) {
  return generateUtilityClass("MuiPickersYear", slot);
}
var pickersYearClasses = generateUtilityClasses("MuiPickersYear", ["root", "yearButton", "selected", "disabled"]);

// node_modules/@mui/x-date-pickers/YearCalendar/PickersYear.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var _excluded6 = ["autoFocus", "className", "children", "disabled", "selected", "value", "tabIndex", "onClick", "onKeyDown", "onFocus", "onBlur", "aria-current", "yearsPerRow"];
var useUtilityClasses5 = (ownerState) => {
  const {
    disabled,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    yearButton: ["yearButton", disabled && "disabled", selected && "selected"]
  };
  return composeClasses(slots, getPickersYearUtilityClass, classes);
};
var PickersYearRoot = styled_default("div", {
  name: "MuiPickersYear",
  slot: "Root",
  overridesResolver: (_, styles) => [styles.root]
})(({
  ownerState
}) => ({
  flexBasis: ownerState.yearsPerRow === 3 ? "33.3%" : "25%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
var PickersYearButton = styled_default("button", {
  name: "MuiPickersYear",
  slot: "YearButton",
  overridesResolver: (_, styles) => [styles.yearButton, {
    [`&.${pickersYearClasses.disabled}`]: styles.disabled
  }, {
    [`&.${pickersYearClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  color: "unset",
  backgroundColor: "transparent",
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  margin: "6px 0",
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.action.active, theme.palette.action.focusOpacity)
  },
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:disabled": {
    cursor: "auto",
    pointerEvents: "none"
  },
  [`&.${pickersYearClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.secondary
  },
  [`&.${pickersYearClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    "&:focus, &:hover": {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  }
}));
var PickersYear = React7.memo(function PickersYear2(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersYear"
  });
  const {
    autoFocus,
    className,
    children,
    disabled,
    selected,
    value,
    tabIndex,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    "aria-current": ariaCurrent
    // We don't want to forward this prop to the root element
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const ref = React7.useRef(null);
  const classes = useUtilityClasses5(props);
  React7.useEffect(() => {
    if (autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);
  return (0, import_jsx_runtime6.jsx)(PickersYearRoot, _extends({
    className: clsx_default(classes.root, className),
    ownerState: props
  }, other, {
    children: (0, import_jsx_runtime6.jsx)(PickersYearButton, {
      ref,
      disabled,
      type: "button",
      role: "radio",
      tabIndex: disabled ? -1 : tabIndex,
      "aria-current": ariaCurrent,
      "aria-checked": selected,
      onClick: (event) => onClick(event, value),
      onKeyDown: (event) => onKeyDown(event, value),
      onFocus: (event) => onFocus(event, value),
      onBlur: (event) => onBlur(event, value),
      className: classes.yearButton,
      ownerState: props,
      children
    })
  }));
});

// node_modules/@mui/x-date-pickers/YearCalendar/yearCalendarClasses.js
function getYearCalendarUtilityClass(slot) {
  return generateUtilityClass("MuiYearCalendar", slot);
}
var yearCalendarClasses = generateUtilityClasses("MuiYearCalendar", ["root"]);

// node_modules/@mui/x-date-pickers/YearCalendar/YearCalendar.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var _excluded7 = ["autoFocus", "className", "value", "defaultValue", "referenceDate", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "readOnly", "shouldDisableYear", "disableHighlightToday", "onYearFocus", "hasFocus", "onFocusedViewChange", "yearsPerRow", "timezone", "gridLabelId"];
var useUtilityClasses6 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getYearCalendarUtilityClass, classes);
};
function useYearCalendarDefaultizedProps(props, name) {
  var _themeProps$yearsPerR;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  return _extends({
    disablePast: false,
    disableFuture: false
  }, themeProps, {
    yearsPerRow: (_themeProps$yearsPerR = themeProps.yearsPerRow) != null ? _themeProps$yearsPerR : 3,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}
var YearCalendarRoot = styled_default("div", {
  name: "MuiYearCalendar",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  overflowY: "auto",
  height: "100%",
  padding: "0 4px",
  width: DIALOG_WIDTH,
  maxHeight: MAX_CALENDAR_HEIGHT,
  // avoid padding increasing width over defined
  boxSizing: "border-box",
  position: "relative"
});
var YearCalendar = React8.forwardRef(function YearCalendar2(inProps, ref) {
  const props = useYearCalendarDefaultizedProps(inProps, "MuiYearCalendar");
  const {
    autoFocus,
    className,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    readOnly,
    shouldDisableYear,
    disableHighlightToday,
    onYearFocus,
    hasFocus,
    onFocusedViewChange,
    yearsPerRow,
    timezone: timezoneProp,
    gridLabelId
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValueWithTimezone({
    name: "YearCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: singleItemValueManager
  });
  const now = useNow(timezone);
  const theme = useTheme_default();
  const utils = useUtils();
  const referenceDate = React8.useMemo(
    () => singleItemValueManager.getInitialReferenceValue({
      value,
      utils,
      props,
      timezone,
      referenceDate: referenceDateProp,
      granularity: SECTION_TYPE_GRANULARITY.year
    }),
    []
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  const ownerState = props;
  const classes = useUtilityClasses6(ownerState);
  const todayYear = React8.useMemo(() => utils.getYear(now), [utils, now]);
  const selectedYear = React8.useMemo(() => {
    if (value != null) {
      return utils.getYear(value);
    }
    if (disableHighlightToday) {
      return null;
    }
    return utils.getYear(referenceDate);
  }, [value, utils, disableHighlightToday, referenceDate]);
  const [focusedYear, setFocusedYear] = React8.useState(() => selectedYear || todayYear);
  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: "YearCalendar",
    state: "hasFocus",
    controlled: hasFocus,
    default: autoFocus != null ? autoFocus : false
  });
  const changeHasFocus = useEventCallback_default((newHasFocus) => {
    setInternalHasFocus(newHasFocus);
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });
  const isYearDisabled = React8.useCallback((dateToValidate) => {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }
    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }
    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }
    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }
    if (!shouldDisableYear) {
      return false;
    }
    const yearToValidate = utils.startOfYear(dateToValidate);
    return shouldDisableYear(yearToValidate);
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableYear, utils]);
  const handleYearSelection = useEventCallback_default((event, year) => {
    if (readOnly) {
      return;
    }
    const newDate = utils.setYear(value != null ? value : referenceDate, year);
    handleValueChange(newDate);
  });
  const focusYear = useEventCallback_default((year) => {
    if (!isYearDisabled(utils.setYear(value != null ? value : referenceDate, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus == null || onYearFocus(year);
    }
  });
  React8.useEffect(() => {
    setFocusedYear((prevFocusedYear) => selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear);
  }, [selectedYear]);
  const handleKeyDown = useEventCallback_default((event, year) => {
    switch (event.key) {
      case "ArrowUp":
        focusYear(year - yearsPerRow);
        event.preventDefault();
        break;
      case "ArrowDown":
        focusYear(year + yearsPerRow);
        event.preventDefault();
        break;
      case "ArrowLeft":
        focusYear(year + (theme.direction === "ltr" ? -1 : 1));
        event.preventDefault();
        break;
      case "ArrowRight":
        focusYear(year + (theme.direction === "ltr" ? 1 : -1));
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  const handleYearFocus = useEventCallback_default((event, year) => {
    focusYear(year);
  });
  const handleYearBlur = useEventCallback_default((event, year) => {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  });
  const scrollerRef = React8.useRef(null);
  const handleRef = useForkRef(ref, scrollerRef);
  React8.useEffect(() => {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }
    const tabbableButton = scrollerRef.current.querySelector('[tabindex="0"]');
    if (!tabbableButton) {
      return;
    }
    const offsetHeight = tabbableButton.offsetHeight;
    const offsetTop = tabbableButton.offsetTop;
    const clientHeight = scrollerRef.current.clientHeight;
    const scrollTop = scrollerRef.current.scrollTop;
    const elementBottom = offsetTop + offsetHeight;
    if (offsetHeight > clientHeight || offsetTop < scrollTop) {
      return;
    }
    scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
  }, [autoFocus]);
  return (0, import_jsx_runtime7.jsx)(YearCalendarRoot, _extends({
    ref: handleRef,
    className: clsx_default(classes.root, className),
    ownerState,
    role: "radiogroup",
    "aria-labelledby": gridLabelId
  }, other, {
    children: utils.getYearRange(minDate, maxDate).map((year) => {
      const yearNumber = utils.getYear(year);
      const isSelected = yearNumber === selectedYear;
      const isDisabled = disabled || isYearDisabled(year);
      return (0, import_jsx_runtime7.jsx)(PickersYear, {
        selected: isSelected,
        value: yearNumber,
        onClick: handleYearSelection,
        onKeyDown: handleKeyDown,
        autoFocus: internalHasFocus && yearNumber === focusedYear,
        disabled: isDisabled,
        tabIndex: yearNumber === focusedYear ? 0 : -1,
        onFocus: handleYearFocus,
        onBlur: handleYearBlur,
        "aria-current": todayYear === yearNumber ? "date" : void 0,
        yearsPerRow,
        children: utils.format(year, "year")
      }, utils.format(year, "year"));
    })
  }));
});
true ? YearCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: import_prop_types4.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * className applied to the root element.
   */
  className: import_prop_types4.default.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types4.default.any,
  /**
   * If `true` picker is disabled
   */
  disabled: import_prop_types4.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types4.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types4.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types4.default.bool,
  gridLabelId: import_prop_types4.default.string,
  hasFocus: import_prop_types4.default.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types4.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types4.default.any,
  /**
   * Callback fired when the value changes.
   * @template TDate
   * @param {TDate} value The new value.
   */
  onChange: import_prop_types4.default.func,
  onFocusedViewChange: import_prop_types4.default.func,
  onYearFocus: import_prop_types4.default.func,
  /**
   * If `true` picker is readonly
   */
  readOnly: import_prop_types4.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid year using the validation props, except callbacks such as `shouldDisableYear`.
   */
  referenceDate: import_prop_types4.default.any,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types4.default.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types4.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types4.default.any,
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types4.default.oneOf([3, 4])
} : void 0;

// node_modules/@mui/x-date-pickers/PickersCalendarHeader/pickersCalendarHeaderClasses.js
var getPickersCalendarHeaderUtilityClass = (slot) => generateUtilityClass("MuiPickersCalendarHeader", slot);
var pickersCalendarHeaderClasses = generateUtilityClasses("MuiPickersCalendarHeader", ["root", "labelContainer", "label", "switchViewButton", "switchViewIcon"]);

// node_modules/@mui/x-date-pickers/PickersCalendarHeader/PickersCalendarHeader.js
var React9 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
init_clsx();
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var _excluded8 = ["slots", "slotProps", "components", "componentsProps", "currentMonth", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onMonthChange", "onViewChange", "view", "reduceAnimations", "views", "labelId", "className", "timezone"];
var _excluded23 = ["ownerState"];
var useUtilityClasses7 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    labelContainer: ["labelContainer"],
    label: ["label"],
    switchViewButton: ["switchViewButton"],
    switchViewIcon: ["switchViewIcon"]
  };
  return composeClasses(slots, getPickersCalendarHeaderUtilityClass, classes);
};
var PickersCalendarHeaderRoot = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})({
  display: "flex",
  alignItems: "center",
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 30,
  minHeight: 30
});
var PickersCalendarHeaderLabelContainer = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "LabelContainer",
  overridesResolver: (_, styles) => styles.labelContainer
})(({
  theme
}) => _extends({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "auto"
}, theme.typography.body1, {
  fontWeight: theme.typography.fontWeightMedium
}));
var PickersCalendarHeaderLabel = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "Label",
  overridesResolver: (_, styles) => styles.label
})({
  marginRight: 6
});
var PickersCalendarHeaderSwitchViewButton = styled_default(IconButton_default, {
  name: "MuiPickersCalendarHeader",
  slot: "SwitchViewButton",
  overridesResolver: (_, styles) => styles.switchViewButton
})(({
  ownerState
}) => _extends({
  marginRight: "auto"
}, ownerState.view === "year" && {
  [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: {
    transform: "rotate(180deg)"
  }
}));
var PickersCalendarHeaderSwitchViewIcon = styled_default(ArrowDropDownIcon, {
  name: "MuiPickersCalendarHeader",
  slot: "SwitchViewIcon",
  overridesResolver: (_, styles) => styles.switchViewIcon
})(({
  theme
}) => ({
  willChange: "transform",
  transition: theme.transitions.create("transform"),
  transform: "rotate(0deg)"
}));
var PickersCalendarHeader = React9.forwardRef(function PickersCalendarHeader2(inProps, ref) {
  var _ref, _slots$switchViewButt, _ref2, _slots$switchViewIcon;
  const localeText = useLocaleText();
  const utils = useUtils();
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersCalendarHeader"
  });
  const {
    slots,
    slotProps,
    components,
    currentMonth: month,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    view,
    reduceAnimations,
    views,
    labelId,
    className,
    timezone
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const ownerState = props;
  const classes = useUtilityClasses7(props);
  const SwitchViewButton = (_ref = (_slots$switchViewButt = slots == null ? void 0 : slots.switchViewButton) != null ? _slots$switchViewButt : components == null ? void 0 : components.SwitchViewButton) != null ? _ref : PickersCalendarHeaderSwitchViewButton;
  const switchViewButtonProps = useSlotProps({
    elementType: SwitchViewButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.switchViewButton,
    additionalProps: {
      size: "small",
      "aria-label": localeText.calendarViewSwitchingButtonAriaLabel(view)
    },
    ownerState,
    className: classes.switchViewButton
  });
  const SwitchViewIcon = (_ref2 = (_slots$switchViewIcon = slots == null ? void 0 : slots.switchViewIcon) != null ? _slots$switchViewIcon : components == null ? void 0 : components.SwitchViewIcon) != null ? _ref2 : PickersCalendarHeaderSwitchViewIcon;
  const _useSlotProps = useSlotProps({
    elementType: SwitchViewIcon,
    externalSlotProps: slotProps == null ? void 0 : slotProps.switchViewIcon,
    ownerState: void 0,
    className: classes.switchViewIcon
  }), switchViewIconProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded23);
  const selectNextMonth = () => onMonthChange(utils.addMonths(month, 1), "left");
  const selectPreviousMonth = () => onMonthChange(utils.addMonths(month, -1), "right");
  const isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture,
    maxDate,
    timezone
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast,
    minDate,
    timezone
  });
  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }
    if (views.length === 2) {
      onViewChange(views.find((el) => el !== view) || views[0]);
    } else {
      const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };
  if (views.length === 1 && views[0] === "year") {
    return null;
  }
  return (0, import_jsx_runtime9.jsxs)(PickersCalendarHeaderRoot, _extends({}, other, {
    ownerState,
    className: clsx_default(className, classes.root),
    ref,
    children: [(0, import_jsx_runtime9.jsxs)(PickersCalendarHeaderLabelContainer, {
      role: "presentation",
      onClick: handleToggleView,
      ownerState,
      "aria-live": "polite",
      className: classes.labelContainer,
      children: [(0, import_jsx_runtime8.jsx)(PickersFadeTransitionGroup, {
        reduceAnimations,
        transKey: utils.format(month, "monthAndYear"),
        children: (0, import_jsx_runtime8.jsx)(PickersCalendarHeaderLabel, {
          id: labelId,
          ownerState,
          className: classes.label,
          children: utils.format(month, "monthAndYear")
        })
      }), views.length > 1 && !disabled && (0, import_jsx_runtime8.jsx)(SwitchViewButton, _extends({}, switchViewButtonProps, {
        children: (0, import_jsx_runtime8.jsx)(SwitchViewIcon, _extends({}, switchViewIconProps))
      }))]
    }), (0, import_jsx_runtime8.jsx)(Fade_default, {
      in: view === "day",
      children: (0, import_jsx_runtime8.jsx)(PickersArrowSwitcher, {
        slots,
        slotProps,
        onGoToPrevious: selectPreviousMonth,
        isPreviousDisabled: isPreviousMonthDisabled,
        previousLabel: localeText.previousMonth,
        onGoToNext: selectNextMonth,
        isNextDisabled: isNextMonthDisabled,
        nextLabel: localeText.nextMonth
      })
    })]
  }));
});
true ? PickersCalendarHeader.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types5.default.object,
  /**
   * className applied to the root element.
   */
  className: import_prop_types5.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types5.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types5.default.object,
  currentMonth: import_prop_types5.default.any.isRequired,
  disabled: import_prop_types5.default.bool,
  disableFuture: import_prop_types5.default.bool,
  disablePast: import_prop_types5.default.bool,
  labelId: import_prop_types5.default.string,
  maxDate: import_prop_types5.default.any.isRequired,
  minDate: import_prop_types5.default.any.isRequired,
  onMonthChange: import_prop_types5.default.func.isRequired,
  onViewChange: import_prop_types5.default.func,
  reduceAnimations: import_prop_types5.default.bool.isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types5.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types5.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object]),
  timezone: import_prop_types5.default.string.isRequired,
  view: import_prop_types5.default.oneOf(["day", "month", "year"]).isRequired,
  views: import_prop_types5.default.arrayOf(import_prop_types5.default.oneOf(["day", "month", "year"]).isRequired).isRequired
} : void 0;

// node_modules/@mui/x-date-pickers/DateCalendar/dateCalendarClasses.js
var getDateCalendarUtilityClass = (slot) => generateUtilityClass("MuiDateCalendar", slot);
var dateCalendarClasses = generateUtilityClasses("MuiDateCalendar", ["root", "viewTransitionContainer"]);

// node_modules/@mui/x-date-pickers/DateCalendar/DateCalendar.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var _excluded9 = ["autoFocus", "onViewChange", "value", "defaultValue", "referenceDate", "disableFuture", "disablePast", "defaultCalendarMonth", "onChange", "onYearChange", "onMonthChange", "reduceAnimations", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear", "view", "views", "openTo", "className", "disabled", "readOnly", "minDate", "maxDate", "disableHighlightToday", "focusedView", "onFocusedViewChange", "showDaysOutsideCurrentMonth", "fixedWeekNumber", "dayOfWeekFormatter", "components", "componentsProps", "slots", "slotProps", "loading", "renderLoading", "displayWeekNumber", "yearsPerRow", "monthsPerRow", "timezone"];
var useUtilityClasses8 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    viewTransitionContainer: ["viewTransitionContainer"]
  };
  return composeClasses(slots, getDateCalendarUtilityClass, classes);
};
function useDateCalendarDefaultizedProps(props, name) {
  var _themeProps$loading, _themeProps$disablePa, _themeProps$disableFu, _themeProps$openTo, _themeProps$views, _themeProps$reduceAni, _themeProps$renderLoa;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const defaultReduceAnimations = useDefaultReduceAnimations();
  const themeProps = useThemeProps({
    props,
    name
  });
  return _extends({}, themeProps, {
    loading: (_themeProps$loading = themeProps.loading) != null ? _themeProps$loading : false,
    disablePast: (_themeProps$disablePa = themeProps.disablePast) != null ? _themeProps$disablePa : false,
    disableFuture: (_themeProps$disableFu = themeProps.disableFuture) != null ? _themeProps$disableFu : false,
    openTo: (_themeProps$openTo = themeProps.openTo) != null ? _themeProps$openTo : "day",
    views: (_themeProps$views = themeProps.views) != null ? _themeProps$views : ["year", "day"],
    reduceAnimations: (_themeProps$reduceAni = themeProps.reduceAnimations) != null ? _themeProps$reduceAni : defaultReduceAnimations,
    renderLoading: (_themeProps$renderLoa = themeProps.renderLoading) != null ? _themeProps$renderLoa : () => (0, import_jsx_runtime10.jsx)("span", {
      children: "..."
    }),
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}
var DateCalendarRoot = styled_default(PickerViewRoot, {
  name: "MuiDateCalendar",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "flex",
  flexDirection: "column",
  height: VIEW_HEIGHT
});
var DateCalendarViewTransitionContainer = styled_default(PickersFadeTransitionGroup, {
  name: "MuiDateCalendar",
  slot: "ViewTransitionContainer",
  overridesResolver: (props, styles) => styles.viewTransitionContainer
})({});
var DateCalendar = React10.forwardRef(function DateCalendar2(inProps, ref) {
  var _ref, _slots$calendarHeader, _slotProps$calendarHe;
  const utils = useUtils();
  const id = useId();
  const props = useDateCalendarDefaultizedProps(inProps, "MuiDateCalendar");
  const {
    autoFocus,
    onViewChange,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disableFuture,
    disablePast,
    defaultCalendarMonth,
    onChange,
    onYearChange,
    onMonthChange,
    reduceAnimations,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    view: inView,
    views,
    openTo,
    className,
    disabled,
    readOnly,
    minDate,
    maxDate,
    disableHighlightToday,
    focusedView: inFocusedView,
    onFocusedViewChange,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    dayOfWeekFormatter,
    components,
    componentsProps,
    slots,
    slotProps,
    loading,
    renderLoading,
    displayWeekNumber,
    yearsPerRow,
    monthsPerRow,
    timezone: timezoneProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValueWithTimezone({
    name: "DateCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: singleItemValueManager
  });
  const {
    view,
    setView,
    focusedView,
    setFocusedView,
    goToNextView,
    setValueAndGoToNextView
  } = useViews({
    view: inView,
    views,
    openTo,
    onChange: handleValueChange,
    onViewChange,
    autoFocus,
    focusedView: inFocusedView,
    onFocusedViewChange
  });
  const {
    referenceDate,
    calendarState,
    changeFocusedDay,
    changeMonth,
    handleChangeMonth,
    isDateDisabled,
    onMonthSwitchingAnimationEnd
  } = useCalendarState({
    value,
    defaultCalendarMonth,
    referenceDate: referenceDateProp,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture,
    timezone
  });
  const minDateWithDisabled = disabled && value || minDate;
  const maxDateWithDisabled = disabled && value || maxDate;
  const gridLabelId = `${id}-grid-label`;
  const hasFocus = focusedView !== null;
  const CalendarHeader = (_ref = (_slots$calendarHeader = slots == null ? void 0 : slots.calendarHeader) != null ? _slots$calendarHeader : components == null ? void 0 : components.CalendarHeader) != null ? _ref : PickersCalendarHeader;
  const calendarHeaderProps = useSlotProps({
    elementType: CalendarHeader,
    externalSlotProps: (_slotProps$calendarHe = slotProps == null ? void 0 : slotProps.calendarHeader) != null ? _slotProps$calendarHe : componentsProps == null ? void 0 : componentsProps.calendarHeader,
    additionalProps: {
      views,
      view,
      currentMonth: calendarState.currentMonth,
      onViewChange: setView,
      onMonthChange: (newMonth, direction) => handleChangeMonth({
        newMonth,
        direction
      }),
      minDate: minDateWithDisabled,
      maxDate: maxDateWithDisabled,
      disabled,
      disablePast,
      disableFuture,
      reduceAnimations,
      timezone,
      labelId: gridLabelId,
      slots,
      slotProps
    },
    ownerState: props
  });
  const handleDateMonthChange = useEventCallback_default((newDate) => {
    const startOfMonth = utils.startOfMonth(newDate);
    const endOfMonth = utils.endOfMonth(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
      maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled,
      timezone
    }) : newDate;
    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, "finish");
      onMonthChange == null || onMonthChange(startOfMonth);
    } else {
      goToNextView();
      changeMonth(startOfMonth);
    }
    changeFocusedDay(closestEnabledDate, true);
  });
  const handleDateYearChange = useEventCallback_default((newDate) => {
    const startOfYear = utils.startOfYear(newDate);
    const endOfYear = utils.endOfYear(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfYear) ? startOfYear : minDate,
      maxDate: utils.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled,
      timezone
    }) : newDate;
    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, "finish");
      onYearChange == null || onYearChange(closestEnabledDate);
    } else {
      goToNextView();
      changeMonth(startOfYear);
    }
    changeFocusedDay(closestEnabledDate, true);
  });
  const handleSelectedDayChange = useEventCallback_default((day) => {
    if (day) {
      return handleValueChange(mergeDateAndTime(utils, day, value != null ? value : referenceDate), "finish", view);
    }
    return handleValueChange(day, "finish", view);
  });
  React10.useEffect(() => {
    if (value != null && utils.isValid(value)) {
      changeMonth(value);
    }
  }, [value]);
  const ownerState = props;
  const classes = useUtilityClasses8(ownerState);
  const baseDateValidationProps = {
    disablePast,
    disableFuture,
    maxDate,
    minDate
  };
  const commonViewProps = {
    disableHighlightToday,
    readOnly,
    disabled,
    timezone,
    gridLabelId
  };
  const prevOpenViewRef = React10.useRef(view);
  React10.useEffect(() => {
    if (prevOpenViewRef.current === view) {
      return;
    }
    if (focusedView === prevOpenViewRef.current) {
      setFocusedView(view, true);
    }
    prevOpenViewRef.current = view;
  }, [focusedView, setFocusedView, view]);
  const selectedDays = React10.useMemo(() => [value], [value]);
  return (0, import_jsx_runtime11.jsxs)(DateCalendarRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState
  }, other, {
    children: [(0, import_jsx_runtime10.jsx)(CalendarHeader, _extends({}, calendarHeaderProps)), (0, import_jsx_runtime10.jsx)(DateCalendarViewTransitionContainer, {
      reduceAnimations,
      className: classes.viewTransitionContainer,
      transKey: view,
      ownerState,
      children: (0, import_jsx_runtime11.jsxs)("div", {
        children: [view === "year" && (0, import_jsx_runtime10.jsx)(YearCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
          value,
          onChange: handleDateYearChange,
          shouldDisableYear,
          hasFocus,
          onFocusedViewChange: (isViewFocused) => setFocusedView("year", isViewFocused),
          yearsPerRow,
          referenceDate
        })), view === "month" && (0, import_jsx_runtime10.jsx)(MonthCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
          hasFocus,
          className,
          value,
          onChange: handleDateMonthChange,
          shouldDisableMonth,
          onFocusedViewChange: (isViewFocused) => setFocusedView("month", isViewFocused),
          monthsPerRow,
          referenceDate
        })), view === "day" && (0, import_jsx_runtime10.jsx)(DayCalendar, _extends({}, calendarState, baseDateValidationProps, commonViewProps, {
          onMonthSwitchingAnimationEnd,
          onFocusedDayChange: changeFocusedDay,
          reduceAnimations,
          selectedDays,
          onSelectedDaysChange: handleSelectedDayChange,
          shouldDisableDate,
          shouldDisableMonth,
          shouldDisableYear,
          hasFocus,
          onFocusedViewChange: (isViewFocused) => setFocusedView("day", isViewFocused),
          showDaysOutsideCurrentMonth,
          fixedWeekNumber,
          dayOfWeekFormatter,
          displayWeekNumber,
          components,
          componentsProps,
          slots,
          slotProps,
          loading,
          renderLoading
        }))]
      })
    })]
  }));
});
true ? DateCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types6.default.bool,
  classes: import_prop_types6.default.object,
  className: import_prop_types6.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types6.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types6.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types6.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types6.default.any,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types6.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types6.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types6.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types6.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types6.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types6.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types6.default.number,
  /**
   * Controlled focused view.
   */
  focusedView: import_prop_types6.default.oneOf(["day", "month", "year"]),
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types6.default.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types6.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types6.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types6.default.oneOf([3, 4]),
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TView The view type. Will be one of date or time views.
   * @param {TValue} value The new value.
   * @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
   * @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
   */
  onChange: import_prop_types6.default.func,
  /**
   * Callback fired on focused view change.
   * @template TView
   * @param {TView} view The new view to focus or not.
   * @param {boolean} hasFocus `true` if the view should be focused.
   */
  onFocusedViewChange: import_prop_types6.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types6.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types6.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types6.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types6.default.oneOf(["day", "month", "year"]),
  /**
   * Make picker read only.
   * @default false
   */
  readOnly: import_prop_types6.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types6.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`.
   */
  referenceDate: import_prop_types6.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types6.default.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types6.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types6.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types6.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types6.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types6.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types6.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types6.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types6.default.oneOf(["day", "month", "year"]),
  /**
   * Available views.
   */
  views: import_prop_types6.default.arrayOf(import_prop_types6.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types6.default.oneOf([3, 4])
} : void 0;

// node_modules/@mui/x-date-pickers/dateViewRenderers/dateViewRenderers.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var renderDateViewCalendar = ({
  view,
  onViewChange,
  views,
  focusedView,
  onFocusedViewChange,
  value,
  defaultValue,
  referenceDate,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  reduceAnimations,
  onMonthChange,
  monthsPerRow,
  onYearChange,
  yearsPerRow,
  defaultCalendarMonth,
  components,
  componentsProps,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  sx,
  autoFocus,
  fixedWeekNumber,
  displayWeekNumber,
  timezone
}) => (0, import_jsx_runtime12.jsx)(DateCalendar, {
  view,
  onViewChange,
  views: views.filter(isDatePickerView),
  focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
  onFocusedViewChange,
  value,
  defaultValue,
  referenceDate,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  reduceAnimations,
  onMonthChange,
  monthsPerRow,
  onYearChange,
  yearsPerRow,
  defaultCalendarMonth,
  components,
  componentsProps,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  sx,
  autoFocus,
  fixedWeekNumber,
  displayWeekNumber,
  timezone
});

// node_modules/@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker.js
var DesktopDatePicker = React12.forwardRef(function DesktopDatePicker2(inProps, ref) {
  var _defaultizedProps$yea, _defaultizedProps$slo2, _props$localeText$ope, _props$localeText;
  const localeText = useLocaleText();
  const utils = useUtils();
  const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiDesktopDatePicker");
  const viewRenderers = _extends({
    day: renderDateViewCalendar,
    month: renderDateViewCalendar,
    year: renderDateViewCalendar
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    viewRenderers,
    format: resolveDateFormat(utils, defaultizedProps, false),
    yearsPerRow: (_defaultizedProps$yea = defaultizedProps.yearsPerRow) != null ? _defaultizedProps$yea : 4,
    slots: _extends({
      openPickerIcon: CalendarIcon,
      field: DateField
    }, defaultizedProps.slots),
    slotProps: _extends({}, defaultizedProps.slotProps, {
      field: (ownerState) => {
        var _defaultizedProps$slo;
        return _extends({}, resolveComponentProps((_defaultizedProps$slo = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo.field, ownerState), extractValidationProps(defaultizedProps), {
          ref
        });
      },
      toolbar: _extends({
        hidden: true
      }, (_defaultizedProps$slo2 = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo2.toolbar)
    })
  });
  const {
    renderPicker
  } = useDesktopPicker({
    props,
    valueManager: singleItemValueManager,
    valueType: "date",
    getOpenDialogAriaText: (_props$localeText$ope = (_props$localeText = props.localeText) == null ? void 0 : _props$localeText.openDatePickerDialogue) != null ? _props$localeText$ope : localeText.openDatePickerDialogue,
    validator: validateDate
  });
  return renderPicker();
});
DesktopDatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types7.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types7.default.string,
  /**
   * If `true`, the popover or modal will close after submitting the full date.
   * @default `true` for desktop, `false` for mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: import_prop_types7.default.bool,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types7.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types7.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types7.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types7.default.any,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types7.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types7.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types7.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types7.default.bool,
  /**
   * If `true`, the open picker button will not be rendered (renders only the field).
   * @default false
   */
  disableOpenPicker: import_prop_types7.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types7.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types7.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types7.default.number,
  /**
   * Format of the date when rendered in the input(s).
   * Defaults to localized format based on the used `views`.
   */
  format: import_prop_types7.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types7.default.oneOf(["dense", "spacious"]),
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types7.default.node,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types7.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types7.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types7.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types7.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types7.default.oneOf([3, 4]),
  /**
   * Name attribute used by the `input` element in the Field.
   */
  name: import_prop_types7.default.string,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types7.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types7.default.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see `open`).
   */
  onClose: import_prop_types7.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types7.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types7.default.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see `open`).
   */
  onOpen: import_prop_types7.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types7.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types7.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types7.default.func,
  /**
   * Control the popup or dialog open state.
   * @default false
   */
  open: import_prop_types7.default.bool,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types7.default.oneOf(["day", "month", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types7.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types7.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types7.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types7.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types7.default.func,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["all", "day", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types7.default.number, import_prop_types7.default.shape({
    endIndex: import_prop_types7.default.number.isRequired,
    startIndex: import_prop_types7.default.number.isRequired
  })]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types7.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types7.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types7.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types7.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types7.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types7.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types7.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types7.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types7.default.oneOf(["day", "month", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types7.default.shape({
    day: import_prop_types7.default.func,
    month: import_prop_types7.default.func,
    year: import_prop_types7.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types7.default.arrayOf(import_prop_types7.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 4
   */
  yearsPerRow: import_prop_types7.default.oneOf([3, 4])
};

// node_modules/@mui/x-date-pickers/MobileDatePicker/MobileDatePicker.js
var React13 = __toESM(require_react());
var import_prop_types8 = __toESM(require_prop_types());
var MobileDatePicker = React13.forwardRef(function MobileDatePicker2(inProps, ref) {
  var _defaultizedProps$slo2, _props$localeText$ope, _props$localeText;
  const localeText = useLocaleText();
  const utils = useUtils();
  const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiMobileDatePicker");
  const viewRenderers = _extends({
    day: renderDateViewCalendar,
    month: renderDateViewCalendar,
    year: renderDateViewCalendar
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    viewRenderers,
    format: resolveDateFormat(utils, defaultizedProps, false),
    slots: _extends({
      field: DateField
    }, defaultizedProps.slots),
    slotProps: _extends({}, defaultizedProps.slotProps, {
      field: (ownerState) => {
        var _defaultizedProps$slo;
        return _extends({}, resolveComponentProps((_defaultizedProps$slo = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo.field, ownerState), extractValidationProps(defaultizedProps), {
          ref
        });
      },
      toolbar: _extends({
        hidden: false
      }, (_defaultizedProps$slo2 = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo2.toolbar)
    })
  });
  const {
    renderPicker
  } = useMobilePicker({
    props,
    valueManager: singleItemValueManager,
    valueType: "date",
    getOpenDialogAriaText: (_props$localeText$ope = (_props$localeText = props.localeText) == null ? void 0 : _props$localeText.openDatePickerDialogue) != null ? _props$localeText$ope : localeText.openDatePickerDialogue,
    validator: validateDate
  });
  return renderPicker();
});
MobileDatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types8.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types8.default.string,
  /**
   * If `true`, the popover or modal will close after submitting the full date.
   * @default `true` for desktop, `false` for mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: import_prop_types8.default.bool,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types8.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types8.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types8.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types8.default.any,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types8.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types8.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types8.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types8.default.bool,
  /**
   * If `true`, the open picker button will not be rendered (renders only the field).
   * @default false
   */
  disableOpenPicker: import_prop_types8.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types8.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types8.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types8.default.number,
  /**
   * Format of the date when rendered in the input(s).
   * Defaults to localized format based on the used `views`.
   */
  format: import_prop_types8.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types8.default.oneOf(["dense", "spacious"]),
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types8.default.node,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types8.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types8.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types8.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types8.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types8.default.oneOf([3, 4]),
  /**
   * Name attribute used by the `input` element in the Field.
   */
  name: import_prop_types8.default.string,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types8.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types8.default.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see `open`).
   */
  onClose: import_prop_types8.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types8.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types8.default.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see `open`).
   */
  onOpen: import_prop_types8.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types8.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types8.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types8.default.func,
  /**
   * Control the popup or dialog open state.
   * @default false
   */
  open: import_prop_types8.default.bool,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types8.default.oneOf(["day", "month", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types8.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types8.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types8.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types8.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types8.default.func,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["all", "day", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types8.default.number, import_prop_types8.default.shape({
    endIndex: import_prop_types8.default.number.isRequired,
    startIndex: import_prop_types8.default.number.isRequired
  })]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types8.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types8.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types8.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types8.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types8.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types8.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types8.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types8.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types8.default.oneOf(["day", "month", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types8.default.shape({
    day: import_prop_types8.default.func,
    month: import_prop_types8.default.func,
    year: import_prop_types8.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types8.default.arrayOf(import_prop_types8.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types8.default.oneOf([3, 4])
};

// node_modules/@mui/x-date-pickers/DatePicker/DatePicker.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _excluded10 = ["desktopModeMediaQuery"];
var DatePicker = React14.forwardRef(function DatePicker2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDatePicker"
  });
  const {
    desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const isDesktop = useMediaQuery(desktopModeMediaQuery, {
    defaultMatches: true
  });
  if (isDesktop) {
    return (0, import_jsx_runtime13.jsx)(DesktopDatePicker, _extends({
      ref
    }, other));
  }
  return (0, import_jsx_runtime13.jsx)(MobileDatePicker, _extends({
    ref
  }, other));
});
true ? DatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types9.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types9.default.string,
  /**
   * If `true`, the popover or modal will close after submitting the full date.
   * @default `true` for desktop, `false` for mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: import_prop_types9.default.bool,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types9.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types9.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types9.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types9.default.any,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types9.default.any,
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default '@media (pointer: fine)'
   * @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery: import_prop_types9.default.string,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types9.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types9.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types9.default.bool,
  /**
   * If `true`, the open picker button will not be rendered (renders only the field).
   * @default false
   */
  disableOpenPicker: import_prop_types9.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types9.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types9.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types9.default.number,
  /**
   * Format of the date when rendered in the input(s).
   * Defaults to localized format based on the used `views`.
   */
  format: import_prop_types9.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types9.default.oneOf(["dense", "spacious"]),
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types9.default.node,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types9.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types9.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types9.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types9.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types9.default.oneOf([3, 4]),
  /**
   * Name attribute used by the `input` element in the Field.
   */
  name: import_prop_types9.default.string,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types9.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types9.default.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see `open`).
   */
  onClose: import_prop_types9.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types9.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types9.default.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see `open`).
   */
  onOpen: import_prop_types9.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types9.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types9.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types9.default.func,
  /**
   * Control the popup or dialog open state.
   * @default false
   */
  open: import_prop_types9.default.bool,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types9.default.oneOf(["day", "month", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types9.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types9.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types9.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types9.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types9.default.func,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["all", "day", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types9.default.number, import_prop_types9.default.shape({
    endIndex: import_prop_types9.default.number.isRequired,
    startIndex: import_prop_types9.default.number.isRequired
  })]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types9.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types9.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types9.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types9.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types9.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types9.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types9.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types9.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types9.default.oneOf(["day", "month", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types9.default.shape({
    day: import_prop_types9.default.func,
    month: import_prop_types9.default.func,
    year: import_prop_types9.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types9.default.arrayOf(import_prop_types9.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 4 on desktop, 3 on mobile
   */
  yearsPerRow: import_prop_types9.default.oneOf([3, 4])
} : void 0;

export {
  useDateField,
  DateField,
  pickersFadeTransitionGroupClasses,
  pickersMonthClasses,
  getMonthCalendarUtilityClass,
  monthCalendarClasses,
  MonthCalendar,
  pickersYearClasses,
  getYearCalendarUtilityClass,
  yearCalendarClasses,
  YearCalendar,
  pickersCalendarHeaderClasses,
  PickersCalendarHeader,
  getDateCalendarUtilityClass,
  dateCalendarClasses,
  DateCalendar,
  datePickerToolbarClasses,
  DatePickerToolbar,
  useDatePickerDefaultizedProps,
  renderDateViewCalendar,
  DesktopDatePicker,
  MobileDatePicker,
  DatePicker
};
//# sourceMappingURL=chunk-Z4JNQTJX.js.map
