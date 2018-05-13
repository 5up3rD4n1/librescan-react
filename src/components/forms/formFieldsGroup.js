import React from 'react';
import { Field } from 'redux-form';
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { I18n } from "react-redux-i18n";

export const renderTextField = ({input, name, label, type, meta: {touched, error}, ...custom}) => {

  let otherProps = {};
  const defaultValue = custom.default;
  const isNumberField = type === 'numeric' || type === 'range';

  if (type === 'range') {
    const {min, max, step} = custom;
    otherProps = {InputProps: {inputProps: {min, max, step}}};
  }

  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        type={isNumberField ? 'number' : 'text'}
        error={touched && !!error}
        value={input.value || defaultValue}
        onChange={input.onChange}
        {...otherProps}
        {...input}
        {...custom}
      />
      <FormHelperText>{touched && error ? error : ""}</FormHelperText>
    </FormControl>
  );
};

const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => {

  const defaultValue = custom.default;

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        error={!!touched && !!error}
        {...input}
        value={input.value || defaultValue}
        onChange={(event) => input.onChange(event.target.value)}
        children={children}
        {...custom}
      />
    </FormControl>
  );
};

const renderSwitchField = ({input, name, label}) => {
  return (
    <FormControl fullWidth>
      <Typography variant="caption">
        {label}
      </Typography>
      <Switch
        checked={!!input.value}
        onChange={input.onChange}
        value={label.toString()}
      />
    </FormControl>
  );
};

const renderSelectOptions = (composedId, optionValues, defaultValue) => {
  const selectOptions = optionValues.map((value, index) => {
    const isNumber = !isNaN(parseFloat(value));
    return (
      <option value={value.toString()} key={`${composedId}-${index + 1}`}>
        {isNumber ? value : I18n.t(`components.projects.newProjectForm.${composedId}}.${value}`)}
      </option>
    )
  });

  return defaultValue?
    selectOptions :
    [<option key={`${composedId}-0`}/>, ...selectOptions]; // Add blank option

};

const inputTypeRender = {
  select: renderSelectField,
  range: renderTextField,
  string: renderTextField,
  numeric: renderTextField,
  boolean: renderSwitchField
};

const formFieldsGroup = (props) => {
  const {sectionName, formMetadata} = props;

  if (!formMetadata) return null;

  return formMetadata.order.map(formFieldName => {

    const inputData = formMetadata[formFieldName];
    const composedId = `${sectionName}.${formFieldName}`;

    return (
      <Field
        key={composedId}
        name={composedId}
        component={inputTypeRender[inputData.type]}
        label={I18n.t(`components.forms.formFieldsGroup.${composedId}`)}
        {...inputData}
      >
        {inputData.options && renderSelectOptions(composedId, inputData.options, inputData.default)}
      </Field>
    );
  });
};

export default formFieldsGroup;