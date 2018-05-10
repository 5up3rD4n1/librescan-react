import React, { Component } from 'react';
import NewProjectForm from '../../components/projects/newProjectForm';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import styles from './projects.styles';


import { fetchFormsMetadata } from '../../actions';

class NewProject extends Component {

  submit = values => {
    // print the form values to the console
    console.log(values)
  };

  componentDidMount() {
    this.props.fetchFormsMetadata();
  }

  render() {
    console.log(this.props.formsMetadata);
    return (
      <div className={css(styles.newProjectForm)}>
          <NewProjectForm onSubmit={this.submit} formsMetadata={this.props.formsMetadata}/>
      </div>
    );
  }
}

const mapStateToProps = ({formsMetadata}) => {
  return {formsMetadata};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFormsMetadata() {
      console.log("KASKDASD");
      dispatch(fetchFormsMetadata(...arguments))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);


