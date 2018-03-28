import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  Home,
  NewProjectForm,
  applicationComponent
} from "../../components";


import { Project } from '../projects';

import { initApplication } from "../../actions";


class App extends Component {

  componentWillMount() {
    this.props.initApp();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={applicationComponent(Home)}/>
          <Route exact path="/projects/new" component={applicationComponent(NewProjectForm)}/>
          <Route exact path="/projects/:projectId/outputs" component={applicationComponent(NewProjectForm)}/>
          <Route path="/projects/:projectId/" component={applicationComponent(Project)}/>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initApp() {
      dispatch(initApplication(...arguments));
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
