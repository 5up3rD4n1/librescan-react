import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import styles from './layout.styles';

export default (ComposedComponent) => {
  class ApplicationComponent extends Component {
    render() {
      return (
        <div className={css(styles.container)}>
          <Header title={this.props.title}/>
          <div className={css(styles.container)}>
            <ComposedComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = ({title}) => {
    return {title};
  };

  return connect(mapStateToProps)(ApplicationComponent);
}