import React from 'react'

import _ from 'lodash';

import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button'
import Card, { CardContent } from 'material-ui/Card'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'react-icons/lib/md/arrow-drop-down';

import FormFieldsGroup, { renderTextField } from '../forms/formFieldsGroup';
import {I18n} from 'react-redux-i18n';

const validate = values => {

  console.log(values);
  const errors = {};

  const requiredFields = [
    'project.name',
    'project.description',
    'tesseract.language'
  ];

  requiredFields.forEach(field => {
    if (!_.get(values, field)) {
      _.set(errors, field, I18n.t('forms.helpers.required'));
    }
  });

  return errors
};

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
          <FormFieldsGroup
            sectionName="project"
            formMetadata={props.formsMetadata['project']}
          />
        </CardContent>
      </Card>
      {props.formsMetadata['tesseract'] &&
      <Card style={{marginTop: '10px'}}>
        <CardContent>
          <Typography variant="title">Tesseract</Typography>
          <Typography variant="subheading" color="textSecondary">
            Document text recognition language
          </Typography>
          <FormFieldsGroup
            sectionName="tesseract"
            formMetadata={props.formsMetadata['tesseract']}
          />
        </CardContent>
      </Card>
      }

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
                  label={"Zoom"}
                  type="range"
                  component={renderTextField}
                  min={0}
                  max={20}
                  default={0}
                  step={1}

                />
              </div>
              {props.formsMetadata['scantailor'] &&
              <div>
                <Typography variant="subheading">Scantailor</Typography>
                <FormFieldsGroup
                  sectionName="scantailor"
                  formMetadata={props.formsMetadata['scantailor']}
                />
              </div>
              }
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
