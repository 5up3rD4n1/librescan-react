import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { RadioGroup } from 'material-ui/Radio'
import Checkbox from 'material-ui/Checkbox'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Card, { CardContent } from 'material-ui/Card'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'react-icons/lib/md/arrow-drop-down';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

const validate = values => {
  const errors = {};

  const requiredFields = [
    'name',
    'description',
    'language',
    'zoom'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
};

const renderTextField = ({input, name, label, defaultValue, meta: {touched, error}, ...custom}) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        error={!!touched && !!error}
        value={input.value && defaultValue}
        onChange={input.onChange}
        {...input}
        {...custom}
      />
      <FormHelperText id={name}>{touched && error ? error : ""}</FormHelperText>
    </FormControl>
  );
};

const renderCheckbox = ({input, label}) => (
  <Checkbox
    disabled={true}
    label={label}
    checked={!!input.value}
    onChange={input.onChange}
  />
);

const renderRadioGroup = ({input, ...rest}) => (
  <RadioGroup
    {...input}
    {...rest}
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
  <Select
    error={!!touched && !!error}
    displayEmpty
    {...input}
    value={input.value}
    onChange={(event) => input.onChange(event.target.value)}
    input={<Input name="age" id="favoriteColor"/>}
    children={children}
    {...custom}
  />
);

const newProjectForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant="headline">New Project</Typography>
          <Typography variant="subheading" color="textSecondary">
            General information
          </Typography>

          <Field
            name="name"
            component={renderTextField}
            label={"Project Name"}
          />

          <Field
            name="description"
            component={renderTextField}
            label={"Description"}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="language">Language</InputLabel>
            <Field
              name="language"
              component={renderSelectField}
            >
              <MenuItem value="spa">Spanish</MenuItem>
              <MenuItem value="eng">English</MenuItem>
            </Field>
          </FormControl>
        </CardContent>
      </Card>

      <div style={{marginTop: '10px'}}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>Advance</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
              <div>
                <Typography variant="subheading">Camera</Typography>

                <Field
                  name="config.camera.zoom"
                  component={renderTextField}
                  label={"Zoom"}
                  type="number"
                />
              </div>
              <div>
                <Typography variant="subheading">Scantailor</Typography>
                <Field
                  name="config.scantailor.despeckle"
                  component={renderTextField}
                  label={"Despekcle"}
                  type="number"
                />
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div>
          <Button
            type="button"
            variant="raised"
            color="primary"
            disabled={pristine || submitting}
            onClick={reset}
            styles={{margin: '5px'}}
          >
            Clear Values
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant="raised"
            color="primary" disabled={pristine || submitting}
            style={{margin: '5px'}}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'project', // a unique identifier for this form
  validate
})(newProjectForm);
