import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buildPDFUrl } from "../../utils/api";
import LoadingIcon from 'react-icons/lib/fa/refresh';
import { Translate } from 'react-redux-i18n';
import { css } from 'aphrodite';

import { HTML_NON_BREAKING_SPACE_ENTITY } from "../../utils/constants";

import styles from './output.styles';

class Output extends Component {

  constructor(props) {
    super(props);
    this.state = {
      done: false,
      projectId: ""
    };
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.setState({projectId});
  }

  renderOutput = () => {
    return (
      this.props.outputView.show ?
        <iframe src={buildPDFUrl(this.state.projectId)} title="output" style={{width: '100%', height: '100%'}}/> :
        renderMessage(
          <Translate value="containers.outputs.generating"/>
        )
    );
  };

  render() {
    const remaining = remainingImages(this.props.images);
    return (
      <div className={css(styles.container)}>
        {remaining === 0 ?
          this.renderOutput() :
          renderMessage(
            <Translate
              value={'containers.outputs.processing'}
              remaining={remaining}
              total={this.props.images.length}
            />
          )
        }
      </div>
    );
  }
}

const renderMessage = (component) => {
  return (
    <div className={css(styles.messageContainer)}>
      <div>
        <h1>
          {component}
        </h1>
      </div>
      <div>
        <span>
          <LoadingIcon className="fa fa-spinner faa-spin animated" size={250}/>
        </span>
      </div>
    </div>
  );
};

const remainingImages = images => {
  return images.reduce((total, image) => total + !image.processed, 0);
};

const mapStateToProps = ({images, views}) => {

  const imagesArray = Object.keys(images.content).map(imageId => images.content[imageId]);

  return {
    images: imagesArray,
    outputView: views.output
  };
};


export default connect(mapStateToProps)(Output);
