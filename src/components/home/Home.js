import React from 'react';
import { Projects } from '../../containers/projects';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <Projects/>
        </div>
      </div>
    </div>
  );
};

export default Home;
